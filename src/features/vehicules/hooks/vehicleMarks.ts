import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { vehicleMarksService } from "../services/vehicleMarks";
import { IVehicleMark } from "../types";
import { IMutationProps } from "../../types";

export const useVehicleMarks = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.vehicleMarks, params], 
      queryFn: () => vehicleMarksService.findAll(params),
      keepPreviousData: true,
      staleTime: Infinity,
      enabled: true
    },
  );

  return {
    data: data?.data || [],
    meta: data?.meta || {},
    errorResponse: data?.meta == undefined && !rest.isLoading,
    ...rest
  };
};

export const useVehicleMark = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.vehicleMarks}${uid}`], 
      queryFn: () => vehicleMarksService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id === undefined && !rest.isLoading,
    ...rest
  };
};

export const useVehicleMarksMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IVehicleMark>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IVehicleMark) =>
        model ? vehicleMarksService.update(payload, `${model.uid}`) : vehicleMarksService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.vehicleMarks]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useVehicleMarkDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IVehicleMark>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => vehicleMarksService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.vehicleMarks]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
