import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import {
  IPaginationQueryParams,
  IQueryResults,
  PostPutResponse,
} from "../../../api/types";
import { ICompanyCategory } from "../types";

export const companyCategoriesService = {
  create: (
    payLoad: ICompanyCategory
  ): Promise<PostPutResponse<ICompanyCategory>> =>
    api.post({ endPoint: endPoints.companyCategories, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.companyCategories, params: params }),
  find: (uid: string): Promise<ICompanyCategory> =>
    api.get({ endPoint: `${endPoints.companyCategories}/${uid}` }),
  update: (
    payLoad: ICompanyCategory,
    uid: string
  ): Promise<PostPutResponse<ICompanyCategory>> =>
    api.post({
      endPoint: `${endPoints.companyCategories}/${uid}`,
      data: payLoad,
      method: "PUT",
    }),
  delete: (uid: string): Promise<PostPutResponse<ICompanyCategory>> =>
    api.get({
      endPoint: `${endPoints.companyCategories}/${uid}`,
      method: "DELETE",
    }),
};
