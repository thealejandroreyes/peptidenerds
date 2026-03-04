const STORAGE_KEY = 'pn_subscribed'
const CTA_INTERACTION_KEY = 'pn_cta_interacted'
const CTA_DISMISSED_KEY = 'pn_cta_dismissed_session'

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

export function isSubscribed(): boolean {
  if (!isBrowser()) return false
  return localStorage.getItem(STORAGE_KEY) === 'true'
}

export function markSubscribed(): void {
  if (!isBrowser()) return
  localStorage.setItem(STORAGE_KEY, 'true')
}

export function hasInteractedWithCTA(): boolean {
  if (!isBrowser()) return false
  return localStorage.getItem(CTA_INTERACTION_KEY) === 'true'
}

export function markCTAInteraction(): void {
  if (!isBrowser()) return
  localStorage.setItem(CTA_INTERACTION_KEY, 'true')
}

export function isDismissedThisSession(): boolean {
  if (!isBrowser()) return false
  return sessionStorage.getItem(CTA_DISMISSED_KEY) === 'true'
}

export function dismissForSession(): void {
  if (!isBrowser()) return
  sessionStorage.setItem(CTA_DISMISSED_KEY, 'true')
}
