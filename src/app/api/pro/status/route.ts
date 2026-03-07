import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ authenticated: false, pro: false })
  }

  return NextResponse.json({
    authenticated: true,
    pro: user.user_metadata?.subscription_status === 'pro',
    email: user.email,
  })
}
