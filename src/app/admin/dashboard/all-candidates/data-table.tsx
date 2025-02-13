"use client";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  VisibilityState,
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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Search, UserCheck } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="relative">
          <Input
            placeholder="Search by name"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm py-6 pl-12 rounded-xl my-4 mx-0 bg-[#ECF0FF] border-none placeholder:text-neutral-500 transition-all"
          />
          <Search className="absolute top-1/2 -translate-y-1/2 left-4 text-neutral-600 pointer-events-none size-5" />
        </div>

        {/* Status Filter Dropdown */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-2 font-base py-6 rounded-xl text-neutral-700 bg-[#ECF0FF] border-none hover:bg-indigo-100"
              >
                <UserCheck className="size-4" />
                Filter by Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="rounded-xl">
              <DropdownMenuCheckboxItem
                className="py-3 "
                checked={
                  table.getColumn("shortlisted")?.getFilterValue() === true
                }
                onCheckedChange={(value) =>
                  table
                    .getColumn("shortlisted")
                    ?.setFilterValue(value ? true : undefined)
                }
              >
                Shortlisted
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="py-3"
                checked={
                  table.getColumn("interviewStatus")?.getFilterValue() ===
                  "Cleared"
                }
                onCheckedChange={(value) =>
                  table
                    .getColumn("interviewStatus")
                    ?.setFilterValue(value ? "Cleared" : undefined)
                }
              >
                Interview Cleared
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto font-base py-6 rounded-xl text-neutral-700 bg-[#ECF0FF] border-none hover:bg-indigo-100"
              >
                <Filter className="size-4" />
                All Fitlers
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize py-2"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-[#ECF0FF] rounded-2xl shadow">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-8 py-4">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
                  className="hover:bg-indigo-50/40"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="pl-8">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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

        {/* Next and Previous Buttons */}
      </div>
      <div className="flex items-center justify-between mt-10">
        {/* Total Users */}
        <div>
          <p className="text-sm text-neutral-500 mb-2">
            Total: <span className="text-black font-medium">{data.length}</span>
          </p>
        </div>

        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="w-28 py-5 rounded-xl"
          >
            Previous
          </Button>
          <Button
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-indigo-500 w-28 py-5 rounded-xl hover:bg-indigo-800"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
