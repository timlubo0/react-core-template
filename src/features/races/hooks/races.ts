import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { racesService } from "../services/races";
import { IRace } from "../types";
import { IMutationProps } from "../../types";

export const useRaces = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.races, params], 
      queryFn: () => racesService.findAll(params),
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

export const useRace = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.races}${uid}`], 
      queryFn: () => racesService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useRacesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IRace>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IRace) =>
        model ? racesService.update(payload, `${model.uid}`) : racesService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.races]);
        onSuccess?.(response); 
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useRaceDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IRace>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => racesService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.races]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
