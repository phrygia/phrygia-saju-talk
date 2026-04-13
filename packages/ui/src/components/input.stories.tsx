import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { variant: "default" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error", "warning"],
    },
    disabled: { control: "boolean" },
    labelRequired: { control: "boolean" },
    label: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, padding: "24px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "이메일을 입력하세요",
    variant: "default",
  },
};

export const WithLabel: Story = {
  args: {
    id: "email",
    type: "email",
    label: "이메일",
    labelRequired: true,
    placeholder: "hello@example.com",
    variant: "default",
  },
};

export const WithIcon: Story = {
  name: "아이콘 포함",
  args: {
    label: "검색",
    placeholder: "상담 내역을 검색하세요",
    icon: "🔍",
    variant: "default",
  },
};

export const Error: Story = {
  name: "오류",
  args: {
    label: "이메일",
    labelRequired: true,
    id: "email-error",
    type: "email",
    placeholder: "hello@example.com",
    defaultValue: "invalid-email",
    variant: "error",
    errorMessage: "올바른 이메일 형식을 입력해주세요.",
  },
};

export const Warning: Story = {
  name: "경고",
  args: {
    label: "닉네임",
    id: "nickname-warning",
    placeholder: "닉네임을 입력하세요",
    defaultValue: "사용자123",
    variant: "warning",
    warningMessage: "이미 사용 중인 닉네임입니다.",
  },
};

export const Disabled: Story = {
  name: "비활성화",
  args: {
    label: "이메일",
    placeholder: "이메일을 입력하세요",
    defaultValue: "user@example.com",
    disabled: true,
  },
};

export const AllVariants: Story = {
  name: "전체 상태",
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 20, width: 320 }}
    >
      <Input label="기본" labelRequired placeholder="내용을 입력하세요" />
      <Input label="아이콘" placeholder="검색어를 입력하세요" icon="🔍" />
      <Input
        label="오류"
        labelRequired
        variant="error"
        defaultValue="잘못된 값"
        errorMessage="올바른 값을 입력해주세요."
      />
      <Input
        label="경고"
        variant="warning"
        defaultValue="확인 필요"
        warningMessage="입력값을 다시 확인해주세요."
      />
      <Input label="비활성화" defaultValue="수정 불가" disabled />
    </div>
  ),
};
