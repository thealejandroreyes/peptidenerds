import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Only run Supabase session refresh when Pro features are enabled
  if (process.env.NEXT_PUBLIC_PRO_ENABLED !== 'true') {
    return NextResponse.next()
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
