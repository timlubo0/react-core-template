import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { companiesService } from "../services/companies";
import { ICompany } from "../types";
import { IMutationProps } from "../../types";

export const useCompanies = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery({
    queryKey: [endPoints.companies, params],
    queryFn: () => companiesService.findAll(params),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: true,
  });

  return {
    data: data?.data || [],
    meta: data?.meta || {},
    errorResponse: data?.meta == undefined && !rest.isLoading,
    ...rest,
  };
};

export const useCompany = (uid: string) => {
  const { data, ...rest } = useQuery({
    queryKey: [`${endPoints.companies}${uid}`],
    queryFn: () => companiesService.find(uid),
  });

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest,
  };
};

export const useCompaniesMutation = ({
  onSuccess,
  onError,
  model,
}: IMutationProps<ICompany>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICompany) =>
      model
        ? companiesService.update(payload, `${model.uid}`)
        : companiesService.create(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries([endPoints.companies]);
      onSuccess?.(response);
    },
    onError: (errors) => {
      onError?.(errors);
    },
  });
};

export const useCompanyDelete = ({
  onSuccess,
  onError,
}: IMutationProps<ICompany>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uid: string) => companiesService.delete(uid),
    onSuccess: (response) => {
      queryClient.invalidateQueries([endPoints.companies]);
      onSuccess?.(response);
    },
    onError: (errors) => {
      onError?.(errors);
    },
  });
};
