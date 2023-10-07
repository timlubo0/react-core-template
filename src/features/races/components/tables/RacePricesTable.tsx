import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { IRacePrice } from "../../types";
import { Anchor } from '@mantine/core';
import { useRacePrices } from "../../hooks/racePrices";
import { Routes } from "../../../../navigation/routes";
import { useFeaturePermissions } from "../../../accessControl/hooks/permissions";

interface Props{
  filters: {
    keyword?: string;
  };
  onSelect?: (racePrices: IRacePrice[]) => void;
  onEdit?: (racePrice: IRacePrice) => void;
}

function RacePricesTable({ filters, onSelect, onEdit }: Props){

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { keyword } = filters;

  const dataQuery = useRacePrices({
    page: currentPage,
    per_page: 10,
    field: "name",
    keyword: keyword,
  });

  const { meta, data, isLoading, isFetching, errorResponse } = dataQuery;

  const permissionsChecker = useFeaturePermissions();

  const cols = React.useMemo<ColumnDef<IRacePrice>[]>(
    () => [
      {
        header: "Ville",
        cell: (row) => row.renderValue(),
        accessorKey: "city.name",
      },
      {
        header: "Type de course",
        cell: (row) => (
          <Anchor component="span" fz="sm">
            {`${row.renderValue()}`}
          </Anchor>
        ),
        accessorKey: "raceType.name",
      },
      {
        header: "Type de vehicule",
        cell: (row) => row.renderValue(),
        accessorKey: "autoMobileType.name",
      },
      {
        header: "Prix par heure",
        cell: (row) => row.renderValue(),
        accessorKey: "pricePerHour",
      },
      {
        header: "Prix par kilometre",
        cell: (row) => row.renderValue(),
        accessorKey: "pricePerKilometer",
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
        isEditable={permissionsChecker(Routes.racePrices)?.canUpdate}
      />
    </>
  );
}

export default RacePricesTable;