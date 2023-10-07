import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { vehicleEnergiesService } from "../services/vehicleEnergies";
import { IVehicleEnergy } from "../types";
import { IMutationProps } from "../../types";

export const useVehicleEnergies = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.vehicleEnergies, params], 
      queryFn: () => vehicleEnergiesService.findAll(params),
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

export const useVehicleEnergy = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.vehicleEnergies}${uid}`], 
      queryFn: () => vehicleEnergiesService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useVehicleEnergiesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IVehicleEnergy>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IVehicleEnergy) =>
        model ? vehicleEnergiesService.update(payload, `${model.uid}`) : vehicleEnergiesService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.vehicleEnergies]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useVehicleEnergyDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IVehicleEnergy>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => vehicleEnergiesService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.vehicleEnergies]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
