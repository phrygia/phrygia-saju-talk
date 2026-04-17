"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useUserStore } from "@/src/store/user.store";
import ChatHeader from "@/src/app/(saju)/_components/layout/ChatHeader";
import BirthInfoForm from "@/src/app/(saju)/_components/birth/BirthInfoForm";
import ManseryeokDashboardContent from "@/src/app/(saju)/_components/manseryeok/ManseryeokDashboardContent";
import ManseryeokSkeleton from "@/src/app/(saju)/_components/manseryeok/ManseryeokSkeleton";
import ErrorFallback from "@/src/app/(saju)/_components/ErrorFallback";

export default function ManseryeokDashboard() {
  const { birthInfo, isLoading, user } = useUserStore();

  if (isLoading) {
    return (
      <>
        <ChatHeader title="만세력" />
        <ManseryeokSkeleton />{" "}
      </>
    );
  }

  if (!birthInfo?.birthDate) {
    return (
      <>
        <ChatHeader title="만세력" />
        <div className="overflow-y-auto mx">
          <div className="py-10 md:py-20 px-5 max-w-[500px] mx-auto">
            <BirthInfoForm />
          </div>
        </div>
      </>
    );
  }

  const userName = birthInfo?.name
    ? birthInfo?.name
    : (user?.email?.split("@")[0] ?? "사용자");

  return (
    <>
      <ChatHeader title="만세력" hideWonGukButton />
      <div className="flex-1 overflow-y-auto">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
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
