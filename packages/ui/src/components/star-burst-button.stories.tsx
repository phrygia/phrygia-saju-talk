import type { Meta, StoryObj } from "@storybook/react";
import { StarBurstButton } from "./star-burst-button";

const meta: Meta<typeof StarBurstButton> = {
  title: "Components/StarBurstButton",
  component: StarBurstButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "gold", "ghost"],
      description: "버튼 스타일 변형",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "버튼 크기",
    },
    fullWidth: {
      control: "boolean",
      description: "전체 너비",
    },
    particleCount: {
      control: { type: "range", min: 4, max: 16, step: 1 },
      description: "클릭 시 생성되는 별 파티클 수",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 (파티클 효과도 비활성화됨)",
    },
    children: {
      control: "text",
      description: "버튼 레이블",
    },
  },
};

export default meta;

type Story = StoryObj<typeof StarBurstButton>;

export const Default: Story = {
  args: {
    children: "✦ 운세 보기",
    variant: "default",
    size: "default",
    particleCount: 8,
  },
};

export const Small: Story = {
  args: {
    children: "✦ 새 상담",
    variant: "default",
    size: "sm",
    particleCount: 6,
  },
};

export const Large: Story = {
  args: {
    children: "✦ 사주 상담 시작하기",
    variant: "default",
    size: "lg",
    particleCount: 10,
  },
};

export const Secondary: Story = {
  args: {
    children: "사주 원국 보기",
    variant: "secondary",
    size: "default",
    particleCount: 8,
  },
};

export const Gold: Story = {
  args: {
    children: "✦ 오늘의 운세",
    variant: "gold",
    size: "default",
    particleCount: 8,
  },
};

export const Ghost: Story = {
  args: {
    children: "더 보기",
    variant: "ghost",
    size: "default",
    particleCount: 8,
  },
};

export const Disabled: Story = {
  args: {
    children: "사주 정보 없음",
    variant: "default",
    size: "default",
    disabled: true,
  },
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        alignItems: "center",
      }}
    >
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--muted, rgba(180,155,255,0.5))",
          margin: 0,
        }}
      >
        클릭해보세요 ✦
      </p>
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <StarBurstButton variant="default">✦ Default</StarBurstButton>
        <StarBurstButton variant="secondary">Secondary</StarBurstButton>
        <StarBurstButton variant="gold">✦ Gold</StarBurstButton>
        <StarBurstButton variant="ghost">Ghost</StarBurstButton>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <StarBurstButton size="sm">✦ Small</StarBurstButton>
      <StarBurstButton size="default">✦ Default</StarBurstButton>
      <StarBurstButton size="lg">✦ Large</StarBurstButton>
    </div>
  ),
};

export const UseCases: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
        minWidth: 320,
      }}
    >
      <StarBurstButton variant="default" size="lg" style={{ width: 240 }}>
        ✦ 오늘의 운세 보기
      </StarBurstButton>
      <div style={{ display: "flex", gap: 10 }}>
        <StarBurstButton variant="secondary" size="default">
          사주 원국 보기
        </StarBurstButton>
        <StarBurstButton variant="default" size="default">
          ✦ 새 상담
        </StarBurstButton>
      </div>
      <StarBurstButton variant="gold" size="default">
        ✦ 운세 카드 저장
      </StarBurstButton>
      <StarBurstButton variant="ghost" size="sm" particleCount={6}>
        더 보기
      </StarBurstButton>
    </div>
  ),
};
