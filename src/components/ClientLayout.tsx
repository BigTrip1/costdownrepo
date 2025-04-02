"use client";

import { useTheme } from "@/context/ThemeContext";
import { type ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import Image from "next/image";
import { HomeIcon } from "@/components/icons/HomeIcon";
import { PrinterIcon } from "@/components/icons/PrinterIcon";
import { captureAndDownloadScreenshots } from "@/utils/screenshot";
import { usePathname } from "next/navigation";
import PrintButton from "@/components/PrintButton";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          height: "70px",
          backgroundColor: "#FDB913",
          borderBottom: "1px solid #e89f00",
          position: "relative",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "160px",
              height: "70px",
              display: "flex",
              alignItems: "center",
              position: "relative",
              marginLeft: "-16px",
            }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "-5px",
                  width: "180px",
                  height: "80px",
                  backgroundColor: "#000",
                  clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  zIndex: 10,
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#222";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#000";
                }}
              >
                <Image
                  src="/images/jcb-logo.png"
                  alt="JCB Logo"
                  width={140}
                  height={40}
                  style={{ objectFit: "contain" }}
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.style.display = "none";
                    target.parentElement!.innerHTML =
                      '<div style="font-weight: 800; color: #FDB913; font-size: 32px; letter-spacing: 1px;">JCB</div>';
                  }}
                />
              </div>
            </Link>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "20px",
            fontWeight: "800",
            letterSpacing: "1.5px",
            color: "#000000",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            fontFamily: "Lato, sans-serif",
            textTransform: "uppercase",
            padding: "4px 12px",
            borderRadius: "4px",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
            cursor: "default",
            userSelect: "none",
          }}
        >
          LDL COST DOWN
        </div>

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Link href="/" passHref>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "4px 8px",
                borderRadius: "4px",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
              }}
            >
              <HomeIcon
                style={{ width: "20px", height: "20px", color: "#000" }}
              />
            </div>
          </Link>

          <PrintButton />

          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              padding: "6px 12px",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              color: "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: "600",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
            }}
          >
            COSTDOWNS
            <span style={{ fontSize: "10px" }}>▼</span>
          </button>

          {isDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: "16px",
                marginTop: "4px",
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
                borderRadius: "4px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                width: "200px",
                maxHeight: "400px",
                overflowY: "auto",
                zIndex: 1000,
              }}
            >
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      padding: "8px 16px",
                      color: "#000000",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease",
                      fontSize: "14px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {category.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>
      <main
        style={{
          flex: 1,
          height: isMainPage ? `calc(100vh - 70px)` : `calc(100vh - 170px)`,
          overflow: "auto",
        }}
      >
        {children}
      </main>

      {/* Footer - only shown on non-main pages */}
      {!isMainPage && (
        <footer
          style={{
            height: "100px",
            backgroundColor: "#FDB913",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "0 30px 15px 30px",
            position: "relative",
          }}
        >
          {/* Left side with JCB 80 logo */}
          <div
            style={{
              marginBottom: "0",
              marginLeft: "-15px",
              width: "320px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/images/jcb80years.png"
              alt="JCB 80 Years Logo"
              width={600}
              height={240}
              style={{
                objectFit: "contain",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              priority
            />
          </div>

          <div
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#000",
              display: "flex",
              gap: "20px",
            }}
          >
            <span>Cost Down Version 1.0</span>
            <span>Created by Adam Lawton</span>
          </div>
        </footer>
      )}
    </div>
  );
}
