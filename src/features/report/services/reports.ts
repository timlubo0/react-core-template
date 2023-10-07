import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IReport } from "../types";

export const ReportsService = {
  create: (payLoad: IReport): Promise<PostPutResponse<IReport>> =>
    api.post({ endPoint: endPoints.reports, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.reports, params: params }),
  find: (uid: string): Promise<IReport> =>
    api.get({ endPoint: `${endPoints.reports}/${uid}` }),
  update: (payLoad: IReport, uid: string): Promise<PostPutResponse<IReport>> =>
    api.post({ endPoint: `${endPoints.reports}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IReport>> =>
    api.get({ endPoint: `${endPoints.reports}/${uid}`, method: "DELETE" }),
};