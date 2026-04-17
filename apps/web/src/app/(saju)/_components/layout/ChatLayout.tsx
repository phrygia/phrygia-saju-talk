"use client";

import React, { Suspense, memo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/src/store/user.store";
import { ChatSidebar } from "@/src/app/(saju)/_components/sidebar/ChatSidebar";

const MemoizedChatSidebar = memo(ChatSidebar);

export default function ChatLayout({
  initialUser,
  initialProfile,
  children,
}: {
  initialUser: any;
  initialProfile: any;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 마운트 시 및 서버 데이터 변경 시 store 동기화
  useEffect(() => {
    useUserStore.setState({
      user: initialUser?.id
        ? { id: initialUser.id, email: initialUser.email }
        : null,
      birthInfo: initialProfile ?? null,
      isLoading: false,
    });
  }, [initialUser, initialProfile]);

  // bfcache 복원 시 (탭 닫기 후 다시 열기 등) 처리
  // - pageshow 핸들러에서 birthInfo를 직접 덮어쓰지 않음 (stale 클로저 문제 방지)
  // - router.refresh()로 서버 컴포넌트를 재실행 → 최신 initialProfile → useEffect에서 store 업데이트
  // - queryClient.invalidateQueries()로 pending/stale 상태 쿼리 초기화
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        // isLoading이 stuck되지 않도록 보장
        useUserStore.setState({ isLoading: false });
        // 서버 컴포넌트 재실행으로 최신 데이터 반영
        router.refresh();
        // 모든 쿼리 무효화하여 fresh fetch 보장
        void queryClient.invalidateQueries();
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [router, queryClient]);

  return (
    <div className="flex h-screen text-foreground">
      <Suspense
        fallback={
          <aside className="hidden w-65 shrink-0 border-r border-r-sidebar-border bg-tertiary md:flex" />
        }
      >
        <MemoizedChatSidebar />
      </Suspense>
      <div className="flex flex-1 flex-col min-w-0">
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
