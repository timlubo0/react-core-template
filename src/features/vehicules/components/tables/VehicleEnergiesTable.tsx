import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { IVehicleEnergy } from "../../types";
import { Badge, Anchor } from '@mantine/core';
import { useVehicleEnergies } from "../../hooks/vehicleEnergies";
import { Routes } from "../../../../navigation/routes";
import { useFeaturePermissions } from "../../../accessControl/hooks/permissions";

interface Props{
  filters: {
    keyword?: string;
  };
  onSelect?: (cities: IVehicleEnergy[]) => void;
  onEdit?: (vehicleEnergy: IVehicleEnergy) => void;
}

function VehicleEnergiesTable({ filters, onSelect, onEdit }: Props){

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { keyword } = filters;

  const dataQuery = useVehicleEnergies ({
    page: currentPage,
    per_page: 10,
    field: "name",
    keyword: keyword,
  });

  const { meta, data, isLoading, isFetching, errorResponse } = dataQuery;

  const permissionsChecker = useFeaturePermissions();

  const cols = React.useMemo<ColumnDef<IVehicleEnergy>[]>(
    () => [
      {
        header: "Nom",
        cell: (row) => (
          <Badge
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            component="span"
            tt={"lowercase"}
          >{`${row.renderValue()}`}</Badge>
        ),
        accessorKey: "name",
      },
      {
        header: "Description",
        cell: (row) => (
          <Anchor component="span" fz="sm">
            {`${row.renderValue()}`}
          </Anchor>
        ),
        accessorKey: "description",
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
        isEditable={permissionsChecker(Routes.cities)?.canUpdate}
      />
    </>
  );
}

export default VehicleEnergiesTable;