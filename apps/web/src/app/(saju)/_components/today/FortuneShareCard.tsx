"use client";

import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
import {
  BirthCalendarLabels,
  BirthGenderLabels,
  type BirthInfo,
  type DailyFortune,
} from "@/src/app/types/fortune";
import Logo from "@/src/components/common/Logo";
import { getLuckyColorValue } from "@/src/lib/fortune";
import { cn } from "@repo/ui/lib/utils";
import { getBirthTimeLabel } from "@/src/lib/fortune";
import styles from "./FortuneShareCard.module.scss";

const radius = 40;
const circumference = 2 * Math.PI * radius;

export default function FortuneShareCard({
  data,
  birthInfo,
  ref = null,
}: {
  data: DailyFortune;
  birthInfo: BirthInfo;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const luckyColorValue = getLuckyColorValue(data?.luckyColor);

  return (
    <div
      className={cn(
        "relative w-full m-w-[400px] rounded-[24px] px-6 pt-9 pb-7 overflow-hidden border border-[rgba(180,140,255,0.15)]",
        styles.root,
      )}
      ref={ref}
    >
      <div
        className="pointer-events-none absolute -top-[80px] -right-[80px] w-[300px] h-[300px] 
      bg-[radial-gradient(circle,rgba(130,80,255,0.12)_0%,transparent_70%)]"
      />
      <div
        className="pointer-events-none absolute -bottom-[60px] -left-[60px] w-[250px] h-[250px] 
      bg-[radial-gradient(circle,rgba(60,120,255,0.1)_0%,transparent_70%)]"
      />
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div
          className="px-[14px] py-[5px] text-[11px] rounded-[20px] border 
        bg-[rgba(130,80,255,0.2)] border-[rgba(150,100,255,0.35)]
        text-[rgba(200,170,255,0.9)] tracking-[0.05em] font-light"
        >
          {dayjs().format("YYYY년 M월 D일 dddd")}
        </div>
        <div className="text-[22px] opacity-85">🌙</div>
      </div>
      <div className="text-center mb-5 relative z-10">
        <div className="flex justify-center items-center gap-[10px] text-[11.5px] text-[rgba(170,150,210,0.75)]">
          {birthInfo.gender && (
            <span>{BirthGenderLabels[birthInfo.gender]}</span>
          )}
          {birthInfo.birthDate && (
            <>
              <span className="w-[3px] h-[3px] bg-[rgba(150,120,200,0.5)] rounded-full" />
              <span>{dayjs(birthInfo.birthDate).format("YYYY.M.D")}</span>
            </>
          )}
          {birthInfo.calendarType && (
            <>
              <span className="w-[3px] h-[3px] bg-[rgba(150,120,200,0.5)] rounded-full" />
              <span>
                {BirthCalendarLabels[birthInfo.calendarType]}·{" "}
                {getBirthTimeLabel(birthInfo.birthTime)}
              </span>
            </>
          )}
        </div>
      </div>
      <div
        className="h-[1px] mb-5 relative z-10 
      bg-[linear-gradient(90deg,transparent,rgba(160,120,255,0.3),transparent)]"
      />
      <div className="flex flex-col items-center mb-6 relative z-10">
        <div className="text-[11px] text-secondary tracking-[0.15em] mb-2.5">
          오늘의 전체운
        </div>
        <div className="relative w-[100px] h-[100px]">
          <svg className="rotate-[-90deg]" width="100" height="100">
            <defs>
              <linearGradient
                id="ringGradShare"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="url(#ringGradShare)"
              strokeWidth="6"
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset:
                  circumference * (1 - (data?.overall?.score ?? 0) / 100),
              }}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-[28px] font-bold text-white">
              {data?.overall?.score ?? 0}
            </div>
            <div className="text-[10px] text-[rgba(180,150,255,0.6)]">
              / 100
            </div>
          </div>
        </div>
        {data?.overall?.description && (
          <div className="mt-2.5 text-xs text-[rgba(210,190,255,0.8)] text-center leading-[1.6] break-keep">
            {data.overall.description}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-[10px] mb-5 relative z-10">
        {[
          {
            name: "💰 재물운",
            score: data.wealth?.score ?? 0,
            color: "#fbbf24",
            grad: "from-[#f59e0b] to-[#fbbf24]",
          },
          {
            name: "💕 연애운",
            score: data.love?.score ?? 0,
            color: "#f472b6",
            grad: "from-[#ec4899] to-[#f472b6]",
          },
          {
            name: "🌿 건강운",
            score: data.health?.score ?? 0,
            color: "#34d399",
            grad: "from-[#10b981] to-[#34d399]",
          },
          {
            name: "💼 직장운",
            score: data.career?.score ?? 0,
            color: "#60a5fa",
            grad: "from-[#3b82f6] to-[#60a5fa]",
          },
          {
            name: "📚 학업운",
            score: data.study?.score ?? 0,
            color: "#a78bfa",
            grad: "from-[#8b5cf6] to-[#a78bfa]",
          },
          {
            name: "✈️ 여행운",
            score: data.travel?.score ?? 0,
            color: "#2dd4bf",
            grad: "from-[#14b8a6] to-[#2dd4bf]",
          },
        ].map((item) => (
          <div
            key={item.name}
            className="bg-white/5 border border-white/10 rounded-xl p-[11px_14px]"
          >
            <div className="flex justify-between mb-2">
              <span className="text-[10px] text-secondary whitespace-nowrap">
                {item.name}
              </span>
              <span
                className="text-[13px] font-semibold -mt-[2px] shrink-0"
                style={{ color: item.color }}
              >
                {item.score}
              </span>
            </div>
            <div className="h-[3px] bg-white/10 rounded overflow-hidden">
              <div
                className={`h-full rounded bg-gradient-to-r ${item.grad}`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-[10px] mb-5 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-xl p-[12px_14px]">
          <div className="text-[10px] text-secondary tracking-[0.1em] mb-1">
            럭키 컬러
          </div>
          <div className="flex items-center gap-[7px] text-xs text-white">
            {luckyColorValue && (
              <span
                className="w-[14px] h-[14px] rounded-full shadow-[0_0_8px_currentColor]"
                style={{
                  color: luckyColorValue,
                  background: luckyColorValue,
                }}
              />
            )}
            <span style={{ color: luckyColorValue ?? "#ffffff" }}>
              {data?.luckyColor || "-"}
            </span>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-[12px_14px]">
          <div className="text-[10px] text-secondary racking-[0.1em] mb-1">
            럭키 넘버
          </div>
          <div className="text-white text-xs">{data?.luckyNumber ?? "-"}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-[12px_14px]">
          <div className="text-[10px] text-secondary tracking-[0.1em] mb-1">
            럭키 아이템
          </div>
          <div className="text-white text-xs">{data?.luckyItem || "-"}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-[12px_14px]">
          <div className="text-[10px] text-secondary tracking-[0.1em] mb-1">
            럭키 타임
          </div>
          <div className="text-white text-xs">{data?.luckyTime || "-"}</div>
        </div>
      </div>
      <div
        className="bg-[linear-gradient(135deg,rgba(110,60,200,0.15),rgba(50,80,200,0.1))]
      border border-[rgba(140,100,255,0.2)] rounded-xl p-[14px_16px] mb-5 relative z-10"
      >
        <div className="text-base mb-1.5 text-secondary">✦</div>
        <div className="text-xs text-[rgba(210,190,255,0.8)] leading-[1.7]">
          {data?.advice || "오늘의 조언을 준비 중입니다."}
        </div>
      </div>
      <div className="flex justify-center items-center gap-[7px] opacity-50 relative z-10">
        <div className="w-[40px] h-[1px] bg-[rgba(180,150,255,0.3)]" />
        <div className="text-[11px] tracking-[0.2em] text-[rgba(180,150,255,0.9)]">
          <Logo fill="#ffffff" className="scale-80" />
        </div>
        <div className="w-[40px] h-[1px] bg-[rgba(180,150,255,0.3)]" />
      </div>
    </div>
  );
}
