import { after, NextResponse } from "next/server";
import { generateText } from "ai";
import { createClient } from "@/src/lib/supabase/server";
import { calcSajuWonGuk, type SajuWonGuk } from "@/src/lib/sajuCalc";
import { createGoogleAi } from "@/src/lib/ai";
import { BirthInfo } from "@/src/app/types/fortune";
import { ApiResponse } from "@/src/app/types/api";
import {
  // type GunghapCategory,
  type GunghapResult,
} from "@/src/app/types/gunghap";

function buildPrompt(myInfo: BirthInfo, partnerInfo: any): string {
  const myWonGuk = calcSajuWonGuk(myInfo.birthDate, myInfo.birthTime);
  const partnerWonGuk = calcSajuWonGuk(
    partnerInfo.birthDate,
    partnerInfo.birthTime,
  );
  const myGender = myInfo.gender === "male" ? "남성" : "여성";
  const partnerGender = partnerInfo.gender === "male" ? "남성" : "여성";

  return `
    당신은 사주명리학 전문가입니다. 두 사람의 사주 원국을 바탕으로 궁합을 분석해주세요.

    [나의 사주 원국] (${myGender})
    - 년주: ${myWonGuk.year.cheonganHanja}(${myWonGuk.year.cheongan}) ${myWonGuk.year.jijiHanja}(${myWonGuk.year.jiji})
    - 월주: ${myWonGuk.month.cheonganHanja}(${myWonGuk.month.cheongan}) ${myWonGuk.month.jijiHanja}(${myWonGuk.month.jiji})
    - 일주: ${myWonGuk.day.cheonganHanja}(${myWonGuk.day.cheongan}) ${myWonGuk.day.jijiHanja}(${myWonGuk.day.jiji})
    - 시주: ${myWonGuk.hour.cheonganHanja}(${myWonGuk.hour.cheongan}) ${myWonGuk.hour.jijiHanja}(${myWonGuk.hour.jiji})

    [상대방 사주 원국] (${partnerGender})
    - 년주: ${partnerWonGuk.year.cheonganHanja}(${partnerWonGuk.year.cheongan}) ${partnerWonGuk.year.jijiHanja}(${partnerWonGuk.year.jiji})
    - 월주: ${partnerWonGuk.month.cheonganHanja}(${partnerWonGuk.month.cheongan}) ${partnerWonGuk.month.jijiHanja}(${partnerWonGuk.month.jiji})
    - 일주: ${partnerWonGuk.day.cheonganHanja}(${partnerWonGuk.day.cheongan}) ${partnerWonGuk.day.jijiHanja}(${partnerWonGuk.day.jiji})
    - 시주: ${partnerWonGuk.hour.cheonganHanja}(${partnerWonGuk.hour.cheongan}) ${partnerWonGuk.hour.jijiHanja}(${partnerWonGuk.hour.jiji})

    ---

    아래 JSON 형식으로만 응답하세요. 마크다운 코드블록 없이 순수 JSON만 출력하세요.

    {
    "overallScore": <0-100 사이 정수>,

    "overall": <두 사람의 기운이 가장 잘 맞는 이유 2문장 — 구체적 오행 관계 근거 포함>,

    "romance": {
        "score": <0-100>,
        "label": <"매우 잘 맞음" | "잘 맞음" | "보통" | "주의 필요" | "많은 노력 필요">,
        "description": "<연애 궁합에 대한 2-3문장 설명. 두 사람의 오행·일간 관계 근거를 포함할 것>",
        "strengths": [
        "<연애에서 잘 맞는 이유 1>",
        "<연애에서 잘 맞는 이유 2>",
        "<연애에서 잘 맞는 이유 3>"
        ],
        "caution": "<연애할 때 주의해야 할 점 1문장>"
    },

    "marriage": {
        "score": <0-100>,
        "label": <"매우 잘 맞음" | "잘 맞음" | "보통" | "주의 필요" | "많은 노력 필요">,
        "description": "<결혼 궁합에 대한 2-3문장 설명. 가정 운·안정성·재물운 관점 포함>",
        "strengths": [
        "<결혼 생활에서 잘 맞는 이유 1>",
        "<결혼 생활에서 잘 맞는 이유 2>",
        "<결혼 생활에서 잘 맞는 이유 3>"
        ],
        "caution": "<결혼 생활에서 주의해야 할 점 1문장>"
    },

    "personality": {
        "score": <0-100>,
        "label": <"매우 잘 맞음" | "잘 맞음" | "보통" | "주의 필요" | "많은 노력 필요">,
        "description": "<성격 궁합에 대한 2-3문장 설명. 일간·월간의 음양오행 성질 근거 포함>",
        "strengths": [
        "<성격적으로 잘 맞는 이유 1>",
        "<성격적으로 잘 맞는 이유 2>",
        "<성격적으로 잘 맞는 이유 3>"
        ],
        "caution": "<성격 차이로 인한 주의점 1문장>"
    },

    "wealth": {
        "score": <0-100>,
        "label": <"매우 잘 맞음" | "잘 맞음" | "보통" | "주의 필요" | "많은 노력 필요">,
        "description": "<재물 궁합에 대한 2-3문장 설명. 일간·월간의 음양오행 성질 근거 포함>",
        "strengths": [
        "<금전적으로 잘 맞는 이유 1>",
        "<금전적으로 잘 맞는 이유 2>",
        "<금전적으로 잘 맞는 이유 3>"
        ],
        "caution": "<경제관념의 차이로 인한 주의점 1문장>"
    },

    "conversation": {
        "score": <0-100>,
        "label": <"매우 잘 맞음" | "잘 맞음" | "보통" | "주의 필요" | "많은 노력 필요">,
        "description": "<소통 궁합에 대한 2-3문장 설명. 일간·월간의 음양오행 성질 근거 포함>",
        "strengths": [
        "<소통이 잘 맞는 이유 1>",
        "<소통이 잘 맞는 이유 2>",
        "<소통이 잘 맞는 이유 3>"
        ],
        "caution": "<대화 성향 차이로 인한 주의점 1문장>"
    },

    "conflict": {
        "score": <0-100>,
        "label": <"매우 안 맞음" | "안 맞음" | "보통" | "잘 맞음" | "매우 잘 맏음">,
        "description": "<종합적으로 갈등 궁합에 대한 2-3문장 설명. 일간·월간의 음양오행 성질 근거 포함>",
        "strengths": [
        "<갈등이 생기는 이유 1>",
        "<갈등이 생기는 이유 2>",
        "<갈등이 생기는 이유 3>"
        ],
        "caution": "<갈등이 생겼을 때 주의점 1문장>"
    },

    "wellMatched": [
        "<두 사람이 잘 맞는 핵심 이유 1 — 구체적 오행 관계 근거>",
        "<두 사람이 잘 맞는 핵심 이유 2>",
        "<두 사람이 잘 맞는 핵심 이유 3>"
    ],

    "longevityKeys": [
        "<오래가기 위한 핵심 조건 1 — 실천 가능한 조언>",
        "<오래가기 위한 핵심 조건 2>",
        "<오래가기 위한 핵심 조건 3>"
    ],

    "advice": "<두 사람에게 전하는 전체 조언 2-3문장. 긍정적이고 따뜻한 톤으로>"
    }

    분석 기준:
    - 일간(日干) 합충(合沖) 관계를 최우선으로 본다
    - 오행 상생(相生)·상극(相剋) 관계를 반영한다
    - 년지·월지의 지지 합충형파해(合沖刑破害)도 참고한다
    - 점수는 70 이상이면 좋은 궁합, 50-69 보통, 49 이하 노력 필요로 해석한다
    - 부정적 표현보다 보완적 관점에서 서술한다
    `.trim();
}

