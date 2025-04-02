"use client";

import { useTheme } from "@/context/ThemeContext";
import { getCategoryData } from "@/lib/data";
import BarChartComponent from "@/components/BarChartComponent";
import MetricsDisplay from "@/components/MetricsDisplay";
import SavingOpportunitiesTable from "@/components/SavingOpportunitiesTable";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
import type { CategoryData } from "@/lib/types";

interface CategoryContentProps {
  id: string;
}

export default function CategoryContent({ id }: CategoryContentProps) {
  const { isDarkMode } = useTheme();
  const [data, setData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getCategoryData(id);
        setData(categoryData);
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
          color: isDarkMode ? "#ffffff" : "#333",
        }}
      >
        Category not found
      </div>
    );
  }

  // Theme colors
  const contentBg = isDarkMode ? "#1a1a1a" : "#f8f9fa";
  const borderColor = isDarkMode ? "#444" : "#000";
  const borderWidth = isDarkMode ? "1px" : "2px";
  const ownerTextColor = isDarkMode ? "#aaa" : "#777";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: contentBg,
        padding: "12px 20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with category name and owner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "8px",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              margin: "0 0 4px 0",
              color: isDarkMode ? "#ffffff" : "#333",
              textTransform: "uppercase",
            }}
          >
            {data.name}
          </h1>
          <div
            style={{
              fontSize: "18px",
              color: ownerTextColor,
            }}
          >
            Owner: {data.ownerName}
          </div>
        </div>

        {/* Theme Toggle Button */}
        <ThemeToggle />
      </div>

      {/* Metrics Display - Moved closer to nav bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
          marginTop: "4px",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: isDarkMode ? "rgba(255,255,255,0.05)" : "#f0f0f0",
            border: `${borderWidth} solid ${borderColor}`,
            borderRadius: "8px",
            padding: "16px 24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            maxWidth: "fit-content",
            gap: "50px",
          }}
        >
          {/* Larger Metrics Display (Issue #3) */}
          <MetricsDisplay
            forecast={data.forecast}
            budget={data.budget}
            target={data.target}
            isDarkMode={isDarkMode}
            size="large"
          />

          {/* Savings Info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "60px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: ownerTextColor,
                }}
              >
                Target Calendarised Saving
              </span>
              <span
                style={{
                  color: isDarkMode ? "#4caf50" : "#2e7d32",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {data.targetCalendarisedSaving}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "60px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: ownerTextColor,
                }}
              >
                Target Annualised Saving
              </span>
              <span
                style={{
                  color: isDarkMode ? "#4caf50" : "#2e7d32",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {data.targetAnnualisedSaving}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area - side-by-side layout with larger containers (Issue #3) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: "20px",
          height: "calc(100% - 180px)", // Ensure it fits on screen (Issue #5)
        }}
      >
        {/* Left side - Chart section with wider bars (Issue #4) */}
        <div
          style={{
            flex: "6", // Make chart wider (Issue #3)
            border: `${borderWidth} solid ${borderColor}`,
            borderRadius: "8px",
            padding: "20px 24px 24px 20px", // More padding for axis (Issue #5)
            backgroundColor: isDarkMode ? "rgba(0,0,0,0.2)" : "white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              margin: "0 0 16px 0",
              fontSize: "20px",
              fontWeight: "bold",
              color: isDarkMode ? "#fff" : "#333",
              borderBottom: `${borderWidth} solid ${borderColor}`,
              paddingBottom: "8px",
            }}
          >
            Monthly Cost Breakdown
          </h2>
          <div style={{ flex: 1, height: "calc(100% - 50px)" }}>
            <BarChartComponent
              data={data.monthlyData}
              isDarkMode={isDarkMode}
              showBudgetLine={true}
              budget={data.budget}
              target={data.target}
              barWidth={50} // Much wider bars (Issue #4)
              height="100%"
              fixedHeight={true} // Ensure it fits (Issue #5)
            />
          </div>
        </div>

        {/* Right side - Enhanced Savings table (Issue #6) */}
        <div
          style={{
            flex: "4",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SavingOpportunitiesTable
            opportunities={data.savingOpportunities}
            isDarkMode={isDarkMode}
            maxHeight="100%"
            largeFonts={true} // Larger fonts (Issue #6)
            creativeStyle={true} // Creative styling (Issue #6)
          />
        </div>
      </div>
    </div>
  );
}
