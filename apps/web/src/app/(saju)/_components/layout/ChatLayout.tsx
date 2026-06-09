"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/src/store/user.store";
import ChatSidebar from "@/src/app/(saju)/_components/sidebar/ChatSidebar";

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

  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        useUserStore.setState({ isLoading: false });
        router.refresh();
        // void queryClient.invalidateQueries();
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [router, queryClient]);

  return (
    <>
      <div className="fixed left-0 h-[45px] top-0 w-full flex items-center justify-center bg-red-700 z-100 text-[11px] leading-4 font-semibold text-white">
        현재 결제 수단에 문제가 있어 AI 상담에 문제가 발생했습니다. <br />
        최대한 빨리 복구하도록 노력하겠습니다. (26/6/9)
      </div>
      <div className="flex h-[calc(100vh-45px)] text-foreground mt-[45px]">
        <Suspense
          fallback={
            <aside className="hidden w-65 shrink-0 border-r border-r-sidebar-border bg-tertiary md:flex" />
          }
        >
          <ChatSidebar />
        </Suspense>
        <div className="flex flex-1 flex-col min-w-0">
          <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
