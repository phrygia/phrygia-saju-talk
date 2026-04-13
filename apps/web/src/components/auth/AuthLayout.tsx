"use client";

import Link from "next/link";
import Logo from "../common/Logo";
import Header from "../layout/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="relative flex flex-col items-center justify-center px-4 overflow-hidden h-[calc(100vh-40px)]">
        <Link href="/login" className="-mt-10 mb-8 flex items-center gap-2">
          <Logo />
        </Link>
        <div className="relative w-full max-w-sm rounded-2xl border border-[var(--color-sidebar-border)] p-8 shadow-2xl shadow-black/40 bg-tertiary dark:bg-surface">
          {children}
        </div>
        <p className="mt-8 text-xs text-muted-foreground/50">
          © 2026 SAJU TALK. All rights reserved.
        </p>
      </main>
    </>
  );
}
