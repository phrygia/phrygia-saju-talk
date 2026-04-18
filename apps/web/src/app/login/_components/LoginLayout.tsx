"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/src/components/common/Logo";
import ThemeToggle from "@/src/components/ThemeToggle";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import LoginForm from "@/src/app/login/_components/LoginForm";
import SignupForm from "@/src/app/login/_components/SignupForm";
import ForgotPasswordForm from "@/src/app/login/_components/ForgotPasswordForm";
import { loginPageType } from "@/src/app/types/user";
import StarCanvas from "@/src/components/common/StarCanvas";
import styles from "./LoginLayout.module.scss";

export default function LoginLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<loginPageType>("login");

  return (
    <main className={styles.wrapper}>
      <nav className="fixed top-4 right-4 z-30">
        <ThemeToggle />
      </nav>
      <StarCanvas />
      <div className={`${styles.glow} ${styles.glow1}`}></div>
      <div className={`${styles.glow} ${styles.glow2}`}></div>
      <div
        className={styles.star}
        style={{ top: "12%", left: "8%", animationDelay: "0s" }}
      >
        ✦
      </div>
      <div
        className={styles.star}
        style={{
          top: "20%",
          right: "10%",
          animationDelay: "1.5s",
          fontSize: "10px",
        }}
      >
        ✧
      </div>
      <div
        className={styles.star}
        style={{
          bottom: "18%",
          left: "12%",
          animationDelay: "3s",
          fontSize: "11px",
        }}
      >
        ✦
      </div>
      <div
        className={styles.star}
        style={{
          bottom: "25%",
          right: "8%",
          animationDelay: "2s",
        }}
      >
        ✧
      </div>
      <div
        className={styles.star}
        style={{
          top: "55%",
          left: "5%",
          animationDelay: "4s",
          fontSize: "9px",
        }}
      >
        ✦
      </div>
      <div className={styles.container}>
        <div className="flex flex-col items-center justify-center mb-7">
          <div className={styles.icon}>🔮</div>
          <Logo className="scale-[1.2] ml-3 mt-3 mb-2.5" />
          <p className="text-[10px] text-foreground-sub -mt-1.5">
            AI 사주 상담 플랫폼
          </p>
        </div>
        <div className={styles.box}>
          <div className={styles.buttonContainer}>
            <Button
              onClick={() => {
                if (children) router.push("/login");
                else setSelectedTab("login");
              }}
              variant={selectedTab === "login" ? "default" : "secondary"}
              className={cn(
                styles.button,
                selectedTab !== "login" && styles.secondary,
                children && styles.secondary,
              )}
            >
              로그인
            </Button>
            <Button
              onClick={() => setSelectedTab("signup")}
              variant={selectedTab === "signup" ? "default" : "secondary"}
              className={cn(
                styles.button,
                selectedTab !== "signup" && styles.secondary,
                children && styles.secondary,
              )}
            >
              회원가입
            </Button>
          </div>
          {children ? (
            children
          ) : (
            <>
              {selectedTab === "forgotPassword" ? (
                <ForgotPasswordForm
                  onChangeTab={(status) => setSelectedTab(status)}
                />
              ) : (
                <>
                  {(selectedTab === "login" || selectedTab === "signup") && (
                    <div>
                      <h1 className="font-serif-kr font-semibold text-[20px] text-foreground mb-2.5">
                        {selectedTab === "login"
                          ? "다시 돌아오셨군요 👋"
                          : "사주와 함께 시작해요 ✨"}
                      </h1>
                      <p className="text-xs text-foreground-sub mb-6 font-medium">
                        {selectedTab === "login"
                          ? "계정에 로그인하여 AI 사주 상담을 시작하세요."
                          : "간단한 정보로 가입하고 맞춤 사주 상담을 받아보세요."}
                      </p>
                    </div>
                  )}
                  {selectedTab === "login" ? (
                    <LoginForm
                      onChangeTab={(status) => setSelectedTab(status)}
                    />
                  ) : (
                    <SignupForm
                      onChangeTab={(status) => setSelectedTab(status)}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <footer className="mb-20 text-xs text-muted-foreground/50 text-center mt-5">
        © 2026 SAJU TALK. All rights reserved.
      </footer>
    </main>
  );
}
