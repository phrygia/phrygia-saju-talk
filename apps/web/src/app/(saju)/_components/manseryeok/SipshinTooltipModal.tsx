"use client";

import {
  SIPSHIN_DESC,
  POSITION_DESC,
} from "@/src/app/(saju)/_constants/manseryeok";
import styles from "./SipshinTooltipModal.module.scss";

interface Props {
  sipshin: string;
  position: string;
  onClose: () => void;
}

export default function SipshinTooltipModal({
  sipshin,
  position,
  onClose,
}: Props) {
  const sipshinInfo = SIPSHIN_DESC[sipshin];
  const positionInfo = POSITION_DESC[position];

  if (!sipshinInfo) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>{sipshin} 읽기</span>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="닫기"
          >
            ×
          </button>
        </div>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>{sipshinInfo.title}</div>
            <p className={styles.cardDesc}>{sipshinInfo.desc}</p>
          </div>
          {positionInfo && (
            <div className={styles.card}>
              <div className={styles.cardTitle}>{positionInfo.title}</div>
              <p className={styles.cardDesc}>{positionInfo.desc}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
