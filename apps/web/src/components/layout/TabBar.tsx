import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TextAlignJustify, Settings, SquarePen, Search } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { useSidebarToggleStore } from "@/src/store/sidebar.store";
import styles from "./TabBar.module.css";

export default function TabBar() {
  const pathname = usePathname();
  const { openMobileSidebar } = useSidebarToggleStore();

  return (
    <footer className={styles.bottom}>
      <button type="button" onClick={openMobileSidebar}>
        <TextAlignJustify strokeWidth="1.8" size={18} />
        <p>메뉴</p>
      </button>
      <Link href="/" className={cn(pathname === "/" && styles.active)}>
        <SquarePen strokeWidth={pathname === "/" ? "1.8" : "1.6"} size={19} />
        <p>상담</p>
      </Link>
      <Link href="/" className={cn(pathname === "/search" && styles.active)}>
        <Search strokeWidth={pathname === "/search" ? "2" : "1.8"} size={19} />
        <p>검색</p>
      </Link>
      <Link href="/" className={cn(pathname === "/setting" && styles.active)}>
        <Settings
          strokeWidth={pathname === "/setting" ? "1.9" : "1.7"}
          size={20}
        />
        <p>설정</p>
      </Link>
    </footer>
  );
}
