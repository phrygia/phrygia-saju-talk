import dayjs from "dayjs";
import { z } from "zod";
import { after, NextResponse } from "next/server";
import type { ManseryeokData } from "@/src/app/types/manseryeok";
import type { ApiResponse } from "@/src/app/types/api";
import { generateText } from "ai";
import { createClient } from "@/src/lib/supabase/server";
import { createGoogleAi } from "@/src/lib/ai";
import {
  BirthCalendarLabels,
  BirthGenderLabels,
  BirthTimeLabels,
  birthInfoSchema,
  type BirthInfo,
} from "@/src/app/types/fortune";

const requestSchema = z.object({
  birthInfo: birthInfoSchema,
});

function buildPrompt(birthInfo: BirthInfo, today: string): string {
  const genderLabel = BirthGenderLabels[birthInfo.gender];
  const calendarLabel = BirthCalendarLabels[birthInfo.calendarType];
  const birthTimeLabel =
    BirthTimeLabels[birthInfo.birthTime as keyof typeof BirthTimeLabels] ??
    "모름";
  const birthYear = parseInt(birthInfo.birthDate.split("-")[0]!);
  const currentYear = dayjs(today).year();
  const currentAge = currentYear - birthYear + 1;
  return `당신은 30년 경력의 사주명리학 전문가입니다. 아래 정보를 바탕으로 만세력 전체 데이터를 JSON으로만 응답하세요.

    사용자 정보:
    - 성별: ${genderLabel}
    - 생년월일: ${calendarLabel} ${birthInfo.birthDate}
    - 태어난 시: ${birthTimeLabel}
    - 오늘 날짜: ${today}
    - 현재 나이(한국): ${currentAge}살



    아래 JSON 구조를 정확히 따르세요. JSON 외 텍스트는 절대 포함하지 마세요.

    {
      "sajupalja": {
        "year":  { "sipshin": "비견", "cheongan": {"hanja":"甲","hangul":"갑","ohaeng":"목"}, "jiji": {"hanja":"子","hangul":"자","ohaeng":"수"}, "jijiSipshin": "정인", "jijanggan": [{"hanja":"壬","hangul":"임","sipshin":"정인"},{"hanja":"癸","hangul":"계","sipshin":"편인"}], "gilshin": "문창귀인", "sibishinsal": "지살", "sibiUnseong": {"main":"장생","sub":"병"} },
        "month": { "sameAs": "year" },
        "day":   { "sameAs": "year", "sipshinRule": "(일간)" },
        "hour":  { "sameAs": "year" },
        "gongmang": "戌亥"
      },
      "ohaengBunpo": { "mok": 25, "hwa": 15, "to": 30, "geum": 20, "su": 10 },
      "sipshinBunpo": { "bigyeop": 10, "sigwansik": 30, "jaeseong": 20, "gwanseong": 15, "inseong": 25 },
      "seongHyang": {
        "positive": ["순리대로 적응한다", "말과 행동이 일치한다", "주관이 뚜렷하다", "봉사정신이 있다"],
        "negative": ["상처를 잘 받는다", "조언을 듣지 않는다", "욕심이 많다", "오해받는다"],
        "teukjing": "일반적인 특징 3~5문장",
        "jaeneung": "재능에 관한 이야기 3~5문장",
        "gwan": "사랑과 관계에 관한 이야기 3~5문장",
        "geongang": "건강에 관한 이야기 3~5문장",
        "tip": "사주에 맞는 팁 2~3문장"
      },
      "daeun": {
        "startAge": 7,
        "description": "${currentAge}살을 시작으로 10년마다 찾아오는 특별한 운명의 변화를 경험합니다.",
        "periods": [
          { "age": 7,  "sipshin": "편재", "cheongan": {"hanja":"庚","hangul":"경","ohaeng":"금"}, "jiji": {"hanja":"午","hangul":"오","ohaeng":"화"}, "jijiSipshin": "정관", "sibiUnseong": {"cheongan":"장생","jiji":"병"} },
          { "age": 17, "sipshin": "정재", "cheongan": {"hanja":"辛","hangul":"신","ohaeng":"금"}, "jiji": {"hanja":"未","hangul":"미","ohaeng":"토"}, "jijiSipshin": "편관", "sibiUnseong": {"cheongan":"목욕","jiji":"쇠"} }
        ]
      },
      "seun": [
        { "age": ${currentAge - 7}, "year": ${currentYear - 7}, "sipshin": "편재", "cheongan": {"hanja":"甲","hangul":"갑","ohaeng":"목"}, "jiji": {"hanja":"午","hangul":"오","ohaeng":"화"}, "jijiSipshin": "정관", "sibiUnseong": {"cheongan":"장생","jiji":"병"} },
        { "age": ${currentAge - 6}, "year": ${currentYear - 6}, "sipshin": "정재", "cheongan": {"hanja":"乙","hangul":"을","ohaeng":"목"}, "jiji": {"hanja":"未","hangul":"미","ohaeng":"토"}, "jijiSipshin": "편관", "sibiUnseong": {"cheongan":"목욕","jiji":"쇠"} }
      ],
      "wolun": {
        "year": ${currentYear},
        "months": [
          { "month": 1,  "sipshin": "식신",  "cheongan": {"hanja":"甲","hangul":"갑","ohaeng":"목"}, "jiji": {"hanja":"午","hangul":"오","ohaeng":"화"}, "jijiSipshin": "비견", "sibiUnseong": "장생(장생)" },
          { "month": 2,  "sipshin": "상관",  "cheongan": {"hanja":"乙","hangul":"을","ohaeng":"목"}, "jiji": {"hanja":"未","hangul":"미","ohaeng":"토"}, "jijiSipshin": "겁재", "sibiUnseong": "목욕(관대)" }
        ]
      }
    }

    중요 규칙:
    1. ohaeng 값은 반드시 "목"|"화"|"토"|"금"|"수" 중 하나
    2. 오행 배분: 목(木)=녹색, 화(火)=적색, 토(土)=황색, 금(金)=회색, 수(水)=청색
    3. 일주 sipshin은 "(일간)"으로 표기
    4. gongmang은 한자 2글자 (예: "戌亥")
    5. sibiUnseong sub는 해당 운성의 다른 표기 (예: main이 "장생"이면 sub는 대응 운성 한글)
    6. seun은 과거~미래 포함 총 14개, 현재 연도(${currentYear}) 포함
    7. wolun months는 1~13 순서로 총 13개 (month 13은 다음해 1월)
    8. 모든 텍스트는 한국어로 작성`;
}

