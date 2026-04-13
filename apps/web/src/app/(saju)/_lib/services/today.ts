import "server-only";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import { generateText } from "ai";
import { createClient } from "@/src/lib/supabase/server";
import { createGoogleAi } from "@/src/lib/ai";
import { ApiResponse } from "@/src/app/types/api";
import { calcSajuWonGukPrompt } from "@/src/lib/sajuCalc";
import {
  BirthCalendarLabels,
  BirthGenderLabels,
  type BirthInfo,
  type DailyFortune,
  type FortuneCategory,
} from "@/src/app/types/fortune";
import { BirthTimeLabels } from "@/src/app/types/fortune";

function isFortuneCategory(value: unknown): value is FortuneCategory {
  if (!value || typeof value !== "object") return false;
  const c = value as Partial<FortuneCategory>;
  return (
    typeof c.score === "number" &&
    typeof c.summary === "string" &&
    typeof c.description === "string"
  );
}

function isDailyFortune(value: unknown): value is DailyFortune {
  if (!value || typeof value !== "object") return false;
  const d = value as Partial<DailyFortune>;

  return (
    isFortuneCategory(d.overall) &&
    isFortuneCategory(d.wealth) &&
    isFortuneCategory(d.love) &&
    isFortuneCategory(d.health) &&
    isFortuneCategory(d.career) &&
    isFortuneCategory(d.study) &&
    isFortuneCategory(d.travel) &&
    typeof d.luckyColor === "string" &&
    typeof d.luckyNumber === "number" &&
    typeof d.luckyItem === "string" &&
    typeof d.luckyTime === "string" &&
    typeof d.advice === "string"
  );
}

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

export async function getTodayFortune(
  date: string,
  birthInfo: BirthInfo,
): Promise<ApiResponse<DailyFortune>> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "회원정보가 없습니다." };
  }

  const todayDate = dayjs(date).format("YYYY-MM-DD");
  const { data: todayData } = await supabase
    .from("daily_fortunes")
    .select("fortune_data")
    .eq("user_id", user.id)
    .eq("fortune_date", todayDate)
    .single();
  if (todayData?.fortune_data && isDailyFortune(todayData.fortune_data)) {
    return { success: true, data: todayData.fortune_data };
  }

  const todayLabel = dayjs().locale("ko").format("YYYY년 M월 D일 dddd");
  const { text } = await generateText({
    model: createGoogleAi("gemini-2.5-flash"),
    prompt: buildPrompt(birthInfo, todayLabel),
  });

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in response");

  const parsed = JSON.parse(jsonMatch[0]) as unknown;
  if (!isDailyFortune(parsed)) {
    return {
      success: false,
      message: "운세 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.",
    };
  }

  const { error } = await supabase.from("daily_fortunes").upsert(
    {
      user_id: user.id,
      fortune_date: todayDate,
      birth_date: birthInfo.birthDate,
      fortune_data: parsed,
    },
    { onConflict: "user_id,fortune_date" },
  );

  if (error) {
    return {
      success: false,
      message: "운세 데이터를 저장하는 데 실패했습니다. 다시 시도해주세요.",
    };
  }

  return { success: true, data: parsed };
}
