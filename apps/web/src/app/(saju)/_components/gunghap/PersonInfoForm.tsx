import React from "react";
import BirthInfoForm from "@/src/app/(saju)/_components/birth/BirthInfoForm";
import { type BirthInfo } from "@/src/app/types/fortune";
import {
  type Side,
  AVATAR,
  ROLE_LABEL,
} from "@/src/app/(saju)/_constants/gunghap";
import { cn } from "@repo/ui/lib/utils";
import styles from "./GunghapInfo.module.scss";

export default function PersonInfoForm({
  side,
  initialInfo,
  ref,
}: {
  side: Side;
  initialInfo: BirthInfo | null;
  ref: React.Ref<HTMLFormElement> | null;
}) {
  return (
    <div
      className={cn(
        styles.box,
        side === "me" && styles.me,
        side === "partner" && styles.partner,
      )}
    >
      <div className={styles.tag}>
        <div className={styles.card}>{AVATAR[side]}</div>
        <div>
          <strong>{ROLE_LABEL[side]}</strong>
          <p>{side === "me" ? "내" : "상대방"} 정보를 입력해주세요</p>
        </div>
      </div>
      <BirthInfoForm
        initialInfo={initialInfo}
        hideHeader
        hideSubmitButton
        hideDeleteButton
        ref={ref}
      />
    </div>
  );
}
