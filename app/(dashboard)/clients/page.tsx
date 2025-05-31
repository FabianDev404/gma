"use client";
import React, { useEffect, useState } from "react";
import { getClients } from "@/data/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import TableHeader from "@/components/ui/tableHeader";
// import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import BreadcrumbClient from "./breadcrumb";

export default function Clients() {
  // Get the token from Clerk
  const { getToken } = useAuth();

  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Get the token for the user
        const token = await getToken({ template: "supabase" });
        // Fetch clients using the token
        if (token) {
          const clients = await getClients(token);
          setClients(clients);
        } else {
          console.error("Token is null. Unable to fetch clients.");
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, [getToken]);
  // const { userId, getToken } = await useAuth();
  // const clients = await getClients(userId);
  return (
    <>
      <BreadcrumbClient />
      <div className="container-fluid mx-auto py-10 b-0 bg-white p-4 rounded-2xl shadow-md">
        {/* <Link href="/dashboard/clients/create">Crear Cliente</Link> */}
        {/* <Button onClick={() => setAddClientOpen(true)}>Crear Cliente</Button> */}
        <TableHeader name="Clients" description="Manage your clients here" />
        <DataTable columns={columns} data={clients} />
      </div>
    </>
  );
}
