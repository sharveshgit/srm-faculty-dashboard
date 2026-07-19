import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const URL = (import.meta as any).env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL
const KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY

let client: SupabaseClient | null = null
if (URL && KEY) {
  client = createClient(URL, KEY)
}

// Export a client when configured, otherwise a minimal stub so the app doesn't crash.
export const supabase: SupabaseClient = (client as SupabaseClient) || ({} as SupabaseClient)
