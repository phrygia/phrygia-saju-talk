"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ChatHeader from "@/src/app/(saju)/_components/layout/ChatHeader";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { useUserStore } from "@/src/store/user.store";
import { changeUserPassword, deleteUser } from "@/src/app/(saju)/_actions/user";
import ConfirmModal from "@/src/components/ui/ConfirmModal";
import { checkPasswordStrength } from "@/src/lib/password";
import PasswordStrengthIndicator from "@/src/components/ui/PasswordStrengthIndicator";

const editSchema = z
  .object({
    email: z.email({ message: "유효한 이메일 형식이 아닙니다." }),
    currentPassword: z
      .string()
      .min(8, { message: "비밀번호는 8자리 이상이어야 합니다." }),
    newPassword: z
      .string()
      .min(8, { message: "새 비밀번호는 8자리 이상이어야 합니다." }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmNewPassword"],
  });
type EditFormValues = z.infer<typeof editSchema>;

export default function UserEditForm() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);

  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [strength, setStrength] = useState<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      email: "",
      currentPassword: "",
      confirmNewPassword: "",
    },
  });
  useEffect(() => {
    if (!user?.email) return;
    reset({
      email: user.email,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  }, [user?.email, reset]);

  const onSubmit = async (formData: EditFormValues) => {
    clearErrors();
    const { currentPassword, newPassword } = formData;
    const result = await changeUserPassword(currentPassword, newPassword);
    if (!result.success) {
      if (result.message.includes("현재 비밀번호가")) {
        setError("currentPassword", {
          type: "custom",
          message: "현재 비밀번호가 틀렸습니다.",
        });
      }
      if (result.message.includes("새 비밀번호는 현재")) {
        setError("newPassword", {
          type: "custom",
          message: "새 비밀번호는 현재 비밀번호와 달라야 합니다.",
        });
      }
      toast.error(result.message || "비밀번호 변경에 실패했습니다.");
    } else {
      toast.success("비밀번호가 성공적으로 변경되었습니다.");
      reset();
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const result = await deleteUser();
      if (!result.success) {
        toast.error(result.message || "계정 삭제에 실패했습니다.");
      } else {
        toast.success("계정이 성공적으로 삭제되었습니다.");
        router.replace("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <>
        <ChatHeader title="회원 정보" />
        <p className="text-center text-foreground">
          사용자 정보를 불러오는 중입니다...
        </p>
      </>
    );
  }

  return (
    <>
      <ChatHeader title="회원 정보" />
      <div className="overflow-y-auto">
        <div className="max-w-[480px] w-full mx-auto px-4 py-8">
          <div>
            <p className="text-violet text-[11px]">Account · 계정 설정</p>
            <h2 className="font-serif-kr font-medium text-[28px] mt-2.5 mb-2">
              회원 정보
            </h2>
            <p className="text-foreground-sub text-xs">
              이메일 및 비밀번호를 변경할 수 있습니다
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-7 p-6 bg-[linear-gradient(135deg,rgba(248,245,255,0.97),rgba(238,232,255,0.97))] border border-[rgba(100,65,160,0.12)] dark:bg-[linear-gradient(135deg,rgba(20,16,58,0.9),rgba(12,10,40,0.9))] dark:border-[var(--border)] rounded-[20px]"
          >
            {user?.email && (
              <div className="mb-5">
                <Input
                  type="email"
                  label="이메일"
                  id="email"
                  readOnly
                  value={user.email}
                  icon="🔒"
                />
              </div>
            )}
            <div className="mb-5">
              <Input
                type="password"
                label="현재 비밀번호"
                labelRequired
                id="currentPassword"
                minLength={8}
                variant={errors.currentPassword ? "error" : "default"}
                icon="✏️"
                errorMessage={errors.currentPassword?.message}
                placeholder="현재 비밀번호를 입력해주세요. (8자이상)"
                {...register("currentPassword")}
              />
            </div>
            <div className="mb-5">
              <Input
                type="password"
                label="새 비밀번호"
                labelRequired
                id="newPassword"
                minLength={8}
                variant={errors.newPassword ? "error" : "default"}
                errorMessage={errors.newPassword?.message}
                placeholder="새 비밀번호를 입력해주세요. (8자이상)"
                {...register("newPassword")}
                onChange={(e) => {
                  register("newPassword").onChange(e);
                  const passwordStrength = checkPasswordStrength(
                    e.target.value,
                  );
                  setStrength(passwordStrength);
                }}
              />
            </div>
            <PasswordStrengthIndicator
              strength={strength}
              className="-mt-2.5 mb-3 "
            />
            <div className="mb-5">
              <Input
                type="password"
                label="새 비밀번호 확인"
                labelRequired
                id="confirmNewPassword"
                minLength={8}
                variant={errors.confirmNewPassword ? "error" : "default"}
                errorMessage={errors.confirmNewPassword?.message}
                placeholder="새 비밀번호를 한번 더 입력해주세요."
                {...register("confirmNewPassword")}
              />
            </div>
            <Button
              type="submit"
              fullWidth
              className="mt-6 h-11! font-semibold"
              disabled={loading || isSubmitting}
            >
              {isSubmitting ? "수정 중..." : "수정하기"}
            </Button>
          </form>
          <div className="flex justify-between mt-4 p-6 rounded-[20px] bg-[rgba(248,113,113,0.04)] border border-[rgba(248,113,113,0.12)] dark:bg-[rgba(248,113,113,0.05)] dark:border-[rgba(248,113,113,0.15)]">
            <div>
              <h3 className="text-[#f87171] text-xs font-semibold mb-2">
                계정 탈퇴
              </h3>
              <p className="text-[11px] text-foreground-muted">
                모든 상담 내역이 삭제되며 복구할 수 없습니다.
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              variant="danger"
              className="h-8! !w-18"
              onClick={() => setModalOpen(true)}
              disabled={loading || isSubmitting}
            >
              {isSubmitting ? "탈퇴 중..." : "탈퇴하기"}
            </Button>
          </div>
        </div>
      </div>
      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteAccount}
        disabled={loading || isSubmitting}
        icon="🗑"
        title="회원 탈퇴"
        subtitle={
          <>
            정말로 계정을 삭제하시겠습니까? <br />이 작업은 되돌릴 수 없습니다.
          </>
        }
      />
    </>
  );
}
