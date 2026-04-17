export interface GunghapCategory {
  score: number;
  label: string;
  description: string;
  strengths: string[];
  caution: string;
}

export interface GunghapResult {
  overallScore: number;
  overall: string;
  romance: GunghapCategory;
  marriage: GunghapCategory;
  personality: GunghapCategory;
  wealth: GunghapCategory;
  conversation: GunghapCategory;
  conflict: GunghapCategory;
  wellMatched: string[];
  longevityKeys: string[];
  advice: string;
}
export const GunghapCategoryLabels: Record<string, string> = {
  romance: "연애 궁합",
  marriage: "결혼 궁합",
  personality: "성격 궁합",
  wealth: "재물 궁합",
  conversation: "소통 궁합",
  conflict: "갈등 지수",
};

export const GunghapCategoryEmojis: Record<string, string> = {
  romance: "💕",
  marriage: "💍",
  personality: "🧬",
  wealth: "💰",
  conversation: "💬",
  conflict: "⚡",
};
