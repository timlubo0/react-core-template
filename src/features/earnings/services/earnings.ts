import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IEarning } from "../types";

export const earningsService = {
  create: (payLoad: IEarning): Promise<PostPutResponse<IEarning>> =>
    api.post({ endPoint: endPoints.earnings, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.earnings, params: params }),
  find: (uid: string): Promise<IEarning> =>
    api.get({ endPoint: `${endPoints.earnings}/${uid}` }),
  update: (payLoad: IEarning, uid: string): Promise<PostPutResponse<IEarning>> =>
    api.post({ endPoint: `${endPoints.earnings}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IEarning>> =>
    api.get({ endPoint: `${endPoints.earnings}/${uid}`, method: "DELETE" }),
};