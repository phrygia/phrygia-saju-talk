import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Menu } from "./menu";

const meta: Meta<typeof Menu.Dropdown> = {
  title: "Components/Menu",
  component: Menu.Dropdown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicDropdown: Story = {
  render: () => (
    <Menu.Dropdown header={<Menu.Header>편집</Menu.Header>}>
      <Menu.DropdownItem>첫 번째 메뉴</Menu.DropdownItem>
      <Menu.DropdownItem>두 번째 메뉴</Menu.DropdownItem>
      <Menu.DropdownItem>세 번째 메뉴</Menu.DropdownItem>
    </Menu.Dropdown>
  ),
};

export const WithSeparatorAndDanger: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`<Menu.Separator />`로 구분선, `danger` prop으로 빨간색 위험 액션을 표시합니다.",
      },
    },
  },
  render: () => (
    <Menu.Dropdown>
      <Menu.DropdownItem left="👤">회원 정보</Menu.DropdownItem>
      <Menu.DropdownItem left="☯">사주 정보 수정</Menu.DropdownItem>
      <Menu.DropdownItem
        left="⚙️"
        right={<Menu.DropdownIcon name="icon-setting-mono" />}
      >
        설정
      </Menu.DropdownItem>
      <Menu.Separator />
      <Menu.DropdownItem danger left="🗑">
        채팅 기록 삭제
      </Menu.DropdownItem>
      <Menu.DropdownItem danger left="↪">
        로그아웃
      </Menu.DropdownItem>
    </Menu.Dropdown>
  ),
};

export const TriggerWithCheckItems: Story = {
  render: () => {
    const TriggerDemo = () => {
      const [open, setOpen] = useState(false);
      const [selected, setSelected] = useState(1);
      return (
        <div
          style={{
            minHeight: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Menu.Trigger
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            placement="bottom"
            dropdown={
              <Menu.Dropdown
                header={<Menu.Header>항목을 선택하세요</Menu.Header>}
              >
                {[1, 2, 3].map((n) => (
                  <Menu.DropdownCheckItem
                    key={n}
                    checked={selected === n}
                    onCheckedChange={(checked) => checked && setSelected(n)}
                  >
                    {n}번째 메뉴
                  </Menu.DropdownCheckItem>
                ))}
              </Menu.Dropdown>
            }
          >
            <button
              type="button"
              style={{
                border: "1px solid rgba(124,92,252,0.25)",
                borderRadius: 10,
                fontSize: 13,
                padding: "9px 16px",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(124,92,252,0.08)",
                color: "var(--violet, #a78bfa)",
                cursor: "pointer",
              }}
            >
              {selected}번 선택됨 ▾
            </button>
          </Menu.Trigger>
        </div>
      );
    };
    return <TriggerDemo />;
  },
};
