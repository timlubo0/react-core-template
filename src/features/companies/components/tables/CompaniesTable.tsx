import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { ICompany } from "../../types";
import { Anchor } from "src/components/base";
import { useCompanies } from "../../hooks/companies";
import { useFeaturePermissions } from "../../../accessControl/hooks/permissions";
import { Routes } from "../../../../navigation/routes";

interface Props {
  filters: {
    keyword?: string;
  };
  onSelect?: (companies: ICompany[]) => void;
  onEdit?: (company: ICompany) => void;
}

function CompaniesTable({ filters, onSelect, onEdit }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { keyword } = filters;

  const dataQuery = useCompanies({
    page: currentPage,
    per_page: 10,
    field: "name",
    keyword: keyword,
  });

  const { meta, data, isLoading, isFetching, errorResponse } = dataQuery;

  const permissionsChecker = useFeaturePermissions();

  const cols = React.useMemo<ColumnDef<ICompany>[]>(
    () => [
      {
        header: "Name",
        cell: (row) => (
          <Anchor fz="sm">
            {`${row.renderValue()}`}
          </Anchor>
        ),
        accessorKey: "name",
      },
      {
        header: "NIF",
        cell: (row) => row.renderValue(),
        accessorKey: "nif",
      },
      {
        header: "ID_NAT",
        cell: (row) => row.renderValue(),
        accessorKey: "idNat",
      },
      {
        header: "RCCM",
        cell: (row) => row.renderValue(),
        accessorKey: "rccm",
      },
    ],
    []
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        isEditable={permissionsChecker(Routes.currencies)?.canUpdate}
      />
    </>
  );
}

export default CompaniesTable;
