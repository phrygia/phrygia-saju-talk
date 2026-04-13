import { FORTUNE_COLOR_NAME_MAP } from "@/src/constants/fortune";
import { BirthTimeLabels, DailyFortune } from "@/src/app/types/fortune";

export function getLuckyColorValue(colorLabel?: string) {
  if (!colorLabel) return "transparent";

  const normalized = colorLabel.trim().replace(/\s+/g, "");

  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(normalized)) {
    return normalized;
  }

  if (FORTUNE_COLOR_NAME_MAP[normalized]) {
    return FORTUNE_COLOR_NAME_MAP[normalized];
  }

  const withoutSuffix = normalized.replace(/색$/, "");
  if (FORTUNE_COLOR_NAME_MAP[withoutSuffix]) {
    return FORTUNE_COLOR_NAME_MAP[withoutSuffix];
  }

  return null;
}

export const getBirthTimeLabel = (birthTime: string) => {
  return BirthTimeLabels[birthTime as keyof typeof BirthTimeLabels] ?? "모름";
};

export function getFortuneCategoryItems(fortune: DailyFortune) {
  return [
    {
      emoji: "💰",
      name: "재물운",
      score: fortune.wealth?.score ?? "-",
      color: "#fbbf24",
      grad: "from-[#f59e0b] to-[#fbbf24]",
      description: fortune.wealth?.description ?? "",
      summary: fortune.wealth?.summary ?? "",
    },
    {
      emoji: "💕",
      name: "연애운",
      score: fortune.love?.score ?? "-",
      color: "#f472b6",
      grad: "from-[#ec4899] to-[#f472b6]",
      description: fortune.love?.description ?? "",
      summary: fortune.love?.summary ?? "",
    },
    {
      emoji: "🌿",
      name: "건강운",
      score: fortune.health?.score ?? "-",
      color: "#34d399",
      grad: "from-[#10b981] to-[#34d399]",
      description: fortune.health?.description ?? "",
      summary: fortune.health?.summary ?? "",
    },
    {
      emoji: "💼",
      name: "직장운",
      score: fortune.career?.score ?? "-",
      color: "#60a5fa",
      grad: "from-[#3b82f6] to-[#60a5fa]",
      description: fortune.career?.description ?? "",
      summary: fortune.career?.summary ?? "",
    },
    {
      emoji: "📚",
      name: "학업운",
      score: fortune.study?.score ?? "-",
      color: "#a78bfa",
      grad: "from-[#8b5cf6] to-[#a78bfa]",
      description: fortune.study?.description ?? "",
      summary: fortune.study?.summary ?? "",
    },
    {
      emoji: "✈️",
      name: "여행운",
      score: fortune.travel?.score ?? "-",
      color: "#2dd4bf",
      grad: "from-[#14b8a6] to-[#2dd4bf]",
      description: fortune.travel?.description ?? "",
      summary: fortune.travel?.summary ?? "",
    },
  ];
}
