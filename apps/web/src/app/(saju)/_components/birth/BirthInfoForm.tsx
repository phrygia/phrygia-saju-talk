"use client";

import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Input } from "@repo/ui/components/input";
import styles from "./BirthInfoForm.module.scss";

const errorClass =
  "mt-[4px] text-[11px] leading-[16px] text-[#f87171] font-medium";

const YEARS = Array.from({ length: 87 }, (_, i) => 2026 - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

const birthInfoSchema = z.object({
  gender: z.enum(["male", "female"], {
    message: "성별을 선택해주세요.",
  }),
  calendarType: z.enum(["solar", "lunar"], {
    message: "양력/음력을 선택해주세요.",
  }),
  year: z.string().min(1, "년도를 선택해주세요."),
  month: z.string().min(1, "월을 선택해주세요."),
  day: z.string().min(1, "일을 선택해주세요."),
  birthTime: z.string(),
  name: z
    .string()
    .regex(/^[a-zA-Z0-9가-힣]*$/, {
      message: "특수문자와 공백은 사용할 수 없습니다.",
    })
    .optional(),
});

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-[4px] text-[11px] font-semibold text-foreground-sub tracking-[0.06em]">
      <span className="text-[#f87171]">*</span> {children}
    </label>
  );
}

interface BirthInfoFormProps {
  initialInfo?: BirthInfo | null;
  submitTitle?: string;
  hideSubmitButton?: boolean;
  hideDeleteButton?: boolean;
  hideHeader?: boolean;
  onSubmit?: ((info: BirthInfo) => void) | null;
  ref?: React.Ref<HTMLFormElement>;
}

