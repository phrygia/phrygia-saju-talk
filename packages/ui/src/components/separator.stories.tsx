import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 320, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", height: 40, alignItems: "center", gap: 16 }}>
      <span className="text-sm">항목 1</span>
      <Separator orientation="vertical" />
      <span className="text-sm">항목 2</span>
      <Separator orientation="vertical" />
      <span className="text-sm">항목 3</span>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <p className="text-sm font-medium">위 섹션</p>
      <Separator className="my-4" />
      <p className="text-sm font-medium">아래 섹션</p>
    </div>
  ),
};
