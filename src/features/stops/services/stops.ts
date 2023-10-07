import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IStop } from "../types";

export const stopsService = {
  create: (payLoad: IStop): Promise<PostPutResponse<IStop>> =>
    api.post({ endPoint: endPoints.stops, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.stops, params: params }),
  find: (uid: string): Promise<IStop> =>
    api.get({ endPoint: `${endPoints.stops}/${uid}` }),
  update: (payLoad: IStop, uid: string): Promise<PostPutResponse<IStop>> =>
    api.post({ endPoint: `${endPoints.stops}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IStop>> =>
    api.get({ endPoint: `${endPoints.stops}/${uid}`, method: "DELETE" }),
};