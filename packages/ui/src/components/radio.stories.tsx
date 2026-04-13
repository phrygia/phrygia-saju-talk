import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./radio";

const jobOptions = [
  {
    label: "개발자",
    value: "developer",
    description: "서비스를 구현하고 기능을 개발해요",
  },
  {
    label: "디자이너",
    value: "designer",
    description: "화면과 사용자 경험을 설계해요",
  },
  {
    label: "기획자",
    value: "planner",
    description: "기능 흐름과 우선순위를 정리해요",
  },
];

const meta: Meta<typeof RadioGroup> = {
  title: "Components/Radio",
  component: RadioGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    name: "job",
    label: "직업",
    labelRequired: false,
    direction: "vertical",
    defaultValue: "developer",
    options: jobOptions,
  },
  argTypes: {
    label: {
      control: "text",
    },
    labelRequired: {
      control: "boolean",
    },
    direction: {
      control: "inline-radio",
      options: ["vertical", "horizontal"],
    },
    disabled: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "상담 방식",
    labelRequired: true,
    name: "consulting",
    defaultValue: "chat",
    options: [
      {
        label: "채팅 상담",
        value: "chat",
        description: "텍스트로 천천히 내용을 확인해요",
      },
      {
        label: "전화 상담",
        value: "call",
        description: "빠르게 핵심만 상담할 수 있어요",
      },
      {
        label: "대면 상담",
        value: "offline",
        description: "직접 만나 깊이 있게 이야기해요",
      },
    ],
  },
};

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
  },
};

export const DisabledOption: Story = {
  args: {
    name: "status",
    label: "이용 상태",
    options: [
      {
        label: "사용 가능",
        value: "active",
        description: "즉시 선택할 수 있어요",
      },
      {
        label: "준비 중",
        value: "pending",
        description: "곧 제공될 예정이에요",
        disabled: true,
      },
    ],
    defaultValue: "active",
  },
};
