export function TableOfContents({ html }: { html: string }) {
  const headings: { id: string; text: string }[] = []
  const regex = /<h2[^>]*>(.*?)<\/h2>/gi
  let match

  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '').trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    headings.push({ id, text })
  }

  if (headings.length === 0) return null

  return (
    <nav aria-label="Table of contents" className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold text-foreground">In this guide</h2>
      <ol className="mt-3 space-y-2">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
