export interface IStop{
    id?: number;
    uid?: string;
    cityId: number | null,
    name: string,
    latitude?: string,
    latitudeDelta?: string,
    longitude?: string,
    longitudeDelta?: string,
    description?: string,
}