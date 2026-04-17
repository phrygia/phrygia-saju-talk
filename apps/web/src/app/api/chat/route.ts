import { streamText, type CoreMessage } from "ai";
import { createGoogleAi } from "@/src/lib/ai";
import { calcSajuWonGukPrompt } from "@/src/lib/sajuCalc";
import { type BirthInfo } from "@/src/app/types/fortune";
import { getBirthTimeLabel } from "@/src/lib/fortune";

function getLatestUserText(messages: CoreMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const msg = messages[i];

    if (!msg) continue;
    if (msg.role !== "user") continue;

    if (typeof msg.content === "string") return msg.content;

    if (Array.isArray(msg.content)) {
      return msg.content
        .filter(
          (
            part,
          ): part is {
            type: "text";
            text: string;
          } => part.type === "text" && typeof part.text === "string",
        )
        .map((part) => part.text)
        .join(" ");
    }
  }

  return "";
}

function getAdaptiveMaxTokens(latestUserText: string): number {
  const asksDetailed =
    /자세히|구체적|풀어|상세하게|상세히|분석|종합|길게|디테일|왜 그런지/.test(
      latestUserText.trim(),
    );
  return asksDetailed ? 1000 : 500;
}

function buildPrompt(birthInfo: BirthInfo): string {
  let systemPrompt: string;

  if (birthInfo && typeof birthInfo === "object") {
    const { gender, calendarType, birthDate, birthTime, name } = birthInfo as {
      gender: string;
      calendarType: string;
      birthDate: string;
      birthTime: string;
      name?: string;
    };
    const genderLabel = gender === "male" ? "남성" : "여성";
    const calendarLabel = calendarType === "solar" ? "양력" : "음력";
    const birthTimeLabel = getBirthTimeLabel(birthTime);
    const sajuWonGukPrompt = calcSajuWonGukPrompt(birthDate, birthTime);
    systemPrompt = `당신은 30년 경력의 사주/운세 전문 상담사입니다.

    사용자 정보:
    - 성별: ${genderLabel}
    - 생년월일: ${calendarLabel} ${birthDate}
    - 태어난 시: ${birthTimeLabel}
    ${name ? `- 이름: ${name}` : ""}

    ${sajuWonGukPrompt}
    
    사주팔자와 오행의 조화를 기반으로 정확하고 구체적인 상담을 해주세요.
    친절하지만 전문적인 어조로 답변하세요.
    사용자의 질문에 맞춤형으로 답변하되, 사주 해석의 근거를 간략히 설명해주세요.

    기본적으로는 짧고 밀도 있게 답변하세요:
    - 결론 2~3문장
    - 핵심 근거 2~3개
    - 실천 팁 1~2개

    200자가 넘지 않도록 답변을 간결하게 유지하세요.
    사용자가 "자세히" 요청한 경우에만 450자 내외로 답변해주세요.
    중요한 키워드나 핵심 내용은 **굵게** 표시하세요.
    답변은 한국어로 해주세요.`;
  } else {
    systemPrompt = `당신은 30년 경력의 사주/운세 전문 상담사입니다.

    사용자의 질문에 친절하고 간결하게 답변해주세요.

    기본 답변 형식:
    - 결론 2~3문장
    - 핵심 근거 2~3개
    - 실천 팁 1~2개

    200자가 넘지 않도록 답변을 간결하게 유지하세요.
    사용자가 "자세히" 요청한 경우에만 450자 내외로 답변해주세요.
    중요한 키워드나 핵심 내용은 **굵게** 표시하세요.
    답변은 한국어로 해주세요.`;
  }

  return systemPrompt;
}

export async function POST(req: Request) {
  let payload: {
    messages?: unknown;
    birthInfo?: BirthInfo;
  };

  try {
    payload = await req.json();
  } catch {
    return Response.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const { messages, birthInfo } = payload;

  if (!Array.isArray(messages)) {
    return Response.json(
      {
        success: false,
        message: "Request body must include a messages array.",
      },
      { status: 400 },
    );
  }

  const coreMessages = messages as CoreMessage[];
  const latestUserText = getLatestUserText(coreMessages);
  const adaptiveMaxTokens = getAdaptiveMaxTokens(latestUserText);

  // let systemPrompt: string;
  // if (birthInfo && typeof birthInfo === "object") {
  //   const { gender, calendarType, birthDate, birthTime } = birthInfo as {
  //     gender: string;
  //     calendarType: string;
  //     birthDate: string;
  //     birthTime: string;
  //   };
  //   const genderLabel = gender === "male" ? "남성" : "여성";
  //   const calendarLabel = calendarType === "solar" ? "양력" : "음력";
  //   const birthTimeLabel = getBirthTimeLabel(birthTime);
  //   const sajuWonGukPrompt = calcSajuWonGukPrompt(birthDate, birthTime);
  //   systemPrompt = `당신은 30년 경력의 사주/운세 전문 상담사입니다.

  //   사용자 정보:
  //   - 성별: ${genderLabel}
  //   - 생년월일: ${calendarLabel} ${birthDate}
  //   - 태어난 시: ${birthTimeLabel}

  //   ${sajuWonGukPrompt}

  //   사주팔자와 오행의 조화를 기반으로 정확하고 구체적인 상담을 해주세요.
  //   친절하지만 전문적인 어조로 답변하세요.
  //   사용자의 질문에 맞춤형으로 답변하되, 사주 해석의 근거를 간략히 설명해주세요.

  //   기본적으로는 짧고 밀도 있게 답변하세요:
  //   - 결론 2~3문장
  //   - 핵심 근거 2~3개
  //   - 실천 팁 1~2개

  //   200자가 넘지 않도록 답변을 간결하게 유지하세요.
  //   사용자가 "자세히" 요청한 경우에만 450자 내외로 답변해주세요.
  //   중요한 키워드나 핵심 내용은 **굵게** 표시하세요.
  //   답변은 한국어로 해주세요.`;
  // } else {
  //   systemPrompt = `당신은 30년 경력의 사주/운세 전문 상담사입니다.

  //   사용자의 질문에 친절하고 간결하게 답변해주세요.

  //   기본 답변 형식:
  //   - 결론 2~3문장
  //   - 핵심 근거 2~3개
  //   - 실천 팁 1~2개

  //   200자가 넘지 않도록 답변을 간결하게 유지하세요.
  //   사용자가 "자세히" 요청한 경우에만 450자 내외로 답변해주세요.
  //   중요한 키워드나 핵심 내용은 **굵게** 표시하세요.
  //   답변은 한국어로 해주세요.`;
  // }

  try {
    const result = await streamText({
      model: createGoogleAi("gemini-2.5-flash"),
      system: buildPrompt(birthInfo!),
      messages: coreMessages.slice(-6),
      maxTokens: adaptiveMaxTokens,
      temperature: 0.5,
      providerOptions: {
        google: {
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error instanceof Error ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}
