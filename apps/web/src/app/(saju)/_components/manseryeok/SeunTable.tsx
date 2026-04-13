"use client";

import type { SeunYear } from "@/src/app/types/manseryeok";
import { OHAENG_COLOR } from "@/src/app/(saju)/_constants/manseryeok";
import styles from "./SeunTable.module.scss";

interface Props {
  seun: SeunYear[];
  currentYear: number;
}

const ROWS = [
  { key: "age", label: "나이" },
  { key: "year", label: "연도" },
  { key: "sipshin", label: "십신" },
  { key: "cheongan", label: "천간" },
  { key: "jiji", label: "지지" },
  { key: "jijiSipshin", label: "지지십신" },
  { key: "sibiCg", label: "12운성(천간)" },
  { key: "sibiJj", label: "12운성(지지)" },
] as const;

export default function SeunTable({ seun, currentYear }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.titleIcon}>📅</span>
        <div>
          <span className={styles.title}>세운 (歲運)</span>
          <span className={styles.sub}>연도별 운세 흐름</span>
        </div>
      </div>
      <div className={styles.scrollX}>
        <table className={styles.table}>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key} className={styles.tr}>
                <td className={styles.labelTd}>{row.label}</td>
                {seun.map((sy, i) => {
                  const isActive = sy.year === currentYear;
                  return (
                    <td
                      key={i}
                      className={`${styles.td} ${isActive ? styles.activeTd : ""}`}
                    >
                      {row.key === "age" && (
                        <span
                          className={
                            isActive ? styles.activeText : styles.dimText
                          }
                        >
                          {sy.age}세
                        </span>
                      )}
                      {row.key === "year" && (
                        <span
                          className={
                            isActive ? styles.activeYear : styles.yearText
                          }
                        >
                          {sy.year}
                        </span>
                      )}
                      {row.key === "sipshin" && (
                        <span className={styles.sipshinText}>{sy.sipshin}</span>
                      )}
                      {row.key === "cheongan" && (
                        <div className={styles.charCell}>
                          <span
                            className={styles.hanjaChar}
                            style={{ color: OHAENG_COLOR[sy.cheongan.ohaeng] }}
                          >
                            {sy.cheongan.hanja}
                          </span>
                          <span className={styles.hangulChar}>
                            {sy.cheongan.hangul}
                          </span>
                        </div>
                      )}
                      {row.key === "jiji" && (
                        <div className={styles.charCell}>
                          <span
                            className={styles.hanjaCharSm}
                            style={{ color: OHAENG_COLOR[sy.jiji.ohaeng] }}
                          >
                            {sy.jiji.hanja}
                          </span>
                          <span className={styles.hangulChar}>
                            {sy.jiji.hangul}
                          </span>
                        </div>
                      )}
                      {row.key === "jijiSipshin" && (
                        <span className={styles.sipshinText}>
                          {sy.jijiSipshin}
                        </span>
                      )}
                      {row.key === "sibiCg" && (
                        <span className={styles.unseongText}>
                          {sy.sibiUnseong.cheongan}
                        </span>
                      )}
                      {row.key === "sibiJj" && (
                        <span className={styles.unseongText}>
                          {sy.sibiUnseong.jiji}
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
