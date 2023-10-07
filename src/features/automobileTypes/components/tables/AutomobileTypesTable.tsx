import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { IAutomobileType } from "../../types";
import { Badge, Anchor, Text , Image} from '@mantine/core';
import { useAutomobileTypes } from "../../hooks/automobileTypes";
import { Routes } from "../../../../navigation/routes";
import { useFeaturePermissions } from "../../../accessControl/hooks/permissions";

interface Props{
  filters: {
    keyword?: string;
  };
  onSelect?: (automobileTypes: IAutomobileType[]) => void;
  onEdit?: (automobileType: IAutomobileType) => void;
}

function AutomobileTypesTable({ filters, onSelect, onEdit }: Props){

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { keyword } = filters;

  const dataQuery = useAutomobileTypes({
    page: currentPage,
    per_page: 10,
    field: "name",
    keyword: keyword,
  });

  const { meta, data, isLoading, isFetching, errorResponse } = dataQuery;

  const permissionsChecker = useFeaturePermissions();

  const cols = React.useMemo<ColumnDef<IAutomobileType>[]>(
    () => [
      {
        header: "Nom",
        cell: (row) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src={`${row?.row?.original?.cover}`}
              alt="Race Type Image"
              width={50}
              height={50}
              radius="md"
              style={{ marginRight: 8 }}
            />
            <Anchor component="span" fz="sm">
              {`${row.renderValue()}`}
            </Anchor>
          </div>
        ),
        accessorKey: "name",
      },
      {
        header: "Consommation carburant",
        cell: (row) => (
          <Text component="span" fz="sm">
            ≈ {`${row.renderValue()}`} Litres/Km
          </Text>
        ),
        accessorKey: "fuelConsumption",
      },
      {
        header: "Nombre des sieges",
        cell: (row) => (
          <Text component="span" fz="sm">
            ≈ {`${row.renderValue()}`}
          </Text>
        ),
        accessorKey: "numberOfSeats",
      },
      {
        header: "Description",
        cell: (row) => row.renderValue(),
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
        isEditable={permissionsChecker(Routes.automobileTypes)?.canUpdate}
      />
    </>
  );
}

export default AutomobileTypesTable;