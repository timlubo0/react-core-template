import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { racePricesService } from "../services/racePrices";
import { IRacePrice } from "../types";
import { IMutationProps } from "../../types";

export const useRacePrices = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.racePrices, params], 
      queryFn: () => racePricesService.findAll(params),
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

export const useRaceType = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.racePrices}${uid}`], 
      queryFn: () => racePricesService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useRacePricesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IRacePrice>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IRacePrice) =>
        model ? racePricesService.update(payload, `${model.uid}`) : racePricesService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.racePrices]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useRacePriceDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IRacePrice>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => racePricesService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.racePrices]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
