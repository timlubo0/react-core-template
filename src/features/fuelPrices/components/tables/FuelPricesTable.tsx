import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { IFuelPrice } from "../../types";
import { Anchor, Text } from '@mantine/core';
import { useFuelPrices } from "../../hooks/fuelPrices";
import { Routes } from "../../../../navigation/routes";
import { useFeaturePermissions } from "../../../accessControl/hooks/permissions";

interface Props{
  filters: {
    keyword?: string;
  };
  onSelect?: (fuelPrices: IFuelPrice[]) => void;
  onEdit?: (fuelPrice: IFuelPrice) => void;
}

function FuelPricesTable({ filters, onSelect, onEdit }: Props){

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { keyword } = filters;

  const dataQuery = useFuelPrices({
    page: currentPage,
    per_page: 10,
    field: "price",
    keyword: keyword,
  });

  const { meta, data, isLoading, isFetching, errorResponse } = dataQuery;

  const permissionsChecker = useFeaturePermissions();

  const cols = React.useMemo<ColumnDef<IFuelPrice>[]>(
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
        header: "Prix",
        cell: (row) => (
          <Text component="span" fz="sm">
            {`${row.renderValue()}`} CDF/Litre
          </Text>
        ),
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
        isEditable={permissionsChecker(Routes.fuelPrices)?.canUpdate}
      />
    </>
  );
}

export default FuelPricesTable;