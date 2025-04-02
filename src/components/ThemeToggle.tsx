"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: "transparent",
        border: `2px solid ${isDarkMode ? "#444" : "#ddd"}`,
        borderRadius: "20px",
        padding: "8px 16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: isDarkMode ? "#fff" : "#000",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = isDarkMode ? "#333" : "#f0f0f0";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {isDarkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
