import { ChevronDown } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import {
  GunghapCategoryLabels,
  GunghapCategoryEmojis,
} from "@/src/app/types/gunghap";
import { type GunghapCategory } from "@/src/app/(saju)/_constants/gunghap";
import styles from "./GunghapDashboard.module.css";

interface CategoryCardProps {
  category: GunghapCategory;
  data: {
    score: number;
    description: string;
    strengths: string[];
    caution: string;
  };
  isOpen: boolean;
  onToggle: () => void;
}

export default function CategoryCard({
  category,
  data,
  isOpen,
  onToggle,
}: CategoryCardProps) {
  return (
    <div
      className={cn(styles.card, "fade-in")}
      role="button"
      onClick={onToggle}
    >
      <div className={styles.cardHeader}>
        <div className={styles.icon}>{GunghapCategoryEmojis[category]}</div>
        <div className={styles.score}>
          {data.score}
          <div className={cn(styles.arrow, isOpen && styles.open)}>
            <ChevronDown size={22} />
          </div>
        </div>
      </div>

      <div className={styles.categoryName}>
        {GunghapCategoryLabels[category]}
      </div>

      <div className={styles.bar}>
        <div style={{ width: `${data.score}%` }} />
      </div>

      <p className={cn(styles.description, !isOpen && styles.ellipsis)}>
        {data.description}
      </p>

      <div className={cn(styles.strengths, isOpen && styles.open)}>
        <div className={styles.title}>
          <span>◈</span>
          {category === "conflict" ? " 갈등이 생기는 이유" : " 잘 맞는 이유"}
        </div>
        {data.strengths.slice(0, 4).map((strength, index) => (
          <div key={index} className={styles.strength}>
            <div className={styles.index}>{index + 1}</div> {strength}
          </div>
        ))}
        <div className={styles.warning}>
          <div className={styles.warningIcon}>⚠</div>
          <div className={styles.inner}>
            <strong>주의점</strong>
            <p>{data.caution}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
