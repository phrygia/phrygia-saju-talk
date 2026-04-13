import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "danger", "disabled", "loading"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    loading: {
      control: "select",
      options: [true, false],
    },
    fullWidth: {
      control: "select",
      options: [true, false],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  parameters: {
    controls: {
      include: ["fullWidth"],
    },
  },
  args: { size: "default", children: "Default" },
};

export const Small: Story = {
  parameters: {
    controls: {
      include: ["fullWidth"],
    },
  },
  args: { size: "sm", children: "Small", fullWidth: false },
};

export const Large: Story = {
  parameters: {
    controls: {
      include: ["fullWidth"],
    },
  },
  args: { size: "lg", children: "Large", fullWidth: false },
};

export const Secondary: Story = {
  parameters: {
    controls: {
      include: ["size", "fullWidth"],
    },
  },
  args: {
    variant: "secondary",
    children: "Secondary",
    size: "default",
    fullWidth: false,
  },
};

export const Danger: Story = {
  parameters: {
    controls: {
      include: ["size", "fullWidth"],
    },
  },
  args: {
    variant: "danger",
    children: "삭제하기",
    size: "default",
    fullWidth: false,
  },
};

export const Disabled: Story = {
  parameters: {
    controls: {
      include: ["size", "disabled", "fullWidth"],
    },
  },
  args: {
    variant: "disabled",
    children: "Disabled",
    size: "default",
    disabled: true,
    fullWidth: false,
  },
};

export const Loading: Story = {
  parameters: {
    controls: {
      include: ["size", "fullWidth"],
    },
  },
  args: {
    variant: "loading",
    children: "Loading",
    size: "default",
    loading: true,
    fullWidth: false,
  },
};
