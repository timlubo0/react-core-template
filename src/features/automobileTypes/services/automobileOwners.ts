import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IAutomobileOwner } from "../types";

export const automobileOwnersService = {
  create: (payLoad: IAutomobileOwner): Promise<PostPutResponse<IAutomobileOwner>> =>
    api.post({ endPoint: endPoints.automobileOwners, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.automobileOwners, params: params }),
  find: (uid: string): Promise<IAutomobileOwner> =>
    api.get({ endPoint: `${endPoints.automobileOwners}/${uid}` }),
  update: (payLoad: IAutomobileOwner, uid: string): Promise<PostPutResponse<IAutomobileOwner>> =>
    api.post({ endPoint: `${endPoints.automobileOwners}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IAutomobileOwner>> =>
    api.get({ endPoint: `${endPoints.automobileOwners}/${uid}`, method: "DELETE" }),
};