export default function BirthInfoForm({
  initialInfo,
  submitTitle = "저장하기",
  hideSubmitButton = false,
  hideDeleteButton = false,
  hideHeader = false,
  onSubmit: onSubmitProp = null,
  ref = null,
}: BirthInfoFormProps) {
  const { birthInfo, setBirthInfo, clearBirthInfo } = useUserStore();
  const { closeBirthInfoModal } = useBirthInfoModalStore();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [radioGenderName, setRadioGenderName] = useState<string | null>(
    "gender",
  );
  const [radioCalendarTypeName, setRadioCalendarTypeName] = useState<
    string | null
  >("calendarType");

  useEffect(() => {
    setRadioGenderName(`radio-${uuidv4()}`);
    setRadioCalendarTypeName(`radio-${uuidv4()}`);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(birthInfoSchema),
    defaultValues: {
      gender: initialInfo?.gender,
      calendarType: initialInfo?.calendarType,
      year: initialInfo?.birthDate?.split("-")[0] ?? "",
      month: initialInfo?.birthDate
        ? String(Number(initialInfo.birthDate.split("-")[1]))
        : "",
      day: initialInfo?.birthDate
        ? String(Number(initialInfo.birthDate.split("-")[2]))
        : "",
      birthTime: initialInfo?.birthTime ?? "unknown",
      name: initialInfo?.name ?? "",
    },
  });

  const watchGender = watch("gender");
  const watchCalendarType = watch("calendarType");
  const watchYear = watch("year");
  const watchMonth = watch("month");

  const maxDays =
    watchYear && watchMonth
      ? dayjs(
          `${watchYear}-${String(watchMonth).padStart(2, "0")}-01`,
        ).daysInMonth()
      : 31;
  const days = Array.from({ length: maxDays }, (_, i) => i + 1);

  useEffect(() => {
    const currentDay = Number(getValues("day"));
    if (currentDay && currentDay > maxDays) {
      setValue("day", "", { shouldValidate: false });
    }
  }, [watchYear, watchMonth, maxDays, getValues, setValue]);

  const onSubmit = async (data: any) => {
    const info: BirthInfo = {
      gender: data.gender,
      calendarType: data.calendarType,
      birthDate: `${data.year}-${data.month.padStart(2, "0")}-${data.day.padStart(2, "0")}`,
      birthTime: data.birthTime,
      name: data.name,
    };

    if (onSubmitProp) {
      return onSubmitProp(info);
    }

    const result = await updataProfile(info);

    if (result.success) {
      setBirthInfo(info);
      closeBirthInfoModal();
      toast.success("생일 정보가 저장 되었어요.");
    } else {
      toast.error("생일 저장에 실패했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleDeleteBirth = async () => {
    setDeleting(true);

    const result = await deleteProfile();

    if (result.success) {
      toast.success("생일 정보가 삭제 되었어요.");
      reset({
        gender: undefined,
        calendarType: undefined,
        year: "",
        month: "",
        day: "",
        birthTime: "unknown",
        name: "",
      });
      clearBirthInfo();
    } else {
      toast.error("생일 삭제에 실패했어요. 잠시 후 다시 시도해주세요.");
    }

    setModalOpen(false);
    setDeleting(false);
  };

  const loading = isSubmitting || deleting;

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center pb-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-5"
          ref={ref}
        >
          {!hideHeader && (
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
          )}
          <div className="space-y-2">
            <Label>성별</Label>
            <div className="grid grid-cols-2 gap-2">
              {(["male", "female"] as const).map((g) => (
                <div key={g}>
                  <input
                    type="radio"
                    id={`${radioGenderName}-${g}`}
                    value={g}
                    {...register("gender")}
                    name={radioGenderName!}
                    className={styles.radio}
                    onChange={(e) => {
                      setValue("gender", g, { shouldValidate: true });
                    }}
                  />
                  <label
                    htmlFor={`${radioGenderName}-${g}`}
                    className={cn(
                      styles.radioLabel,
                      watchGender === g && styles.selected,
                    )}
                  >
                    {BirthGenderLabels[g]}
                  </label>
                </div>
              ))}
            </div>
            {errors.gender && (
              <p className={errorClass}>{errors.gender.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>양/음력</Label>
            <div className="grid grid-cols-2 gap-2">
              {(["solar", "lunar"] as const).map((type) => (
                <div key={type}>
                  <input
                    type="radio"
                    id={`${radioCalendarTypeName}-${type}`}
                    value={type}
                    {...register("calendarType")}
                    name={radioCalendarTypeName!}
                    className={styles.radio}
                    onChange={(e) => {
                      setValue("calendarType", type, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  <label
                    htmlFor={`${radioCalendarTypeName}-${type}`}
                    className={cn(
                      styles.radioLabel,
                      watchCalendarType === type && styles.selected,
                      errors.calendarType && "border-red-400",
                    )}
                  >
                    {BirthCalendarLabels[type]}
                  </label>
                </div>
              ))}
            </div>
            {errors.calendarType && (
              <p className={errorClass}>{errors.calendarType.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2 items-end">
              <div>
                <Select
                  id="year"
                  label="생년월일"
                  labelRequired
                  className={cn(errors.year && "border-red-400")}
                  {...register("year")}
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
                className={cn(errors.month && "border-red-400")}
                {...register("month")}
              >
                <option value="">월</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}월
                  </option>
                ))}
              </Select>
              <Select
                className={cn(errors.day && "border-red-400")}
                {...register("day")}
              >
                <option value="">일</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}일
                  </option>
                ))}
              </Select>
            </div>
            {(errors.year || errors.month || errors.day) && (
              <p className={errorClass}>생년월일을 모두 선택해주세요.</p>
            )}
          </div>
          <div className="space-y-2">
            <Select
              label="태어난 시간"
              labelRequired
              {...register("birthTime")}
            >
              {BIRTH_TIMES.map((bt) => (
                <option key={bt.value} value={bt.value}>
                  {bt.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Input
              label="이름"
              id="name"
              placeholder="이름을 입력해주세요 (선택)"
              variant={errors.name ? "error" : "default"}
              errorMessage={errors.name?.message}
              {...register("name")}
            />
          </div>
          <div
            className={cn(
              "grid mt-8 grid-cols-1 gap-2",
              birthInfo && !hideDeleteButton && "grid-cols-2",
            )}
          >
            {!hideSubmitButton && (
              <Button
                fullWidth
                type="submit"
                size="lg"
                className="h-[48px] font-semibold !text-sm"
                disabled={loading}
              >
                {submitTitle}
              </Button>
            )}
            {birthInfo && !hideDeleteButton && (
              <Button
                fullWidth
                type="button"
                variant="danger"
                size="lg"
                className="h-[48px] font-semibold !text-sm"
                onClick={() => setModalOpen(true)}
                disabled={loading}
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
        icon="🗑"
        title="생일 정보 삭제"
        subtitle={<>생일정보를 삭제하시겠습니까?</>}
      />
    </>
  );
}
