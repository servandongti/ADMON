import { createClient } from "@supabase/supabase-js";

const supabaseBaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE || "";

export const supabase = createClient(supabaseBaseUrl, supabaseKey);
