"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import type { BirthInfo } from "@/src/app/types/fortune";
import dayjs from "dayjs";
import type { ApiResponse } from "@/src/app/types/api";
import type { ManseryeokData } from "@/src/app/types/manseryeok";
import SajupaljaTable from "@/src/app/(saju)/_components/manseryeok/SajupaljaTable";
import OhaengBunpoSection from "@/src/app/(saju)/_components/manseryeok/OhaengBunpoSection";
import OhaengRadar from "@/src/app/(saju)/_components/manseryeok/OhaengRadar";
import SeongHyangSection from "@/src/app/(saju)/_components/manseryeok/SeongHyangSection";
import DaeunTable from "@/src/app/(saju)/_components/manseryeok/DaeunTable";
import SeunTable from "@/src/app/(saju)/_components/manseryeok/SeunTable";
import WolunTable from "@/src/app/(saju)/_components/manseryeok/WolunTable";
import styles from "./ManseryeokDashboardContent.module.scss";

interface Props {
  birthInfo: BirthInfo;
  userName?: string;
}

const now = dayjs();
const currentYear = now.year();
const currentMonth = now.month() + 1;

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
    retry: 1,
    retryDelay: 1000,
  });

  const currentAge = birthInfo.birthDate
    ? now.diff(dayjs(birthInfo.birthDate), "year")
    : 0;

  return (
    <div className={styles.wrap}>
      <div className={styles.pageHeader}>
        <p className="text-gold text-[11px]">
          <span>✦</span> 만세력 · 사주팔자 분석
        </p>
        <h2 className="font-serif-kr font-medium text-[28px] mt-2.5 mb-2">
          {userName}님의 만세력
        </h2>
        <p className="text-foreground-sub text-xs">
          AI가 분석한 사주팔자와 운세 흐름입니다. 달에 한 번 생성되며 자동으로
          저장됩니다.
        </p>
      </div>
      <section className={styles.section}>
        <SajupaljaTable data={data.sajupalja} />
      </section>
      <section className={styles.section}>
        <div className={styles.sectionTitle}>📊 오행 · 십신 분포</div>
        <OhaengBunpoSection
          ohaeng={data.ohaengBunpo}
          sipshin={data.sipshinBunpo}
        />
        <div className={styles.radarWrap}>
          <OhaengRadar ohaeng={data.ohaengBunpo} sipshin={data.sipshinBunpo} />
        </div>
      </section>
      <section className={styles.section}>
        <DaeunTable daeun={data.daeun} currentAge={currentAge} />
      </section>
      <section className={styles.section}>
        <SeunTable seun={data.seun} currentYear={currentYear} />
      </section>
      <section className={styles.section}>
        <WolunTable wolun={data.wolun} currentMonth={currentMonth} />
      </section>
      <section className={styles.section}>
        <SeongHyangSection data={data.seongHyang} userName={userName} />
      </section>
    </div>
  );
}
