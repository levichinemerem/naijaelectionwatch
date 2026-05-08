import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Public client (for client-side)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client - lazy initialization to avoid build-time errors
let supabaseAdminInstance: ReturnType<typeof createClient> | null = null

export const getSupabaseAdmin = () => {
  if (!supabaseAdminInstance) {
    const serviceKey = process.env.SUPABASE_SERVICE_KEY
    
    if (!serviceKey) {
      throw new Error('SUPABASE_SERVICE_KEY is required for admin operations')
    }
    
    supabaseAdminInstance = createClient(supabaseUrl, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  }
  return supabaseAdminInstance
}

// Optional: Keep old name for backward compatibility
export const supabaseAdmin = {
  from: (table: string) => getSupabaseAdmin().from(table),
  // Add other methods as needed
} as any
