export const BirthCalendarLabels = {
  solar: "양력",
  lunar: "음력",
};

export const BirthGenderLabels = {
  male: "남성",
  female: "여성",
};

export const BirthTimeLabels = {
  unknown: "모름",
  ja: "자시",
  chuk: "축시",
  in: "인시",
  myo: "묘시",
  jin: "진시",
  sa: "사시",
  o: "오시",
  mi: "미시",
  sin: "신시",
  yu: "유시",
  sul: "술시",
  hae: "해시",
};

export interface BirthInfo {
  gender: "male" | "female";
  calendarType: "solar" | "lunar";
  birthDate: string;
  birthTime: string;
}

export interface FortuneCategory {
  score: number;
  summary: string;
  description: string;
}

export interface DailyFortune {
  overall: FortuneCategory;
  wealth: FortuneCategory;
  love: FortuneCategory;
  health: FortuneCategory;
  career: FortuneCategory;
  study: FortuneCategory;
  travel: FortuneCategory;
  luckyColor: string;
  luckyNumber: number;
  luckyItem: string;
  luckyTime: string;
  advice: string;
}

export const BIRTH_TIMES = [
  { value: "unknown", label: "모름", summary: "모름" },
  { value: "ja", label: "子(자) 23:30 ~ 01:29", summary: "자시" },
  { value: "chuk", label: "丑(축) 01:30 ~ 03:29", summary: "축시" },
  { value: "in", label: "寅(인) 03:30 ~ 05:29", summary: "인시" },
  { value: "myo", label: "卯(묘) 05:30 ~ 07:29", summary: "묘시" },
  { value: "jin", label: "辰(진) 07:30 ~ 09:29", summary: "진시" },
  { value: "sa", label: "巳(사) 09:30 ~ 11:29", summary: "사시" },
  { value: "o", label: "午(오) 11:30 ~ 13:29", summary: "오시" },
  { value: "mi", label: "未(미) 13:30 ~ 15:29", summary: "미시" },
  { value: "sin", label: "申(신) 15:30 ~ 17:29", summary: "신시" },
  { value: "yu", label: "酉(유) 17:30 ~ 19:29", summary: "유시" },
  { value: "sul", label: "戌(술) 19:30 ~ 21:29", summary: "술시" },
  { value: "hae", label: "亥(해) 21:30 ~ 23:29", summary: "해시" },
] as const;
