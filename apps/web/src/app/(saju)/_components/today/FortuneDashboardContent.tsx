"use client";

import { useRef, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useSuspenseQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  BirthCalendarLabels,
  BirthGenderLabels,
  type BirthInfo,
  type DailyFortune,
  type FortuneCategory,
} from "@/src/app/types/fortune";
import { getBirthTimeLabel, getFortuneCategoryItems } from "@/src/lib/fortune";
import type { ApiResponse } from "@/src/app/types/api";
import ChatHeader from "@/src/app/(saju)/_components/layout/ChatHeader";
import { cn } from "@repo/ui/lib/utils";
import FortuneShareCard from "@/src/app/(saju)/_components/today/FortuneShareCard";
import { Modal } from "@repo/ui/components/modal";
import { Button } from "@repo/ui/components/button";
import { getLuckyColorValue } from "@/src/lib/fortune";
import { StarBurstButton } from "@repo/ui/components/star-burst-button";
import styles from "./FortuneDashboardContent.module.scss";

const DEFAULT_CATEGORY: FortuneCategory = {
  score: 0,
  summary: "데이터 준비 중",
  description: "운세 세부 정보를 불러오는 중입니다.",
};

function getSafeCategory(
  fortune: DailyFortune,
  key: keyof Pick<
    DailyFortune,
    "overall" | "wealth" | "love" | "health" | "career" | "study" | "travel"
  >,
): FortuneCategory {
  const category = fortune[key];
  if (
    category &&
    typeof category === "object" &&
    typeof (category as Partial<FortuneCategory>).score === "number" &&
    typeof (category as Partial<FortuneCategory>).summary === "string" &&
    typeof (category as Partial<FortuneCategory>).description === "string"
  ) {
    return category as FortuneCategory;
  }
  return DEFAULT_CATEGORY;
}

