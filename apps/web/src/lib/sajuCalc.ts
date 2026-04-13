import {
  CHEONGAN,
  JIJI,
  CHEONGAN_HANJA,
  JIJI_HANJA,
} from "@/src/constants/saju";

export type Ju = {
  cheongan: string;
  jiji: string;
  cheonganHanja: string;
  jijiHanja: string;
};

export type SajuWonGuk = {
  year: Ju;
  month: Ju;
  day: Ju;
  hour: Ju;
};

function getYearJu(year: number): Ju {
  const cg = (year - 4) % 10;
  const jj = (year - 4) % 12;

  return {
    cheongan: CHEONGAN[cg]!,
    jiji: JIJI[jj]!,
    cheonganHanja: CHEONGAN_HANJA[cg]!,
    jijiHanja: JIJI_HANJA[jj]!,
  };
}

function getMonthJu(year: number, month: number): Ju {
  const yearOffset = (year - 4) % 10;
  const baseMonth = [2, 4, 6, 8, 10, 0, 2, 4, 6, 8][yearOffset % 10] ?? 0;
  const cg = (baseMonth + month - 1) % 10;
  const jj = (month + 1) % 12;

  return {
    cheongan: CHEONGAN[cg]!,
    jiji: JIJI[jj]!,
    cheonganHanja: CHEONGAN_HANJA[cg]!,
    jijiHanja: JIJI_HANJA[jj]!,
  };
}

function getDayJu(year: number, month: number, day: number): Ju {
  const base = new Date(1900, 0, 1);
  const target = new Date(year, month - 1, day);
  const diff = Math.floor((target.getTime() - base.getTime()) / 86400000);
  const cg = ((diff % 10) + 10) % 10;
  const jj = ((diff % 12) + 10) % 12;

  return {
    cheongan: CHEONGAN[cg]!,
    jiji: JIJI[jj]!,
    cheonganHanja: CHEONGAN_HANJA[cg]!,
    jijiHanja: JIJI_HANJA[jj]!,
  };
}

const HOUR_JU_MAP: Record<string, number> = {
  ja: 0,
  chuk: 1,
  in: 2,
  myo: 3,
  jin: 4,
  sa: 5,
  o: 6,
  mi: 7,
  sin: 8,
  yu: 9,
  sul: 10,
  hae: 11,
  unknown: 0,
};

function getHourJu(dayCheongan: string, birthTime: string): Ju {
  const jj = HOUR_JU_MAP[birthTime] ?? 0;
  const cgBase: Record<string, number> = {
    갑: 0,
    을: 2,
    병: 4,
    정: 6,
    무: 8,
    기: 0,
    경: 2,
    신: 4,
    임: 6,
    계: 8,
  };
  const cg = ((cgBase[dayCheongan] ?? 0) + jj) % 10;

  return {
    cheongan: CHEONGAN[cg]!,
    jiji: JIJI[jj]!,
    cheonganHanja: CHEONGAN_HANJA[cg]!,
    jijiHanja: JIJI_HANJA[jj]!,
  };
}

export function calcSajuWonGuk(
  birthDate: string,
  birthTime: string,
): SajuWonGuk {
  const [y, m, d] = birthDate.split("-").map(Number) as [
    number,
    number,
    number,
  ];
  const yearJu = getYearJu(y);
  const monthJu = getMonthJu(y, m);
  const dayJu = getDayJu(y, m, d);
  const hourJu = getHourJu(dayJu.cheongan, birthTime);

  return { year: yearJu, month: monthJu, day: dayJu, hour: hourJu };
}

export function calcSajuWonGukPrompt(birthDate: string, birthTime: string) {
  const wonGuk = calcSajuWonGuk(birthDate, birthTime);

  return `[사주 원국]
      - 년주: ${wonGuk.year.cheonganHanja}(${wonGuk.year.cheongan}) ${wonGuk.year.jijiHanja}(${wonGuk.year.jiji})
      - 월주: ${wonGuk.month.cheonganHanja}(${wonGuk.month.cheongan}) ${wonGuk.month.jijiHanja}(${wonGuk.month.jiji})
      - 일주: ${wonGuk.day.cheonganHanja}(${wonGuk.day.cheongan}) ${wonGuk.day.jijiHanja}(${wonGuk.day.jiji})
      - 시주: ${wonGuk.hour.cheonganHanja}(${wonGuk.hour.cheongan}) ${wonGuk.hour.jijiHanja}(${wonGuk.hour.jiji})`;
}
