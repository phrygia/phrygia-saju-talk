"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useUserStore } from "@/src/store/user.store";
import ChatHeader from "@/src/app/(saju)/_components/layout/ChatHeader";
import FortuneDashboardContent from "@/src/app/(saju)/_components/today/FortuneDashboardContent";
import BirthInfoForm from "@/src/app/(saju)/_components/birth/BirthInfoForm";
import FortuneDashboardSkeleton from "./FortuneDashboardSkeleton";

function FortuneErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: unknown;
  resetErrorBoundary: () => void;
}) {
  const message =
    error instanceof Error ? error.message : "운세를 불러오는데 실패했습니다.";

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <p className="text-sm text-red-400">{message}</p>
      <button
        onClick={resetErrorBoundary}
        className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
      >
        다시 시도
      </button>
    </div>
  );
}

export default function FortuneDashboard({ date }: { date: string }) {
  const birthInfo = useUserStore((s) => s.birthInfo);
  const isLoading = useUserStore((s) => s.isLoading);

  if (isLoading) return <FortuneDashboardSkeleton date={date} />;

  if (!birthInfo)
    return (
      <>
        <ChatHeader />
        <div className="overflow-y-auto">
          <div className="py-10 md:py-20 px-5">
            <BirthInfoForm />
          </div>
        </div>
      </>
    );

  return (
    <ErrorBoundary
      FallbackComponent={FortuneErrorFallback}
      resetKeys={[
        birthInfo!.gender,
        birthInfo!.calendarType,
        birthInfo!.birthDate,
        birthInfo!.birthTime,
      ]}
    >
      <Suspense fallback={<FortuneDashboardSkeleton date={date} />}>
        <FortuneDashboardContent birthInfo={birthInfo} date={date} />
      </Suspense>
    </ErrorBoundary>
  );
}
