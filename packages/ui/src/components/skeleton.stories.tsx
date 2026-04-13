import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    rounded: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: { style: { width: 200, height: 20 } },
};

export const Circle: Story = {
  args: { rounded: true, style: { width: 48, height: 48 } },
};

export const CardSkeleton: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 300 }}
    >
      <Skeleton style={{ height: 160, width: "100%" }} />
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Skeleton rounded style={{ width: 40, height: 40, flexShrink: 0 }} />
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}
        >
          <Skeleton style={{ height: 14, width: "70%" }} />
          <Skeleton style={{ height: 12, width: "50%" }} />
        </div>
      </div>
      <Skeleton style={{ height: 12, width: "100%" }} />
      <Skeleton style={{ height: 12, width: "90%" }} />
      <Skeleton style={{ height: 12, width: "60%" }} />
    </div>
  ),
};

export const ListSkeleton: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Skeleton rounded style={{ width: 44, height: 44, flexShrink: 0 }} />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <Skeleton style={{ height: 14, width: "65%" }} />
            <Skeleton style={{ height: 12, width: "45%" }} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const TextBlock: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 8, width: 280 }}
    >
      <Skeleton style={{ height: 20, width: "80%" }} />
      <Skeleton style={{ height: 14, width: "100%" }} />
      <Skeleton style={{ height: 14, width: "95%" }} />
      <Skeleton style={{ height: 14, width: "75%" }} />
    </div>
  ),
};
