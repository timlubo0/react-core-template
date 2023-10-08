import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import {
  IPaginationQueryParams,
  IQueryResults,
  PostPutResponse,
} from "../../../api/types";
import { ICompany } from "../types";

export const companiesService = {
  create: (payLoad: ICompany): Promise<PostPutResponse<ICompany>> =>
    api.post({ endPoint: endPoints.companies, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.companies, params: params }),
  find: (uid: string): Promise<ICompany> =>
    api.get({ endPoint: `${endPoints.companies}/${uid}` }),
  update: (
    payLoad: ICompany,
    uid: string
  ): Promise<PostPutResponse<ICompany>> =>
    api.post({
      endPoint: `${endPoints.companies}/${uid}`,
      data: payLoad,
      method: "PUT",
    }),
  delete: (uid: string): Promise<PostPutResponse<ICompany>> =>
    api.get({ endPoint: `${endPoints.companies}/${uid}`, method: "DELETE" }),
};
