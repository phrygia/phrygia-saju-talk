"use client";

import type { OhaengBunpo, SipshinBunpo } from "@/src/app/types/manseryeok";
import {
  OHAENG_COLOR,
  OHAENG_LABEL,
  OHAENG_KEYS,
  OHAENG_NAMES,
  SIPSHIN_ITEMS,
  SIPSHIN_COLORS,
} from "@/src/app/(saju)/_constants/manseryeok";
import styles from "./OhaengBunpoSection.module.scss";

interface Props {
  ohaeng: OhaengBunpo;
  sipshin: SipshinBunpo;
}

export default function OhaengBunpoSection({ ohaeng, sipshin }: Props) {
  const total = Object.values(ohaeng).reduce((s, v) => s + v, 0) || 1;

  return (
    <div className={styles.wrap}>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>🌿 오행 분포</div>
        <div className={styles.barList}>
          {OHAENG_KEYS.map((k) => {
            const o = OHAENG_NAMES[k];
            const val = ohaeng[k];
            const pct = Math.round((val / total) * 100);
            const color = OHAENG_COLOR[o as keyof typeof OHAENG_COLOR];
            return (
              <div key={k} className={styles.barRow}>
                <div className={styles.barLabel}>
                  <span className={styles.hanja} style={{ color }}>
                    {OHAENG_LABEL[o as keyof typeof OHAENG_LABEL]}
                  </span>
                  <span className={styles.hangul}>{o}</span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
                <span className={styles.barVal}>{val}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>☯ 십신 분포</div>
        <div className={styles.chipGrid}>
          {SIPSHIN_ITEMS.map((item, i) => {
            const val = sipshin[item.key];
            const color = SIPSHIN_COLORS[i];
            return (
              <div
                key={item.key}
                className={styles.chip}
                style={{ borderColor: `${color}33`, background: `${color}0d` }}
              >
                <span className={styles.chipLabel} style={{ color }}>
                  {item.label}
                </span>
                <span className={styles.chipSub}>{item.sub}</span>
                <span className={styles.chipVal} style={{ color }}>
                  {val}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
