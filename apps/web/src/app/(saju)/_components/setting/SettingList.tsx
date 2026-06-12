"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  ScrollText,
  Trash2,
  UserCog,
  FileUser,
  LogOut,
  UserRoundX,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { createClient } from "@/src/lib/supabase/client";
import { useUserStore } from "@/src/store/user.store";
import { useBirthInfoModalStore } from "@/src/store/modal.store";
import ChatHeader from "@/src/app/(saju)/_components/layout/ChatHeader";
import ChatDeleteModal from "@/src/app/(saju)/_components/chat/ChatDeleteModal";
import UserDeleteModal from "@/src/app/(saju)/_components/user/UserDeleteModal";
import styles from "./SettingList.module.scss";

function Divide() {
  return (
    <div className="h-[1px] border-b border-b-[rgba(100,65,160,0.12)] dark:border-b-[var(--border)]" />
  );
}

export default function SettingList() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const { birthInfo } = useUserStore();
  const { openBirthInfoModal } = useBirthInfoModalStore();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [userModalOpen, setUserModalOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(
        "로그아웃 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
    } else {
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <>
      <ChatHeader title="설정" />
      <div className={styles.container}>
        <div className={styles.card}>
          <button
            type="button"
            className={styles.list}
            onClick={() => router.push("/app/notification-settings")}
          >
            <div className={styles.icon}>
              <Bell strokeWidth={1.8} size={20} />
            </div>
            알림 설정
            <ChevronRight strokeWidth={1.5} className={styles.arrow} />
          </button>
          <Divide />
          <Link href="/privacy-policy" className={styles.list}>
            <div className={styles.icon}>
              <ScrollText strokeWidth={1.7} size={20} />
            </div>{" "}
            개인정보 처리방침
            <ChevronRight strokeWidth={1.5} className={styles.arrow} />
          </Link>
          <Divide />
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className={styles.list}
          >
            <div className={styles.icon}>
              <Trash2 strokeWidth={1.6} size={21} />
            </div>{" "}
            채팅 기록 삭제
            <ChevronRight strokeWidth={1.5} className={styles.arrow} />
          </button>
        </div>

        <div className={styles.card}>
          <Link href="/user/edit" className={styles.list}>
            <div className={styles.icon}>
              <UserCog strokeWidth={1.6} size={22} />
            </div>{" "}
            회원정보 수정
            <ChevronRight strokeWidth={1.5} className={styles.arrow} />
          </Link>
          <Divide />
          <button
            type="button"
            onClick={() => openBirthInfoModal()}
            className={styles.list}
          >
            <div className={styles.icon}>
              <FileUser strokeWidth={1.5} size={22} />
            </div>{" "}
            {birthInfo ? "사주 정보 수정" : "사주 정보 입력"}
            <ChevronRight strokeWidth={1.5} className={styles.arrow} />
          </button>
        </div>

        <div className={styles.card}>
          <button
            type="button"
            onClick={async () => {
              await handleLogout();
            }}
            className={styles.list}
          >
            <div className={styles.icon}>
              <LogOut strokeWidth={1.7} size={20} />
            </div>
            로그아웃
            <ChevronRight strokeWidth={1.5} className={styles.arrow} />
          </button>
          <Divide />
          <button
            type="button"
            onClick={() => setUserModalOpen(true)}
            className={styles.list}
          >
            <div className={styles.icon}>
              <UserRoundX strokeWidth={1.7} size={20} />
            </div>
            회원 탈퇴
            <ChevronRight strokeWidth={1.5} className={styles.arrow} />
          </button>
        </div>
      </div>
      <ChatDeleteModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <UserDeleteModal
        open={userModalOpen}
        onClose={() => setUserModalOpen(false)}
      />
    </>
  );
}
