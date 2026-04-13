import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = { args: { placeholder: "내용을 입력하세요..." } };

export const WithValue: Story = {
  args: { defaultValue: "이미 입력된 내용입니다." },
};

export const Disabled: Story = {
  args: { placeholder: "비활성화됨", disabled: true },
};

export const Tall: Story = {
  args: { placeholder: "긴 텍스트 영역", style: { minHeight: 160 } },
};
