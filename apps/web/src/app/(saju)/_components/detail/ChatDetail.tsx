"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useChat } from "@ai-sdk/react";
import {
  type InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cn } from "@repo/ui/lib/utils";
import { ArrowDown } from "lucide-react";
import { usePendingChatStore } from "@/src/store/chat.store";
import { Messages } from "@/src/app/types/message";
import ChatHeader from "@/src/app/(saju)/_components/layout/ChatHeader";
import ChatInput from "@/src/app/(saju)/_components/detail/ChatInput";
import {
  getPastMessages,
  saveChatMessage,
  MessageCursor,
} from "@/src/app/(saju)/_lib/services/message";
import SimpleBirthInfo from "@/src/app/(saju)/_components/birth/SimpleBirthInfo";
import SajuWonGukView from "@/src/app/(saju)/_components/saju/SajuWonGuk";
import { deleteConversationMessages } from "@/src/app/(saju)/_actions/conversation";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/src/components/ui/ConfirmModal";
import { type SajuQuestion } from "@/src/app/(saju)/_constants/saju";
import { BirthInfo } from "@/src/app/types/fortune";
import RecommendSajuQuestions from "@/src/app/(saju)/_components/saju/RecommendSajuQuestions";
import styles from "./ChatDetail.module.scss";

interface ChatDetailProps {
  initialMessages: Messages[];
  initialProfile: BirthInfo | null;
  conversationId: string;
  pageSize: number;
  questions: SajuQuestion[];
}

type MessagesPage = {
  items: Messages[];
  nextPageParam: MessageCursor | null;
};