export async function POST(
  request: Request,
): Promise<NextResponse<ApiResponse<GunghapResult>>> {
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

  const body = (await request.json()) as {
    today: string;
    myInfo: BirthInfo;
    partnerInfo: BirthInfo;
  };
  const { today, myInfo, partnerInfo } = body;

  try {
    const { data: existing } = await supabase
      .from("gunghap_results")
      .select("result")
      .eq("my_birth_date", myInfo.birthDate)
      .eq("my_birth_time", myInfo.birthTime)
      .eq("my_gender", myInfo.gender)
      .eq("my_calendar_type", myInfo.calendarType)
      .eq("partner_birth_date", partnerInfo.birthDate)
      .eq("partner_birth_time", partnerInfo.birthTime)
      .eq("partner_gender", partnerInfo.gender)
      .eq("partner_calendar_type", partnerInfo.calendarType)
      .eq("analyzed_date", today)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { success: true, data: existing.result },
        { status: 200 },
      );
    }

    const { text } = await generateText({
      model: createGoogleAi("gemini-2.5-flash"),
      prompt: buildPrompt(myInfo, partnerInfo),
    });

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");

    const parsed = JSON.parse(jsonMatch[0]) as unknown;

    after(async () => {
      await supabase.from("gunghap_results").insert({
        user_id: user!.id,
        my_birth_date: myInfo.birthDate,
        my_birth_time: myInfo.birthTime,
        my_gender: myInfo.gender,
        my_calendar_type: myInfo.calendarType,
        partner_birth_date: partnerInfo.birthDate,
        partner_birth_time: partnerInfo.birthTime,
        partner_gender: partnerInfo.gender,
        partner_calendar_type: partnerInfo.calendarType,
        partner_name: partnerInfo.name ?? null,
        result: parsed,
        analyzed_date: today,
      });
    });

    return NextResponse.json(
      { success: true, data: parsed as GunghapResult },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "궁합 데이터를 불러오는데 실패했습니다.",
      },
      { status: 500 },
    );
  }
}
