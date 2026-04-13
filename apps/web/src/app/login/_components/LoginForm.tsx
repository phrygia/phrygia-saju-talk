"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { createClient } from "@/src/lib/supabase/client";
import AuthLayout from "@/src/components/auth/AuthLayout";
import { useUserStore } from "@/src/store/user.store";

const loginSchema = z.object({
  email: z.email({ message: "유효한 이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 8자리 이상이어야 합니다." }),
});

export default function LoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const setUser = useUserStore((s) => s.setUser);

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "test@test.com", password: "12345678" },
  });

  const onSubmit = async (formData: { email: string; password: string }) => {
    setLoading(true);

    const { email, password } = formData;

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return toast.error("이메일 또는 비밀번호가 올바르지 않아요.");
      }

      setUser({ id: data?.user?.id, email: data?.user?.email });

      toast.success("로그인 성공!");
      router.replace("/");

      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-7 space-y-1">
        <h1 className="text-xl font-semibold text-foreground text-center">
          로그인
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <Input
            type="email"
            label="이메일"
            labelRequired
            id="email"
            placeholder="이메일을 입력해주세요."
            variant={errors.email ? "error" : "default"}
            errorMessage={errors.email?.message}
            {...register("email")}
          />
        </div>
        <div className="mb-5">
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
        <Button
          type="submit"
          size="lg"
          fullWidth
          className="mt-6 font-semibold !h-[48px]"
          loading={isSubmitting}
          disabled={loading}
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </Button>
      </form>
      <Link
        href="/signup"
        className="h-[48px] flex items-center justify-center text-center mt-2 rounded border border-[var(--default-border-color)] bg-white hover:bg-[#d9d9d9] transition-all hover:font-semibold  text-black"
      >
        회원가입
      </Link>
    </AuthLayout>
  );
}
