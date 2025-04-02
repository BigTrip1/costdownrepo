import { CategoryData, SavingOpportunity } from "./types";

export interface MonthlyData {
  month: string;
  value: number;
}

export interface CostCategory {
  id: string;
  name: string;
  ownerName: string;
  monthlyData: Array<{
    month: string;
    value: number;
    forecast?: number;
    target?: number;
    budget?: number;
  }>;
  forecast: number;
  budget: number;
  target: number;
  targetCalendarisedSaving: string;
  targetAnnualisedSaving: string;
  savingOpportunities: SavingOpportunity[];
}

// Helper function to generate random monthly data
function generateMonthlyData() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months.map((month) => {
    const value = Math.floor(Math.random() * 400) + 700; // Random value between 700-1100
    return {
      month,
      value,
      forecast: value, // Use same value for forecast
      target: Math.floor(value * 0.9), // Target is 90% of value
      budget: Math.floor(value * 1.1), // Budget is 110% of value
    };
  });
}

// Helper to generate saving opportunities with all required fields
function generateSavingOpportunities(count = 5) {
  const opportunities = [];
  for (let i = 1; i <= count; i++) {
    opportunities.push({
      id: i,
      description: `Saving opportunity ${i}`,
      value: `£${(Math.random() * 1000).toFixed(2)}`,
      status: ["In Progress", "Completed", "Planned"][
        Math.floor(Math.random() * 3)
      ],
      progress: Math.floor(Math.random() * 100),
      savingPerUnit: Math.floor(Math.random() * 50) + 10,
      cutInMonth: ["Jan", "Feb", "Mar", "Apr", "May"][
        Math.floor(Math.random() * 5)
      ],
      owner: ["John Smith", "Sarah Johnson", "Mike Wilson"][
        Math.floor(Math.random() * 3)
      ],
    });
  }
  return opportunities;
}

