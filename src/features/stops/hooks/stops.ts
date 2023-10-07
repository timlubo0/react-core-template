import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { stopsService } from "../services/stops";
import { IStop } from "../types";
import { IMutationProps } from "../../types";

export const useStops = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.stops, params], 
      queryFn: () => stopsService.findAll(params),
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

export const useStop = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.stops}${uid}`], 
      queryFn: () => stopsService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useStopsMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IStop>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IStop) =>
        model ? stopsService.update(payload, `${model.uid}`) : stopsService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.stops]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useStopDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IStop>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => stopsService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.stops]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
