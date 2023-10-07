import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { vehicleUsesService } from "../services/vehicleUses";
import { IVehicleUse } from "../types";
import { IMutationProps } from "../../types";

export const useVehicleUses = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.vehicleUses, params], 
      queryFn: () => vehicleUsesService.findAll(params),
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

export const useVehicleUse = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.vehicleUses}${uid}`], 
      queryFn: () => vehicleUsesService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useVehicleUsesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IVehicleUse>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IVehicleUse) =>
        model ? vehicleUsesService.update(payload, `${model.uid}`) : vehicleUsesService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.vehicleUses]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useVehicleUseDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IVehicleUse>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => vehicleUsesService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.vehicleUses]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
