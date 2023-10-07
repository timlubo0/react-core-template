import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { IRaceType } from "../../types";
import { Badge, Anchor } from '@mantine/core';
import { useRaceTypes } from "../../hooks/raceTypes";
import { Routes } from "../../../../navigation/routes";
import { useFeaturePermissions } from "../../../accessControl/hooks/permissions";
import { Image } from '@mantine/core';

interface Props{
  filters: {
    keyword?: string;
  };
  onSelect?: (raceTypes: IRaceType[]) => void;
  onEdit?: (raceType: IRaceType) => void;
}

function RaceTypesTable({ filters, onSelect, onEdit }: Props){

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { keyword } = filters;

  const dataQuery = useRaceTypes({
    page: currentPage,
    per_page: 10,
    field: "name",
    keyword: keyword,
  });

  const { meta, data, isLoading, isFetching, errorResponse } = dataQuery;

  const permissionsChecker = useFeaturePermissions();

  const cols = React.useMemo<ColumnDef<IRaceType>[]>(
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
        isEditable={permissionsChecker(Routes.raceTypes)?.canUpdate}
      />
    </>
  );
}

export default RaceTypesTable;