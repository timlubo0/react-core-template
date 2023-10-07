import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { IReport } from "../../types";
import { Anchor, Badge } from '@mantine/core';
import { useReports } from "../../hooks/reports";
import { useFeaturePermissions } from "../../../accessControl/hooks/permissions";
import { Routes } from "../../../../navigation/routes";

interface Props{
  filters: {
    keyword?: string;
  };
  onSelect?: (reports: IReport[]) => void;
  onEdit?: (report: IReport) => void;
}

function ReportsTable({ filters, onSelect, onEdit }: Props){

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { keyword } = filters;

  const dataQuery = useReports({
    page: currentPage,
    per_page: 10,
    field: "name",
    keyword: keyword,
  });

  const { meta, data, isLoading, isFetching, errorResponse } = dataQuery;

  const permissionsChecker = useFeaturePermissions();

  const cols = React.useMemo<ColumnDef<IReport>[]>(
    () => [
      {
        header: "Nombre de Course",
        cell: (cell) => (
          <Anchor component="span" fz="sm">
          </Anchor>
        ),
        accessorKey: "",
      },
      {
        header: "Ville",
        cell: (cell) => (
          <Badge>
          </Badge>
          ),
        accessorKey: "",
      },
      {
        header: "Chauffeurs",
        cell: (cell) => (
          <Badge>
          </Badge>),
        accessorKey: "",
      },      
      {
        header: "Type de Course",
        cell: (cell) => (
        <Badge>
          </Badge>
          ),
        accessorKey: "",
      },
      {
        header: "Status de paiement",
        cell: (cell) => (<Badge>
          </Badge>),
        accessorKey: "",
      },
      {
        header: "Type de course",
        cell: (cell) => (<Badge>
          </Badge>),
        accessorKey: "",
      },
    ],
    []
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  return (
    <>
      <Table
        columns={cols}
        data={data || []}
        meta={{
          currentPage: meta?.current_page,
          pageSize: meta?.per_page,
          total: meta?.total,
        }}
        filterFn={filterFns.contains}
        isLoading={isLoading}
        isFetching={isFetching}
        onPageChange={handlePageChange}
        onEdit={onEdit}
        onSelect={onSelect}
        error={errorResponse}
        isEditable={permissionsChecker(Routes.reports)?.canUpdate}
      />
    </>
  );
}

export default ReportsTable;