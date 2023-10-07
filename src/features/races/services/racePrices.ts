import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IRacePrice } from "../types";

export const racePricesService = {
  create: (payLoad: IRacePrice): Promise<PostPutResponse<IRacePrice>> =>
    api.post({ endPoint: endPoints.racePrices, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.racePrices, params: params }),
  find: (uid: string): Promise<IRacePrice> =>
    api.get({ endPoint: `${endPoints.racePrices}/${uid}` }),
  update: (payLoad: IRacePrice, uid: string): Promise<PostPutResponse<IRacePrice>> =>
    api.post({ endPoint: `${endPoints.racePrices}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IRacePrice>> =>
    api.get({ endPoint: `${endPoints.racePrices}/${uid}`, method: "DELETE" }),
};