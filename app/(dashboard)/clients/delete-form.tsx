"use client";

import React, { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { deleteClient } from "@/data/client";
import { useAuth } from "@clerk/nextjs";
const formSchema = z.object({
  cardId: z.string(),
});

export default function DeleteForm({
  cardId,
  setIsOpen,
}: {
  cardId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardId: cardId,
    },
  });

  const { getToken } = useAuth();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async () => {
    try {
      console.log("Deleting client with ID:", cardId);
      const token = await getToken({ template: "supabase" });
      if (!token) {
        console.error("Token is null. Unable to delete client.");
        return;
      }
      // Call the deleteClient function with the cardId and token
      await deleteClient(cardId, token);
      console.log("Client deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6  sm:px-0 px-4"
      >
        <div className="w-full flex justify-center sm:space-x-6">
          <Button
            size="lg"
            variant="outline"
            disabled={isLoading}
            className="hidden sm:block"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            type="submit"
            disabled={isLoading}
            className=" bg-red-500 hover:bg-red-400"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting
              </>
            ) : (
              <span>Delete</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
