import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IVehicleMark } from "../types";

export const vehicleMarksService = {
  create: (payLoad: IVehicleMark): Promise<PostPutResponse<IVehicleMark>> =>
    api.post({ endPoint: endPoints.vehicleMarks, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.vehicleMarks, params: params }),
  find: (uid: string): Promise<IVehicleMark> =>
    api.get({ endPoint: `${endPoints.vehicleMarks}/${uid}` }),
  update: (payLoad: IVehicleMark, uid: string): Promise<PostPutResponse<IVehicleMark>> =>
    api.post({ endPoint: `${endPoints.vehicleMarks}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IVehicleMark>> =>
    api.get({ endPoint: `${endPoints.vehicleMarks}/${uid}`, method: "DELETE" }),
};