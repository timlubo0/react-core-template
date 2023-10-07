import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { automobileTypesService } from "../services/automobileTypes";
import { IAutomobileType } from "../types";
import { IMutationProps } from "../../types";

export const useAutomobileTypes = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.automobileTypes, params], 
      queryFn: () => automobileTypesService.findAll(params),
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

export const useAutomobileType = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.automobileTypes}${uid}`], 
      queryFn: () => automobileTypesService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useAutomobileTypesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IAutomobileType>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IAutomobileType) =>
        model ? automobileTypesService.update(payload, `${model.uid}`) : automobileTypesService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.automobileTypes]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useAutomobileTypeDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IAutomobileType>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => automobileTypesService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.automobileTypes]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
