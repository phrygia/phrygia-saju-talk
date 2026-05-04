import { after, NextResponse } from "next/server";
import { generateText } from "ai";
import { createClient } from "@/src/lib/supabase/server";
import { createGoogleAi } from "@/src/lib/ai";
import {
  BirthInfo,
  BirthCalendarLabels,
  BirthTimeLabels,
} from "@/src/app/types/fortune";
import { calcSajuWonGuk, calcSajuWonGukPrompt } from "@/src/lib/sajuCalc";
import {
  type GunghapResult,
  type GunghapPersonInfo,
  gunghapTableName,
} from "@/src/app/types/gunghap";
import { ApiResponse } from "@/src/app/types/api";

type SajuWonGuk = ReturnType<typeof calcSajuWonGuk>;

interface PersonContext {
  info: BirthInfo;
  wonGuk: SajuWonGuk;
  wonGukPrompt: string;
  genderLabel: string;
  calendarLabel: string;
  timeLabel: string;
}

type AiPersonInfo = Omit<GunghapPersonInfo, "wonkuk">;

type AiGunghapResult = Omit<GunghapResult, "me" | "partner"> & {
  me: AiPersonInfo;
  partner: AiPersonInfo;
};

function buildPersonContext(info: BirthInfo): PersonContext {
  return {
    info,
    wonGuk: calcSajuWonGuk(info.birthDate, info.birthTime),
    wonGukPrompt: calcSajuWonGukPrompt(info.birthDate, info.birthTime),
    genderLabel: info.gender === "male" ? "남성" : "여성",
    calendarLabel: BirthCalendarLabels[info.calendarType],
    timeLabel:
      BirthTimeLabels[info.birthTime as keyof typeof BirthTimeLabels] ?? "모름",
  };
}

function extractWonkuk(wonGuk: SajuWonGuk): string[] {
  return [
    wonGuk.hour.cheongan,
    wonGuk.day.cheongan,
    wonGuk.month.cheongan,
    wonGuk.year.cheongan,
  ];
}

