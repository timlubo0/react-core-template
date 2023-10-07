import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { pricesService } from "../services/prices";
import { IPrice } from "../types";
import { IMutationProps } from "../../types";

export const usePrices = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.prices, params], 
      queryFn: () => pricesService.findAll(params),
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

export const usePrice = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.prices}${uid}`], 
      queryFn: () => pricesService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const usePricesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IPrice>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IPrice) =>
        model ? pricesService.update(payload, `${model.uid}`) : pricesService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.prices]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const usePriceDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IPrice>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => pricesService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.prices]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
