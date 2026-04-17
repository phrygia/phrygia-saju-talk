"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { createClient } from "@/src/lib/supabase/client";
import { loginPageType } from "@/src/app/types/user";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { checkPasswordStrength } from "@/src/lib/password";
import PasswordStrengthIndicator from "@/src/components/ui/PasswordStrengthIndicator";

const signupSchema = z
  .object({
    email: z.email({ message: "유효한 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자리 이상이어야 합니다." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export default function SignupForm({
  onChangeTab,
}: {
  onChangeTab: (status: loginPageType) => void;
}) {
  const supabase = useMemo(() => createClient(), []);
  const [done, setDone] = useState<boolean>(false);
  const [strength, setStrength] = useState<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (formData: { email: string; password: string }) => {
    const { email, password } = formData;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "/api/user",
      },
    });

    console.log(error);

    if (error) {
      toast.error("회원가입에 실패했어요. 잠시 후 다시 시도해주세요.");
    } else {
      toast.success("회원가입 성공!");

      onChangeTab("signupComplete");
      setDone(true);
      reset();
    }
  };

  return (
    <>
      {done ? (
        <div className="flex flex-col items-center justify-center px-4 py-4 text-center">
          <div className="flex flex-col justify-center items-center">
            <div className="w-[64px] h-[64px] rounded-full bg-[linear-gradient(135deg,rgba(52,211,153,0.15),rgba(52,211,153,0.05))] border border-[rgba(52,211,153,0.3)] flex items-center justify-center text-[28px]">
              ✓
            </div>
            <div className="font-serif-kr font-semibold text-[20px] text-foreground mb-2.5 mt-5">
              가입이 완료되었어요!
            </div>
            <p className="text-xs text-foreground-sub font-medium leading-5">
              이메일로 인증 메일을 발송했습니다.
              <br />
              인증 후 로그인하여 사주 상담을 시작해보세요.
            </p>
            <Button
              type="button"
              size="lg"
              className="mt-5 font-semibold !h-[48px]"
              disabled={isSubmitting}
              style={{ borderRadius: 12, padding: "0 30px" }}
              onClick={() => onChangeTab("login")}
            >
              로그인하기
            </Button>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Input
                type="email"
                label="이메일"
                labelRequired
                id="email"
                placeholder="name@example.com"
                variant={errors.email ? "error" : "default"}
                errorMessage={errors.email?.message}
                style={{ background: "white" }}
                {...register("email")}
              />
            </div>
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
                  const passwordStrength = checkPasswordStrength(
                    e.target.value,
                  );
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
              disabled={isSubmitting}
              style={{ borderRadius: 12 }}
            >
              {isSubmitting ? "가입 중..." : "회원가입"}
            </Button>
          </form>
        </>
      )}
    </>
  );
}
