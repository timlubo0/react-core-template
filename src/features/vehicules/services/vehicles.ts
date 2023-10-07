import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IVehicle } from "../types";

export const vehiclesService = {
  create: (payLoad: IVehicle): Promise<PostPutResponse<IVehicle>> =>
    api.post({ endPoint: endPoints.vehicles, data: payLoad, contentType: 'multipart/form-data' }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.vehicles, params: params }),
  find: (uid: string): Promise<IVehicle> =>
    api.get({ endPoint: `${endPoints.vehicles}/${uid}` }),
  update: (payLoad: IVehicle, uid: string): Promise<PostPutResponse<IVehicle>> =>
    api.post({ endPoint: `${endPoints.vehicles}/${uid}`, data: payLoad, method: "PUT", contentType: 'multipart/form-data' }),
  delete: (uid: string): Promise<PostPutResponse<IVehicle>> =>
    api.get({ endPoint: `${endPoints.vehicles}/${uid}`, method: "DELETE" }),
}; 