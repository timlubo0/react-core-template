import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { vehiclesService } from "../services/vehicles";
import { IVehicle } from "../types";
import { IMutationProps } from "../../types";

export const useVehicles = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.vehicles, params], 
      queryFn: () => vehiclesService.findAll(params),
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

export const useVehicle = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.vehicles}${uid}`], 
      queryFn: () => vehiclesService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useVehiclesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IVehicle>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IVehicle) =>
        model ? vehiclesService.update(payload, `${model.uid}`) : vehiclesService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.vehicles]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useVehicleDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IVehicle>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => vehiclesService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.vehicles]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
