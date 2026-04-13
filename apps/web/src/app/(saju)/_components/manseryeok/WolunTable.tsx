"use client";

import type { Wolun } from "@/src/app/types/manseryeok";
import { OHAENG_COLOR } from "@/src/app/(saju)/_constants/manseryeok";
import styles from "./WolunTable.module.scss";

interface Props {
  wolun: Wolun;
  currentMonth: number;
}

const ROWS = [
  { key: "month", label: "월" },
  { key: "sipshin", label: "십신" },
  { key: "cheongan", label: "천간" },
  { key: "jiji", label: "지지" },
  { key: "jijiSipshin", label: "지지십신" },
  { key: "sibi", label: "12운성" },
] as const;

function getMonthLabel(month: number): string {
  if (month > 12) return `${month - 12}월N`;
  return `${month}월`;
}

export default function WolunTable({ wolun, currentMonth }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.titleIcon}>🌙</span>
        <div>
          <span className={styles.title}>월운 (月運)</span>
          <span className={styles.sub}>{wolun.year}년 월별 운세</span>
        </div>
      </div>
      <div className={styles.scrollX}>
        <table className={styles.table}>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key} className={styles.tr}>
                <td className={styles.labelTd}>{row.label}</td>
                {wolun.months.map((wm, i) => {
                  const isActive = wm.month === currentMonth;
                  return (
                    <td
                      key={i}
                      className={`${styles.td} ${isActive ? styles.activeTd : ""}`}
                    >
                      {row.key === "month" && (
                        <span
                          className={
                            isActive ? styles.activeMonth : styles.monthText
                          }
                        >
                          {getMonthLabel(wm.month)}
                        </span>
                      )}
                      {row.key === "sipshin" && (
                        <span className={styles.sipshinText}>{wm.sipshin}</span>
                      )}
                      {row.key === "cheongan" && (
                        <div className={styles.charCell}>
                          <span
                            className={styles.hanjaChar}
                            style={{ color: OHAENG_COLOR[wm.cheongan.ohaeng] }}
                          >
                            {wm.cheongan.hanja}
                          </span>
                          <span className={styles.hangulChar}>
                            {wm.cheongan.hangul}
                          </span>
                        </div>
                      )}
                      {row.key === "jiji" && (
                        <div className={styles.charCell}>
                          <span
                            className={styles.hanjaCharSm}
                            style={{ color: OHAENG_COLOR[wm.jiji.ohaeng] }}
                          >
                            {wm.jiji.hanja}
                          </span>
                          <span className={styles.hangulChar}>
                            {wm.jiji.hangul}
                          </span>
                        </div>
                      )}
                      {row.key === "jijiSipshin" && (
                        <span className={styles.sipshinText}>
                          {wm.jijiSipshin}
                        </span>
                      )}
                      {row.key === "sibi" && (
                        <span className={styles.unseongText}>
                          {wm.sibiUnseong}
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
