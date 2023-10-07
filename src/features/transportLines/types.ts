export interface ITransportLine{
    id?: number;
    uid?: string;
    cityId: number | null,
    autoMobileTypeId: number | null,
    departureStopId: number | null,
    arrivalStopId: number | null,
    price: number,
    notes?: string,
}