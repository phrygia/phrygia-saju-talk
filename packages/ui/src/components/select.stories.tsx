import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select, selectStyles } from "./select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    disabled: false,
    labelRequired: false,
  },
  argTypes: {
    disabled: { control: "boolean" },
    label: { control: "text" },
    labelRequired: { control: "boolean" },
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

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <option value="">선택하세요</option>
      <option value="1">옵션 1</option>
      <option value="2">옵션 2</option>
      <option value="3">옵션 3</option>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <Select id="job" label="직업" labelRequired>
      <option value="">직업을 선택하세요</option>
      <option value="developer">개발자</option>
      <option value="designer">디자이너</option>
      <option value="planner">기획자</option>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled label="비활성화">
      <option>비활성화됨</option>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select label="카테고리">
      <option value="">카테고리 선택</option>
      <optgroup label="프론트엔드">
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </optgroup>
      <optgroup label="백엔드">
        <option value="node">Node.js</option>
        <option value="python">Python</option>
      </optgroup>
    </Select>
  ),
};

function BirthDateDemo() {
  const years = Array.from({ length: 80 }, (_, i) => 2005 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div className={selectStyles.label} style={{ marginBottom: 8 }}>
          <span className={selectStyles.required}>*</span>
          생년월일
        </div>
        <div className={selectStyles.dateGrid}>
          <Select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">년도</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}년
              </option>
            ))}
          </Select>

          <Select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">월</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}월
              </option>
            ))}
          </Select>

          <Select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">일</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}일
              </option>
            ))}
          </Select>
        </div>
      </div>

      <Select label="태어난 시간" labelRequired>
        <option value="">모름</option>
        <option value="0">子(자) 23:30 ~ 01:29</option>
        <option value="1">丑(축) 01:30 ~ 03:29</option>
        <option value="2">寅(인) 03:30 ~ 05:29</option>
        <option value="3">卯(묘) 05:30 ~ 07:29</option>
        <option value="4">辰(진) 07:30 ~ 09:29</option>
        <option value="5">巳(사) 09:30 ~ 11:29</option>
        <option value="6">午(오) 11:30 ~ 13:29</option>
        <option value="7">未(미) 13:30 ~ 15:29</option>
        <option value="8">申(신) 15:30 ~ 17:29</option>
        <option value="9">酉(유) 17:30 ~ 19:29</option>
        <option value="10">戌(술) 19:30 ~ 21:29</option>
        <option value="11">亥(해) 21:30 ~ 23:29</option>
      </Select>
    </div>
  );
}

export const BirthDate: Story = {
  name: "생년월일",
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 400, padding: "32px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => <BirthDateDemo />,
};
