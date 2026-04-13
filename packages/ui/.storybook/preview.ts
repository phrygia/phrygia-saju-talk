import React from "react";
import type { Preview } from "@storybook/react";
import "../src/styles.css";
const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for all stories",
      defaultValue: "light",
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.theme === "dark";
      if (typeof document !== "undefined") {
        const root = document.documentElement;
        root.classList.toggle("dark", isDark);
        root.classList.toggle("light", !isDark);
      }
      return React.createElement(
        "div",
        {
          className: isDark ? "dark" : "light",
          style: {
            minHeight: "100vh",
            padding: 16,
            backgroundColor: "var(--color-background)",
            color: "var(--color-foreground)",
            transition: "background-color 0.2s ease, color 0.2s ease",
          },
        },
        React.createElement(Story),
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};
export default preview;
