"use client";

import dayjs from "dayjs";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@repo/ui/lib/utils";
import { Select } from "@repo/ui/components/select";
import { Button } from "@repo/ui/components/button";
import type { BirthInfo } from "@/src/app/types/fortune";
import {
  BIRTH_TIMES,
  BirthCalendarLabels,
  BirthGenderLabels,
} from "@/src/app/types/fortune";
import ConfirmModal from "@/src/components/ui/ConfirmModal";
import { deleteProfile, updataProfile } from "@/src/app/(saju)/_actions/user";
import { useUserStore } from "@/src/store/user.store";
import { useBirthInfoModalStore } from "@/src/store/modal.store";
import styles from "./BirthInfoForm.module.scss";

const YEARS = Array.from({ length: 87 }, (_, i) => 2026 - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-[4px] text-[11px] font-semibold text-foreground-sub tracking-[0.06em]">
      <span className="text-[#f87171]">*</span> {children}
    </label>
  );
}

export default function BirthInfoForm({
  initialInfo,
}: {
  initialInfo?: BirthInfo | null;
}) {
  const birthInfo = useUserStore((s) => s.birthInfo);
  const setBirthInfo = useUserStore((s) => s.setBirthInfo);
  const clearBirthInfo = useUserStore((s) => s.clearBirthInfo);
  const { closeBirthInfoModal } = useBirthInfoModalStore();

  const [gender, setGender] = useState<"male" | "female" | null>(
    initialInfo?.gender ?? null,
  );
  const [calendarType, setCalendarType] = useState<"solar" | "lunar" | null>(
    initialInfo?.calendarType ?? null,
  );
  const [year, setYear] = useState<number | "">(
    initialInfo?.birthDate ? Number(initialInfo.birthDate.split("-")[0]) : "",
  );
  const [month, setMonth] = useState<number | "">(
    initialInfo?.birthDate ? Number(initialInfo.birthDate.split("-")[1]) : "",
  );
  const [day, setDay] = useState<number | "">(
    initialInfo?.birthDate ? Number(initialInfo.birthDate.split("-")[2]) : "",
  );
  const [birthTime, setBirthTime] = useState(
    initialInfo?.birthTime ?? "unknown",
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const maxDays =
    year && month
      ? dayjs(
          `${Number()}-${String(Number(month)).padStart(2, "0")}-01`,
        ).daysInMonth()
      : 31;
  const days = Array.from({ length: maxDays }, (_, i) => i + 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    if (!gender) {
      return setError("gender");
    }
    if (!calendarType) {
      return setError("calendarType");
    }
    if (!year || !month || !day) {
      return setError("birth");
    }

    setLoading(true);

    const info: BirthInfo = {
      gender,
      calendarType,
      birthDate: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      birthTime,
    };

    const result = await updataProfile(info);

    if (result.success) {
      setBirthInfo(info);
      closeBirthInfoModal();
      toast.success("생일 정보가 저장 되었어요.");
    } else {
      toast.error("생일 저장에 실패했어요. 잠시 후 다시 시도해주세요.");
    }

    setLoading(false);
  };

  const handleDeleteBirth = async () => {
    setLoading(true);

    const result = await deleteProfile();

    if (result.success) {
      toast.success("생일 정보가 삭제 되었어요.");

      setGender(null);
      setCalendarType(null);
      setYear("");
      setMonth("");
      setDay("");
      setBirthTime("unknown");

      clearBirthInfo();
    } else {
      toast.error("생일 삭제에 실패했어요. 잠시 후 다시 시도해주세요.");
    }

    setModalOpen(false);
    setLoading(false);
  };

  const errorClass =
    "mt-[4px] text-xs line0height-[16px] text-red-400 font-medium";

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center pb-4">
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="text-center">
            <div className="w-[44px] h-[44px] rounded-[14px] bg-[linear-gradient(135deg,rgba(99,102,241,0.2),rgba(124,92,252,0.15))] border border-[rgba(124,92,252,0.25)] flex items-center justify-center text-[20px] mx-auto mb-[16px] shadow-[0_0_20px_rgba(124,92,252,0.2)]">
              ☯
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              사주 정보 입력
            </h2>
            <p className="text-xs text-foreground-muted mt-2 mb-7">
              생년월일을 입력하면 오늘의 운세를 알려드려요
            </p>
          </div>
          <div className="space-y-2">
            <Label>성별</Label>
            <div className="grid grid-cols-2 gap-2">
              {(["male", "female"] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  className={cn(
                    styles.button,
                    gender === g && styles.selected,
                    error === "gender" && "border-red-400",
                  )}
                  onClick={() => {
                    setGender(g);
                    if (error === "gender") setError(null);
                  }}
                >
                  {BirthGenderLabels[g]}
                </button>
              ))}
            </div>
            {error === "gender" && (
              <p className={errorClass}>성별을 선택해주세요.</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>양/음력</Label>
            <div className="grid grid-cols-2 gap-2">
              {(["solar", "lunar"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setCalendarType(type);
                    if (error === "calendarType") setError(null);
                  }}
                  className={cn(
                    styles.button,
                    calendarType === type && styles.selected,
                    error === "calendarType" && "border-red-400",
                  )}
                >
                  {BirthCalendarLabels[type]}
                </button>
              ))}
            </div>
            {error === "calendarType" && (
              <p className={errorClass}>양력/음력을 선택해주세요.</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2 items-end">
              <div>
                <Select
                  id="year"
                  label="생년월일"
                  labelRequired={true}
                  value={year}
                  className={cn(error === "birth" && "border-red-400")}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (error === "birth" && value && month && day) {
                      setError(null);
                    }
                    setYear(value ? Number(value) : "");
                  }}
                >
                  <option value="">년도</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}년
                    </option>
                  ))}
                </Select>
              </div>
              <Select
                value={month}
                className={cn(error === "birth" && "border-red-400")}
                onChange={(e) => {
                  const { value } = e.target;
                  if (error === "birth" && year && value && day) {
                    setError(null);
                  }
                  setMonth(value ? Number(value) : "");
                  setDay("");
                }}
              >
                <option value="">월</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}월
                  </option>
                ))}
              </Select>
              <Select
                value={day}
                className={cn(error === "birth" && "border-red-400")}
                onChange={(e) => {
                  const { value } = e.target;
                  if (error === "birth" && year && month && value) {
                    setError(null);
                  }
                  setDay(value ? Number(value) : "");
                }}
              >
                <option value="">일</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}일
                  </option>
                ))}
              </Select>
            </div>
            {error === "birth" && (
              <p className={errorClass}>생년월일을 모두 선택해주세요.</p>
            )}
          </div>
          <div className="space-y-2">
            <Select
              value={birthTime}
              label="태어난 시간"
              labelRequired
              onChange={(e) => {
                setBirthTime(e.target.value);
              }}
            >
              {BIRTH_TIMES.map((bt) => (
                <option key={bt.value} value={bt.value}>
                  {bt.label}
                </option>
              ))}
            </Select>
          </div>
          <div
            className={cn(
              "grid mt-8 grid-cols-1 gap-2",
              birthInfo && "grid-cols-2",
            )}
          >
            <Button
              fullWidth
              type="submit"
              size="lg"
              className="h-[48px] font-semibold !text-sm"
              disabled={
                loading || !gender || !calendarType || !year || !month || !day
              }
            >
              저장하기
            </Button>
            {birthInfo && (
              <Button
                fullWidth
                type="button"
                variant="danger"
                size="lg"
                className="h-[48px] font-semibold !text-sm"
                onClick={() => setModalOpen(true)}
                disabled={
                  loading || !gender || !calendarType || !year || !month || !day
                }
              >
                삭제하기
              </Button>
            )}
          </div>
        </form>
      </div>
      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteBirth}
        disabled={loading}
        className="max-w-[270px]"
      >
        <h2 className="mb-10 text-lg font-semibold">
          생일정보를 삭제하시겠습니까?
        </h2>
      </ConfirmModal>
    </>
  );
}
