"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { DATA_LIMIT } from "@/lib/constants/datas";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages: number;
  offset: number;
  hasMorePage: boolean;
  handleCurrentPage: (page: number) => void;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  totalPages,
  offset,
  hasMorePage,
  handleCurrentPage,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: DATA_LIMIT,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      columnFilters,
    },
  });

  useEffect(() => {
    // reset page index every 11th page because we are only getting 10 pages worth of datas at a time
    if (pagination.pageIndex === 10) {
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  }, [pagination.pageIndex]);

  return (
    <>
      <div className="rounded-md border">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter package..."
            value={
              (table.getColumn("package_name")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("package_name")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="max-sm:text-xs">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="max-sm:text-xs">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-8">
        <p className="max-md:hidden">{`Page ${pagination.pageIndex + 1 + offset / 10} of ${totalPages}`}</p>
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-primary-0 border"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              table.nextPage();
              handleCurrentPage(pagination.pageIndex);
            }}
            disabled={!hasMorePage}
            className="bg-primary-0 border"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </>
  );
}
