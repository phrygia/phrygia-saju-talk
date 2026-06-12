import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ConfirmModal from "@/src/components/ui/ConfirmModal";
import { deleteUser } from "@/src/app/(saju)/_actions/user";

interface UserDeleteModalProps {
  open: boolean;
  onClose: () => void;
  disabled?: boolean;
}

export default function UserDeleteModal({
  open,
  onClose,
  disabled = false,
}: UserDeleteModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      onConfirm={handleDeleteAccount}
      disabled={loading || disabled}
      icon="🗑"
      title="회원 탈퇴"
      subtitle={
        <>
          정말로 계정을 삭제하시겠습니까? <br />이 작업은 되돌릴 수 없습니다.
        </>
      }
    />
  );
}
