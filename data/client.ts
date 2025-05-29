// data/clients.ts
import { supabase } from "@/supabase/supabaseClient";

type Client = {
  full_name: string;
  email: string;
  ced: string;
  phone: string;
  membership_status: string;
};

export async function getClients() {
  const { data, error } = await supabase.from("clients").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function createClient(input: Client) {
  const { data, error } = await supabase
    .from("clients")
    .insert(input)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
