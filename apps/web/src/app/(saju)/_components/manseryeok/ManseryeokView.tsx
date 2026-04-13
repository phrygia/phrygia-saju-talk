"use client";

import dayjs from "dayjs";
import type { ManseryeokData } from "@/src/app/types/manseryeok";
import SajupaljaTable from "@/src/app/(saju)/_components/manseryeok/SajupaljaTable";
import OhaengBunpoSection from "@/src/app/(saju)/_components/manseryeok/OhaengBunpoSection";
import OhaengRadar from "@/src/app/(saju)/_components/manseryeok/OhaengRadar";
import SeongHyangSection from "@/src/app/(saju)/_components/manseryeok/SeongHyangSection";
import DaeunTable from "@/src/app/(saju)/_components/manseryeok/DaeunTable";
import SeunTable from "@/src/app/(saju)/_components/manseryeok/SeunTable";
import WolunTable from "@/src/app/(saju)/_components/manseryeok/WolunTable";
import styles from "./ManseryeokView.module.scss";

interface Props {
  data: ManseryeokData;
  userName?: string;
  birthDate?: string;
}

export default function ManseryeokView({
  data,
  userName = "사용자",
  birthDate,
}: Props) {
  const now = dayjs();
  const currentYear = now.year();
  const currentMonth = now.month() + 1;
  const currentAge = birthDate ? now.diff(dayjs(birthDate), "year") : 0;

  return (
    <div className={styles.wrap}>
      <div className={styles.pageHeader}>
        <p className={styles.pageEyebrow}>✦ 만세력 · 사주팔자 분석</p>
        <h1 className={styles.pageTitle}>{userName}님의 만세력</h1>
        <p className={styles.pageSub}>
          AI가 분석한 사주팔자와 운세 흐름입니다. 이번 달에 한 번 생성되며
          자동으로 저장됩니다.
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
