"use client";

import React from "react";
import { UserRoundPen } from "lucide-react";
import {
  BirthCalendarLabels,
  BirthGenderLabels,
  type BirthInfo,
} from "@/src/app/types/fortune";
import { getBirthTimeLabel } from "@/src/lib/fortune";
import { useBirthInfoModalStore } from "@/src/store/modal.store";

export default function SimpleBirthInfo({
  initialBirthInfo,
  changeable = false,
}: {
  initialBirthInfo: BirthInfo | null;
  changeable?: boolean;
}) {
  const { openBirthInfoModal } = useBirthInfoModalStore();

  return (
    <div className="flex justify-center items-center text-xs">
      {initialBirthInfo?.birthDate &&
        initialBirthInfo.birthDate.replaceAll("-", "/")}
      {initialBirthInfo?.calendarType &&
        ` ${BirthCalendarLabels[initialBirthInfo.calendarType]}`}
      {initialBirthInfo?.birthTime &&
        ` ${getBirthTimeLabel(initialBirthInfo.birthTime)}`}
      {initialBirthInfo?.gender &&
        ` ${BirthGenderLabels[initialBirthInfo.gender]}`}
      {changeable && (
        <button
          type="button"
          className="ml-1.5"
          onClick={() => openBirthInfoModal()}
        >
          <UserRoundPen strokeWidth={1.6} size={16} />
        </button>
      )}
    </div>
  );
}
