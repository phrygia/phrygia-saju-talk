import styles from "./GunghapDashboard.module.css";

const RING_RADIUS = 54;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

interface ScoreRingProps {
  score: number;
  grade: string;
}

export default function ScoreRing({ score, grade }: ScoreRingProps) {
  const ringOffset = RING_CIRCUMFERENCE * (1 - score / 100);

  return (
    <div className={styles.cardConnector}>
      <div className={styles.heartConnector}>
        <div className={styles.line} />
        <div className={styles.heart}>♥</div>
        <div className={styles.line} />
      </div>
      <div className={styles.scoreRing}>
        <svg width="130" height="130" viewBox="0 0 130 130">
          <defs>
            <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#e879f9" />
            </linearGradient>
          </defs>
          <circle
            cx="65"
            cy="65"
            r="54"
            fill="none"
            stroke="rgba(244, 114, 182, 0.12)"
            strokeWidth="8"
          />
          <circle
            cx="65"
            cy="65"
            r="54"
            fill="none"
            stroke="url(#rg)"
            strokeWidth="8"
            strokeLinecap="round"
            className={styles.progress}
            transform="rotate(-90 65 65)"
            style={{
              strokeDasharray: RING_CIRCUMFERENCE,
              strokeDashoffset: ringOffset,
            }}
          />
        </svg>
        <div className={styles.scoreInner}>
          <div className={styles.scoreNumber}>{score}</div>
          <p>/ 100</p>
        </div>
      </div>
      {grade && (
        <>
          <div className={styles.label}>궁합 점수</div>
          <div className={styles.badge}>
            ✦&nbsp;<span>{grade}</span>
          </div>
        </>
      )}
    </div>
  );
}
