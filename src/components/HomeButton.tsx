"use client";

import Link from "next/link";
import { useState } from "react";

interface HomeButtonProps {
  isDarkMode: boolean;
}

export default function HomeButton({ isDarkMode }: HomeButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "36px",
          height: "36px",
          backgroundColor: isHovered ? "#333" : "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          transition: "background-color 0.2s ease",
          marginRight: "8px",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </div>
    </Link>
  );
}
