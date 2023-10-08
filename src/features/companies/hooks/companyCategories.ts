import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { companyCategoriesService } from "../services/companyCategories";
import { ICompanyCategory } from "../types";
import { IMutationProps } from "../../types";

export const useCompanyCategories = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery({
    queryKey: [endPoints.companyCategories, params],
    queryFn: () => companyCategoriesService.findAll(params),
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

export const useCompanyCategory = (uid: string) => {
  const { data, ...rest } = useQuery({
    queryKey: [`${endPoints.companyCategories}${uid}`],
    queryFn: () => companyCategoriesService.find(uid),
  });

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest,
  };
};

export const useCompanyCategoriesMutation = ({
  onSuccess,
  onError,
  model,
}: IMutationProps<ICompanyCategory>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICompanyCategory) =>
      model
        ? companyCategoriesService.update(payload, `${model.uid}`)
        : companyCategoriesService.create(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries([endPoints.companyCategories]);
      onSuccess?.(response);
    },
    onError: (errors) => {
      onError?.(errors);
    },
  });
};

export const useCompanyCategoryDelete = ({
  onSuccess,
  onError,
}: IMutationProps<ICompanyCategory>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uid: string) => companyCategoriesService.delete(uid),
    onSuccess: (response) => {
      queryClient.invalidateQueries([endPoints.companyCategories]);
      onSuccess?.(response);
    },
    onError: (errors) => {
      onError?.(errors);
    },
  });
};
