import { IAutomobileType } from "../automobileTypes/types";

export interface IRace{
    id?: number;
    uid?: string;
    number?: string;
    user?: any;
    driver?: any;
    statusName?: string;
    createdAt?: string;
    updatedAt?: string;
    driverId?: number;
    vehicleId?: number;
    racePriceId: number;
    price?: number;
    paidAmount?: number;
    distance: number;
    estimatedDuration: number;
    duration?: number;
    departureCoords: string;
    arrivalCoords: string;
    departureAddress: string;
    arrivalAddress: string;
    isCompleted?: boolean;
    racePrice?: IRacePrice;
}
export interface IRaceType{
    id?: number;
    uid?: string;
    name: string;
    slug?: string;
    description?: string;
    cover? : any;
}

export interface IRacePrice{
    id?: number;
    uid?: string;
    raceTypeId: number | null,
    autoMobileTypeId: number | null,
    cityId: number | null,
    pricePerHour: number | null,
    pricePerKilometer: number | null,
    earnings: number;
    notes?: string | null,
    autoMobileType? : IAutomobileType;
    raceType? : IRaceType;
}