import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IVehicleEnergy } from "../types";

export const vehicleEnergiesService = {
  create: (payLoad: IVehicleEnergy): Promise<PostPutResponse<IVehicleEnergy>> =>
    api.post({ endPoint: endPoints.vehicleEnergies, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.vehicleEnergies, params: params }),
  find: (uid: string): Promise<IVehicleEnergy> =>
    api.get({ endPoint: `${endPoints.vehicleEnergies}/${uid}` }),
  update: (payLoad: IVehicleEnergy, uid: string): Promise<PostPutResponse<IVehicleEnergy>> =>
    api.post({ endPoint: `${endPoints.vehicleEnergies}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IVehicleEnergy>> =>
    api.get({ endPoint: `${endPoints.vehicleEnergies}/${uid}`, method: "DELETE" }),
};