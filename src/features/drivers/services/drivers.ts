import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IDriver } from "../types";

export const driversService = {
  create: (payLoad: IDriver): Promise<PostPutResponse<IDriver>> =>
    api.post({ endPoint: endPoints.drivers, data: payLoad , contentType : 'multipart/form-data'}),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.drivers, params: params }),
  find: (uid: string): Promise<IDriver> =>
    api.get({ endPoint: `${endPoints.drivers}/${uid}` }),
  update: (payLoad: IDriver, uid: string): Promise<PostPutResponse<IDriver>> =>
    api.post({
      endPoint: `${endPoints.drivers}/${uid}`,
      data: payLoad,
      method: "PUT",
      contentType : 'multipart/form-data'
    }),
  delete: (uid: string): Promise<PostPutResponse<IDriver>> =>
    api.get({ endPoint: `${endPoints.drivers}/${uid}`, method: "DELETE" }),
};