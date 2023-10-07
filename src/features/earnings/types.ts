export interface IEarning{
    id?: number;
    uid?: string;
    minAmount: number,
    maxAmount: number,
    percentage: number,
    taxiPercentage: number,
    systemPercentage: number,
    notes?: string,
}