import { JIJI_HANJA_TO_HANGUL } from "@/src/app/(saju)/_constants/manseryeok";

export function gongmangToHangul(hanja: string): string {
  return hanja
    .split("")
    .map((ch) => JIJI_HANJA_TO_HANGUL[ch] ?? ch)
    .join("·");
}