function isManseryeokData(v: unknown): v is ManseryeokData {
  if (!v || typeof v !== "object") return false;

  const d = v as Partial<ManseryeokData>;
  return (
    !!d.sajupalja &&
    !!d.ohaengBunpo &&
    !!d.sipshinBunpo &&
    !!d.seongHyang &&
    !!d.daeun &&
    Array.isArray(d.seun) &&
    !!d.wolun
  );
}

async function getManseryeok(
  birthInfo: BirthInfo,
): Promise<ApiResponse<ManseryeokData>> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "로그인이 필요합니다." };
  }

  const analysisMonth = dayjs().format("YYYY-MM");

  const { data: cached } = await supabase
    .from("saju_analyses")
    .select("data")
    .eq("user_id", user.id)
    .eq("analysis_month", analysisMonth)
    .maybeSingle();

  if (cached?.data && isManseryeokData(cached.data)) {
    return { success: true, data: cached.data };
  }

  const today = dayjs().format("YYYY년 M월 D일");
  const { text } = await generateText({
    model: createGoogleAi("gemini-2.5-flash"),
    prompt: buildPrompt(birthInfo, today),
  });

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return { success: false, message: "만세력 데이터 파싱에 실패했습니다." };
  }

  const parsed = JSON.parse(jsonMatch[0]) as unknown;
  if (!isManseryeokData(parsed)) {
    return {
      success: false,
      message: "만세력 데이터 형식이 올바르지 않습니다.",
    };
  }

  after(async () => {
    await supabase
      .from("saju_analyses")
      .upsert(
        {
          user_id: user.id,
          birth_date: birthInfo.birthDate,
          analysis_month: analysisMonth,
          data: parsed,
        },
        { onConflict: "user_id,analysis_month" },
      );
  });

  return { success: true, data: parsed };
}

export async function POST(
  request: Request,
): Promise<NextResponse<ApiResponse<ManseryeokData>>> {
  try {
    const body = await request.json().catch(() => null);
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message || "잘못된 요청입니다.",
        },
        { status: 400 },
      );
    }

    const result = await getManseryeok(parsed.data.birthInfo);

    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "만세력 데이터를 불러오는데 실패했습니다.",
      },
      { status: 500 },
    );
  }
}
