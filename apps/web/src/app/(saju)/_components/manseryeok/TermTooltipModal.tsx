"use client";

import { TERM_GUIDE } from "@/src/app/(saju)/_constants/manseryeok";
import styles from "./TermTooltipModal.module.scss";

interface Props {
  term: string;
  onClose: () => void;
}

export default function TermTooltipModal({ term, onClose }: Props) {
  const entry = TERM_GUIDE[term];

  if (!entry) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>{term}란?</span>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="닫기"
          >
            ×
          </button>
        </div>
        <div className={styles.body}>
          <p className={styles.subtitle}>{entry.subtitle}</p>
          <div className={styles.cardList}>
            {entry.cards.map((card, i) => (
              <div key={i} className={styles.card}>
                <span className={styles.cardTitle}>{card.title}</span>
                <p className={styles.cardDesc}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
