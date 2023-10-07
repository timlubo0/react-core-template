import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { automobileOwnersService } from "../services/automobileOwners";
import { IAutomobileOwner } from "../types";
import { IMutationProps } from "../../types";

export const useAutomobileOwners = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.automobileOwners, params], 
      queryFn: () => automobileOwnersService.findAll(params),
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

export const useAutomobileOwner = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.automobileOwners}${uid}`], 
      queryFn: () => automobileOwnersService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useAutomobileOwnersMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IAutomobileOwner>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IAutomobileOwner) =>
        model ? automobileOwnersService.update(payload, `${model.uid}`) : automobileOwnersService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.automobileOwners]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useAutomobileOwnerDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IAutomobileOwner>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => automobileOwnersService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.automobileOwners]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
