"use client";

import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ChatHeader from "@/src/app/(saju)/_components/layout/ChatHeader";
import ChatInput from "@/src/app/(saju)/_components/detail/ChatInput";
import SimpleBirthInfo from "@/src/app/(saju)/_components/birth/SimpleBirthInfo";
import RecommendSajuQuestions from "@/src/app/(saju)/_components/saju/RecommendSajuQuestions";
import { useUserStore } from "@/src/store/user.store";
import { usePendingChatStore } from "@/src/store/chat.store";
import { type SajuQuestion } from "@/src/app/(saju)/_constants/saju";
import type { ApiResponse } from "@/src/app/types/api";
import { useBirthInfoModalStore } from "@/src/store/modal.store";
import { type DailyFortune } from "@/src/app/types/fortune";

export default function ChatIndex({
  questions,
}: {
  questions: SajuQuestion[];
}) {
  const today = dayjs().format("YYYY-M-D");
  const router = useRouter();
  const queryClient = useQueryClient();
  const birthInfo = useUserStore((s) => s.birthInfo);
  const { setPending } = usePendingChatStore();
  const { openBirthInfoModal } = useBirthInfoModalStore();

  const [input, setInput] = useState<string>("");
  const [pendingAutoSubmitQuestion, setPendingAutoSubmitQuestion] = useState<
    string | null
  >(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!pendingAutoSubmitQuestion) return;
    if (input !== pendingAutoSubmitQuestion) return;

    formRef.current?.requestSubmit();

    setPendingAutoSubmitQuestion(null);
  }, [input, pendingAutoSubmitQuestion]);

  const handleConversationCreated = (convId: string) => {
    setPending();

    queryClient.invalidateQueries({ queryKey: ["conversations"] });
    router.push(`/chat/${convId}`);
  };

  const { data: todayFortuneData } = useQuery({
    queryKey: [
      "todayFortune",
      today,
      birthInfo?.gender,
      birthInfo?.calendarType,
      birthInfo?.birthDate,
      birthInfo?.birthTime,
    ],
    queryFn: async () => {
      const response = await fetch(`/api/fortune/today?date=${today}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = (await response.json()) as ApiResponse<DailyFortune>;

      if (!result.success) {
        return null;
      }

      return result.data;
    },
    enabled: !!birthInfo,
    staleTime: Infinity,
    retry: false,
  });

  return (
    <>
      <ChatHeader hideBorder>
        {birthInfo && (
          <SimpleBirthInfo initialBirthInfo={birthInfo} changeable />
        )}
      </ChatHeader>
      <div className="grid grid-rows-[1fr_auto] flex-1 min-h-0 pb-20 md:pb-0">
        <div className="min-h-0 overflow-y-auto relative">
          <div className="px-5 py-8 mx-auto max-w-full sm:max-w-xl">
            <div className="text-center space-y-3 fade-in">
              <div className="w-[88px] h-[88px] mx-auto flex items-center justify-center rounded-3xl bg-[linear-gradient(135deg,#6366f1_0%,#a78bfa_60%,#f0c060_100%)] border border-[rgba(124,92,252,0.25)] shadow-[0_0_20px_rgba(124,92,252,0.2)] text-[40px] animate-[orbFloat_4s_ease-in-out_infinite]">
                🔮
              </div>
              <div className="text-xs text-gold tracking-widest">
                New Consultation · 새 상담
              </div>
              <div className="text-3xl font-bold font-serif-kr">
                무엇이든 물어보세요
              </div>
              <div className="text-[13px] text-foreground-sub leading-relaxed">
                30년 경력의 AI 사주 전문가가
                <br />
                사주팔자를 바탕으로 깊이 있는 상담을 드립니다.
              </div>
            </div>
            {!!todayFortuneData?.advice && (
              <Link
                href={`/today/${dayjs().format("YYYYMMDD")}`}
                className="mt-9 w-full bg-[linear-gradient(135deg,rgba(245,240,255,0.95),rgba(232,224,255,0.95))] border border-[rgba(100,65,160,0.14)] rounded-[18px] px-[20px] py-[16px] flex items-center gap-[16px] mb-[28px] cursor-pointer transition-all duration-200 hover:border-[rgba(130,90,255,0.28)] hover:-translate-y-[2px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.25)] dark:bg-[linear-gradient(135deg,rgba(20,16,58,0.9),rgba(12,10,40,0.9))] dark:border-[rgba(130,90,255,0.15)] dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.25)]"
              >
                <div className="text-[26px] shrink-0">⭐</div>
                <div>
                  <div className="text-[9.5px] tracking-[0.18em] uppercase text-[var(--gold)] mb-1">
                    Today · 오늘의 운세
                  </div>
                  <div className="text-[12.5px] text-[var(--text2)] font-light leading-[1.55]">
                    {todayFortuneData?.advice}
                  </div>
                </div>
                <div className="ml-auto shrink-0 text-center">
                  <div className="font-display text-[30px] leading-none bg-[linear-gradient(135deg,#6d4fc2,#b8860b)] bg-clip-text text-transparent dark:bg-[linear-gradient(135deg,#a78bfa,#f0c060)]">
                    {todayFortuneData?.overall?.score}
                  </div>
                  <div className="text-[10px] text-foreground-muted">/ 100</div>
                </div>
              </Link>
            )}
            <RecommendSajuQuestions
              questions={questions}
              className="mt-3"
              onClick={(q) => {
                if (birthInfo) {
                  setPendingAutoSubmitQuestion(q.question);
                  setInput(q.question);
                } else {
                  openBirthInfoModal();
                }
              }}
            />
          </div>
        </div>
        <div>
          <ChatInput
            value={input}
            onSubmit={handleConversationCreated}
            formRef={formRef}
            initialBirthInfo={birthInfo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInput(e.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
}
