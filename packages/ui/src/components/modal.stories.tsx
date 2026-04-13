import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal, modalStyles } from "./modal";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Modal>;

function ToggleGroup({
  label,
  options,
  required,
}: {
  label: string;
  options: string[];
  required?: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "var(--foreground-sub)",
          letterSpacing: "0.08em",
          marginBottom: 8,
          display: "flex",
          gap: 4,
        }}
      >
        {label}
        {required && <span style={{ color: "#f87171", fontSize: 11 }}>*</span>}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${options.length}, 1fr)`,
          gap: 8,
        }}
      >
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setSelected(opt)}
            style={{
              padding: "11px 10px",
              borderRadius: 12,
              border: `1px solid ${selected === opt ? "rgba(124,92,252,0.5)" : "rgba(124,92,252,0.18)"}`,
              background:
                selected === opt
                  ? "linear-gradient(135deg,rgba(99,102,241,0.25),rgba(124,92,252,0.2))"
                  : "rgba(124,92,252,0.06)",
              color:
                selected === opt ? "var(--violet)" : "var(--foreground-sub)",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'Noto Sans KR', sans-serif",
              fontWeight: selected === opt ? 600 : 400,
              transition: "all 0.18s",
              boxShadow:
                selected === opt ? "0 0 12px rgba(124,92,252,0.15)" : "none",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function SelectField({
  label,
  options,
  required,
}: {
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "var(--foreground-sub)",
          letterSpacing: "0.08em",
          marginBottom: 8,
          display: "flex",
          gap: 4,
        }}
      >
        {label}
        {required && <span style={{ color: "#f87171", fontSize: 11 }}>*</span>}
      </div>
      <select
        style={{
          width: "100%",
          padding: "11px 14px",
          borderRadius: 12,
          border: "1px solid rgba(124,92,252,0.18)",
          background: "rgba(124,92,252,0.06)",
          color: "var(--foreground-sub)",
          fontSize: 13,
          fontFamily: "'Noto Sans KR', sans-serif",
          outline: "none",
          cursor: "pointer",
        }}
      >
        {options.map((o) => (
          <option key={o} style={{ background: "#100d38" }}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function DemoModal(args: React.ComponentProps<typeof Modal>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
        background: "var(--background)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          padding: "10px 22px",
          borderRadius: 12,
          border: "1px solid rgba(124,92,252,0.3)",
          background: "rgba(124,92,252,0.12)",
          color: "var(--foreground)",
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "'Noto Sans KR', sans-serif",
        }}
      >
        모달 열기
      </button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

function SajuInfoModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
        background: "var(--background)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          padding: "10px 22px",
          borderRadius: 12,
          border: "1px solid rgba(124,92,252,0.3)",
          background: "rgba(124,92,252,0.12)",
          color: "var(--foreground)",
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "'Noto Sans KR', sans-serif",
        }}
      >
        사주 정보 입력
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        icon="☯"
        title="사주 정보 입력"
        subtitle="정확한 운세 분석을 위해 생년월일시를 입력해주세요"
        footer={
          <>
            <button
              type="button"
              className={modalStyles.btnPrimary}
              onClick={() => setIsOpen(false)}
            >
              저장하기
            </button>
            <button
              type="button"
              className={modalStyles.btnDanger}
              onClick={() => setIsOpen(false)}
            >
              삭제하기
            </button>
          </>
        }
      >
        <ToggleGroup label="성별" options={["남성 ♂", "여성 ♀"]} required />
        <ToggleGroup label="달력 유형" options={["양력", "음력"]} required />
        <SelectField
          label="출생년도"
          options={["1990년", "1991년", "1992년", "1993년", "1994년", "1995년"]}
          required
        />
        <SelectField
          label="출생월"
          options={[
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월",
          ]}
          required
        />
        <SelectField
          label="출생일"
          options={Array.from({ length: 31 }, (_, i) => `${i + 1}일`)}
          required
        />
        <ToggleGroup
          label="태어난 시간을 알고 계신가요?"
          options={["알아요", "모르겠어요"]}
        />
      </Modal>
    </div>
  );
}

export const Default: Story = {
  args: {
    title: "기본 모달",
    subtitle: "서브타이틀을 여기에 입력하세요",
    icon: "✦",
    closeOnOverlayClick: true,
    closeOnEsc: true,
    lockScroll: true,
    hideTopCloseButton: false,
  },
  render: (args) => (
    <DemoModal
      {...args}
      footer={
        <>
          <button type="button" className={modalStyles.btnGhost}>
            취소
          </button>
          <button type="button" className={modalStyles.btnPrimary}>
            확인
          </button>
        </>
      }
    >
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: "var(--foreground-sub)",
          fontFamily: "'Noto Sans KR', sans-serif",
        }}
      >
        전역 포털 방식으로 렌더링되는 기본 모달입니다. Esc, 오버레이 클릭으로
        닫을 수 있습니다.
      </p>
    </DemoModal>
  ),
};

export const Persistent: Story = {
  args: {
    title: "필수 확인 모달",
    subtitle: "이 작업은 되돌릴 수 없습니다",
    icon: "⚠️",
    closeOnOverlayClick: false,
    closeOnEsc: false,
    lockScroll: true,
    hideTopCloseButton: false,
  },
  render: (args) => (
    <DemoModal
      {...args}
      footer={
        <>
          <button type="button" className={modalStyles.btnGhost}>
            취소
          </button>
          <button type="button" className={modalStyles.btnDanger}>
            확인
          </button>
        </>
      }
    >
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: "var(--foreground-sub)",
          fontFamily: "'Noto Sans KR', sans-serif",
        }}
      >
        오버레이 클릭과 Esc 키로 닫히지 않는 모달입니다. 버튼을 통해서만 닫을 수
        있습니다.
      </p>
    </DemoModal>
  ),
};

export const SajuInfo: Story = {
  name: "사주정보 입력",
  render: () => <SajuInfoModal />,
};
