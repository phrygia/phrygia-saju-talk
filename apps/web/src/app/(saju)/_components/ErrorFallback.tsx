"use client";

import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/button";

type FallbackProps = {
  error: Error | null;
  resetErrorBoundary: () => void;
};

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const router = useRouter();

  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center">
      <div className="relative max-w-[320px] w-full mx-auto -mt-40">
        <div className="absolute h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(248,113,113,0.12)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[62%] pointer-events-none" />
        <div className="absolute w-[220px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(248,113,113,0.06)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 translate-y-[20%] pointer-events-none" />
        <div className="relative mb-6 z-2">
          <svg
            className="w-[80px] h-[80px] mx-auto"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(248, 113, 113, 0.2)"
              strokeWidth="2"
            />
            <g transform="translate(50, 50)">
              <path
                d="M 0 -30 L 26 15 L -26 15 Z"
                fill="none"
                stroke="#f87171"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <circle cx="0" cy="6" r="2.5" fill="#f87171" />
              <line
                x1="0"
                y1="-8"
                x2="0"
                y2="-16"
                stroke="#f87171"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
        <div className="text-[20px] font-semibold text-foreground-sub mb-2.5 text-center">
          문제가 발생했습니다
        </div>
        <p className="text-[13px] text-foreground-sub text-center leading-[1.8] mb-[28px]">
          {error instanceof Error ? (
            error.message
          ) : (
            <>
              예상치 못한 오류가 발생했습니다.
              <br />
              기운의 흐름이 끊긴 것처럼 보입니다.
              <br />
              아래 버튼으로 시도해주세요.
            </>
          )}
        </p>
        <div className="flex gap-2.5 flex-wrap justify-center">
          <Button
            type="button"
            size="lg"
            className="h-[48px] font-semibold !text-sm"
            variant="danger"
            onClick={resetErrorBoundary}
          >
            ↺ 다시 시도하기
          </Button>
          <Button
            type="button"
            size="lg"
            className="h-[48px] font-semibold !text-sm"
            variant="secondary"
            onClick={() => router.push("/")}
          >
            ✦ 홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}
