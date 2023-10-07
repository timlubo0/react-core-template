import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IRaceType } from "../types";

export const raceTypesService = {
  create: (payLoad: IRaceType): Promise<PostPutResponse<IRaceType>> =>
    api.post({ endPoint: endPoints.raceTypes, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.raceTypes, params: params }),
  find: (uid: string): Promise<IRaceType> =>
    api.get({ endPoint: `${endPoints.raceTypes}/${uid}` }),
  update: (payLoad: IRaceType, uid: string): Promise<PostPutResponse<IRaceType>> =>
    api.post({ endPoint: `${endPoints.raceTypes}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IRaceType>> =>
    api.get({ endPoint: `${endPoints.raceTypes}/${uid}`, method: "DELETE" }),
};