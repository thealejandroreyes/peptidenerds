'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  isProSubscriber: boolean
  isLoading: boolean
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    isProSubscriber: false,
    isLoading: true,
  })

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setState({
        user,
        isProSubscriber: user?.user_metadata?.subscription_status === 'pro',
        isLoading: false,
      })
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null
      setState({
        user,
        isProSubscriber: user?.user_metadata?.subscription_status === 'pro',
        isLoading: false,
      })
    })

    return () => subscription.unsubscribe()
  }, [])

  return state
}
