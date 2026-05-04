import dayjs from "dayjs";
import { cn } from "@repo/ui/lib/utils";
import { type BirthInfo } from "@/src/app/types/fortune";
import { type GunghapResult } from "@/src/app/types/gunghap";
import OhaengBadges from "@/src/app/(saju)/_components/gunghap/OhaengBadges";
import {
  type Side,
  AVATAR,
  ROLE_LABEL,
} from "@/src/app/(saju)/_constants/gunghap";
import styles from "./GunghapDashboard.module.scss";

interface PersonCardProps {
  side: Side;
  info: BirthInfo;
  saju: GunghapResult["me"] | GunghapResult["partner"];
}

export default function PersonCard({ side, info, saju }: PersonCardProps) {
  return (
    <div className={cn(styles.personCard, styles[side])}>
      <div className={cn(styles.avatar, styles[side])}>{AVATAR[side]}</div>
      <p className={styles.role}>{ROLE_LABEL[side]}</p>
      {info.name && <div className={styles.name}>{info.name}</div>}
      {info.birthDate && (
        <div className={styles.birth}>
          {dayjs(info.birthDate).format("YYYY년 M월 D일")}
        </div>
      )}
      <div className={cn(styles.tags, styles[side])}>
        {saju?.ilgan_label && (
          <span className={styles.tag}>{saju.ilgan_label}</span>
        )}
        {saju?.dominant_element_label && (
          <span className={styles.tag}>{saju.dominant_element_label}</span>
        )}
      </div>
      <OhaengBadges wonkuk={saju?.wonkuk ?? []} />
    </div>
  );
}
