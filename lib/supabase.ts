import { createClient } from "@supabase/supabase-js";

const supabaseBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseBaseUrl, supabaseKey);
