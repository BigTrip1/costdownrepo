"use client";

import { useState } from "react";
import type { SavingOpportunity } from "@/lib/types";

interface SavingOpportunitiesTableProps {
  opportunities: SavingOpportunity[];
  isDarkMode?: boolean;
  maxHeight?: string;
  largeFonts?: boolean;
  creativeStyle?: boolean;
}

export default function SavingOpportunitiesTable({
  opportunities,
  isDarkMode = false,
  maxHeight = "220px",
  largeFonts = false,
  creativeStyle = false,
}: SavingOpportunitiesTableProps) {
  // Theme colors
  const bgColor = isDarkMode ? "#2c2c2c" : "white";
  const textColor = isDarkMode ? "#e0e0e0" : "#333";
  const borderColor = isDarkMode ? "#444" : "#000";
  const borderWidth = isDarkMode ? "1px" : "2px";
  const headerBgColor = creativeStyle
    ? isDarkMode
      ? "#333"
      : "#ffc107"
    : isDarkMode
    ? "#333"
    : "#f2f2f2";
  const inputBgColor = isDarkMode ? "#333" : "white";
  const inputBorderColor = isDarkMode ? "#555" : "#222";
  const rowBgColorEven = isDarkMode ? "#242424" : "#f8f9fa";
  const rowBgColorOdd = isDarkMode ? "#2c2c2c" : "white";

  // Font sizes based on largeFonts prop
  const headerFontSize = largeFonts ? "18px" : "15px";
  const cellFontSize = largeFonts ? "15px" : "12px";
  const headerPadding = largeFonts ? "12px 10px" : "8px 5px";
  const cellPadding = largeFonts ? "10px 8px" : "6px 5px";
  const inputHeight = largeFonts ? "34px" : "28px";
  const inputFontSize = largeFonts ? "14px" : "12px";

  // Fixed: Use exactly 10 rows but make sure rows 8 and 9 don't include the "Target" text
  const initialData = [...opportunities];
  while (initialData.length < 10) {
    const newId = initialData.length + 1;

    // Make sure we're not adding rows with Target text
    initialData.push({
      id: newId,
      description: "", // Ensure this is always empty
      value: "",
      status: "Pending",
      progress: 0,
      savingPerUnit: 0,
      cutInMonth: "",
      owner: "",
    });
  }

  const [tableData, setTableData] = useState(initialData.slice(0, 10));

  const handleInputChange = (
    rowIndex: number,
    field: keyof SavingOpportunity,
    value: string | number
  ) => {
    const newData = [...tableData];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [field]: value,
    };
    setTableData(newData);
  };

  return (
    <div
      style={{
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: creativeStyle
          ? isDarkMode
            ? "0 2px 8px rgba(255,255,255,0.1)"
            : "0 4px 12px rgba(0,0,0,0.2)"
          : isDarkMode
          ? "0 1px 3px rgba(0,0,0,0.1)"
          : "0 3px 8px rgba(0,0,0,0.15)",
        border: `${borderWidth} solid ${borderColor}`,
        backgroundColor: bgColor,
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          background: creativeStyle
            ? isDarkMode
              ? "linear-gradient(90deg, #333 0%, #444 100%)"
              : "linear-gradient(90deg, #ffc107 0%, #ffd54f 100%)"
            : "linear-gradient(90deg, #ffc107 0%, #ffd54f 100%)",
          color: creativeStyle ? (isDarkMode ? "#fff" : "#000") : "#333",
          fontWeight: "bold",
          padding: largeFonts ? "15px 16px" : "10px 12px",
          fontSize: headerFontSize,
          textAlign: "center",
          borderBottom: `${borderWidth} solid ${borderColor}`,
          flexShrink: 0,
          position: "relative",
        }}
      >
        SAVING OPPORTUNITIES
        {creativeStyle && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "15px",
              transform: "translateY(-50%)",
              width: "24px",
              height: "24px",
              color: isDarkMode ? "#ffc107" : "#000",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5l0 14M5 12l14 0" />
            </svg>
          </div>
        )}
      </div>

      <div
        style={{
          overflowY: "auto",
          maxHeight: maxHeight,
          flexGrow: 1,
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: cellFontSize,
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: headerBgColor,
                  padding: headerPadding,
                  fontWeight: "bold",
                  borderBottom: `${borderWidth} solid ${borderColor}`,
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  color: creativeStyle && !isDarkMode ? "#000" : textColor,
                  transition: "background-color 0.3s ease",
                  width: "5%",
                  textAlign: "center",
                }}
              >
                No.
              </th>

              <th
                style={{
                  backgroundColor: headerBgColor,
                  padding: headerPadding,
                  fontWeight: "bold",
                  borderBottom: `${borderWidth} solid ${borderColor}`,
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  color: creativeStyle && !isDarkMode ? "#000" : textColor,
                  transition: "background-color 0.3s ease",
                  width: "40%",
                  textAlign: "center",
                }}
              >
                Description
              </th>

              <th
                style={{
                  backgroundColor: headerBgColor,
                  padding: headerPadding,
                  fontWeight: "bold",
                  borderBottom: `${borderWidth} solid ${borderColor}`,
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  color: creativeStyle && !isDarkMode ? "#000" : textColor,
                  transition: "background-color 0.3s ease",
                  width: "15%",
                  textAlign: "center",
                }}
              >
                Saving/unit
              </th>

              <th
                style={{
                  backgroundColor: headerBgColor,
                  padding: headerPadding,
                  fontWeight: "bold",
                  borderBottom: `${borderWidth} solid ${borderColor}`,
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  color: creativeStyle && !isDarkMode ? "#000" : textColor,
                  transition: "background-color 0.3s ease",
                  width: "15%",
                  textAlign: "center",
                }}
              >
                Cut-In Month
              </th>

              <th
                style={{
                  backgroundColor: headerBgColor,
                  padding: headerPadding,
                  fontWeight: "bold",
                  borderBottom: `${borderWidth} solid ${borderColor}`,
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  color: creativeStyle && !isDarkMode ? "#000" : textColor,
                  transition: "background-color 0.3s ease",
                  width: "20%",
                  textAlign: "center",
                }}
              >
                Owner
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={row.id}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? rowBgColorEven : rowBgColorOdd,
                  transition: "background-color 0.3s ease",
                  ...(creativeStyle && {
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: isDarkMode ? "#3a3a3a" : "#f0f0f0",
                    },
                  }),
                }}
              >
                <td
                  style={{
                    padding: cellPadding,
                    textAlign: "center",
                    borderBottom: `1px solid ${borderColor}`,
                    fontSize: cellFontSize,
                    color: textColor,
                  }}
                >
                  {row.id}
                </td>
                <td
                  style={{
                    padding: "4px",
                    borderBottom: `1px solid ${borderColor}`,
                  }}
                >
                  <input
                    type="text"
                    value={row.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: largeFonts ? "6px 8px" : "4px 6px",
                      border: `1px solid ${inputBorderColor}`,
                      borderRadius: "4px",
                      fontSize: inputFontSize,
                      backgroundColor: inputBgColor,
                      color: textColor,
                      outline: "none",
                      boxSizing: "border-box",
                      height: inputHeight,
                    }}
                  />
                </td>
                <td
                  style={{
                    padding: "4px",
                    borderBottom: `1px solid ${borderColor}`,
                  }}
                >
                  <input
                    type="text"
                    value={row.savingPerUnit || ""}
                    onChange={(e) =>
                      handleInputChange(index, "savingPerUnit", e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: largeFonts ? "6px 8px" : "4px 6px",
                      border: `1px solid ${inputBorderColor}`,
                      borderRadius: "4px",
                      fontSize: inputFontSize,
                      textAlign: "right",
                      backgroundColor: inputBgColor,
                      color: textColor,
                      outline: "none",
                      boxSizing: "border-box",
                      height: inputHeight,
                    }}
                  />
                </td>
                <td
                  style={{
                    padding: "4px",
                    borderBottom: `1px solid ${borderColor}`,
                  }}
                >
                  <input
                    type="text"
                    value={row.cutInMonth}
                    onChange={(e) =>
                      handleInputChange(index, "cutInMonth", e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: largeFonts ? "6px 8px" : "4px 6px",
                      border: `1px solid ${inputBorderColor}`,
                      borderRadius: "4px",
                      fontSize: inputFontSize,
                      backgroundColor: inputBgColor,
                      color: textColor,
                      outline: "none",
                      boxSizing: "border-box",
                      height: inputHeight,
                    }}
                  />
                </td>
                <td
                  style={{
                    padding: "4px",
                    borderBottom: `1px solid ${borderColor}`,
                  }}
                >
                  <input
                    type="text"
                    value={row.owner}
                    onChange={(e) =>
                      handleInputChange(index, "owner", e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: largeFonts ? "6px 8px" : "4px 6px",
                      border: `1px solid ${inputBorderColor}`,
                      borderRadius: "4px",
                      fontSize: inputFontSize,
                      backgroundColor: inputBgColor,
                      color: textColor,
                      outline: "none",
                      boxSizing: "border-box",
                      height: inputHeight,
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
