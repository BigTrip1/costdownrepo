import { useState } from "react";
import { PrinterIcon } from "./icons/PrinterIcon";
import { captureAndDownloadScreenshots } from "@/utils/screenshot";

export default function PrintButton() {
  const [isCapturing, setIsCapturing] = useState(false);

  const handlePrint = async () => {
    if (isCapturing) return;

    try {
      setIsCapturing(true);
      await captureAndDownloadScreenshots();
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div
      onClick={handlePrint}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "4px 8px",
        borderRadius: "4px",
        backgroundColor: isCapturing
          ? "rgba(0, 0, 0, 0.2)"
          : "rgba(0, 0, 0, 0.1)",
        cursor: isCapturing ? "wait" : "pointer",
        transition: "background-color 0.2s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        if (!isCapturing) {
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isCapturing) {
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        }
      }}
    >
      <PrinterIcon
        style={{
          width: "20px",
          height: "20px",
          color: "#000",
          opacity: isCapturing ? 0.5 : 1,
        }}
      />
      {isCapturing && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "16px",
            height: "16px",
            border: "2px solid transparent",
            borderTopColor: "#000",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      )}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
