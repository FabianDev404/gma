"use client";

import React, { useEffect, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getClient } from "@/data/client";
import { updateClient } from "@/data/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
  full_name: z.string().min(1, "Requerido"),
  ced: z.string().min(9, "Debe tener al menos 9 caracteres"),
  email: z.string().email("Correo inválido"),
  phone: z.string().min(8, "Teléfono inválido"),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditForm({
  cardId,
  setIsOpen,
}: {
  cardId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      ced: "",
      email: "",
      phone: "",
    },
  });
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const token = await getToken({ template: "supabase" });
        if (!token) {
          console.error("Token is null. Unable to fetch client.");
          return;
        }
        const data = await getClient(cardId, token);
        if (data) {
          form.reset({
            full_name: data.full_name,
            ced: data.ced,
            email: data.email,
            phone: data.phone,
          });
        }
      } catch (error) {
        console.error("Error fetching client:", error);
      }
    };
    fetchClient();
  }, [cardId, form, getToken]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: FormValues) => {
    try {
      const token = await getToken({ template: "supabase" });
      if (!token) {
        console.error("Token is null. Unable to update client.");
        return;
      }
      await updateClient(values, cardId, token);
      console.log("Cliente actualizado con éxito");
      setIsOpen(false);
    } catch (error) {
      console.error("Error actualizando el cliente:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 sm:px-0 px-4"
      >
        <Input
          {...form.register("full_name")}
          placeholder="Nombre completo"
          required
        />
        <Input {...form.register("ced")} placeholder="Cédula" required />
        <Input
          {...form.register("email")}
          placeholder="Correo electrónico"
          required
        />
        <Input {...form.register("phone")} placeholder="Teléfono" required />

        <div className="w-full flex justify-center sm:space-x-6">
          <Button
            size="lg"
            variant="outline"
            disabled={isLoading}
            className="w-1/2 hidden sm:block"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            size="lg"
            type="submit"
            disabled={isLoading}
            className="w-1/2 bg-primary text-white hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando...
              </>
            ) : (
              <span>Crear</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
