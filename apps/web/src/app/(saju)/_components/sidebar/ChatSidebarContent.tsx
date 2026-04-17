"use client";

import React, { Suspense, useState, useMemo } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@repo/ui/lib/utils";
import { Menu } from "@repo/ui/components/menu";
import { Skeleton } from "@repo/ui/components/skeleton";
import { createClient } from "@/src/lib/supabase/client";
import Logo from "@/src/components/common/Logo";
import ChatList from "@/src/app/(saju)/_components/sidebar/ChatList";
import { useSidebarToggleStore } from "@/src/store/sidebar.store";
import { usePendingChatStore } from "@/src/store/chat.store";
import { deleteAllConversationMessages } from "../../_actions/conversation";
import { useBirthInfoModalStore } from "@/src/store/modal.store";
import { useUserStore } from "@/src/store/user.store";
import ConfirmModal from "@/src/components/ui/ConfirmModal";
import { BirthTimeLabels } from "@/src/app/types/fortune";
import styles from "./ChatSidebarContent.module.scss";

function ConversationListFallback() {
  return Array.from({ length: 5 }).map((_, index) => (
    <div key={index} className="mb-1 h-[32px]">
      <Skeleton />
    </div>
  ));
}

export default function ChatSidebarContent({
  isMobile = false,
}: {
  isMobile?: boolean;
}) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const supabase = useMemo(() => createClient(), []);

  const { setPending } = usePendingChatStore();
  const { birthInfo, isLoading } = useUserStore();
  const { closeMobileSidebar } = useSidebarToggleStore();
  const { openBirthInfoModal } = useBirthInfoModalStore();

  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAllDeleteConversations = async () => {
    setLoading(true);

    try {
      const result = await deleteAllConversationMessages();

      if (!result.success) {
        return toast.error(
          result.message ||
            "채팅 기록 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.",
        );
      }

      if (params?.id) router.replace("/");

      setPending();
      queryClient.invalidateQueries({ queryKey: ["conversations"] });

      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    closeMobileSidebar();

    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(
        "로그아웃 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
    } else {
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between pt-5 px-4.5 pb-4 border-b border-b-border">
        <Link
          href="/"
          className="flex items-center"
          onClick={closeMobileSidebar}
        >
          <div className="w-[30px] h-[30px] bg-gradient-to-br from-[#6366f1] to-[#a78bfa] rounded-[9px] flex items-center justify-center text-[14px] shadow-[0_0_14px_rgba(99,102,241,0.45)] shrink-0">
            ✦
          </div>
          <div className="ml-2.5">
            <Logo />
            <p className="text-[10px] text-foreground-sub mt-0.5">
              AI 사주 상담
            </p>
          </div>
        </Link>
      </div>
      {/* <div className="pt-3 px-2.5 pb-2">
        <Link
          href="/"
          className={cn(styles.button, pathname === "/" && styles.active)}
          onClick={closeMobileSidebar}
        >
          <span>✏️</span> 새 상담
        </Link>
        <Link
          href="/chat/search"
          title="검색"
          onClick={async () => {
            if (isMobile) closeMobileSidebar();
          }}
          className={cn(
            styles.button,
            pathname === "/chat/search" && styles.active,
          )}
        >
          <span>🔍</span>
          상담 검색
        </Link>
        <Link
          prefetch={false}
          className={cn(styles.button, params?.date && styles.active)}
          href={`/today/${dayjs().format("YYYYMMDD")}`}
          onClick={closeMobileSidebar}
        >
          <span>⭐</span>
          오늘의 운세
        </Link>
        <Link
          className={cn(styles.button, pathname === "/saju" && styles.active)}
          href="/saju"
          onClick={closeMobileSidebar}
        >
          <span>☯</span>
          사주 원국
        </Link>
        <Link
          className={cn(
            styles.button,
            pathname === "/gunghap" && styles.active,
          )}
          href="/gunghap"
        >
          <span>💑</span>
          궁합 분석
        </Link>
      </div> */}
      <div className="bg-border mx-3 h-[1px]" />
      <div className="flex-1 overflow-y-auto px-2 py-2 min-w-60">
        <h1 className="mb-2 pt-1.5 px-3 pb-1 text-[10px] text-foreground-sub">
          상담 내역
        </h1>
        {isLoading ? (
          <ConversationListFallback />
        ) : (
          <Suspense fallback={<ConversationListFallback />}>
            <ChatList />
          </Suspense>
        )}
      </div>
      <div className="space-y-1 border-t border-t-sidebar-border px-2 py-2">
        <Menu.Trigger
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          placement="top-start"
          dropdown={
            <Menu.Dropdown style={{ width: 220 }}>
              <Menu.DropdownItem
                left="👤"
                onClick={() => {
                  router.push("/user/edit");
                  setOpen(false);
                }}
              >
                회원 정보
              </Menu.DropdownItem>
              <Menu.DropdownItem
                left="☯"
                onClick={() => {
                  closeMobileSidebar();
                  openBirthInfoModal();
                  setOpen(false);
                }}
              >
                {birthInfo ? "사주 정보 수정" : "사주 정보 입력"}
              </Menu.DropdownItem>
              <Menu.Separator />
              <Menu.DropdownItem
                danger
                left="🗑"
                onClick={() => {
                  setModalOpen(true);
                  setOpen(false);
                }}
              >
                채팅 기록 삭제
              </Menu.DropdownItem>
              <Menu.DropdownItem
                danger
                left="↪"
                onClick={async () => {
                  setOpen(false);
                  await handleLogout();
                }}
              >
                로그아웃
              </Menu.DropdownItem>
            </Menu.Dropdown>
          }
        >
          <div className="w-full">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="relative flex gap-2 items-center p-2 text-xs rounded-[10px] text-foreground-sub transition-all hover:bg-[rgba(124,92,252,0.08)] hover:text-violet w-full"
            >
              <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-sm bg-[linear-gradient(135deg,#6366f1,#a78bfa)]">
                🌙
              </div>
              {birthInfo?.birthDate && birthInfo?.name ? (
                <div className="text-left">
                  <div className="text-xs text-foreground-sub mb-[1px]">
                    {birthInfo.name}
                  </div>
                  <div className="text-[10px] text-foreground-muted">
                    {birthInfo.birthDate} ·{" "}
                    {birthInfo.calendarType === "solar" ? "양력" : "음력"} ·{" "}
                    {birthInfo.birthTime &&
                      BirthTimeLabels[
                        birthInfo.birthTime as keyof typeof BirthTimeLabels
                      ]}
                  </div>
                </div>
              ) : (
                "설정"
              )}
              <span
                className={cn(
                  "absolute right-2 transition-transform duration-200 text-foreground-muted",
                  open ? "rotate-180" : "rotate-0",
                )}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="8px"
                  width="8px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
                </svg>
              </span>
            </button>
          </div>
        </Menu.Trigger>
      </div>
      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleAllDeleteConversations}
        disabled={loading}
        icon="🗑"
        title="채팅 기록 삭제"
        subtitle={
          <>
            모든 상담 내역이 영구적으로 삭제됩니다.
            <br /> 이 작업은 되돌릴 수 없습니다.
          </>
        }
      />
    </>
  );
}
