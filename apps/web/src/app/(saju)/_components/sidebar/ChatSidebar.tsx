"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@repo/ui/lib/utils";
import { useSidebarToggleStore } from "@/src/store/sidebar.store";
import ChatSidebarContent from "./ChatSidebarContent";

const sidebarClass =
  "dark:bg-[linear-gradient(180deg,#0a0928_0%,#070620_100%)] text-foreground bg-gradient-to-br from-[#ede8ff] to-[#e4dcff] border-r border-r-border";

export function ChatSidebar() {
  const pathname = usePathname();
  const { isMobileSidebarOpen, closeMobileSidebar } = useSidebarToggleStore();

  useEffect(() => {
    closeMobileSidebar();
  }, [pathname, closeMobileSidebar]);

  useEffect(() => {
    if (!isMobileSidebarOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSidebarOpen]);

  return (
    <>
      <div
        onClick={closeMobileSidebar}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden",
          isMobileSidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <aside
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "relative flex h-full w-[80%] max-w-[85vw] flex-col transition-transform duration-300 overflow-hidden",
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
            sidebarClass,
          )}
        >
          <ChatSidebarContent isMobile />
        </aside>
      </div>
      <aside
        className={cn(
          "hidden overflow-hidden md:flex md:flex-col w-65 relative",
          sidebarClass,
        )}
      >
        <div className="flex flex-col flex-1 min-h-0">
          <ChatSidebarContent />
        </div>
        <div className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] pointer-events-none bg-[radial-gradient(circle,rgba(124,92,252,0.12)_0%,transparent_70%)]" />
      </aside>
    </>
  );
}
