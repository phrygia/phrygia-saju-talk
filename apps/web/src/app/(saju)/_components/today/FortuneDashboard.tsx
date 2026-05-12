"use client";

import { Suspense, use, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useUserStore } from "@/src/store/user.store";
import ChatHeader from "@/src/app/(saju)/_components/layout/ChatHeader";
import BirthInfoForm from "@/src/app/(saju)/_components/birth/BirthInfoForm";
import FortuneDashboardSkeleton from "@/src/app/(saju)/_components/today/FortuneDashboardSkeleton";
import ErrorFallback from "@/src/app/(saju)/_components/ErrorFallback";
import dayjs from "dayjs";

const FortuneDashboardContent = lazy(
  () => import("@/src/app/(saju)/_components/today/FortuneDashboardContent"),
);

export default function FortuneDashboard({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = use(params);
  const { birthInfo, isLoading } = useUserStore();

  if (isLoading) return <FortuneDashboardSkeleton date={date} />;

  if (!birthInfo?.birthDate)
    return (
      <>
        <ChatHeader />
        <div className="overflow-y-auto">
          <div className="py-10 md:py-20 px-5 max-w-[480px] mx-auto">
            <BirthInfoForm hideDeleteButton />
          </div>
        </div>
      </>
    );

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      resetKeys={[
        dayjs(date).format("YYYY-M-D"),
        birthInfo.gender,
        birthInfo.calendarType,
        birthInfo.birthDate,
        birthInfo.birthTime,
      ]}
    >
      <Suspense fallback={<FortuneDashboardSkeleton date={date} />}>
        <FortuneDashboardContent birthInfo={birthInfo} date={date} />
      </Suspense>
    </ErrorBoundary>
  );
}
