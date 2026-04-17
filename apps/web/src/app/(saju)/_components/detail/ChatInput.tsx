"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { MoveUp } from "lucide-react";
import { useUserStore } from "@/src/store/user.store";
import { createConversation } from "@/src/app/(saju)/_actions/conversation";
import { useBirthInfoModalStore } from "@/src/store/modal.store";
import { BirthInfo } from "@/src/app/types/fortune";
import { saveChatMessage } from "@/src/app/(saju)/_lib/services/message";
import styles from "./ChatInput.module.scss";

interface ChatInputProps {
  value: string;
  onChange: any;
  onSubmit?: any;
  initialConversationId?: string;
  disabled?: boolean;
  formRef?: React.Ref<HTMLFormElement>;
  initialBirthInfo?: BirthInfo | null;
}

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  initialConversationId = "",
  disabled = false,
  formRef,
  initialBirthInfo = null,
}: ChatInputProps) {
  const user = useUserStore((s) => s.user);
  const { openBirthInfoModal } = useBirthInfoModalStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState<string>(
    initialConversationId,
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!user?.id) {
      return toast.error("로그인이 필요합니다.");
    }

    if (!initialBirthInfo?.birthDate) return openBirthInfoModal();

    setLoading(true);

    let convId = conversationId;
    if (!convId) {
      const result = await createConversation(value, initialBirthInfo);

      if (!result.success) {
        setLoading(false);
        return toast.error(result.message || "대화 생성에 실패했습니다.");
      }
      convId = result.data!;

      setConversationId(convId);
    }

    const result = await saveChatMessage(convId, "user", value);

    if (!result.success) {
      setLoading(false);

      return toast.error(result.message || "메시지 저장에 실패했습니다.");
    }

    if (onSubmit) await onSubmit(convId);

    setLoading(false);
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.root}>
      <form ref={formRef} onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className={styles.inputWrapper}>
          <textarea
            value={value}
            ref={textareaRef}
            disabled={disabled || loading}
            onChange={onChange}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="사주에 대해 궁금한 것을 물어보세요."
            className={styles.textarea}
          />
          {value.trim().length > 0 && (
            <button
              type="submit"
              disabled={disabled || loading}
              className={styles.sendButton}
            >
              <MoveUp strokeWidth={2.2} size={16} />
            </button>
          )}
        </div>
        <p className={styles.hint}>
          AI가 제공하는 운세는 재미로 참고해주세요. 중요한 결정은 신중하게!
        </p>
      </form>
    </div>
  );
}