export default function ChatDetail({
  initialMessages,
  initialProfile = null,
  conversationId,
  pageSize,
  questions,
}: ChatDetailProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { hasPending, clearPending } = usePendingChatStore();

  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const didInitialScrollRef = useRef<boolean>(false);
  const didAutoReload = useRef<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  // initialMessages?.[0]?.profile ?? null;

  const { messages, input, setInput, handleSubmit, status, reload } = useChat({
    api: "/api/chat",
    initialMessages: initialMessages as any,
    body: {
      birthInfo: initialProfile
        ? {
            gender: initialProfile.gender,
            calendarType: initialProfile.calendarType,
            birthDate: initialProfile.birthDate,
            birthTime: initialProfile.birthTime,
          }
        : undefined,
    },
    onFinish: async (message: any) => {
      if (conversationId) {
        const result = await saveChatMessage(
          conversationId,
          "assistant",
          message.content,
        );
        if (!result.success) {
          toast.error(result.message || "메시지 저장에 실패했습니다.");
        }
      }
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    },
  });

  useEffect(() => {
    if (!hasPending || didAutoReload.current) return;

    didAutoReload.current = true;
    clearPending();
    reload();
  }, [hasPending, reload, clearPending]);

  const isLoading = status === "submitted" || status === "streaming";
  const oldestInitialMessageCursor = useMemo<MessageCursor | null>(
    () =>
      initialMessages[0]
        ? {
            created_at: initialMessages[0].created_at,
            id: initialMessages[0].id,
          }
        : null,
    [initialMessages],
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      MessagesPage,
      Error,
      InfiniteData<MessagesPage, MessageCursor | null>,
      [string, string],
      MessageCursor | null
    >({
      queryKey: ["messages", conversationId],
      queryFn: async ({ pageParam }) => {
        const result = await getPastMessages(
          pageParam,
          conversationId,
          pageSize,
        );

        if (!result.success) {
          throw new Error(result.message);
        }

        return result.data;
      },
      getNextPageParam: (lastPage) => lastPage.nextPageParam,
      initialPageParam: null,
      initialData: {
        pages: [
          {
            items: [] as Messages[],
            nextPageParam:
              initialMessages.length === pageSize
                ? oldestInitialMessageCursor
                : null,
          },
        ],
        pageParams: [null],
      },
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  const olderMessages = useMemo(() => {
    const allPages = data?.pages.flatMap((page) => page.items) ?? [];
    return allPages.reverse();
  }, [data]);

  const allMessages = useMemo(() => {
    return [...olderMessages, ...(messages as any[])];
  }, [olderMessages, messages]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const distanceFromBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight;
      setShowScrollButton(distanceFromBottom > 2000);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const lastMessage = allMessages[allMessages.length - 1];
  const isWaitingForResponse =
    isLoading &&
    (!lastMessage ||
      lastMessage.role !== "assistant" ||
      !(lastMessage as any).content);

  useEffect(() => {
    if (isLoading && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLoading, allMessages]);

  useLayoutEffect(() => {
    if (didInitialScrollRef.current) return;
    if (!messagesEndRef.current) return;

    messagesEndRef.current.scrollIntoView({ behavior: "auto", block: "end" });
    didInitialScrollRef.current = true;
  }, [allMessages.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const tryLoadOlder = () => {
      if (!hasNextPage || isFetchingNextPage) return;
      if (container.scrollTop > 80) return;

      const prevHeight = container.scrollHeight;
      fetchNextPage().then(() => {
        requestAnimationFrame(() => {
          container.scrollTop += container.scrollHeight - prevHeight;
        });
      });
    };
    container.addEventListener("scroll", tryLoadOlder, { passive: true });

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) tryLoadOlder();
    };
    container.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      container.removeEventListener("scroll", tryLoadOlder);
      container.removeEventListener("wheel", onWheel);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleDeleteConversation = async () => {
    setLoading(true);

    try {
      const response = await deleteConversationMessages(conversationId);

      if (!response.success) {
        return toast.error(
          "상담 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.",
        );
      }
      await queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.removeQueries({ queryKey: ["messages", conversationId] });

      setModalOpen(false);

      toast.success("상담이 삭제되었습니다.");
      router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  const firstAssistantId = (allMessages ?? []).find(
    (item) => item.role === "assistant",
  )?.id;

  return (
    <>
      <ChatHeader title="사주 상담">
        {initialMessages?.[0]?.profile && (
          <SimpleBirthInfo initialBirthInfo={initialMessages?.[0]?.profile} />
        )}
      </ChatHeader>
      <div className="grid grid-rows-[1fr_auto] flex-1 min-h-0">
        <div
          ref={scrollContainerRef}
          className="min-h-0 overflow-y-auto relative"
        >
          {showScrollButton && (
            <button
              onClick={scrollToBottom}
              className={styles.scrollToBottomButton}
              title="최하단으로 이동"
            >
              <ArrowDown strokeWidth={1.5} size={18} />
            </button>
          )}
          {allMessages.length === 0 ? (
            <div className="pb-10">
              <div className="mx-auto max-w-2xl px-5 py-4 mt-4">
                <div className="text-2xl font-bold font-serif-kr text-center">
                  무엇이든 물어보세요
                </div>
              </div>
              <div className="mx-auto max-w-2xl px-5 pb-6">
                <RecommendSajuQuestions
                  questions={questions}
                  className="mt-3"
                  onClick={(q) => {
                    setInput(q.question);
                    setTimeout(() => {
                      formRef.current?.requestSubmit();
                    }, 100);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl space-y-6 px-5 py-6 pb-20">
              {isFetchingNextPage && (
                <p className="text-center text-xs text-foreground">
                  이전 메시지 불러오는 중...
                </p>
              )}
              {allMessages.map((message: Messages) => {
                return (
                  <React.Fragment key={message.id}>
                    {firstAssistantId === message.id && initialProfile && (
                      <SajuWonGukView birthInfo={initialProfile} />
                    )}
                    <div
                      className={cn(
                        "flex",
                        message.role === "user"
                          ? " gap-3 justify-end"
                          : "justify-start",
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-2xl text-[13px] leading-relaxed relative",
                          message.role === "user"
                            ? "max-w-[78%] transition-all rounded-[18px_18px_4px_18px] bg-[linear-gradient(135deg,#5b57f0,#7c5cfc)] px-5 py-2 text-white font-medium"
                            : "px-0 md:px-5 py-0 md:py-2",
                        )}
                      >
                        {message.role === "assistant" && (
                          <div className="absolute text-gold opacity-85 -top-2.5 -left-1.5 md:top-0 md:left-1 text-[10px]">
                            ✦
                          </div>
                        )}
                        <p
                          className="whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{
                            __html: message.content.replace(
                              /\*\*(.*?)\*\*/g,
                              "<strong class='font-bold'>$1</strong>",
                            ),
                          }}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
              {isWaitingForResponse && (
                <div className="flex gap-3">
                  <div className="bg-[linear-gradient(135deg,rgba(248,245,255,0.98),rgba(238,232,255,0.98))] text-[rgba(225,210,255,0.88)] border border-[rgba(124,92,252,0.18)] rounded-[18px_18px_18px_4px] shadow-[0_4px_18px_rgba(124,92,252,0.2)] dark:bg-[linear-gradient(135deg,rgba(22,16,60,0.92),rgba(15,11,44,0.92))] py-4 px-5">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        <div>
          <ChatInput
            value={input}
            formRef={formRef}
            initialBirthInfo={initialProfile}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            disabled={isLoading || loading}
            onSubmit={handleSubmit}
            initialConversationId={conversationId}
          />
        </div>
      </div>
      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteConversation}
        disabled={loading || isLoading}
      >
        <h2 className="mb-10 text-lg font-semibold">
          상담을 삭제하시겠습니까?
        </h2>
      </ConfirmModal>
    </>
  );
}
