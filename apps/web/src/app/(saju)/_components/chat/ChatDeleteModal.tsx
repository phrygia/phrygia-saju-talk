import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { usePendingChatStore } from "@/src/store/chat.store";
import { deleteAllConversationMessages } from "../../_actions/conversation";
import ConfirmModal from "@/src/components/ui/ConfirmModal";

interface ChatDeleteModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ChatDeleteModal({
  open,
  onClose,
}: ChatDeleteModalProps) {
  const params = useParams();
  const router = useRouter();
  const { setPending } = usePendingChatStore();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState<boolean>(false);

  const handleAllDeleteConversations = async () => {
    setLoading(true);

    try {
      const result = await deleteAllConversationMessages();

      if (!result.success) {
        return toast.error(
          result.message ||
            "채팅 기록 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.",
        );
      }

      if (params?.id) router.replace("/");

      setPending();
      queryClient.invalidateQueries({ queryKey: ["conversations"] });

      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      onConfirm={handleAllDeleteConversations}
      disabled={loading}
      icon="🗑"
      title="채팅 기록 삭제"
      subtitle={
        <>
          모든 상담 내역이 영구적으로 삭제됩니다.
          <br /> 이 작업은 되돌릴 수 없습니다.
        </>
      }
    />
  );
}
