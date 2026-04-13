"use client";

import dayjs from "dayjs";
import ChatHeader from "@/src/app/(saju)/_components/layout/ChatHeader";
import { Skeleton } from "@repo/ui/components/skeleton";
import { Spinner } from "@repo/ui/components/spinner";
import { cn } from "@repo/ui/lib/utils";
import styles from "./FortuneDashboardContent.module.scss";

export default function FortuneDashboardSkeleton({ date }: { date?: string }) {
  return (
    <>
      <ChatHeader title="오늘의 운세">
        {date ? dayjs(date).format("YYYY년 M월 D일 dddd") : "운세 분석 중"}
      </ChatHeader>
      <div className={styles.wrapper}>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-gold text-[11px]">
              <span>✦</span> Daily Fortune · 오늘의 운세
            </p>
            <h2 className="mt-2.5 mb-2 font-serif-kr text-[28px] font-medium">
              오늘의 전체운
            </h2>
            <Skeleton className="h-4 w-[180px]" />
          </div>
          <div className={cn(styles.card, "pointer-events-none opacity-70")}>
            <Spinner className="h-3.5 w-3.5" />
            운세 카드 준비 중
          </div>
        </div>
        <div className={styles.totalSaju}>
          <div className="relative flex justify-center">
            <div className="relative flex h-[130px] w-[130px] items-center justify-center rounded-full border border-white/10">
              <div className="absolute inset-[10px] rounded-full border border-[rgba(124,92,252,0.18)]" />
              <Spinner className="h-6 w-6" />
            </div>
          </div>
          <div>
            <div className={styles.tag}>✦ 오늘의 기운</div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[92%]" />
              <Skeleton className="h-4 w-[78%]" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.categoryCard}>
              <div className="flex items-center justify-between">
                <Skeleton className="h-[34px] w-[34px] rounded-[10px]" />
                <Skeleton className="h-7 w-10" />
              </div>
              <Skeleton className="mt-2.5 mb-3 h-4 w-[88px]" />
              <Skeleton className="h-[3px] w-full" />
              <div className="mt-2 space-y-2">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-[85%]" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[14px] mb-[24px] grid grid-cols-2 gap-[14px] md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.categoryCard}>
              <Skeleton className="mb-2 h-3 w-[72px]" />
              <Skeleton className="h-5 w-[80%]" />
            </div>
          ))}
        </div>
        <div className={styles.advice}>
          <h3 className={styles.tag}>✦ 오늘의 조언</h3>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[94%]" />
            <Skeleton className="h-4 w-[76%]" />
          </div>
        </div>
      </div>
    </>
  );
}
