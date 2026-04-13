"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import type { BirthInfo } from "@/src/app/types/fortune";
import type { ManseryeokData } from "@/src/app/types/manseryeok";
import type { ApiResponse } from "@/src/app/types/api";
import ManseryeokView from "@/src/app/(saju)/_components/manseryeok/ManseryeokView";

interface Props {
  birthInfo: BirthInfo;
  userName?: string;
}
export default function ManseryeokDashboardContent({
  birthInfo,
  userName,
}: Props) {
  const { data } = useSuspenseQuery<ManseryeokData>({
    queryKey: [
      "manseryeok",
      birthInfo.gender,
      birthInfo.calendarType,
      birthInfo.birthDate,
      birthInfo.birthTime,
    ],
    queryFn: async () => {
      const response = await fetch("/api/manseryeok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthInfo }),
      });

      const result = (await response.json()) as ApiResponse<ManseryeokData>;

      if (!result.success) {
        throw new Error(result.message ?? "만세력을 불러오는데 실패했습니다.");
      }

      return result.data;
    },
    staleTime: 1000 * 60 * 60,
    retry: 2,
    retryDelay: 1000,
  });

  return (
    <ManseryeokView
      data={data}
      userName={userName}
      birthDate={birthInfo.birthDate}
    />
  );
}
