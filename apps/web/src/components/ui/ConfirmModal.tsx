import { Modal } from "@repo/ui/components/modal";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

interface ConfirmModalProps {
  open?: boolean;
  disabled?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  className?: string;
  confirmText?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export default function ConfirmModal({
  open = false,
  disabled = false,
  onClose,
  onConfirm,
  confirmText = "확인",
  className,
  title,
  subtitle,
  icon,
  children,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      icon={icon}
      contentClassName={cn("!max-w-[360px]", className)}
      children={children}
      footer={
        <>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={disabled}
            className="!h-[45px] font-semibold"
          >
            취소
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={disabled}
            className="!h-[45px] font-semibold"
          >
            {confirmText}
          </Button>
        </>
      }
    />
  );
}