function buildPrompt(me: PersonContext, partner: PersonContext): string {
  return `
    당신은 30년 경력의 한국 전통 사주 명리학 전문가입니다.

    [나] (${me.genderLabel})
    이름: ${me.info.name} / 생년월일: ${me.calendarLabel} ${me.info.birthDate}
    태어난 시: ${me.timeLabel} / 성별: ${me.genderLabel}

    [나의 사주 원국]
    ${me.wonGukPrompt}

    [상대방] (${partner.genderLabel})
    이름: ${partner.info.name} / 생년월일: ${partner.calendarLabel} ${partner.info.birthDate}
    태어난 시: ${partner.timeLabel} / 성별: ${partner.genderLabel}

    [상대방 사주 원국]
    ${partner.wonGukPrompt}

    ---

    위의 사주 원국으로 사주 궁합을 분석해주세요.
    아래 JSON 스키마를 정확히 준수하여 반환하세요.
    답변은 이해하기 쉽게 한글로 답해주고 불필요한 한자는 빼주고 꼭 필요하다면 옆에 괄호로 간단한 설명도 추가해주세요.

    {
      "me": {
        "ilgan": "<나의 일간 한자 1자 (예: 壬)>",
        "ilgan_label": "<나의 일간 한글+한자 (예: 임수 (壬水))>",
        "dominant_element": "<나의 사주 원국에서 가장 많은 오행 (예: 목(木))>",
        "dominant_element_label": "<dominant_element + ' 강' (예: 목(木) 강)>"
      },
      "partner": {
        "ilgan": "<상대방의 일간 한자 1자>",
        "ilgan_label": "<상대방의 일간 한글+한자>",
        "dominant_element": "<상대방 사주 원국에서 가장 많은 오행>",
        "dominant_element_label": "<dominant_element + ' 강'>"
      },
      "overallScore": <0-100 사이 정수>,
      "overall": "<두 사람의 기운이 가장 잘 맞는 이유 2문장 — 구체적 오행 관계 근거 포함>",
      "grade": "천생연분|천운지합|좋은 인연|보통 인연|노력 필요 중 하나",
      "categories": {
        "love": 0~100,
        "communication": 0~100,
        "trust": 0~100,
        "emotion": 0~100,
        "growth": 0~100,
        "future": 0~100
      },
      "romance": {
        "score": <0-100>,
        "label": <"매우 잘 맞음" | "잘 맞음" | "보통" | "주의 필요" | "많은 노력 필요">,
        "description": "<연애 궁합에 대한 1-2문장 설명. 두 사람의 오행·일간 관계 근거를 포함할 것>",
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
        "description": "<결혼 궁합에 대한 1-2문장 설명. 가정 운·안정성·재물운 관점 포함>",
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
        "description": "<성격 궁합에 대한 1-2문장 설명. 일간·월간의 음양오행 성질 근거 포함>",
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
        "description": "<재물 궁합에 대한 1-2문장 설명. 일간·월간의 음양오행 성질 근거 포함>",
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
        "description": "<소통 궁합에 대한 1-2문장 설명. 일간·월간의 음양오행 성질 근거 포함>",
        "strengths": [
          "<소통이 잘 맞는 이유 1>",
          "<소통이 잘 맞는 이유 2>",
          "<소통이 잘 맞는 이유 3>"
        ],
        "caution": "<대화 성향 차이로 인한 주의점 1문장>"
      },
      "conflict": {
        "score": <0-100>,
        "label": <"매우 안 맞음" | "안 맞음" | "보통" | "잘 맞음" | "매우 잘 맞음">,
        "description": "<종합적으로 갈등 궁합에 대한 1-2문장 설명. 일간·월간의 음양오행 성질 근거 포함>",
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
    const meCtx = buildPersonContext(myInfo);
    const partnerCtx = buildPersonContext(partnerInfo);

    let cacheQuery = supabase
      .from(gunghapTableName)
      .select("result")
      .eq("my_birth_date", myInfo.birthDate)
      .eq("my_birth_time", myInfo.birthTime)
      .eq("my_gender", myInfo.gender)
      .eq("my_calendar_type", myInfo.calendarType)
      .eq("partner_birth_date", partnerInfo.birthDate)
      .eq("partner_birth_time", partnerInfo.birthTime)
      .eq("partner_gender", partnerInfo.gender)
      .eq("partner_calendar_type", partnerInfo.calendarType)
      .eq("analyzed_date", today);

    cacheQuery = myInfo.name
      ? cacheQuery.eq("my_name", myInfo.name)
      : cacheQuery.is("my_name", null);

    cacheQuery = partnerInfo.name
      ? cacheQuery.eq("partner_name", partnerInfo.name)
      : cacheQuery.is("partner_name", null);

    const { data: cached } = await cacheQuery.maybeSingle();

    if (cached) {
      return NextResponse.json({ success: true, data: cached.result });
    }

    const { text } = await generateText({
      model: createGoogleAi("gemini-2.5-flash"),
      prompt: buildPrompt(meCtx, partnerCtx),
    });

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");

    const aiResult = JSON.parse(jsonMatch[0]) as AiGunghapResult;

    const result: GunghapResult = {
      ...aiResult,
      me: {
        ...aiResult.me,
        ilgan: meCtx.wonGuk.day.cheongan,
        wonkuk: extractWonkuk(meCtx.wonGuk),
      },
      partner: {
        ...aiResult.partner,
        ilgan: partnerCtx.wonGuk.day.cheongan,
        wonkuk: extractWonkuk(partnerCtx.wonGuk),
      },
    };

    const userId = user.id;

    after(async () => {
      try {
        await supabase.from(gunghapTableName).insert({
          user_id: userId,
          my_birth_date: myInfo.birthDate,
          my_birth_time: myInfo.birthTime,
          my_gender: myInfo.gender,
          my_calendar_type: myInfo.calendarType,
          my_name: myInfo.name ?? null,
          partner_birth_date: partnerInfo.birthDate,
          partner_birth_time: partnerInfo.birthTime,
          partner_gender: partnerInfo.gender,
          partner_calendar_type: partnerInfo.calendarType,
          partner_name: partnerInfo.name ?? null,
          result,
          analyzed_date: today,
        });
      } catch (err) {
        console.error("[gunghap] DB 저장 실패:", err);
      }
    });

    return NextResponse.json({ success: true, data: result }, { status: 200 });
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
