"use client";

import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/button";
import ThemeToggle from "@/src/components/ThemeToggle";
import StarCanvas from "@/src/components/common/StarCanvas";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center text-center">
      <nav className="fixed top-4 right-4 z-30">
        <ThemeToggle />
      </nav>
      <StarCanvas zIndex={1} />
      <div className="relative max-w-[320px] mx-auto -mt-40 z-2">
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.number}>404</div>
        <span className={styles.symbol}>☯</span>
        <div className={styles.cards}>
          <div className={styles.card}>甲</div>
          <div className={styles.card}>☽</div>
          <div className={styles.card}>子</div>
        </div>
        <div className={styles.title}>사주에 없는 경로입니다</div>
        <p className={styles.subTitle}>
          요청하신 페이지는 <em>이 세상의 기운</em>에 존재하지 않습니다.
          <br />
          사주의 흐름이 끊긴 것처럼, 길을 잃으셨군요.
          <br />
          아래 버튼으로 돌아가시면 다시 운세가 열립니다.
        </p>
        <div className="flex gap-2.5 flex-wrap justify-center">
          <Button
            type="button"
            size="lg"
            className="h-[48px] font-semibold !text-sm"
            onClick={() => router.push("/")}
          >
            ✦ 홈으로 돌아가기
          </Button>
          <Button
            type="button"
            size="lg"
            className="h-[48px] font-semibold !text-sm"
            variant="secondary"
            onClick={() => router.back()}
          >
            ← 이전 페이지
          </Button>
        </div>
      </div>
    </div>
  );
}
