import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IFuelPrice } from "../types";

export const fuelPricesService = {
  create: (payLoad: IFuelPrice): Promise<PostPutResponse<IFuelPrice>> =>
    api.post({ endPoint: endPoints.fuelPrices, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.fuelPrices, params: params }),
  find: (uid: string): Promise<IFuelPrice> =>
    api.get({ endPoint: `${endPoints.fuelPrices}/${uid}` }),
  update: (payLoad: IFuelPrice, uid: string): Promise<PostPutResponse<IFuelPrice>> =>
    api.post({ endPoint: `${endPoints.fuelPrices}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IFuelPrice>> =>
    api.get({ endPoint: `${endPoints.fuelPrices}/${uid}`, method: "DELETE" }),
};