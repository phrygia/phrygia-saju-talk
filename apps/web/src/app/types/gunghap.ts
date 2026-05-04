export const gunghapTableName = "gunghap_results";

export interface GunghapCategory {
  score: number;
  label: string;
  description: string;
  strengths: string[];
  caution: string;
}

export interface GunghapPersonInfo {
  ilgan: string;
  ilgan_label: string;
  dominant_element: string;
  dominant_element_label: string;
  wonkuk: string[];
}

export interface GunghapCategories {
  love: number;
  communication: number;
  trust: number;
  emotion: number;
  growth: number;
  future: number;
}

export interface GunghapResult {
  me: GunghapPersonInfo;
  partner: GunghapPersonInfo;
  overallScore: number;
  overall: string;
  grade: string;
  categories: GunghapCategories;
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
  romance: "사랑 · Love",
  marriage: "결혼 · Marriage",
  personality: "성격 · Personality",
  wealth: "재물 · Wealth",
  conversation: "소통 · Communication",
  conflict: "갈등 지수 · Conflict",
};

export const GunghapCategoryEmojis: Record<string, string> = {
  romance: "💕",
  marriage: "💍",
  personality: "🧬",
  wealth: "💰",
  conversation: "💬",
  conflict: "⚡",
};
