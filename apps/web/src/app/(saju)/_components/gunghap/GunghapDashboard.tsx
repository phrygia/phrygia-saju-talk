"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { type BirthInfo } from "@/src/app/types/fortune";
import { type GunghapResult } from "@/src/app/types/gunghap";
import { clamp, cn } from "@repo/ui/lib/utils";
import { useToggleSet } from "@/src/hooks/useDropdown";
import { GUNGHAP_CATEGORIES } from "@/src/app/(saju)/_constants/gunghap";
import ScoreRing from "@/src/app/(saju)/_components/gunghap/ScoreRing";
import PersonCard from "@/src/app/(saju)/_components/gunghap/PersonCard";
import CategoryCard from "@/src/app/(saju)/_components/gunghap/CategoryCard";
import styles from "./GunghapDashboard.module.scss";

const today = dayjs().format("YYYY-MM-DD");

interface GunghapDashboardProps {
  myInfo: BirthInfo;
  partnerInfo: BirthInfo;
  onReset: () => void;
}

export default function GunghapDashboard({
  myInfo,
  partnerInfo,
  onReset,
}: GunghapDashboardProps) {
  const { has, toggle } = useToggleSet<(typeof GUNGHAP_CATEGORIES)[number]>();

  const { data: gunghap } = useSuspenseQuery<GunghapResult>({
    queryKey: ["gunghap", { myInfo, partnerInfo, today }],
    queryFn: async () => {
      const response = await fetch("/api/gunghap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ myInfo, partnerInfo, today }),
      });

      const result = (await response.json()) as any;

      if (!result.success) {
        throw new Error(result.message ?? "궁합을 불러오는데 실패했습니다.");
      }

      return result.data;
    },
    staleTime: Infinity,
    retry: 1,
    retryDelay: 1000,
  });

  const overallScore = clamp(gunghap.overallScore, 0, 100);

  return (
    <div className={styles.root}>
      <div className="mb-[28px] flex justify-between">
        <div>
          <p className="text-rose text-[11px]">
            <span>♡</span> COUPLE SAJU · 커플 궁합
          </p>
          <h2 className="font-serif-kr font-medium text-[28px] mt-2.5 mb-2">
            사주 궁합 결과
          </h2>
          <p className="text-foreground-sub text-xs">
            {myInfo?.name || "나"} · {partnerInfo?.name || "상대방"}의 사주 궁합
          </p>
        </div>
        <button className={styles.resetButton} onClick={onReset}>
          <span>↩</span> 다시 입력
        </button>
      </div>

      <div className={cn(styles.hero, "fade-in")}>
        <PersonCard side="me" info={myInfo} saju={gunghap.me} />
        <ScoreRing score={overallScore} grade={gunghap.grade} />
        <PersonCard side="partner" info={partnerInfo} saju={gunghap.partner} />
      </div>

      {gunghap?.overall && (
        <div className={cn(styles.analysis, "fade-in")}>
          <div className={styles.analysisTag}>✦ 종합 분석</div>
          <p>{gunghap.overall}</p>
        </div>
      )}

      <div className={styles.categoryGrid}>
        {GUNGHAP_CATEGORIES.map((category) => (
          <CategoryCard
            key={category}
            category={category}
            data={gunghap[category]}
            isOpen={has(category)}
            onToggle={() => toggle(category)}
          />
        ))}
      </div>

      <div className={styles.elementSection}>
        <div className={styles.title}>
          <span>◈</span> 잘 맞는 이유
        </div>
        {gunghap.wellMatched.map((reason, index) => (
          <div key={index} className={styles.row}>
            {reason}
          </div>
        ))}
      </div>

      <div className={styles.elementSection}>
        <div className={styles.title}>
          <span>◈</span> 오래가기 위한 핵심 조건
        </div>
        {gunghap.longevityKeys.map((reason, index) => (
          <div key={index} className={styles.row}>
            {reason}
          </div>
        ))}
      </div>

      {gunghap?.advice && (
        <div className={cn(styles.analysis, "fade-in")}>
          <div className="text-rose text-base mb-1.5">♡</div>
          <p>{gunghap.advice}</p>
        </div>
      )}
    </div>
  );
}
