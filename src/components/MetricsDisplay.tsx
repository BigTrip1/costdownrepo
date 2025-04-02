"use client";

import { getMetricColor } from "@/utils/metrics";

interface MetricsDisplayProps {
  forecast: number;
  budget: number;
  target: number;
  isDarkMode: boolean;
  size?: "default" | "large"; // Add size prop
}

export default function MetricsDisplay({
  forecast,
  budget,
  target,
  isDarkMode,
  size = "default", // Default size
}: MetricsDisplayProps) {
  // Determine if we're using large size
  const isLarge = size === "large";

  // Font sizes based on size prop
  const labelFontSize = isLarge ? "16px" : "14px";
  const valueFontSize = isLarge ? "20px" : "16px";
  const containerPadding = isLarge ? "8px 20px" : "4px 12px";
  const containerGap = isLarge ? "20px" : "12px";

  return (
    <div
      style={{
        display: "flex",
        gap: containerGap,
        backgroundColor: isDarkMode
          ? "rgba(0, 0, 0, 0.2)"
          : "rgba(255, 255, 255, 0.7)",
        borderRadius: "8px",
        padding: containerPadding,
        border: `1px solid ${isDarkMode ? "#444" : "#ddd"}`,
      }}
    >
      <div
        style={{ textAlign: "center", minWidth: isLarge ? "100px" : "80px" }}
      >
        <div
          style={{
            color: isDarkMode ? "#aaa" : "#666",
            fontSize: labelFontSize,
          }}
        >
          Forecast
        </div>
        <div
          style={{
            color: getMetricColor(forecast, target, budget),
            fontWeight: "bold",
            fontSize: valueFontSize,
          }}
        >
          £{forecast.toLocaleString()}
        </div>
      </div>

      <div
        style={{ textAlign: "center", minWidth: isLarge ? "100px" : "80px" }}
      >
        <div
          style={{
            color: isDarkMode ? "#aaa" : "#666",
            fontSize: labelFontSize,
          }}
        >
          Budget
        </div>
        <div
          style={{
            color: isDarkMode ? "#fff" : "#000",
            fontWeight: "bold",
            fontSize: valueFontSize,
          }}
        >
          £{budget.toLocaleString()}
        </div>
      </div>

      <div
        style={{ textAlign: "center", minWidth: isLarge ? "100px" : "80px" }}
      >
        <div
          style={{
            color: isDarkMode ? "#aaa" : "#666",
            fontSize: labelFontSize,
          }}
        >
          Target
        </div>
        <div
          style={{
            color: isDarkMode ? "#fff" : "#000",
            fontWeight: "bold",
            fontSize: valueFontSize,
          }}
        >
          £{target.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
