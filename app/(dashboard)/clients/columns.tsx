"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from './data-table-row-actions';
export type Client = {
  id: string;
  full_name: string;
  ced: string;
  email: string;
  phone: string;
  membership_status: "active" | "inactive";
  created_at: string;
};


export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "ced",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "membership_status",
    header: "Membership Status",
  },
  {
    accessorKey: "created_at",
    header: "Registration Date",
    cell: ({ row }) => {
      const raw = row.getValue("created_at");
      const date = new Date(raw as string).toLocaleDateString("es-CR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
