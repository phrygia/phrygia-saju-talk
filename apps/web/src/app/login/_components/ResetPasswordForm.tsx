"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { checkPasswordStrength } from "@/src/lib/password";
import PasswordStrengthIndicator from "@/src/components/ui/PasswordStrengthIndicator";
import { useUserStore } from "@/src/store/user.store";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자리 이상이어야 합니다." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export default function ResetPasswordForm() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [strength, setStrength] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (formData: { password: string }) => {
    setLoading(true);
    setError("");

    const { password } = formData;

    try {
      const { error, data } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        let errorMessage = error.message;

        if (error.message.includes("Auth session missing")) {
          errorMessage = "이메일 링크가 만료되었습니다. 다시 요청해주세요.";
        } else if (error.message.includes("New password should be different")) {
          errorMessage = "새 비밀번호는 이전 비밀번호와 달라야 합니다.";
        }

        setError(errorMessage);
        return toast.error(error.message);
      }

      reset();
      setUser({ id: data?.user?.id, email: data?.user?.email });
      toast.success("비밀번호가 성공적으로 변경되었습니다.");

      router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center mb-2.5">
          <button
            type="button"
            className="w-5 h-5 mr-1 text-foreground-muted"
            onClick={() => router.push("/login")}
          >
            ←
          </button>
          <h1 className="font-serif-kr font-semibold text-[20px] text-foreground">
            새 비밀번호 설정
          </h1>
        </div>
        <p className="text-xs text-foreground-sub mb-6 font-medium">
          안전한 비밀번호로 변경해주세요
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Input
            type="password"
            label="비밀번호"
            labelRequired
            id="password"
            minLength={8}
            variant={errors.password ? "error" : "default"}
            errorMessage={errors.password?.message}
            placeholder="비밀번호를 입력해주세요. (8자이상)"
            style={{ background: "white" }}
            {...register("password")}
            onChange={(e) => {
              register("password").onChange(e);
              const passwordStrength = checkPasswordStrength(e.target.value);
              setStrength(passwordStrength);
            }}
          />
        </div>
        <PasswordStrengthIndicator strength={strength} />
        <div className="space-y-1.5">
          <Input
            type="password"
            label="비밀번호 확인"
            labelRequired
            id="confirmPassword"
            minLength={8}
            variant={errors.confirmPassword ? "error" : "default"}
            errorMessage={errors.confirmPassword?.message}
            placeholder="비밀번호를 다시 입력해주세요."
            style={{ background: "white" }}
            {...register("confirmPassword")}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          fullWidth
          className="mt-6 font-semibold !h-[48px]"
          disabled={isSubmitting || loading}
          style={{ borderRadius: 12 }}
        >
          비밀번호 변경하기
        </Button>
        {error && (
          <p className="-mt-1.5 text-[11px] leading-[16px] text-[#f87171] font-medium">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
