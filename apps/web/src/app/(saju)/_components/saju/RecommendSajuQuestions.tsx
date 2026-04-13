import React from "react";
import { SAJU_EMOJI, SajuQuestion } from "@/src/app/(saju)/_constants/saju";
import { cn } from "@repo/ui/lib/utils";
import styles from "./RecommendSajuQuestions.module.scss";

export default function RecommendSajuQuestions({
  questions = [],
  onClick,
  className = "",
}: {
  questions: SajuQuestion[];
  onClick: (q: SajuQuestion) => void;
  className?: string;
}) {
  return (
    <div>
      <div className="mt-8 text-xs text-foreground-sub fade-in">
        <span className="text-gold text-[10px] mr-2">✦</span>
        추천 상담 주제
      </div>
      <div className={cn("grid grid-cols-2 gap-3 fade-in", className)}>
        {questions.map((q) => (
          <button
            key={q.id}
            className={styles.button}
            onClick={() => onClick(q)}
          >
            <div className="text-lg">
              {SAJU_EMOJI[q.categoryName as keyof typeof SAJU_EMOJI]}
            </div>
            <div className="mt-2 text-sm text-foreground font-medium">
              {q.categoryName}
            </div>
            <div className="text-xs mt-1 text-foreground-sub">{q.question}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
