export type SajuCategory =
  | "money"
  | "career"
  | "love"
  | "study"
  | "health"
  | "general";

export interface SajuQuestion {
  id: number;
  category: SajuCategory;
  question: string;
  categoryName: string;
}

export const SAJU_EMOJI = {
  재물운: "💰",
  직장운: "💼",
  연애운: "💕",
  학업운: "📚",
  건강운: "🌿",
  종합사주운: "🔮",
};

export const SAJU_QUESTIONS: SajuQuestion[] = [
  {
    id: 1,
    category: "money",
    question: "올해 나의 전반적인 재물 운세는 어떤가요?",
    categoryName: "재물운",
  },
  {
    id: 2,
    category: "money",
    question: "언제쯤 큰 돈이 들어오는 시기가 올까요?",
    categoryName: "재물운",
  },
  {
    id: 3,
    category: "money",
    question: "평생 부자로 살 수 있는 사주인가요?",
    categoryName: "재물운",
  },
  {
    id: 4,
    category: "money",
    question: "지금 하고 있는 사업을 계속해도 괜찮을까요?",
    categoryName: "재물운",
  },
  {
    id: 5,
    category: "money",
    question: "나에게 맞는 재테크 방식(주식, 부동산 등)은 무엇인가요?",
    categoryName: "재물운",
  },
  {
    id: 6,
    category: "money",
    question: "횡재수나 로또운이 있는 사주인가요?",
    categoryName: "재물운",
  },
  {
    id: 7,
    category: "money",
    question: "동업자와의 궁합이 사업에 도움이 될까요?",
    categoryName: "재물운",
  },
  {
    id: 31,
    category: "money",
    question: "목돈을 모으기에 가장 좋은 시기는 언제인가요?",
    categoryName: "재물운",
  },
  {
    id: 32,
    category: "money",
    question: "부동산 매매나 계약을 하기에 유리한 달이 있을까요?",
    categoryName: "재물운",
  },
  {
    id: 33,
    category: "money",
    question: "부모님으로부터 상속이나 증여를 받을 운이 있나요?",
    categoryName: "재물운",
  },
  {
    id: 34,
    category: "money",
    question: "투자보다는 저축이 저에게 더 맞는 성향인가요?",
    categoryName: "재물운",
  },
  {
    id: 35,
    category: "money",
    question: "평생의 금전적 기복이 심한 편인가요, 안정적인가요?",
    categoryName: "재물운",
  },
  {
    id: 36,
    category: "money",
    question: "빌려준 돈을 돌려받거나 경제적 어려움이 해결될 시기는?",
    categoryName: "재물운",
  },
  {
    id: 8,
    category: "career",
    question: "올해 직장에서 승진이나 연봉 협상운이 있나요?",
    categoryName: "직장운",
  },
  {
    id: 9,
    category: "career",
    question: "지금 이직을 해도 좋은 시기인가요?",
    categoryName: "직장운",
  },
  {
    id: 10,
    category: "career",
    question: "나에게 가장 잘 맞는 직업이나 직종은 무엇인가요?",
    categoryName: "직장운",
  },
  {
    id: 11,
    category: "career",
    question: "전문직으로 나가는 것이 유리할까요, 일반 직장이 나을까요?",
    categoryName: "직장운",
  },
  {
    id: 12,
    category: "career",
    question: "직장 상사나 동료와의 인간관계 문제는 언제 풀릴까요?",
    categoryName: "직장운",
  },
  {
    id: 13,
    category: "career",
    question: "창업을 하기에 적절한 시기는 언제인가요?",
    categoryName: "직장운",
  },
  {
    id: 14,
    category: "career",
    question: "해외에서 일하거나 공부할 기운이 있나요?",
    categoryName: "직장운",
  },
  {
    id: 37,
    category: "career",
    question: "조직 생활과 개인 사업 중 어느 쪽이 대성할 사주인가요?",
    categoryName: "직장운",
  },
  {
    id: 38,
    category: "career",
    question: "지금의 직무를 완전히 바꾸는 전환기는 언제쯤 올까요?",
    categoryName: "직장운",
  },
  {
    id: 39,
    category: "career",
    question: "팀장이나 임원처럼 사람들을 이끄는 리더 기질이 있나요?",
    categoryName: "직장운",
  },
  {
    id: 40,
    category: "career",
    question: "나의 능력을 인정받아 유명해지거나 명예를 얻을 기회는?",
    categoryName: "직장운",
  },
  {
    id: 41,
    category: "career",
    question: "직장 내 갈등이나 구설수를 피하기 위해 조심할 점은?",
    categoryName: "직장운",
  },
  {
    id: 42,
    category: "career",
    question: "프리랜서나 1인 기업가로 독립해도 성공할 수 있을까요?",
    categoryName: "직장운",
  },
  {
    id: 15,
    category: "love",
    question: "올해 새로운 인연을 만날 수 있을까요?",
    categoryName: "연애운",
  },
  {
    id: 16,
    category: "love",
    question: "현재 만나고 있는 사람과 결혼까지 갈 수 있을까요?",
    categoryName: "연애운",
  },
  {
    id: 17,
    category: "love",
    question: "나에게 어울리는 배우자 스타일은 어떤 사람인가요?",
    categoryName: "연애운",
  },
  {
    id: 18,
    category: "love",
    question: "언제쯤 결혼운이 가장 강하게 들어오나요?",
    categoryName: "연애운",
  },
  {
    id: 19,
    category: "love",
    question: "이별 후 재결합 가능성이 있는 사주인가요?",
    categoryName: "연애운",
  },
  {
    id: 20,
    category: "love",
    question: "연애가 계속 실패하는 근본적인 이유가 사주에 있나요?",
    categoryName: "연애운",
  },
  {
    id: 43,
    category: "love",
    question: "짝사랑하는 사람과 연인으로 발전할 가능성이 있을까요?",
    categoryName: "연애운",
  },
  {
    id: 44,
    category: "love",
    question: "장거리 연애나 외국인과의 인연이 사주에 나타나 있나요?",
    categoryName: "연애운",
  },
  {
    id: 45,
    category: "love",
    question: "나를 진심으로 아껴줄 사람은 언제쯤 나타날까요?",
    categoryName: "연애운",
  },
  {
    id: 46,
    category: "love",
    question: "사주에 나타난 나의 미래 배우자는 어떤 성격의 사람인가요?",
    categoryName: "연애운",
  },
  {
    id: 47,
    category: "love",
    question: "과거의 인연을 정리하고 새 출발 하기에 좋은 시기는?",
    categoryName: "연애운",
  },
  {
    id: 48,
    category: "love",
    question: "결혼 후에 오히려 재물이나 커리어 운이 트이는 사주인가요?",
    categoryName: "연애운",
  },
  {
    id: 21,
    category: "study",
    question: "올해 준비하고 있는 시험에 합격할 수 있을까요?",
    categoryName: "학업운",
  },
  {
    id: 22,
    category: "study",
    question: "나에게 맞는 공부 방법이나 전공은 무엇인가요?",
    categoryName: "학업운",
  },
  {
    id: 23,
    category: "study",
    question: "고시나 공무원 시험에 합격할 운이 있나요?",
    categoryName: "학업운",
  },
  {
    id: 49,
    category: "study",
    question: "집중력이 떨어질 때 사주적으로 도움이 되는 환경은?",
    categoryName: "학업운",
  },
  {
    id: 50,
    category: "study",
    question: "공부보다는 예술이나 기술 쪽에 더 큰 재능이 있나요?",
    categoryName: "학업운",
  },
  {
    id: 51,
    category: "study",
    question: "전문 자격증 취득이나 고시 합격 운이 따르는 해인가요?",
    categoryName: "학업운",
  },
  {
    id: 52,
    category: "study",
    question: "경쟁자가 많은 환경에서 살아남을 수 있는 나의 강점은?",
    categoryName: "학업운",
  },
  {
    id: 53,
    category: "study",
    question: "대학원 진학이나 유학 등 더 높은 학문에 운이 있나요?",
    categoryName: "학업운",
  },
  {
    id: 54,
    category: "study",
    question: "창의적인 아이디어로 상을 받거나 성과를 낼 기운이 있나요?",
    categoryName: "학업운",
  },
  {
    id: 24,
    category: "health",
    question: "타고난 건강 체질인가요, 주의해야 할 질병이 있나요?",
    categoryName: "건강운",
  },
  {
    id: 25,
    category: "health",
    question: "올해 사고수나 조심해야 할 달이 있나요?",
    categoryName: "건강운",
  },
  {
    id: 55,
    category: "health",
    question: "정신적인 스트레스나 번아웃을 특히 조심해야 하는 시기는?",
    categoryName: "건강운",
  },
  {
    id: 26,
    category: "general",
    question: "내 인생의 전성기(대운)는 언제 찾아오나요?",
    categoryName: "종합사주운",
  },
  {
    id: 27,
    category: "general",
    question: "사주에 부족한 오행을 채워주는 색상이나 숫자는 무엇인가요?",
    categoryName: "종합사주운",
  },
  {
    id: 28,
    category: "general",
    question: "이사를 가기에 좋은 방향과 시기가 언제인가요?",
    categoryName: "종합사주운",
  },
  {
    id: 29,
    category: "general",
    question: "올해 삼재나 아홉수를 잘 넘길 수 있는 방법이 있나요?",
    categoryName: "종합사주운",
  },
  {
    id: 30,
    category: "general",
    question: "전반적인 성격의 장단점과 개운법은 무엇인가요?",
    categoryName: "종합사주운",
  },
  {
    id: 56,
    category: "general",
    question: "이름을 바꾸는 것(개명)이 나의 운명을 바꿀 수 있을까요?",
    categoryName: "종합사주운",
  },
  {
    id: 57,
    category: "general",
    question: "먼 곳으로 이동하거나 거주지를 옮기면 운이 좋아질까요?",
    categoryName: "종합사주운",
  },
  {
    id: 58,
    category: "general",
    question: "나의 사주에 부족한 기운을 채워주는 음식이나 습관은?",
    categoryName: "종합사주운",
  },
  {
    id: 59,
    category: "general",
    question: "살면서 나에게 행운을 가져다주는 귀인은 어떤 사람인가요?",
    categoryName: "종합사주운",
  },
  {
    id: 60,
    category: "general",
    question: "남은 인생에서 가장 큰 고비를 현명하게 넘기는 방법은?",
    categoryName: "종합사주운",
  },
] as const;
