"use client";

import React, { Suspense, useRef, useState } from "react";
import "dayjs/locale/ko";
import toast from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import { useUserStore } from "@/src/store/user.store";
import ChatHeader from "@/src/app/(saju)/_components/layout/ChatHeader";
import { type BirthInfo } from "@/src/app/types/fortune";
import GunghapDashboard from "@/src/app/(saju)/_components/gunghap/GunghapDashboard";
import PersonInfoForm from "@/src/app/(saju)/_components/gunghap/PersonInfoForm";
import ErrorFallback from "@/src/app/(saju)/_components/ErrorFallback";
import styles from "./GunghapInfo.module.scss";

function GunghapLoading() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loadingHeart}>
        <span>♥</span>
        <span>♡</span>
        <span>♥</span>
      </div>
      <h2>사주를 분석하고 있습니다</h2>
      <p>두 분의 인연을 살피는 중…</p>
      <div className={styles.dots}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default function GunghapInfo() {
  const { birthInfo } = useUserStore();
  const [step, setStep] = useState<"input" | "result">("input");
  const [error, setError] = useState<string | null>(null);
  const [myInfo, setMyInfo] = useState<BirthInfo | null>(null);
  const [partnerInfo, setPartnerInfo] = useState<BirthInfo | null>(null);
  const myInfoRef = useRef<HTMLFormElement>(null);
  const partnerInfoRef = useRef<HTMLFormElement>(null);

  const checkBirthForm = (formData: FormData) => {
    const data: Record<string, FormDataEntryValue> = {};

    for (const [key, value] of formData.entries()) {
      if (key.endsWith("-gender")) data.gender = value;
      if (key.endsWith("-calendarType")) data.calendarType = value;
      if (key === "year") data.year = value;
      if (key === "month") data.month = value;
      if (key === "day") data.day = value;
      if (key === "birthTime") data.birthTime = value;
      if (key === "name") data.name = value;
    }

    if (
      !data.gender ||
      !data.calendarType ||
      !data.year ||
      !data.month ||
      !data.day ||
      !data.birthTime
    ) {
      return false;
    }

    return {
      gender: data.gender,
      calendarType: data.calendarType,
      birthDate: `${data.year}-${String(data.month).padStart(2, "0")}-${String(
        data.day,
      ).padStart(2, "0")}`,
      birthTime: data.birthTime,
      name: typeof data.name === "string" ? data.name : null,
    } as BirthInfo;
  };

  const handleGunghapResult = () => {
    setError(null);

    const myFormData = checkBirthForm(new FormData(myInfoRef.current!));
    if (myFormData) {
      setMyInfo(myFormData);
    } else {
      toast.error("내 생년월일을 모두 입력해주세요.");
      return setError("내 생년월일을 모두 입력해주세요.");
    }

    const partnerFormData = checkBirthForm(
      new FormData(partnerInfoRef.current!),
    );
    if (partnerFormData) {
      setPartnerInfo(partnerFormData);
    } else {
      toast.error("상대방 생년월일을 모두 입력해주세요.");
      return setError("상대방 생년월일을 모두 입력해주세요.");
    }

    setStep("result");
  };

  return (
    <>
      <ChatHeader title="궁합 분석" />

      <div className="overflow-y-auto">
        {step === "input" && (
          <div className="p-[28px] px-5 pb-10 md:px-[32px]">
            <div className="mb-[28px]">
              <div>
                <p className="text-rose text-[11px]">
                  <span>♡</span> COUPLE SAJU · 커플 궁합
                </p>
                <h2 className="font-serif-kr font-medium text-[28px] mt-2.5 mb-2">
                  궁합 정보 입력
                </h2>
                <p className="text-foreground-sub text-xs">
                  두 사람의 사주로 인연의 깊이를 알아보세요.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 items-start md:grid-cols-[1fr_auto_1fr]">
              <PersonInfoForm
                side="me"
                initialInfo={birthInfo}
                ref={myInfoRef}
              />
              <div className={styles.vs}>
                <div className={styles.line} />
                <div className={styles.icon}>♥</div>
                <div className={styles.line} />
              </div>
              <PersonInfoForm
                side="partner"
                initialInfo={null}
                ref={partnerInfoRef}
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button
              type="button"
              className={styles.submitButton}
              onClick={handleGunghapResult}
            >
              ✦ 궁합 보기 <span>→</span>
            </button>
          </div>
        )}

        {step === "result" && (
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            resetKeys={[myInfo, partnerInfo]}
          >
            <Suspense fallback={<GunghapLoading />}>
              <GunghapDashboard
                onReset={() => setStep("input")}
                myInfo={myInfo!}
                partnerInfo={partnerInfo!}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </>
  );
}
