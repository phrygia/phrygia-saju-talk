"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import ChatHeader from "@/src/app/(saju)/_components/layout/ChatHeader";
import ChatInput from "@/src/app/(saju)/_components/detail/ChatInput";
import SimpleBirthInfo from "@/src/app/(saju)/_components/birth/SimpleBirthInfo";
import RecommendSajuQuestions from "@/src/app/(saju)/_components/saju/RecommendSajuQuestions";
import { useUserStore } from "@/src/store/user.store";
import { usePendingChatStore } from "@/src/store/chat.store";
import { type SajuQuestion } from "@/src/app/(saju)/_constants/saju";
import { useBirthInfoModalStore } from "@/src/store/modal.store";

export default function ChatIndex({
  questions,
}: {
  questions: SajuQuestion[];
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  // const user = useUserStore((s) => s.user);
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

  return (
    <>
      <ChatHeader hideBorder>
        {birthInfo && (
          <SimpleBirthInfo initialBirthInfo={birthInfo} changeable />
        )}
      </ChatHeader>
      <div className="grid grid-rows-[1fr_auto] flex-1 min-h-0">
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