export const CATEGORIES: CostCategory[] = [
  {
    id: "maersk",
    name: "MAERSK",
    ownerName: "Nav Rai",
    monthlyData: generateMonthlyData(),
    forecast: 14840,
    budget: 15000,
    target: 14000,
    targetCalendarisedSaving: "£1,000",
    targetAnnualisedSaving: "£12,000",
    savingOpportunities: generateSavingOpportunities(),
  },
  {
    id: "fasteners",
    name: "FASTENERS",
    ownerName: "Ross Braithwaite",
    monthlyData: generateMonthlyData(),
    forecast: 10830,
    budget: 11000,
    target: 10500,
    targetCalendarisedSaving: "£500",
    targetAnnualisedSaving: "£6,000",
    savingOpportunities: [],
  },
  {
    id: "fuels-oils",
    name: "FUELS & OILS",
    ownerName: "Mick Gaunt",
    monthlyData: generateMonthlyData(),
    forecast: 12500,
    budget: 13000,
    target: 12000,
    targetCalendarisedSaving: "£800",
    targetAnnualisedSaving: "£9,600",
    savingOpportunities: [],
  },
  {
    id: "paint",
    name: "PAINT",
    ownerName: "Paul Chafer",
    monthlyData: generateMonthlyData(),
    forecast: 8900,
    budget: 9500,
    target: 8500,
    targetCalendarisedSaving: "£400",
    targetAnnualisedSaving: "£4,800",
    savingOpportunities: [],
  },
  {
    id: "shop-overload",
    name: "SHOP OVERLOAD",
    ownerName: "Rob Mills",
    monthlyData: generateMonthlyData(),
    forecast: 16700,
    budget: 17000,
    target: 16000,
    targetCalendarisedSaving: "£1,200",
    targetAnnualisedSaving: "£14,400",
    savingOpportunities: [],
  },
  {
    id: "pi-adjustments",
    name: "PI ADJUSTMENTS",
    ownerName: "Debbie Clarke",
    monthlyData: generateMonthlyData(),
    forecast: 11200,
    budget: 12000,
    target: 10800,
    targetCalendarisedSaving: "£600",
    targetAnnualisedSaving: "£7,200",
    savingOpportunities: [],
  },
  {
    id: "scrap",
    name: "SCRAP",
    ownerName: "Hannah Alsopp",
    monthlyData: generateMonthlyData(),
    forecast: 9800,
    budget: 10000,
    target: 9500,
    targetCalendarisedSaving: "£450",
    targetAnnualisedSaving: "£5,400",
    savingOpportunities: [],
  },
  {
    id: "direct-heads",
    name: "DIRECT HEADS",
    ownerName: "Lisa Anderson",
    monthlyData: generateMonthlyData(),
    forecast: 19500,
    budget: 20000,
    target: 19000,
    targetCalendarisedSaving: "£1,500",
    targetAnnualisedSaving: "£18,000",
    savingOpportunities: [],
  },
  {
    id: "indirect-heads",
    name: "INDIRECT HEADS",
    ownerName: "Tom Wilson",
    monthlyData: generateMonthlyData(),
    forecast: 15600,
    budget: 16000,
    target: 15000,
    targetCalendarisedSaving: "£900",
    targetAnnualisedSaving: "£10,800",
    savingOpportunities: [],
  },
  {
    id: "maintenance",
    name: "MAINTENANCE",
    ownerName: "James Martin",
    monthlyData: generateMonthlyData(),
    forecast: 13400,
    budget: 14000,
    target: 13000,
    targetCalendarisedSaving: "£700",
    targetAnnualisedSaving: "£8,400",
    savingOpportunities: [],
  },
  {
    id: "consumables",
    name: "CONSUMABLES",
    ownerName: "Sophie White",
    monthlyData: generateMonthlyData(),
    forecast: 7800,
    budget: 8000,
    target: 7500,
    targetCalendarisedSaving: "£300",
    targetAnnualisedSaving: "£3,600",
    savingOpportunities: [],
  },
  {
    id: "loose-tools",
    name: "LOOSE TOOLS",
    ownerName: "Ryan Cooper",
    monthlyData: generateMonthlyData(),
    forecast: 6900,
    budget: 7500,
    target: 6500,
    targetCalendarisedSaving: "£250",
    targetAnnualisedSaving: "£3,000",
    savingOpportunities: [],
  },
  {
    id: "protective-clothing",
    name: "PROTECTIVE CLOTHING",
    ownerName: "Hannah Lee",
    monthlyData: generateMonthlyData(),
    forecast: 5400,
    budget: 6000,
    target: 5000,
    targetCalendarisedSaving: "£200",
    targetAnnualisedSaving: "£2,400",
    savingOpportunities: [],
  },
  {
    id: "flt-hire",
    name: "FLT HIRE",
    ownerName: "George Baker",
    monthlyData: generateMonthlyData(),
    forecast: 8200,
    budget: 8500,
    target: 8000,
    targetCalendarisedSaving: "£350",
    targetAnnualisedSaving: "£4,200",
    savingOpportunities: [],
  },
  {
    id: "warranty",
    name: "WARRANTY",
    ownerName: "Rachel Green",
    monthlyData: generateMonthlyData(),
    forecast: 4900,
    budget: 5500,
    target: 4500,
    targetCalendarisedSaving: "£150",
    targetAnnualisedSaving: "£1,800",
    savingOpportunities: [],
  },
];

// Common months array
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "FYF",
];

function prepareMonthlyData(
  data: any[]
): Array<{ month: string; value: number }> {
  return data.map((item) => ({
    month: item.month,
    value: item.forecast || 0, // Use forecast as the value if available, or 0
  }));
}

export async function getCategoryData(id: string): Promise<CategoryData> {
  // Find the category
  const category = CATEGORIES.find((cat) => cat.id === id);

  if (!category) {
    return Promise.reject(new Error(`Category with ID ${id} not found`));
  }

  // Ensure monthlyData has the required 'value' property
  const enhancedMonthlyData = prepareMonthlyData(category.monthlyData);

  // Make sure savingOpportunities match the expected interface
  // They should already have the required fields from your SavingOpportunity interface

  return Promise.resolve({
    ...category,
    monthlyData: enhancedMonthlyData,
  } as CategoryData);
}

// Add this function to generate preview data for each category
export function getCategoryPreviewData(categoryId: string): MonthlyData[] {
  // This would ideally come from your actual data source
  // For now we'll generate some sample data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  // Use a consistent seed based on category ID to get consistent previews
  const seed =
    categoryId.charCodeAt(0) + categoryId.charCodeAt(categoryId.length - 1);

  return months.map((month, index) => {
    // Generate somewhat random but consistent values based on the category ID
    const base = 500 + (seed % 500);
    const variation = ((index * seed) % 300) - 150;
    const value = base + variation;

    return {
      month,
      value, // Include the required 'value' property
      forecast: value,
      target: base - 50 + ((index * seed + 50) % 200) - 100,
      budget: base + 100,
    } as MonthlyData;
  });
}
