import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IRace } from "../types";

export const racesService = {
  create: (payLoad: IRace): Promise<PostPutResponse<IRace>> =>
    api.post({ endPoint: endPoints.races, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.races, params: params }),
  find: (uid: string): Promise<IRace> =>
    api.get({ endPoint: `${endPoints.races}/${uid}` }),
  update: (payLoad: IRace, uid: string): Promise<PostPutResponse<IRace>> =>
    api.post({ endPoint: `${endPoints.races}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IRace>> =>
    api.get({ endPoint: `${endPoints.races}/${uid}`, method: "DELETE" }),
};