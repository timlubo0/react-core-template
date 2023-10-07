import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { earningsService } from "../services/earnings";
import { IEarning } from "../types";
import { IMutationProps } from "../../types";

export const useEarnings = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.earnings, params], 
      queryFn: () => earningsService.findAll(params),
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

export const useEarning= (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.earnings}${uid}`], 
      queryFn: () => earningsService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useEarningsMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IEarning>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IEarning) =>
        model ? earningsService.update(payload, `${model.uid}`) : earningsService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.earnings]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useEarningDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IEarning>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => earningsService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.earnings]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
