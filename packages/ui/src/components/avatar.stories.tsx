import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const WithFallback: Story = { args: { fallback: "이채연", size: "md" } };

export const Small: Story = { args: { fallback: "LC", size: "sm" } };

export const Large: Story = { args: { fallback: "SajuTalk", size: "lg" } };

export const WithImage: Story = {
  args: {
    src: "https://avatars.githubusercontent.com/u/1?v=4",
    alt: "GitHub User",
    size: "md",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar fallback="SM" size="sm" />
      <Avatar fallback="MD" size="md" />
      <Avatar fallback="LG" size="lg" />
    </div>
  ),
};
