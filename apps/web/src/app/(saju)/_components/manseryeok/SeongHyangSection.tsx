"use client";

import { useState } from "react";
import type { SeongHyangData } from "@/src/app/types/manseryeok";
import styles from "./SeongHyangSection.module.scss";

interface Props {
  data: SeongHyangData;
  userName?: string;
}

const ACCORDION_ITEMS = [
  { key: "teukjing" as const, label: "특징", tag: "특징", tagColor: "#6366f1" },
  {
    key: "jaeneung" as const,
    label: "재능에 관한 이야기",
    tag: "재능",
    tagColor: "#6366f1",
  },
  {
    key: "gwan" as const,
    label: "사랑에 관한 이야기",
    tag: "관계",
    tagColor: "#6366f1",
  },
  {
    key: "geongang" as const,
    label: "건강에 관한 이야기",
    tag: "건강",
    tagColor: "#6366f1",
  },
  { key: "tip" as const, label: "팁! 하나 더", tag: "팁", tagColor: "#6366f1" },
];

export default function SeongHyangSection({
  data,
  userName = "사용자",
}: Props) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>{userName}님의 성향입니다.</h2>
      <div className={styles.cardGrid}>
        <div className={`${styles.card} ${styles.positiveCard}`}>
          <div className={styles.cardTitle}>Positive 성향</div>
          <div className={styles.cardDesc}>
            자연스럽게 드러나기 쉬운 강점과 편안한 반응 패턴입니다.
          </div>
          <ul className={styles.traitList}>
            {data.positive.map((item, i) => (
              <li key={i} className={styles.traitItem}>
                <span className={`${styles.dot} ${styles.positiveDot}`} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={`${styles.card} ${styles.negativeCard}`}>
          <div className={styles.cardTitle}>Negative 성향</div>
          <div className={styles.cardDesc}>
            무리하거나 지칠 때 더 도드라질 수 있는 경향과 주의 포인트입니다.
          </div>
          <ul className={styles.traitList}>
            {data.negative.map((item, i) => (
              <li key={i} className={styles.traitItem}>
                <span className={`${styles.dot} ${styles.negativeDot}`} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.accordion}>
        {ACCORDION_ITEMS.map((item) => {
          const isOpen = openKey === item.key;

          return (
            <div
              key={item.key}
              className={`${styles.accordionItem} ${isOpen ? styles.open : ""}`}
            >
              <button
                type="button"
                className={styles.accordionHeader}
                onClick={() => setOpenKey(isOpen ? null : item.key)}
              >
                <span
                  className={styles.accordionTag}
                  style={{
                    color: item.tagColor,
                    borderColor: `${item.tagColor}33`,
                    background: `${item.tagColor}10`,
                  }}
                >
                  {item.tag}
                </span>
                <span className={styles.accordionLabel}>{item.label}</span>
                <span className={styles.accordionIcon}>
                  {isOpen ? "×" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className={styles.accordionBody}>{data[item.key]}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
