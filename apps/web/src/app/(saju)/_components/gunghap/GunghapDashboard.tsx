"use client";

import { Suspense, useMemo } from "react";
import dayjs from "dayjs";
// import { ErrorBoundary } from "react-error-boundary";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useUserStore } from "@/src/store/user.store";
import ChatHeader from "@/src/app/(saju)/_components/layout/ChatHeader";
import BirthInfoForm from "@/src/app/(saju)/_components/birth/BirthInfoForm";
import GunghapDashboardContent from "@/src/app/(saju)/_components/gunghap/GunghapDashboardContent";
import { type BirthInfo, type DailyFortune } from "@/src/app/types/fortune";
import {
  type GunghapResult,
  GunghapCategoryLabels,
  GunghapCategoryEmojis,
} from "@/src/app/types/gunghap";

const today = dayjs().format("YYYY-MM-DD");

function getMsUntilMidnight() {
  return dayjs().endOf("day").diff(dayjs());
}

export default function GunghapDashboard({
  myInfo,
  partnerInfo,
}: {
  myInfo: BirthInfo;
  partnerInfo: BirthInfo;
}) {
  // const supabase = useMemo(() => createClient(), []);

  const { data: gunghap } = useSuspenseQuery<GunghapResult>({
    queryKey: [
      "gunghap",
      {
        myBirthDate: myInfo.birthDate,
        myBirthTime: myInfo.birthTime,
        myGender: myInfo.gender,
        myCalendar: myInfo.calendarType,
        partnerBirthDate: partnerInfo.birthDate,
        partnerBirthTime: partnerInfo.birthTime,
        partnerGender: partnerInfo.gender,
        partnerCalendar: partnerInfo.calendarType,
      },
      today,
    ],
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

  return (
    <div>
      <div className="gq-persons-bar fade-in">
        <div className="gq-person-pill">
          <div className="gq-pill-hanzi oh-water">壬</div>
          <div>
            <div className="gq-pill-name">나 · 임수(壬水)</div>
            <div className="gq-pill-info">남 · 1989.08.17 · 술시 · 양력</div>
          </div>
        </div>
        <div className="gq-compat-symbol">💑</div>
        <div className="gq-person-pill partner">
          <div className="text-align:right">
            <div className="gq-pill-name" id="gq-partner-display">
              김지현 · 정화(丁火)
            </div>
            <div className="gq-pill-info">여 · 1992.03.24 · 묘시 · 양력</div>
          </div>
          <div className="gq-pill-hanzi fire-pill oh-fire">丁</div>
        </div>
      </div>
      <div className="gq-main-score fade-in">
        <div className="gq-score-ring-wrap">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <defs>
              <linearGradient id="gq-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#a78bfa" />
                <stop offset="45%" stop-color="#f472b6" />
                <stop offset="100%" stop-color="#f0c060" />
              </linearGradient>
            </defs>
            <circle
              cx="80"
              cy="80"
              r="68"
              fill="none"
              stroke="rgba(255,255,255,.04)"
              stroke-width="10"
            />
            <circle
              cx="80"
              cy="80"
              r="68"
              fill="none"
              stroke="url(#gq-grad)"
              stroke-width="10"
              stroke-linecap="round"
              id="gq-ring"
              className="gq-ring-prog"
            />
          </svg>
          <div className="gq-score-inner">
            <div className="gq-score-num">{gunghap.overallScore}</div>
            <div className="gq-score-denom">/ 100</div>
            <div className="gq-score-verdict">좋은 인연</div>
          </div>
        </div>
        <div>
          <div className="gq-score-tag">✦ 두 사람의 기운</div>
          <div className="gq-score-text">
            수(水)와 화(火)가 만나 서로의 부족함을 채워주는 관계입니다.
            <br />
            처음에는 성격 차이를 느낄 수 있지만, 시간이 지날수록 서로를 더욱
            빛나게 만드는 보완 관계로 발전합니다. 임수의 깊은 지혜가 정화의
            열정을 다스리고, 정화의 따뜻함이 임수의 차가움을 녹입니다.
          </div>
        </div>
      </div>
      {gunghap.overall}
      <br />
      <br />
      <br />
      <div className="grid grid-cols-3 gap-5">
        {(
          [
            "romance",
            "marriage",
            "personality",
            "wealth",
            "conversation",
            "conflict",
          ] as const
        ).map((category) => (
          <div key={category}>
            <b>{GunghapCategoryLabels[category]}</b>
            <p>{GunghapCategoryEmojis[category]}</p>
            {gunghap[category].caution}
            {gunghap[category].score}
          </div>
        ))}
      </div>
      <br />
      {gunghap.wellMatched.map((reason, index) => (
        <div key={index} className="mb-5">
          {reason}
        </div>
      ))}
      <br />
      {gunghap.longevityKeys.map((reason, index) => (
        <div key={index} className="mb-5">
          {reason}
        </div>
      ))}
      <br />
      <p>{gunghap.advice}</p>
      <br />
      <br />
      <br />
    </div>
  );
}
