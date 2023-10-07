import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IVehicleUse } from "../types";

export const vehicleUsesService = {
  create: (payLoad: IVehicleUse): Promise<PostPutResponse<IVehicleUse>> =>
    api.post({ endPoint: endPoints.vehicleUses, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.vehicleUses, params: params }),
  find: (uid: string): Promise<IVehicleUse> =>
    api.get({ endPoint: `${endPoints.vehicleUses}/${uid}` }),
  update: (payLoad: IVehicleUse, uid: string): Promise<PostPutResponse<IVehicleUse>> =>
    api.post({ endPoint: `${endPoints.vehicleUses}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IVehicleUse>> =>
    api.get({ endPoint: `${endPoints.vehicleUses}/${uid}`, method: "DELETE" }),
};