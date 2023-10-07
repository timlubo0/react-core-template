import { IAutomobileType } from "../automobileTypes/types";
import { ICompany } from "../companies/types";
import { IDriver } from "../drivers/types";

export interface IVehicleMark{
    id?: number;
    uid?: string;
    name: string;
    slug?: string;
    description?: string;
}
export interface IVehicleEnergy{
    id?: number;
    uid?: string;
    name: string;
    slug?: string;
    description?: string;
}
export interface IVehicleUse{
    id?: number;
    uid?: string;
    name: string;
    slug?: string;
    description?: string;
} 
export interface IVehicle{
    id?: number;
    uid?: string;
    color : string;
    manufacturingYear? : number;
    circulationYear? : number;
    registrationNumber? : string;
    plateNumber? : string;
    cvNumber? : string;
    chassisNumber : string;
    engineNumber? : string;
    model : string;
    mileage? : number;
    numberOfSeats : number;
    fuelConsumption? : number;
    markId? : number;
    mark? : IVehicleMark; 
    driverId : number;
    driver? : IDriver;
    autoMobileTypeId : number;
    automobileType? : IAutomobileType;
    vehicleUseId : number;
    vehicleUse? : IVehicleUse;
    vehicleEnergyId : number;
    vehicleEnergy? : IVehicleEnergy;
    company?: ICompany;
    companyId?: number | null;
    files?: any;
     
}  