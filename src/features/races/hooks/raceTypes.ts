import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { raceTypesService } from "../services/raceTypes";
import { IRaceType } from "../types";
import { IMutationProps } from "../../types";

export const useRaceTypes = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.raceTypes, params], 
      queryFn: () => raceTypesService.findAll(params),
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
      queryKey: [`${endPoints.raceTypes}${uid}`], 
      queryFn: () => raceTypesService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useRaceTypesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IRaceType>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IRaceType) =>
        model ? raceTypesService.update(payload, `${model.uid}`) : raceTypesService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.raceTypes]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useRaceTypeDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IRaceType>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => raceTypesService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.raceTypes]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
