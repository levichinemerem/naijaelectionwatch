import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Public client (for client-side)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// === ADMIN CLIENT - Fully lazy to prevent build-time errors ===
let supabaseAdminInstance: ReturnType<typeof createClient> | null = null

export const getSupabaseAdmin = () => {
  if (!supabaseAdminInstance) {
    const serviceKey = process.env.SUPABASE_SERVICE_KEY
    
    if (!serviceKey) {
      throw new Error('SUPABASE_SERVICE_KEY environment variable is missing. Check Vercel settings.')
    }
    
    supabaseAdminInstance = createClient(supabaseUrl, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }
  return supabaseAdminInstance
}

// Proxy for backward compatibility (so supabaseAdmin.from() works without crashing at build time)
export const supabaseAdmin = new Proxy({} as any, {
  get(target, prop: string) {
    const admin = getSupabaseAdmin()
    return (admin as any)[prop]
  }
})
