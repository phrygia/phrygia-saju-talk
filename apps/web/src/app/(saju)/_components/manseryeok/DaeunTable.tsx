"use client";

import type { Daeun, DaeunPeriod } from "@/src/app/types/manseryeok";
import { OHAENG_COLOR } from "@/src/app/(saju)/_constants/manseryeok";
import styles from "./DaeunTable.module.scss";

interface Props {
  daeun: Daeun;
  currentAge: number;
}

const ROWS = [
  { key: "age", label: "나이" },
  { key: "sipshin", label: "십신" },
  { key: "cheongan", label: "천간" },
  { key: "jiji", label: "지지" },
  { key: "jijiSipshin", label: "지지십신" },
  { key: "sibiCg", label: "12운성(천간)" },
  { key: "sibiJj", label: "12운성(지지)" },
] as const;

function getActivePeriodIndex(
  periods: DaeunPeriod[],
  currentAge: number,
): number {
  let active = 0;
  for (let i = 0; i < periods.length; i++) {
    if (currentAge >= (periods[i]?.age ?? 0)) active = i;
  }

  return active;
}

export default function DaeunTable({ daeun, currentAge }: Props) {
  const activePeriodIdx = getActivePeriodIndex(daeun.periods, currentAge);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.titleIcon}>🔄</span>
        <div>
          <span className={styles.title}>대운 (大運)</span>
          <span className={styles.sub}>10년 주기의 큰 흐름</span>
        </div>
      </div>
      {daeun.description && (
        <p className={styles.description}>{daeun.description}</p>
      )}
      <div className={styles.scrollX}>
        <table className={styles.table}>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key} className={styles.tr}>
                <td className={styles.labelTd}>{row.label}</td>
                {daeun.periods.map((period, i) => {
                  const isActive = i === activePeriodIdx;
                  return (
                    <td
                      key={i}
                      className={`${styles.td} ${isActive ? styles.activeTd : ""}`}
                    >
                      {row.key === "age" && (
                        <span
                          className={
                            isActive ? styles.activeAge : styles.ageText
                          }
                        >
                          {period.age}세
                        </span>
                      )}
                      {row.key === "sipshin" && (
                        <span className={styles.sipshinText}>
                          {period.sipshin}
                        </span>
                      )}
                      {row.key === "cheongan" && (
                        <div className={styles.charCell}>
                          <span
                            className={styles.hanjaChar}
                            style={{
                              color: OHAENG_COLOR[period.cheongan.ohaeng],
                            }}
                          >
                            {period.cheongan.hanja}
                          </span>
                          <span className={styles.hangulChar}>
                            {period.cheongan.hangul}
                          </span>
                        </div>
                      )}
                      {row.key === "jiji" && (
                        <div className={styles.charCell}>
                          <span
                            className={styles.hanjaCharSm}
                            style={{ color: OHAENG_COLOR[period.jiji.ohaeng] }}
                          >
                            {period.jiji.hanja}
                          </span>
                          <span className={styles.hangulChar}>
                            {period.jiji.hangul}
                          </span>
                        </div>
                      )}
                      {row.key === "jijiSipshin" && (
                        <span className={styles.sipshinText}>
                          {period.jijiSipshin}
                        </span>
                      )}
                      {row.key === "sibiCg" && (
                        <span className={styles.unseongText}>
                          {period.sibiUnseong.cheongan}
                        </span>
                      )}
                      {row.key === "sibiJj" && (
                        <span className={styles.unseongText}>
                          {period.sibiUnseong.jiji}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
