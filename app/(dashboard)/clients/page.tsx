import React from "react";
import { getClients } from "@/data/client";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import TableHeader from "@/components/ui/tableHeader";
// import Link from "next/link";



export default async function Clients() {
  const clients = await getClients();
  return (
    <>
      <div className="container-fluid mx-auto py-10 b-0 bg-white p-4 rounded-2xl shadow-md">
        <TableHeader name="Clients" description="Manage your clients here" />
        <DataTable columns={columns} data={clients} />
      </div>
    </>
  );
}
