import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { ITransportLine } from "../../types";
import { Badge, Anchor } from '@mantine/core';
import { useTransportLines } from "../../hooks/transportLines";
import { Routes } from "../../../../navigation/routes";
import { useFeaturePermissions } from "../../../accessControl/hooks/permissions";

interface Props{
  filters: {
    keyword?: string;
  };
  onSelect?: (transportLines: ITransportLine[]) => void;
  onEdit?: (transportLine: ITransportLine) => void;
}

function TransportLinesTable({ filters, onSelect, onEdit }: Props){

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { keyword } = filters;

  const dataQuery = useTransportLines({
    page: currentPage,
    per_page: 10,
    field: "name",
    keyword: keyword,
  });

  const { meta, data, isLoading, isFetching, errorResponse } = dataQuery;

  const permissionsChecker = useFeaturePermissions();

  const cols = React.useMemo<ColumnDef<ITransportLine>[]>(
    () => [
      {
        header: "Ville",
        cell: (row) => (
          <Anchor component="span" fz="sm">
            {`${row.renderValue()}`}
          </Anchor>
        ),
        accessorKey: "city.name",
      },
      {
        header: "Type de vehicule",
        cell: (row) => row.renderValue(),
        accessorKey: "autoMobileType.name",
      },
      {
        header: "Station de depart",
        cell: (row) => row.renderValue(),
        accessorKey: "departureStop.name",
      },
      {
        header: "Station de destination",
        cell: (row) => row.renderValue(),
        accessorKey: "arrivalStop.name",
      },
      {
        header: "Prix",
        cell: (row) => row.renderValue(),
        accessorKey: "price",
      },
      {
        header: "Notes",
        cell: (row) => row.renderValue(),
        accessorKey: "notes",
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
        isEditable={permissionsChecker(Routes.transportLines)?.canUpdate}
      />
    </>
  );
}

export default TransportLinesTable;