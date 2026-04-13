import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { Input } from "./input";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = { args: { children: "이메일 주소" } };

export const WithInput: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 6, width: 280 }}
    >
      <Label htmlFor="email">이메일</Label>
      <Input id="email" type="email" placeholder="hello@example.com" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 6, width: 280 }}
    >
      <Label htmlFor="name">
        이름 <span style={{ color: "red" }}>*</span>
      </Label>
      <Input id="name" placeholder="홍길동" required />
    </div>
  ),
};
