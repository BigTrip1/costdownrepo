export interface MonthlyData {
  month: string;
  forecast: number;
  target: number;
  actual: number;
}

export interface SavingOpportunity {
  id: number;
  description: string;
  savingPerUnit: number | string;
  cutInMonth: string;
  owner: string;
}

export interface CategoryData {
  id: string;
  name: string;
  forecast: number;
  budget: number;
  target: number;
  monthlyData: MonthlyData[];
  savingOpportunities: SavingOpportunity[];
  ownerName: string;
  targetCalendarisedSaving: string | number;
  targetAnnualisedSaving: string | number;
}

export interface CostCategory {
  id: string;
  name: string;
  backgroundColor: string;
  owner?: string;
}
