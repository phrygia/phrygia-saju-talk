"use client";

import React from "react";
import { Menu } from "lucide-react";
import ThemeToggle from "@/src/components/ThemeToggle";
import { useSidebarToggleStore } from "@/src/store/sidebar.store";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/button";
import { StarBurstButton } from "@repo/ui/components/star-burst-button";
import { useRouter } from "next/navigation";

export default function ChatHeader({
  children,
  title = "",
  hideRightButton = false,
  hideBorder = false,
}: {
  children?: React.ReactNode;
  title?: string;
  hideRightButton?: boolean;
  hideBorder?: boolean;
}) {
  const router = useRouter();
  const { openMobileSidebar } = useSidebarToggleStore();

  return (
    <header
      className={cn(
        "min-h-[52px] h-[52px] sticky top-0 z-10 flex items-center px-5 md:px-6 duration-200 bg-[rgba(248,246,255,0.9)] dark:bg-[rgba(6,6,24,0.7)] backdrop-blur-md",
        !hideBorder && "border-b border-b-border",
      )}
    >
      <div className="w-full flex items-center justify-between gap-1">
        <div>
          {title && (
            <h2 className="font-medium text-sm">
              <span className="relative mr-2 inline-block h-[6px] w-[6px] rounded-full bg-gold shadow-[0_0_8px_var(--gold)] animate-blink -top-0.5" />
              {title}
            </h2>
          )}
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-1/2 text-foreground-sub opacity-80 -ml-5 hidden md:block text-xs">
          {children && children}
        </div>
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            className="w-[36px] h-[36px] rounded-[6px] border border-[rgba(124,92,252,0.2)] bg-[rgba(124,92,252,0.1)] text-violet text-[18px] flex md:hidden items-center justify-center cursor-pointer transition-all duration-200 shrink-0 hover:bg-[rgba(124,92,252,0.2)] dark:bg-[rgba(124,92,252,0.1)] dark:border-[rgba(124,92,252,0.2)] light:bg-[rgba(100,65,160,0.08)] light:border-[rgba(100,65,160,0.18)]"
            onClick={openMobileSidebar}
            title="사이드바 열기"
            aria-label="사이드바 열기"
          >
            <Menu strokeWidth={1.8} size={20} />
          </button>
          <ThemeToggle />
          {!hideRightButton && (
            <>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="px-2.5 min-h-[30px] !hidden md:!block"
                onClick={() => router.push("/saju")}
              >
                사주 원국 보기
              </Button>
              <StarBurstButton
                variant="default"
                size="sm"
                className="min-h-[30px]"
                onClick={() => router.push("/")}
              >
                ✦ 새 상담
              </StarBurstButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
