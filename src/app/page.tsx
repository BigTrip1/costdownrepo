"use client";

import { useTheme } from "@/context/ThemeContext";
import CategoryTile from "@/components/CategoryTile";
import { CATEGORIES } from "@/lib/data";

export default function Home() {
  const { isDarkMode } = useTheme();

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: isDarkMode ? "#000000" : "#f5f5f5",
        minHeight: "calc(100vh - 50px)",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "16px",
          height: "calc(100vh - 82px)",
          gridTemplateRows: "repeat(3, 1fr)",
        }}
      >
        {CATEGORIES.map((category) => (
          <CategoryTile
            key={category.id}
            id={category.id}
            name={category.name}
            ownerName={category.ownerName}
            monthlyData={category.monthlyData}
            forecast={category.forecast}
            budget={category.budget}
            target={category.target}
          />
        ))}
      </div>
    </div>
  );
}
