export interface CostCategory {
  id: string;
  name: string;
  backgroundColor: string;
}

export interface MonthlyData {
  month: string;
  forecast: number;
  target: number;
  budget: number;
}

export interface SavingOpportunity {
  id: number;
  description: string;
  savingPerUnit: number;
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
  targetCalendarisedSaving: number | null;
  targetAnnualisedSaving: number | null;
}
