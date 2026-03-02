import Link from 'next/link'

const footerLinks = {
  'Weight Loss': [
    { name: 'Best Peptides for Weight Loss', href: '/goals/weight-loss' },
    { name: 'GLP-1 Peptides', href: '/peptides' },
    { name: 'Compare GLP-1s', href: '/compare' },
    { name: 'Weight Loss Stacks', href: '/stacks' },
    { name: 'Dosage Calculator', href: '/tools/dosage-calculator' },
  ],
  Learn: [
    { name: 'Start Here', href: '/start-here' },
    { name: 'All Peptides', href: '/peptides' },
    { name: 'Goals', href: '/goals' },
    { name: 'Blog', href: '/blog' },
  ],
  Legal: [
    { name: 'Medical Disclaimer', href: '/disclaimer' },
    { name: 'Editorial Policy', href: '/editorial-policy' },
    { name: 'About', href: '/about' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#1E2A2A]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="text-lg font-bold text-white">
              Peptide<span className="text-sage">Nerds</span>
            </Link>
            <p className="mt-3 text-sm text-white/60">
              The evidence-based guide to peptides for weight loss. Research-backed comparisons, dosing protocols, and tools.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white">{category}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-sage">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-xs text-white/60">
            This website is for educational and informational purposes only. It is not medical advice. Always consult a
            qualified healthcare provider before starting any peptide protocol. See our{' '}
            <Link href="/disclaimer" className="text-sage hover:text-white">
              full medical disclaimer
            </Link>
            .
          </p>
          <p className="mt-2 text-center text-xs text-white/60">
            &copy; {new Date().getFullYear()} Peptide Nerds. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
