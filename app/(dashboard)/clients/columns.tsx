"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "full_name",
    header: "Nombre completo",
  },
  {
    accessorKey: "ced",
    header: "Cédula",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "membership_status",
    header: "Membresía",
  },
  {
    accessorKey: "created_at",
    header: "Registrado",
    cell: ({ row }) => {
      const raw = row.getValue("created_at") as string | number | Date;
      const date = new Date(raw).toLocaleDateString("es-CR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return <span>{date}</span>;
    },
  },
];
