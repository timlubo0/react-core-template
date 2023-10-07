import { ICity } from "../cities/types";

export interface IAddress{
    id?: string;
    uid?: string;
    street?: string;
    reference?: string;
    cityId?: number;
    city? : ICity
}