"use client";

import { Modal } from "@repo/ui/components/modal";
import { useBirthInfoModalStore } from "@/src/store/modal.store";
import { useUserStore } from "@/src/store/user.store";
import BirthInfoForm from "@/src/app/(saju)/_components/birth/BirthInfoForm";

export default function BirthInfoModal() {
  const birthInfo = useUserStore((s) => s.birthInfo);
  const { isOpen, closeBirthInfoModal } = useBirthInfoModalStore();

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeBirthInfoModal}
      contentClassName="max-w-md dark:border dark:border-muted-foreground/20"
    >
      <BirthInfoForm
        initialInfo={birthInfo}
        hideDeleteButton={!!birthInfo?.birthDate ? false : true}
      />
    </Modal>
  );
}
