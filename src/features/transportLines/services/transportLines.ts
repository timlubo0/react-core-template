import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { ITransportLine } from "../types";

export const transportLinesService = {
  create: (payLoad: ITransportLine): Promise<PostPutResponse<ITransportLine>> =>
    api.post({ endPoint: endPoints.transportLines, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.transportLines, params: params }),
  find: (uid: string): Promise<ITransportLine> =>
    api.get({ endPoint: `${endPoints.transportLines}/${uid}` }),
  update: (payLoad: ITransportLine, uid: string): Promise<PostPutResponse<ITransportLine>> =>
    api.post({ endPoint: `${endPoints.transportLines}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<ITransportLine>> =>
    api.get({ endPoint: `${endPoints.transportLines}/${uid}`, method: "DELETE" }),
};