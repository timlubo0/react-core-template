import { Table } from "@tanstack/react-table";
import { Pagination as MPagination } from "../base";
import { useEffect, useState } from "react";

interface Props<T extends object> {
  table: Table<T>;
  onPageChange: (page: number) => void;
}

function Pagination<T extends object>({ table, onPageChange }: Props<T>) {
  const [activePage, setPage] = useState<number>(1);

  useEffect(() => {
    table.setPageIndex(activePage);
    onPageChange(activePage);
  }, [activePage]);

  return (
    <MPagination
      value={activePage}
      onChange={setPage}
      total={table.getPageCount()}
      boundaries={9}
      color="indigo"
    />
  );
}

export default Pagination;