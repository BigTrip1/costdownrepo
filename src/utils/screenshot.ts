import html2canvas from "html2canvas";
import JSZip from "jszip";
import { CATEGORIES } from "@/lib/data";

async function captureElement(element: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(element, {
    background: "#1a1a1a",
    useCORS: true,
    allowTaint: true,
    logging: false,
  });

  return new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/png", 1.0);
  });
}

export async function captureAndDownloadScreenshots() {
  try {
    const zip = new JSZip();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    // Capture current page
    const mainContent = document.querySelector("main");
    if (mainContent instanceof HTMLElement) {
      const mainBlob = await captureElement(mainContent);
      const currentPath = window.location.pathname;
      const pageName =
        currentPath === "/" ? "dashboard" : currentPath.split("/").pop();
      zip.file(`${pageName}.png`, mainBlob);
    }

    // Capture all category pages
    for (const category of CATEGORIES) {
      // Navigate to category page
      const categoryUrl = `/category/${category.id}`;
      const response = await fetch(categoryUrl);
      const html = await response.text();

      // Create a temporary div to parse the HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

      // Find the main content in the parsed HTML
      const categoryContent = tempDiv.querySelector("main");
      if (categoryContent instanceof HTMLElement) {
        const categoryBlob = await captureElement(categoryContent);
        zip.file(`${category.id}.png`, categoryBlob);
      }
    }

    // Generate and download the zip file
    const content = await zip.generateAsync({ type: "blob" });
    const downloadUrl = URL.createObjectURL(content);

    // Create and trigger download
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `cost-down-all-pages-${timestamp}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Error capturing screenshots:", error);
    alert("There was an error capturing the screenshots. Please try again.");
  }
}
