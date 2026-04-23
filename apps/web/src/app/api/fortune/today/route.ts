import { NextResponse, after } from "next/server";
import dayjs from "dayjs";
import { z } from "zod";
import { generateText } from "ai";
import { createClient } from "@/src/lib/supabase/server";
import { createGoogleAi } from "@/src/lib/ai";
import { ApiResponse } from "@/src/app/types/api";
import { calcSajuWonGukPrompt } from "@/src/lib/sajuCalc";
import {
  BirthCalendarLabels,
  BirthGenderLabels,
  birthInfoSchema,
  type BirthInfo,
  type DailyFortune,
} from "@/src/app/types/fortune";
import { BirthTimeLabels } from "@/src/app/types/fortune";

const fortuneCategorySchema = z.object({
  score: z.number().int().min(1).max(100),
  summary: z.string(),
  description: z.string(),
});

const dailyFortuneSchema = z.object({
  overall: fortuneCategorySchema,
  wealth: fortuneCategorySchema,
  love: fortuneCategorySchema,
  health: fortuneCategorySchema,
  career: fortuneCategorySchema,
  study: fortuneCategorySchema,
  travel: fortuneCategorySchema,
  luckyColor: z.string(),
  luckyNumber: z.number().int().min(1).max(99),
  luckyItem: z.string(),
  luckyTime: z.string(),
  advice: z.string(),
});

const requestSchema = z.object({
  date: z.string().min(1),
  birthInfo: birthInfoSchema,
});

function buildPrompt(birthInfo: BirthInfo, today: string) {
  const genderLabel = BirthGenderLabels[birthInfo.gender];
  const calendarLabel = BirthCalendarLabels[birthInfo.calendarType];
  const birthTimeLabel =
    BirthTimeLabels[birthInfo.birthTime as keyof typeof BirthTimeLabels] ??
    "모름";
  const sajuWonGukPrompt = calcSajuWonGukPrompt(
    birthInfo.birthDate,
    birthInfo.birthTime,
  );

  return `당신은 30년 경력의 사주/운세 전문가입니다.

  사용자 정보:
  - 성별: ${genderLabel}
  - 생년월일: ${calendarLabel} ${birthInfo.birthDate}
  - 태어난 시: ${birthTimeLabel}
  - 오늘 날짜: ${today}

  ${sajuWonGukPrompt}

  사주팔자와 오행의 조화를 기반으로 오늘의 운세를 분석하여 아래 JSON 형식으로만 응답하세요.
  JSON 외의 다른 텍스트는 절대 포함하지 마세요.

  반드시 아래 필드명을 그대로 사용하세요 (영문 키 이름 변경 불가):

  {
    "overall": { "score": 숫자(1-100), "summary": "15자 이내 요약", "description": "2~3문장 설명" },
    "wealth": { "score": 숫자(1-100), "summary": "15자 이내 요약", "description": "2~3문장 설명" },
    "love": { "score": 숫자(1-100), "summary": "15자 이내 요약", "description": "2~3문장 설명" },
    "health": { "score": 숫자(1-100), "summary": "15자 이내 요약", "description": "2~3문장 설명" },
    "career": { "score": 숫자(1-100), "summary": "15자 이내 요약", "description": "2~3문장 설명" },
    "study": { "score": 숫자(1-100), "summary": "15자 이내 요약", "description": "2~3문장 설명" },
    "travel": { "score": 숫자(1-100), "summary": "15자 이내 요약", "description": "2~3문장 설명" },
    "luckyColor": "한국어 색상명",
    "luckyNumber": 숫자(1-99),
    "luckyItem": "짧은 한국어 아이템명",
    "luckyTime": "예: 오후 2시~4시",
    "advice": "오늘의 전체 조언 2~3문장"
  }

  톤: 따뜻하고 희망적이면서 현실적. 지나치게 부정적이지 않게. 모든 값은 한국어로 작성.`;
}

