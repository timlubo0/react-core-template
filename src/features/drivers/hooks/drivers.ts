import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { driversService } from "../services/drivers";
import { IDriver } from "../types";
import { IMutationProps } from "../../types";

export const useDrivers = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.drivers, params], 
      queryFn: () => driversService.findAll(params),
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

export const useDriver = (uid: string) => {
  const { data, ...rest } = useQuery(
    { 
      // driver : useDrivers(`${uid}`) as unknown as IDriver,
      queryKey: [`${endPoints.drivers}${uid}`], 
      queryFn: () => driversService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useDriversMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IDriver>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IDriver) =>
        model ? driversService.update(payload, `${model.uid}`) : driversService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.drivers]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useDriverDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IDriver>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => driversService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.drivers]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
