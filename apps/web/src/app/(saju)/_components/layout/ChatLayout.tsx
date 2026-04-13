"use client";

import React, { Suspense, memo, useEffect } from "react";
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
  useEffect(() => {
    useUserStore.setState({
      ...(initialUser?.id
        ? { user: { id: initialUser.id, email: initialUser.email } }
        : {}),
      ...(initialProfile ? { birthInfo: initialProfile } : {}),
      isLoading: false,
    });
  }, []);

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
