import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { transportLinesService } from "../services/transportLines";
import { ITransportLine } from "../types";
import { IMutationProps } from "../../types";

export const useTransportLines = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.transportLines, params], 
      queryFn: () => transportLinesService.findAll(params),
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

export const useTransportLine = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.transportLines}${uid}`], 
      queryFn: () => transportLinesService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useTransportLinesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<ITransportLine>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: ITransportLine) =>
        model ? transportLinesService.update(payload, `${model.uid}`) : transportLinesService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.transportLines]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useTransportLineDelete = ({
    onSuccess,
    onError
  }: IMutationProps<ITransportLine>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => transportLinesService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.transportLines]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
