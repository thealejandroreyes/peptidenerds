// Feature flags for Peptide Nerds Pro
// Set NEXT_PUBLIC_PRO_ENABLED=true in Vercel env vars to enable

export const flags = {
  proEnabled: process.env.NEXT_PUBLIC_PRO_ENABLED === 'true',
} as const
