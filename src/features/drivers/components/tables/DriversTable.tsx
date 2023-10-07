import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { IDriver } from "../../types";
import { Badge, Anchor, Flex, Avatar, Text , Image} from "@mantine/core";
import { useDrivers } from "../../hooks/drivers";
import { Routes } from "../../../../navigation/routes";
import { useFeaturePermissions } from "../../../accessControl/hooks/permissions";
import { Link } from "react-router-dom";

interface Props {
  filters: {
    keyword?: string;
  };
  onSelect?: (drivers: IDriver[]) => void;
  onEdit?: (driver: IDriver) => void;
}

function DriversTable({ filters, onSelect, onEdit }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { keyword } = filters;

  const dataQuery = useDrivers({
    page: currentPage,
    per_page: 10,
    field: "name",
    keyword: keyword,
  });

  const { meta, data, isLoading, isFetching, errorResponse } = dataQuery;

  const permissionsChecker = useFeaturePermissions();

  const cols = React.useMemo<ColumnDef<IDriver>[]>(
    () => [
      {
        header: "Name",
        cell: (cell) => (
          <Link to={`${Routes.drivers}/${cell.row.original.name}`}>
            <Anchor component="span" fz="sm">
              <Flex gap={5} align={"center"}>
                {
                  cell.row?.original?.profile && 
                  <Image
                  src={`${process.env.REACT_APP_FILES_URL}/drivers/${cell.row?.original?.profile}`}
                  alt="Profile"
                  width={50}
                  height={50}
                  radius="md"
                  style={{ marginRight: 8 }}
                />
                }
                {" "}
                <Text fw="bold">{`${cell.renderValue()}`}</Text>
              </Flex>
            </Anchor>
          </Link>
        ),
        accessorKey: "name",
      },
      {
        header: "Phone",
        cell: (row) => row.renderValue(),
        accessorKey: "phone",
      },
      {
        header: "Ville",
        cell: (row) => (
          <Badge tt={"capitalize"}>{`${row.renderValue()}`}</Badge>
        ),
        accessorKey: "address.city.name",
      },
      {
        header: "Entreprise",
        cell: (row) => (
          <Badge
            tt={"capitalize"}
            color="green"
          >{`${row.renderValue()}`}</Badge>
        ),
        accessorKey: "company.name",
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
        isEditable={permissionsChecker(Routes.drivers)?.canUpdate}
      />
    </>
  );
}

export default DriversTable;
