import { createClient } from "@supabase/supabase-js";

// --- REPLACE THESE VALUES WITH YOUR OWN ---
const SUPABASE_URL = "https://tyzdmbnbiobsejlwfuwr.supabase.co";
const SUPABASE_PUBLIC_KEY = "sb_publishable_Yk_YKQ1p-YACYNC754KW4g_TT0g_Bzw";
// -------------------------------------------

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
