import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { ReportsService } from "../services/reports";
import { IReport } from "../types";
import { IMutationProps } from "../../types";

export const useReports = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.reports, params], 
      queryFn: () => ReportsService.findAll(params),
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

export const useReport = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.reports}${uid}`], 
      queryFn: () => ReportsService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useReportsMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IReport>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IReport) =>
        model ? ReportsService.update(payload, `${model.uid}`) : ReportsService  .create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.reports]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

