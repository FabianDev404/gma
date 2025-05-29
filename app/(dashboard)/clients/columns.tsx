"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
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
    cell: ({ row }) => {
      const clients = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-md">
            <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(clients.id)}>Edit Client</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(clients.id)}>Delete Client</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
