"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useUserStore } from "@/src/store/user.store";
import ChatHeader from "@/src/app/(saju)/_components/layout/ChatHeader";
import BirthInfoForm from "@/src/app/(saju)/_components/birth/BirthInfoForm";
import ManseryeokDashboardContent from "@/src/app/(saju)/_components/manseryeok/ManseryeokDashboardContent";
import ManseryeokSkeleton from "@/src/app/(saju)/_components/manseryeok/ManseryeokSkeleton";

function ManseryeokErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: unknown;
  resetErrorBoundary: () => void;
}) {
  const message =
    error instanceof Error
      ? error.message
      : "만세력을 불러오는데 실패했습니다.";

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <p className="text-sm text-red-400">{message}</p>
      <button
        type="button"
        onClick={resetErrorBoundary}
        className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
      >
        다시 시도
      </button>
    </div>
  );
}

export default function ManseryeokDashboard() {
  const birthInfo = useUserStore((s) => s.birthInfo);
  const isLoading = useUserStore((s) => s.isLoading);
  const user = useUserStore((s) => s.user);

  if (isLoading) return <ManseryeokSkeleton />;

  if (!birthInfo) {
    return (
      <>
        <ChatHeader title="만세력" />
        <div className="overflow-y-auto">
          <div className="py-10 md:py-20 px-5">
            <BirthInfoForm />
          </div>
        </div>
      </>
    );
  }

  const userName = user?.email?.split("@")[0] ?? "사용자";

  return (
    <>
      <ChatHeader title="만세력" />
      <div className="flex-1 overflow-y-auto">
        <ErrorBoundary
          FallbackComponent={ManseryeokErrorFallback}
          resetKeys={[
            birthInfo.gender,
            birthInfo.calendarType,
            birthInfo.birthDate,
            birthInfo.birthTime,
          ]}
        >
          <Suspense fallback={<ManseryeokSkeleton />}>
            <ManseryeokDashboardContent
              birthInfo={birthInfo}
              userName={userName}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}
