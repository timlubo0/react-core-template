import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IAutomobileType } from "../types";

export const automobileTypesService = {
  create: (payLoad: IAutomobileType): Promise<PostPutResponse<IAutomobileType>> =>
    api.post({ endPoint: endPoints.automobileTypes, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.automobileTypes, params: params }),
  find: (uid: string): Promise<IAutomobileType> =>
    api.get({ endPoint: `${endPoints.automobileTypes}/${uid}` }),
  update: (payLoad: IAutomobileType, uid: string): Promise<PostPutResponse<IAutomobileType>> =>
    api.post({ endPoint: `${endPoints.automobileTypes}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IAutomobileType>> =>
    api.get({ endPoint: `${endPoints.automobileTypes}/${uid}`, method: "DELETE" }),
};