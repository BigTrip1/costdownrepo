"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Legend,
} from "recharts";

interface BarChartProps {
  data: Array<{ month: string; value: number }>;
  isDarkMode: boolean;
  showBudgetLine?: boolean;
  budget?: number;
  target?: number;
  height?: string;
  barWidth?: number;
  fixedHeight?: boolean;
}

export default function BarChartComponent({
  data,
  isDarkMode,
  showBudgetLine = false,
  budget = 0,
  target = 0,
  height = "300px",
  barWidth = 36,
  fixedHeight = false,
}: BarChartProps) {
  const textColor = isDarkMode ? "#fff" : "#000";
  const gridColor = isDarkMode ? "#333" : "#e0e0e0";
  const tooltipBg = isDarkMode ? "#333" : "#fff";
  const tooltipBorder = isDarkMode ? "#444" : "#e0e0e0";

  // Calculate trend line data
  // This is a simple linear trend based on the first and last points
  const firstValue = data[0]?.value || 0;
  const lastValue = data[data.length - 1]?.value || 0;

  // Enhanced data with trend line and savings
  const enhancedData = data.map((item, index) => {
    // Linear interpolation for trend
    const trendValue =
      firstValue + (lastValue - firstValue) * (index / (data.length - 1));

    // Calculate potential savings (difference between value and target if value > target)
    const savings = item.value > target && target > 0 ? item.value - target : 0;

    return {
      ...item,
      trend: trendValue,
      potentialSavings: savings,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: tooltipBg,
            border: `1px solid ${tooltipBorder}`,
            padding: "12px",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <p
            style={{
              margin: "0 0 8px 0",
              color: textColor,
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              style={{
                margin: "4px 0",
                color:
                  entry.name === "Potential Savings"
                    ? "#ef5350"
                    : entry.name === "Trend"
                    ? "#4fc3f7"
                    : textColor,
                fontSize: "13px",
                fontWeight:
                  entry.name === "Potential Savings" ? "bold" : "normal",
              }}
            >
              {entry.name}: £{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Add a cluster icon component for top of bars
  const SavingsClusterIcon = ({
    x,
    y,
    width,
    savings,
  }: {
    x: number;
    y: number;
    width: number;
    savings: number;
  }) => {
    if (savings <= 0) return null;

    // Draw a downward arrow to indicate savings potential
    const arrowSize = width * 0.6;
    const centerX = x + width / 2;
    const arrowPoints = [
      [centerX - arrowSize / 2, y - 12], // top left
      [centerX + arrowSize / 2, y - 12], // top right
      [centerX, y], // bottom point
    ]
      .map((point) => point.join(","))
      .join(" ");

    return (
      <polygon
        points={arrowPoints}
        fill="#ef5350"
        stroke="#ef5350"
        strokeWidth={1}
      />
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: height,
        overflow: fixedHeight ? "hidden" : "visible",
      }}
    >
      <ResponsiveContainer>
        <ComposedChart
          data={enhancedData}
          margin={{ top: 30, right: 30, left: 20, bottom: 15 }}
          barCategoryGap={4}
          barSize={barWidth}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="month"
            tick={{ fill: textColor }}
            stroke={textColor}
          />
          <YAxis
            tick={{ fill: textColor }}
            stroke={textColor}
            tickFormatter={(value) =>
              new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
                maximumSignificantDigits: 3,
              }).format(value)
            }
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
          />
          <Legend />

          {/* Main cost bars */}
          <Bar
            dataKey="value"
            fill="#ffc107"
            radius={[4, 4, 0, 0]}
            name="Cost"
            isAnimationActive={false}
          >
            {enhancedData.map((entry, index) => (
              <SavingsClusterIcon
                key={`cluster-${index}`}
                x={0} // Will be set by recharts
                y={0} // Will be set by recharts
                width={0} // Will be set by recharts
                savings={entry.potentialSavings}
              />
            ))}
          </Bar>

          {/* Potential savings indicator at the top of bars */}
          <Bar
            dataKey="potentialSavings"
            fill="#ef5350"
            radius={[4, 4, 0, 0]}
            name="Potential Savings"
            stackId="stack"
            isAnimationActive={false}
          />

          {/* Trend line */}
          <Line
            type="monotone"
            dataKey="trend"
            stroke="#4fc3f7"
            strokeWidth={2}
            dot={false}
            name="Trend"
            isAnimationActive={false}
          />

          {/* Budget reference line */}
          {showBudgetLine && budget > 0 && (
            <ReferenceLine
              y={budget}
              stroke={textColor}
              strokeDasharray="5 5"
              label={{
                value: `Budget: £${budget.toLocaleString()}`,
                fill: textColor,
                position: "right",
              }}
            />
          )}

          {/* Target reference line */}
          {target > 0 && (
            <ReferenceLine
              y={target}
              stroke="#4caf50"
              strokeDasharray="5 5"
              label={{
                value: `Target: £${target.toLocaleString()}`,
                fill: "#4caf50",
                position: "left",
              }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
