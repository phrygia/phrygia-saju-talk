"use client";

import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { createClient } from "@/src/lib/supabase/client";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { loginPageType } from "@/src/app/types/user";

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordForm({
  onChangeTab,
}: {
  onChangeTab: (status: loginPageType) => void;
}) {
  const supabase = useMemo(() => createClient(), []);

  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const handleSendResetEmail = async () => {
    setError("");

    if (!regex.test(email) && email.trim().length > 0) {
      return setError("유효한 이메일 형식이 아닙니다.");
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_FRONT_URL}/login/reset-password`,
      });

      if (error) {
        toast.error("이메일 전송에 실패했습니다. 다시 시도해주세요.");
        return setError("이메일 전송에 실패했습니다. 다시 시도해주세요.");
      }

      setDone(true);
      toast.success("재설정 링크가 이메일로 전송되었습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {done ? (
        <div className="flex flex-col items-center justify-center px-4 py-4 text-center">
          <div className="flex flex-col justify-center items-center">
            <div className="w-[64px] h-[64px] rounded-full bg-[linear-gradient(135deg,rgba(52,211,153,0.15),rgba(52,211,153,0.05))] border border-[rgba(52,211,153,0.3)] flex items-center justify-center text-[28px]">
              📬
            </div>
            <div className="font-serif-kr font-semibold text-[20px] text-foreground mb-2.5 mt-5">
              메일을 확인해주세요.
            </div>
            <p className="text-xs text-foreground-sub font-medium leading-5">
              입력하신 이메일로 <br />
              비밀번호 재설정 링크를 보내드렸습니다. <br />
              메일함을 확인하신 후 링크를 클릭하여 <br />
              비밀번호를 재설정해주세요.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex items-center mb-2.5">
              <button
                type="button"
                className="w-5 h-5 mr-1 text-foreground-muted"
                onClick={() => onChangeTab("login")}
              >
                ←
              </button>
              <h1 className="font-serif-kr font-semibold text-[20px] text-foreground">
                비밀번호 재설정
              </h1>
            </div>
            <p className="text-xs text-foreground-sub mb-6 font-medium">
              가입 시 사용한 이메일을 입력하면 <br />
              재설정 링크를 보내드립니다.
            </p>
          </div>
          <div className="mb-5">
            <Input
              type="email"
              label="이메일"
              labelRequired
              id="email"
              placeholder="이메일을 입력해주세요."
              variant={error ? "error" : "default"}
              errorMessage={error}
              style={{ background: "white" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Button
              type="submit"
              size="lg"
              fullWidth
              className="mt-6 font-semibold !h-[48px]"
              loading={loading}
              disabled={loading || email.length === 0 || !regex.test(email)}
              style={{ borderRadius: 12 }}
              onClick={handleSendResetEmail}
            >
              재설정 링크 보내기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
