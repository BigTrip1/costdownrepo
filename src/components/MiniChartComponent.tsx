"use client";

import { BarChart, Bar, ResponsiveContainer } from "recharts";
import type { MonthlyData } from "@/types";

interface MiniChartComponentProps {
  data: any[];
  color: string;
  height?: number;
  width?: number;
}

export default function MiniChartComponent({
  data,
  color,
  height = 24,
  width = 40,
}: MiniChartComponentProps) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {/* Adding a subtle background line */}
      <div
        style={{
          position: "absolute",
          bottom: "30%",
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: "rgba(255,255,255,0.1)",
          zIndex: 0,
        }}
      ></div>

      {data.map((d, i) => (
        <div
          key={i}
          style={{
            width: `${width / data.length - 1}px`,
            height: `${Math.max((d.forecast / 1500) * height, 4)}px`,
            backgroundColor: color,
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
}
