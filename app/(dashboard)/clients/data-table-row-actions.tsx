"use client";

import { useState } from "react";
import DeleteForm from "./delete-form";
import EditForm from "./edit-form";
import IconMenu from "@/components/ui/icon-menu";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";

interface WithId<T> {
  id: string;
}
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends WithId<string>>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const cardId = row.original.id as string;

  return (
    <>
      {/* Edit Dialog */}
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Edit Client"
        description="Are you sure you want to edit this client?"
      >
        <EditForm cardId={cardId} setIsOpen={setIsEditOpen} />
      </ResponsiveDialog>

      {/* Delete Dialog */}
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete Client"
        description="Are you sure you want to delete this client?"
      >
        <DeleteForm cardId={cardId} setIsOpen={setIsDeleteOpen} />
      </ResponsiveDialog>

      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] z-50">
          <DropdownMenuItem
            onClick={() => {
              setTimeout(() => setIsEditOpen(true), 10);
            }}
            className="text-neutral-700 hover:bg-neutral-100"
          >
            <IconMenu text="Edit" icon={<SquarePen className="h-4 w-4" />} />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setTimeout(() => setIsDeleteOpen(true), 10);
            }}
            className="text-red-600 hover:bg-red-100"
          >
            <IconMenu text="Delete" icon={<Trash2 className="h-4 w-4" />} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
