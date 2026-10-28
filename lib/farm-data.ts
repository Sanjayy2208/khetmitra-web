export type ExpenseCategory = 'Seeds' | 'Fertilizer' | 'Pesticide' | 'Labour' | 'Irrigation' | 'Machinery' | 'Other' | 'Sale';
export type FarmProfile = { farmerName: string; village: string; district: string; acres: number; elevation: number; hasPolyhouse: boolean; soil: { ph: number; nitrogen: string; phosphorus: string; potassium: string }; };
export type CropInfo = { id: string; name: string; durationDays: number; yieldPerAcre: number; costPerAcre: number; };
export type FertilizerTask = { id: string; day: number; product: string; type: string; unit: string; method: string; dosePerAcre: number; done?: { date: string; actualDose: number }; };
export type LedgerEntry = { id: string; kind: 'expense' | 'income'; category: ExpenseCategory; label: string; amount: number; date: string; };

export const CROPS: CropInfo[] = [
  { id: 'tomato', name: 'Tomato', durationDays: 120, yieldPerAcre: 150, costPerAcre: 35000 },
  { id: 'onion', name: 'Onion', durationDays: 150, yieldPerAcre: 120, costPerAcre: 40000 },
];
export const DEFAULT_PROFILE: FarmProfile = { farmerName: 'Sanjay', village: 'Kondampatty', district: 'Coimbatore', acres: 2.5, elevation: 411, hasPolyhouse: true, soil: { ph: 6.5, nitrogen: 'Medium', phosphorus: 'High', potassium: 'Low' } };
export const FERTILIZER_TEMPLATE: FertilizerTask[] = [];

export const addDays = (date: Date, days: number) => { const result = new Date(date); result.setDate(result.getDate() + days); return result; };
export const fmtDate = (isoString: string) => { return new Date(isoString).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }); };
export const inr = (amount: number) => { return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount); };
export const currentSeason = () => 'Kharif';

export const analyzeMarket = (crop: CropInfo, acres: number) => ({
  current: 1600, forecastHarvest: 1850, avg2y: 1450, min: 900, max: 2200,
  revenuePerAcre: 1850 * crop.yieldPerAcre, profitPerAcre: (1850 * crop.yieldPerAcre) - crop.costPerAcre,
  margin: 42, risk: 'Low', riskScore: 20, verdict: 'Strong historical demand.',
  series: [{ month: 'Jan', price: 1500, forecast: null }, { month: 'Feb', price: 1600, forecast: 1650 }]
});
export const recommendCrops = (profile: FarmProfile, season: string) => [ { crop: CROPS[0], score: 94, reasons: ['Ideal pH', 'Good elevation'], warnings: [] } ];