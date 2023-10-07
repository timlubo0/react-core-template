import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { fuelPricesService } from "../services/fuelPrices";
import { IFuelPrice } from "../types";
import { IMutationProps } from "../../types";

export const useFuelPrices = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.fuelPrices, params], 
      queryFn: () => fuelPricesService.findAll(params),
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

export const useFuelPrice = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.fuelPrices}${uid}`], 
      queryFn: () => fuelPricesService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useFuelPricesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IFuelPrice>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IFuelPrice) =>
        model ? fuelPricesService.update(payload, `${model.uid}`) : fuelPricesService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.fuelPrices]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useFuelPriceDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IFuelPrice>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => fuelPricesService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.fuelPrices]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
