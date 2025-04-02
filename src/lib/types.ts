export interface MonthlyData {
  month: string;
  value: number;
}

export interface SavingOpportunity {
  id: string | number;
  description: string;
  value: string;
  status: string;
  progress: number;
  savingPerUnit: string | number;
  cutInMonth: string;
  owner: string;
}

export interface CategoryData {
  id: string;
  name: string;
  ownerName: string;
  monthlyData: MonthlyData[];
  forecast: number;
  budget: number;
  target: number;
  targetCalendarisedSaving: string;
  targetAnnualisedSaving: string;
  savingOpportunities: SavingOpportunity[];
}
