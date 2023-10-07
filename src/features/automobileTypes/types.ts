export interface IAutomobileType{
    id?: number;
    uid?: string;
    name: string;
    model?: string;
    slug?: string;
    fuelConsumption?: number;
    numberOfSeats?: number;
    description?: string;
    cover? : any;
}
export interface IAutomobileOwner{
    id?: number;
    uid?: string;
    name: string;
}