export default function FortuneDashboardContent({
  birthInfo,
  date,
}: {
  birthInfo: BirthInfo;
  date: string;
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const { data: fortune } = useSuspenseQuery<DailyFortune>({
    queryKey: [
      "todayFortune",
      dayjs(date).format("YYYY-M-D"),
      birthInfo.gender,
      birthInfo.calendarType,
      birthInfo.birthDate,
      birthInfo.birthTime,
    ],
    queryFn: async () => {
      const response = await fetch("/api/fortune/today", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, birthInfo }),
      });
      const result = (await response.json()) as ApiResponse<DailyFortune>;
      if (!result.success) {
        throw new Error(
          !result.message ? "운세를 불러오는데 실패했습니다." : result.message,
        );
      }
      return result.data;
    },
    staleTime: Infinity,
    retry: 2,
    retryDelay: 1000,
  });

  const handleCapture = async (): Promise<void> => {
    const target = captureRef.current;
    if (!target) {
      toast.error("잠시후 다시 시도해주세요.");
      return;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 80));
      if ("fonts" in document) {
        await document.fonts.ready;
      }
      const targetBackground = window.getComputedStyle(target).backgroundColor;
      const bodyBackground = window.getComputedStyle(
        document.body,
      ).backgroundColor;
      const { toJpeg } = await import("html-to-image");
      const imgData = await toJpeg(target, {
        quality: 0.95,
        cacheBust: true,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        backgroundColor:
          targetBackground && targetBackground !== "rgba(0, 0, 0, 0)"
            ? targetBackground
            : bodyBackground || "#ffffff",
        skipFonts: false,
        style: {
          transform: "none",
        },
      });
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `SAJU TALK - ${dayjs().format("YYYY-MM-DD")} 오늘의 운세.jpg`;
      link.click();
    } catch (error) {
      toast.error("스크린샷을 저장하는 데 실패했습니다. 다시 시도해주세요.");
    }
  };

  const overallFortune = getSafeCategory(fortune, "overall");
  const overallScore = Math.max(0, Math.min(100, overallFortune.score));
  const ringRadius = 54;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - overallScore / 100);

  return (
    <>
      <ChatHeader title="오늘의 운세">
        {dayjs(date).format("YYYY년 M월 D일 dddd")}
      </ChatHeader>
      <div className={styles.wrapper}>
        <div className="flex justify-between">
          <div>
            <p className="text-gold text-[11px]">
              <span>✦</span> Daily Fortune · 오늘의 운세
            </p>
            <h2 className="font-serif-kr font-medium text-[28px] mt-2.5 mb-2">
              오늘의 전체운
            </h2>
            {birthInfo && (
              <p className="text-foreground-sub text-xs">
                {BirthGenderLabels[birthInfo.gender]}{" "}
                {dayjs(birthInfo.birthDate).format("YYYY.M.D")}{" "}
                {BirthCalendarLabels[birthInfo.calendarType]}{" "}
                {getBirthTimeLabel(birthInfo.birthTime)}
              </p>
            )}
          </div>
          <StarBurstButton
            variant="default"
            size="sm"
            style={{ borderRadius: 20 }}
            onClick={() => setModalOpen(true)}
          >
            ⬇ 운세 카드 보기
          </StarBurstButton>
        </div>
        <div className={styles.totalSaju}>
          <div className="relative flex justify-center">
            <svg width="130" height="130" viewBox="0 0 130 130">
              <defs>
                <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="50%" stopColor="#7c5cfc" />
                  <stop offset="100%" stopColor="#f0c060" />
                </linearGradient>
              </defs>
              <circle
                cx="65"
                cy="65"
                r="54"
                fill="none"
                stroke="rgba(255,255,255,.05)"
                strokeWidth="8"
              />
              <circle
                id="main-ring"
                cx="65"
                cy="65"
                r="54"
                fill="none"
                stroke="url(#rg)"
                strokeWidth="8"
                strokeLinecap="round"
                className={styles.progress}
                transform="rotate(-90 65 65)"
                style={{
                  strokeDasharray: ringCircumference,
                  strokeDashoffset: ringOffset,
                }}
              />
            </svg>
            <div className={styles.score}>
              <div className={styles.number}>{overallScore}</div>
              <div className={styles.denom}>/ 100</div>
              <div className={styles.label}>전체운</div>
            </div>
          </div>
          <div>
            <div className={styles.tag}>✦ 오늘의 기운</div>
            <p className="text-foreground-sub text-sm leading-[1.7]">
              {fortune.overall.description}
            </p>
          </div>
        </div>
        <div className="grid gap-[14px] grid-cols-1 md:grid-cols-2">
          {getFortuneCategoryItems(fortune).map((category) => (
            <div key={category.name} className={styles.categoryCard}>
              <div className="flex justify-between items-center">
                <div className={styles.emoji}>{category.emoji}</div>
                <p
                  style={{ color: category.color }}
                  className="text-xl font-semibold"
                >
                  {category.score}
                </p>
              </div>
              <p className="text-foreground-sub text-[12.5px] font-medium mt-2.5 mb-3">
                {category.name}
              </p>
              <div className="h-[3px] bg-[rgba(0,0,0,0.05)] dark:bg-white/10 rounded overflow-hidden">
                <div
                  className={`h-full rounded bg-gradient-to-r ${category.grad}`}
                  style={{ width: `${category.score}%` }}
                />
              </div>
              <p className="text-xs mt-2 text-foreground-sub leading-5">
                {category.description}
              </p>
            </div>
          ))}
        </div>
        <div className="grid mt-[14px] gap-[14px] mb-[24px] grid-cols-2 md:grid-cols-4">
          {[
            { name: "럭키 컬러", value: fortune.luckyColor || "-" },
            { name: "럭키 넘버", value: fortune.luckyNumber || "-" },
            { name: "럭키 아이템", value: fortune.luckyItem || "-" },
            { name: "럭키 타임", value: fortune.luckyTime || "-" },
          ].map((lucky) => {
            const luckyColorValue =
              lucky.name === "럭키 컬러"
                ? getLuckyColorValue(String(lucky.value))
                : null;
            return (
              <div key={lucky.name} className={styles.categoryCard}>
                <p className="text-foreground-sub text-xs mb-2">{lucky.name}</p>
                <div>
                  {luckyColorValue ? (
                    <div className="flex items-center gap-[7px] text-xs text-white">
                      <span
                        className="w-[14px] h-[14px] rounded-full shadow-[0_0_8px_currentColor]"
                        style={{
                          color: luckyColorValue,
                          background: luckyColorValue,
                        }}
                      />
                      <span style={{ color: luckyColorValue }}>
                        {lucky.value}
                      </span>
                    </div>
                  ) : (
                    <p
                      className={cn(
                        "text-[12.5px]",
                        lucky.name === "럭키 넘버" &&
                          "text-lg font-semibold text-gold -mt-1",
                      )}
                    >
                      {lucky.value}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.advice}>
          <h3 className={styles.tag}>✦ 오늘의 조언</h3>
          <p className="text-foreground-sub text-sm leading-[1.7]">
            {fortune.advice}
          </p>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        contentClassName="max-w-md dark:border dark:border-muted-foreground/20 px-2.5 md:px-5"
        title={
          <div className="flex items-center">
            오늘의 운세 카드
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={handleCapture}
              className="ml-2 mt-0.5 !text-xs"
            >
              다운로드
            </Button>
          </div>
        }
      >
        <FortuneShareCard
          ref={captureRef}
          data={fortune}
          birthInfo={birthInfo}
        />
      </Modal>
    </>
  );
}
