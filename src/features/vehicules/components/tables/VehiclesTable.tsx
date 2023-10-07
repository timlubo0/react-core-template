import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { IVehicle } from "../../types";
import { Badge, Anchor } from '@mantine/core';
import { useVehicles } from "../../hooks/vehicles";
import { Routes } from "../../../../navigation/routes";
import { useFeaturePermissions } from "../../../accessControl/hooks/permissions";

interface Props{
  filters: {
    keyword?: string;
  };
  onSelect?: (vehicles: IVehicle[]) => void;
  onEdit?: (vehicle: IVehicle) => void; 
}

function VehiclesTable({ filters, onSelect, onEdit }: Props){

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { keyword } = filters;

  const dataQuery = useVehicles({
    page: currentPage,
    per_page: 10,
    field: "name",
    keyword: keyword,
  });

  const { meta, data, isLoading, isFetching, errorResponse } = dataQuery;

  const permissionsChecker = useFeaturePermissions();

  const cols = React.useMemo<ColumnDef<IVehicle>[]>(
    () => [
      {
        header: "Marque",
        cell: (row) => (
          <Badge
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            component="span"
            tt={"lowercase"}
          >{`${row.renderValue()}`}</Badge>
        ),
        accessorKey: "mark.name",
      },
      {
        header: "Modele",
        cell: (row) => (<Badge tt={'capitalize'} color="dark">{`${row.renderValue()}`}</Badge>),
        accessorKey: "model",
      },    
      {
        header: "No matricule",
        cell: (row) => (<Badge tt={'capitalize'} color="dark">{`${row.renderValue()}`}</Badge>),
        accessorKey: "numberplate",
      },    
      {
        header: "Chauffeur",
        cell: (row) => (<Badge tt={'capitalize'} color="Bleu">{`${row.renderValue()}`}</Badge>),
        accessorKey: "driver.name",
      },    
      {
        header: "Usage",
        cell: (row) => (<Badge tt={'capitalize'} color="dark">{`${row.renderValue()}`}</Badge>),
        accessorKey: "vehicleUse.name",
      },    
      {
        header: "Numero du registre",
        cell: (row) => (<Badge tt={'capitalize'} color="green">{`${row.renderValue()}`}</Badge>),
        accessorKey: "registration_number",
      },    
      {
        header: "Entreprise",
        cell: (row) => (<Badge tt={'capitalize'} color="dark">{`${row.renderValue()}`}</Badge>),
        accessorKey: "company.name",
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
        isEditable={permissionsChecker(Routes.vehicles)?.canUpdate}
      />
    </>
  );
}

export default VehiclesTable;