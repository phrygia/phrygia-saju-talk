"use client";

import styles from "./ManseryeokSkeleton.module.scss";

function SkeletonBox({ h, w = "100%" }: { h: number; w?: string }) {
  return <div className={styles.skeletonBox} style={{ height: h, width: w }} />;
}

export default function ManseryeokSkeleton() {
  return (
    <div className={styles.wrap}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between w-full">
        <div>
          <p className="text-gold text-[11px]">
            <span>✦</span> 만세력 · 사주팔자 분석
          </p>
          <h2 className="flex items-center mt-2.5 mb-2 font-serif-kr text-[28px] font-medium">
            <SkeletonBox h={28} w="50px" />
            님의 만세력
          </h2>
          <p className="text-foreground-sub text-xs">
            AI가 분석한 사주팔자와 운세 흐름입니다. 달에 한 번 생성되며 자동으로
            저장됩니다.
          </p>
        </div>
      </div>
      <div className={styles.section}>
        <div className="mt-[28px]">
          <SkeletonBox h={200} />
        </div>
      </div>
      <div className={styles.section}>
        <SkeletonBox h={16} w="120px" />
        <div className={styles.grid2}>
          <SkeletonBox h={180} />
          <SkeletonBox h={180} />
        </div>
        <div className={styles.mt8}>
          <SkeletonBox h={280} />
        </div>
      </div>

      <div className={styles.section}>
        <SkeletonBox h={16} w="100px" />
        <div className={styles.grid2}>
          <SkeletonBox h={180} />
          <SkeletonBox h={180} />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.mt8}>
            <SkeletonBox h={48} />
          </div>
        ))}
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className={styles.section}>
          <SkeletonBox h={16} w="80px" />
          <div className={styles.mt8}>
            <SkeletonBox h={200} />
          </div>
        </div>
      ))}
    </div>
  );
}
