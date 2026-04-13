import React from "react";
import { addons, types, useGlobals } from "storybook/manager-api";
const TOOL_ID = "doctalk/theme-toggle";
function ThemeToggleTool() {
  const [{ theme }, updateGlobals] = useGlobals();
  const createButton = (value: "light" | "dark", label: string) => {
    const isActive = theme === value;
    return React.createElement(
      "button",
      {
        key: value,
        type: "button",
        title: label,
        "aria-label": label,
        onClick: () => updateGlobals({ theme: value }),
        style: {
          border: "1px solid var(--sb-toolbar-border, #d9d9d9)",
          background: isActive
            ? "var(--sb-color-primary, #1677ff)"
            : "transparent",
          color: isActive ? "#fff" : "var(--sb-color-default-text, inherit)",
          borderRadius: 6,
          padding: "4px 10px",
          fontSize: 12,
          lineHeight: 1.2,
          cursor: "pointer",
        },
      },
      label,
    );
  };
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center",
        padding: "0 4px",
      },
    },
    createButton("light", "Light"),
    createButton("dark", "Dark"),
  );
}
addons.register(TOOL_ID, () => {
  addons.add(TOOL_ID, {
    title: "Theme Toggle",
    type: types.TOOL,
    match: ({ tabId, viewMode }) => !tabId && Boolean(viewMode),
    render: ThemeToggleTool,
  });
});
