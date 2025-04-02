"use client";

import { useTheme } from "@/context/ThemeContext";
import HomeButton from "./HomeButton";
import ThemeToggle from "./ThemeToggle";
import { type ReactNode } from "react";

interface LayoutContentProps {
  children: ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const { isDarkMode } = useTheme();

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          height: "50px",
          backgroundColor: "#ffc107",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "120px",
              height: "100%",
              padding: "6px 12px",
            }}
          >
            <img
              src="/images/jcb-logo.png"
              alt="JCB Logo"
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              marginLeft: "16px",
              letterSpacing: "0.5px",
            }}
          >
            LDL COST DOWN
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <HomeButton isDarkMode={isDarkMode} />
          <ThemeToggle />
        </div>
      </header>
      <main style={{ flex: 1, height: `calc(100vh - 50px)` }}>{children}</main>
    </div>
  );
}
