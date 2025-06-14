import { createClient } from '@supabase/supabase-js'

const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY)
