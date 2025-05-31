// data/clients.ts
import { supabaseClient } from "@/supabase/supabaseClient";

type Client = {
  full_name: string;
  email: string;
  ced: string;
  phone: string;
};

export async function getClients(token: string) {
  const supabase =  supabaseClient(token);
  const { data, error } = await supabase.from("clients").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getClient(id: string, token: string) {
  const supabase =  supabaseClient(token);
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function createClient(input: Client, token: string) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("clients").insert(input).select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function updateClient(input: Client, id: string, token: string) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("clients").update({
      full_name: input.full_name,
      email: input.email,
      ced: input.ced,
      phone: input.phone,
    }).eq("id", id).select();
  console.log("Update response:", data, error);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function deleteClient(id: string, token: string) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("clients").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
