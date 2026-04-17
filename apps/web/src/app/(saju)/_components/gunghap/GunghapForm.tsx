"use client";

import React from "react";
import { useUserStore } from "@/src/store/user.store";
import ChatHeader from "@/src/app/(saju)/_components/layout/ChatHeader";
import BirthInfoForm from "@/src/app/(saju)/_components/birth/BirthInfoForm";

export default function GunghapForm() {
  const { birthInfo, isLoading } = useUserStore();

  return (
    <div>
      <ChatHeader />
    </div>
  );
}
