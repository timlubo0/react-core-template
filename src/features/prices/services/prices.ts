import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IPrice } from "../types";

export const pricesService = {
  create: (payLoad: IPrice): Promise<PostPutResponse<IPrice>> =>
    api.post({ endPoint: endPoints.prices, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.prices, params: params }),
  find: (uid: string): Promise<IPrice> =>
    api.get({ endPoint: `${endPoints.prices}/${uid}` }),
  update: (payLoad: IPrice, uid: string): Promise<PostPutResponse<IPrice>> =>
    api.post({ endPoint: `${endPoints.prices}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IPrice>> =>
    api.get({ endPoint: `${endPoints.prices}/${uid}`, method: "DELETE" }),
};