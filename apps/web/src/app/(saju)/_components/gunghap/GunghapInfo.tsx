"use client";

import React, { Suspense, useRef, useState } from "react";
import "dayjs/locale/ko";
import { ErrorBoundary } from "react-error-boundary";
import { useUserStore } from "@/src/store/user.store";
import ChatHeader from "@/src/app/(saju)/_components/layout/ChatHeader";
import BirthInfoForm from "@/src/app/(saju)/_components/birth/BirthInfoForm";
import { type BirthInfo } from "@/src/app/types/fortune";
import GunghapDashboard from "./GunghapDashboard";
import ErrorFallback from "@/src/app/(saju)/_components/ErrorFallback";
import styles from "./GunghapInfo.module.scss";

export default function GunghapInfo() {
  const { birthInfo } = useUserStore();
  const [step, setStep] = useState<"input" | "result">("input");
  const birthInfoRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <ChatHeader title="궁합 분석" />
      <div className="overflow-y-auto">
        {step === "input" && (
          <div className="p-[28px] px-5 pb-10 md:px-[32px]">
            <div className="mb-[28px]">
              <div>
                <p className="text-gold text-[11px]">
                  <span>✦</span> 궁합 · 相性
                </p>
                <h2 className="font-serif-kr font-medium text-[28px] mt-2.5 mb-2">
                  궁합 분석
                </h2>
                <p className="text-foreground-sub text-xs">
                  두 사람의 사주로 인연의 깊이를 알아보세요.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 items-start md:grid-cols-[1fr_auto_1fr]">
              <div className={styles.box}>
                <div className={styles.tag}>
                  {birthInfo ? "나의 사주" : "나의 정보"}
                </div>
                {birthInfo ? (
                  <div>나주 성종</div>
                ) : (
                  <BirthInfoForm
                    initialInfo={null}
                    hideHeader
                    hideSubmitButton
                    hideDeleteButton
                    ref={birthInfoRef}
                  />
                )}
              </div>
              <div className={styles.vs}>
                <div className={styles.line} />
                <div className={styles.icon}>💑</div>
                <div className={styles.line} />
              </div>
              <div className={styles.box}>
                <div className={`${styles.tag} ${styles.partner}`}>
                  상대방 정보
                </div>
                <BirthInfoForm
                  initialInfo={null}
                  hideHeader
                  hideDeleteButton
                  submitTitle="✦ 궁합 분석하기"
                  onSubmit={(info: BirthInfo) => {
                    console.log("연인 정보:", info);
                    console.log(birthInfoRef.current);
                    // const formData = new FormData(birthInfoRef.current!);
                    // console.log(formData.get("gender"));
                    // for (const [key, value] of formData.entries()) {
                    //   console.log(value);
                    // }
                    setStep("result");
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {step === "result" && (
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            resetKeys={[
              birthInfo!.gender,
              birthInfo!.calendarType,
              birthInfo!.birthDate,
              birthInfo!.birthTime,
              //
            ]}
          >
            <Suspense fallback={<p>loading...</p>}>
              <GunghapDashboard
                myInfo={{
                  gender: "female",
                  calendarType: "solar",
                  birthDate: "1989-08-17",
                  birthTime: "sul",
                  name: "이채연",
                }}
                partnerInfo={{
                  gender: "male",
                  calendarType: "solar",
                  birthDate: "1986-07-19",
                  birthTime: "sul",
                  name: "",
                }}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </>
  );
}
