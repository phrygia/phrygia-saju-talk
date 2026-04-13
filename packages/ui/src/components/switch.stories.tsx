import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    checkedChildren: {
      control: "text",
    },
    unCheckedChildren: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  parameters: {
    controls: {
      include: ["size"],
    },
  },
  args: { size: "md" },
};

export const Small: Story = {
  parameters: {
    controls: {
      include: ["size"],
    },
  },
  args: { size: "sm" },
};

export const Disabled: Story = {
  parameters: {
    controls: {
      include: ["disabled"],
    },
  },
  args: { disabled: true },
};

export const WithText: Story = {
  parameters: {
    controls: {
      exclude: ["disabled", "id"],
    },
  },
  args: { size: "md", checkedChildren: "ON", unCheckedChildren: "OFF" },
};
