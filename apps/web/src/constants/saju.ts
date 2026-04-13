export const CHEONGAN = [
  "갑",
  "을",
  "병",
  "정",
  "무",
  "기",
  "경",
  "신",
  "임",
  "계",
] as const;

export const JIJI = [
  "자",
  "축",
  "인",
  "묘",
  "진",
  "사",
  "오",
  "미",
  "신",
  "유",
  "술",
  "해",
] as const;

export const CHEONGAN_HANJA = [
  "甲",
  "乙",
  "丙",
  "丁",
  "戊",
  "己",
  "庚",
  "辛",
  "壬",
  "癸",
];

export const JIJI_HANJA = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
];

export const OHAENG: Record<
  string,
  {
    name: string;
    color: string;
  }
> = {
  갑: { name: "목(木)", color: "#22c55e" },
  을: { name: "목(木)", color: "#22c55e" },
  병: { name: "화(火)", color: "#ef4444" },
  정: { name: "화(火)", color: "#ef4444" },
  무: { name: "토(土)", color: "#eab308" },
  기: { name: "토(土)", color: "#eab308" },
  경: { name: "금(金)", color: "#94a3b8" },
  신: { name: "금(金)", color: "#94a3b8" },
  임: { name: "수(水)", color: "#3b82f6" },
  계: { name: "수(水)", color: "#3b82f6" },
};
