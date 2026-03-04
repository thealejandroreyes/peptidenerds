import type { Citation } from '@/lib/types'

export function CitationsSection({ citations }: { citations: Citation[] }) {
  if (citations.length === 0) return null

  return (
    <div>
      <h2 className="text-xl text-foreground" id="references">References</h2>
      <ol className="mt-4 space-y-3 list-decimal list-inside">
        {citations.map((cite, i) => (
          <li key={i} className="text-sm text-muted leading-relaxed">
            <span className="text-foreground">{cite.authors}</span>{' '}
            &ldquo;{cite.title}.&rdquo;{' '}
            <em>{cite.journal}</em> ({cite.year}).
            {cite.pmid && (
              <>
                {' '}
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${cite.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  PMID: {cite.pmid}
                </a>
              </>
            )}
            {cite.doi && !cite.pmid && (
              <>
                {' '}
                <a
                  href={`https://doi.org/${cite.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  DOI
                </a>
              </>
            )}
            <span className="block mt-1 text-xs italic text-muted/70">
              Key finding: {cite.keyFinding}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
