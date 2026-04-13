"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { createClient } from "@/src/lib/supabase/client";
import AuthLayout from "@/src/components/auth/AuthLayout";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";

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

export default function SignupForm() {
  const supabase = useMemo(() => createClient(), []);

  const [done, setDone] = useState(false);

  const {
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (formData: { email: string; password: string }) => {
    const { email, password } = formData;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: "/api/user" },
    });

    if (error) {
      toast.error("회원가입에 실패했어요. 잠시 후 다시 시도해주세요.");
    } else {
      toast.success("회원가입 성공!");

      setDone(true);
      reset();
    }
  };

  return (
    <AuthLayout>
      {done ? (
        <div className="flex flex-col items-center justify-center px-4 text-center">
          <div className="w-full">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-2xl">
              ✉️
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                이메일을 확인해주세요
              </h2>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground">{getValues("email")} </span>
                으로
                <br />
                인증 링크를 발송했어요.
              </p>
            </div>
            <Link
              href="/login"
              className="h-[48px] mt-6 flex items-center justify-center text-center mt-2 rounded border border-[var(--default-border-color)] bg-white hover:bg-[#d9d9d9] transition-all hover:font-semibold text-black"
            >
              로그인
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-7 space-y-1">
            <h1 className="text-xl font-semibold text-foreground text-center">
              회원가입
            </h1>
          </div>
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
                {...register("password")}
              />
            </div>
            <div className="space-y-1.5">
              <Input
                type="password"
                label="비밀번호 재입력"
                labelRequired
                id="confirmPassword"
                minLength={8}
                variant={errors.confirmPassword ? "error" : "default"}
                errorMessage={errors.confirmPassword?.message}
                placeholder="비밀번호를 다시 입력해주세요. "
                {...register("confirmPassword")}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              fullWidth
              className="mt-6 font-semibold !h-[48px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "가입 중..." : "회원가입"}
            </Button>
          </form>
        </>
      )}
    </AuthLayout>
  );
}
