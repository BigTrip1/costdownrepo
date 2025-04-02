"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface CategoryTileProps {
  id: string;
  name: string;
  ownerName: string;
  monthlyData: Array<{
    month: string;
    value: number;
  }>;
  forecast: number;
  budget: number;
  target: number;
}

const getMetricColor = (
  value: number,
  target: number,
  budget: number
): string => {
  // If forecast is better than target (lower is better)
  if (value <= target) {
    return "#4caf50"; // Green
  }
  // If forecast is between target and budget
  else if (value <= budget) {
    return "#ffc107"; // Amber
  }
  // If forecast is worse than budget
  else {
    return "#ef5350"; // Red
  }
};

export default function CategoryTile({
  id,
  name,
  ownerName,
  monthlyData,
  forecast,
  budget,
  target,
}: CategoryTileProps) {
  const { isDarkMode } = useTheme();

  return (
    <Link href={`/category/${id}`}>
      <div
        style={{
          backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
          border: `2px solid ${isDarkMode ? "#333" : "#000"}`,
          borderRadius: "8px",
          padding: "12px",
          cursor: "pointer",
          transition: "transform 0.2s ease",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          animation: "subtleGlow 3s infinite",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <style jsx>{`
          @keyframes subtleGlow {
            0% {
              box-shadow: 0 0 2px rgba(255, 193, 7, 0.2);
            }
            50% {
              box-shadow: 0 0 8px rgba(255, 193, 7, 0.4);
            }
            100% {
              box-shadow: 0 0 2px rgba(255, 193, 7, 0.2);
            }
          }
        `}</style>

        <div style={{ marginBottom: "12px" }}>
          <h3
            style={{
              margin: "0 0 4px 0",
              fontSize: "18px",
              color: isDarkMode ? "#ffffff" : "#000000",
            }}
          >
            {name}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: isDarkMode ? "#aaaaaa" : "#666666",
            }}
          >
            Owner: {ownerName}
          </p>
        </div>

        {/* Graph Preview */}
        <div style={{ flex: 1, minHeight: "120px", marginBottom: "12px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: isDarkMode ? "#aaa" : "#666" }}
                axisLine={{ stroke: isDarkMode ? "#333" : "#ccc" }}
                tickLine={false}
              />
              <YAxis hide />
              <Bar
                dataKey="value"
                fill="#ffc107"
                radius={[2, 2, 0, 0]}
                maxBarSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "8px",
            fontSize: "12px",
          }}
        >
          <div>
            <div style={{ color: isDarkMode ? "#aaa" : "#666" }}>Forecast</div>
            <div
              style={{
                color: getMetricColor(forecast, target, budget),
                fontWeight: "bold",
              }}
            >
              £{forecast.toLocaleString()}
            </div>
          </div>
          <div>
            <div style={{ color: isDarkMode ? "#aaa" : "#666" }}>Budget</div>
            <div style={{ color: isDarkMode ? "#fff" : "#000" }}>
              £{budget.toLocaleString()}
            </div>
          </div>
          <div>
            <div style={{ color: isDarkMode ? "#aaa" : "#666" }}>Target</div>
            <div style={{ color: isDarkMode ? "#fff" : "#000" }}>
              £{target.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
