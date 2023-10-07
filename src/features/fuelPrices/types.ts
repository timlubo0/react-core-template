import { ICity } from "../cities/types";

export interface IFuelPrice{
    id?: number;
    uid?: string;
    cityId: number | null,
    city?: ICity,
    price: number,
    notes?: string,
}