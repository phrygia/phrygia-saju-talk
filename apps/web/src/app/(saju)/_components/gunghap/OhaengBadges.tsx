import { OHAENG } from "@/src/constants/saju";
import styles from "./GunghapDashboard.module.scss";

const ohaengColorMap = Object.values(OHAENG).reduce(
  (acc, cur) => {
    acc[cur.hanja] = cur.color;
    acc[cur.hangul] = cur.color;
    return acc;
  },
  {} as Record<string, string>,
);

export default function OhaengBadges({ wonkuk }: { wonkuk: string[] }) {
  if (!wonkuk?.length) return null;

  return (
    <div className={styles.wonkuk}>
      {wonkuk.map((cheongan, index) => {
        const color = ohaengColorMap[cheongan];
        return (
          <div key={index} style={{ background: `${color}18` }}>
            <span style={{ color }}>{cheongan}</span>
          </div>
        );
      })}
    </div>
  );
}