async function getTodayDataFromDB(
  date: string,
  userId: string,
): Promise<ApiResponse<DailyFortune>> {
  const supabase = await createClient();

  const todayDate = dayjs(date).format("YYYY-MM-DD");
  const { data: todayData } = await supabase
    .from("daily_fortunes")
    .select("fortune_data")
    .eq("user_id", userId)
    .eq("fortune_date", todayDate)
    .single();

  const cached = dailyFortuneSchema.safeParse(todayData?.fortune_data);

  if (cached.success) {
    return { success: true, data: cached.data };
  } else {
    return { success: false, message: "해당 날짜의 운세 데이터가 없습니다." };
  }
}

async function getTodayFortune(
  date: string,
  birthInfo: BirthInfo,
  userId: string,
): Promise<ApiResponse<DailyFortune>> {
  const supabase = await createClient();
  const todayDate = dayjs(date).format("YYYY-MM-DD");

  const dbResult = await getTodayDataFromDB(todayDate, userId);
  if (dbResult.success) return dbResult;

  const todayLabel = dayjs().locale("ko").format("YYYY년 M월 D일 dddd");
  const { text } = await generateText({
    model: createGoogleAi("gemini-2.5-flash"),
    prompt: buildPrompt(birthInfo, todayLabel),
  });

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in response");

  const parsed = dailyFortuneSchema.safeParse(JSON.parse(jsonMatch[0]));
  if (!parsed.success) {
    return {
      success: false,
      message: "운세 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.",
    };
  }
  after(async () => {
    await supabase.from("daily_fortunes").upsert(
      {
        user_id: userId,
        fortune_date: todayDate,
        birth_date: birthInfo.birthDate,
        fortune_data: parsed.data,
      },
      { onConflict: "user_id,fortune_date" },
    );
  });

  return { success: true, data: parsed.data };
}

export async function GET(
  request: Request,
): Promise<NextResponse<ApiResponse<DailyFortune>>> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { success: false, message: "회원정보가 없습니다." },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  if (!date || !dayjs(date).isValid()) {
    return NextResponse.json(
      { success: false, message: "잘못된 날짜 형식입니다." },
      { status: 400 },
    );
  }
  const todayDate = dayjs(date).format("YYYY-MM-DD");
  const dbResult = await getTodayDataFromDB(todayDate, user.id);

  if (dbResult.success) {
    return NextResponse.json(
      {
        success: true,
        data: dbResult.data,
      },
      { status: 200 },
    );
  } else {
    return NextResponse.json(
      {
        success: false,
        message: "해당 날짜의 운세 데이터가 없습니다.",
      },
      { status: 404 },
    );
  }
}

export async function POST(
  request: Request,
): Promise<NextResponse<ApiResponse<DailyFortune>>> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { success: false, message: "회원정보가 없습니다." },
      { status: 401 },
    );
  }

  const body = requestSchema.safeParse(await request.json().catch(() => null));

  if (!body.success) {
    return NextResponse.json(
      {
        success: false,
        message: body.error.issues[0]?.message || "잘못된 요청입니다.",
      },
      { status: 400 },
    );
  }

  const { date, birthInfo } = body.data;
  const requestedDate = dayjs(date);

  if (!requestedDate.isValid()) {
    return NextResponse.json(
      { success: false, message: "잘못된 날짜입니다." },
      { status: 400 },
    );
  }

  if (requestedDate.isAfter(dayjs(), "day")) {
    return NextResponse.json(
      { success: false, message: "미래 날짜의 운세는 확인할 수 없습니다." },
      { status: 400 },
    );
  }

  if (requestedDate.isBefore(dayjs(), "day")) {
    const { data: storedFortune, error } = await supabase
      .from("daily_fortunes")
      .select("fortune_data")
      .eq("user_id", user.id)
      .eq("fortune_date", requestedDate.format("YYYY-MM-DD"))
      .maybeSingle();

    // if (error || !storedFortune?.fortune_data) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "해당 날짜의 저장된 운세 데이터가 없습니다.",
    //     },
    //     { status: 404 },
    //   );
    // }

    return NextResponse.json(
      { success: true, data: storedFortune.fortune_data as DailyFortune },
      { status: 200 },
    );
  }

  try {
    const result = await getTodayFortune(
      requestedDate.format("YYYY-MM-DD"),
      birthInfo,
      user.id,
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "운세 데이터를 불러오는데 실패했습니다.",
      },
      { status: 500 },
    );
  }
}
