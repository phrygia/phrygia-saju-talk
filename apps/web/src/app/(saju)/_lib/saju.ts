import { SajuQuestion, SAJU_QUESTIONS } from "@/src/app/(saju)/_constants/saju";

export function getRandomSajuQuestions(): SajuQuestion[] {
  return [...Array.from(new Set(SAJU_QUESTIONS.map((q) => q.category)))]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
    .map((category) => {
      const categoryQuestions = SAJU_QUESTIONS.filter(
        (q) => q.category === category,
      );
      return categoryQuestions[
        Math.floor(Math.random() * categoryQuestions.length)
      ];
    }) as SajuQuestion[];
}
