import React from "react";
import { getClients } from "@/data/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
export default async function Clients() {
  const clients = await getClients();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={clients} />
    </div>
  );
}
