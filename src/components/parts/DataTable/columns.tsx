"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";

export interface LessonData {
  id: number;
  package: {
    name: string;
  };
  start_datetime: string;
  status: "attended" | "missed" | "cancelled";
  teacher: {
    first_name: string;
    last_name: string;
  };
}

export const columns: ColumnDef<LessonData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "package.name",
    header: "Package Name",
  },
  {
    accessorKey: "start_datetime",
    header: "Start Date & Time",
    cell: ({ row }) => {
      const parsedDate = parseISO(row.getValue<string>("start_datetime"));
      const formattedDate = format(parsedDate, "MMM d, yyyy");
      return <p>{formattedDate}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "teacher.first_name",
    header: "Teacher First Name",
  },
];
