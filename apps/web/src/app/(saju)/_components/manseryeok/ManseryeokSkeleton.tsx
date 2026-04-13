"use client";

import styles from "./ManseryeokSkeleton.module.scss";

function SkeletonBox({ h, w = "100%" }: { h: number; w?: string }) {
  return <div className={styles.skeletonBox} style={{ height: h, width: w }} />;
}

export default function ManseryeokSkeleton() {
  return (
    <div className={styles.wrap}>
      <div className={styles.pageHeader}>
        <SkeletonBox h={12} w="120px" />
        <SkeletonBox h={28} w="200px" />
        <SkeletonBox h={12} w="300px" />
      </div>

      <div className={styles.section}>
        <SkeletonBox h={16} w="80px" />
        <div className={styles.mt8}>
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
