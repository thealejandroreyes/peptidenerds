'use client'

import { useState } from 'react'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://formspree.io/f/xpwzgqjk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })

      if (res.ok) {
        setStatus('sent')
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Contact', href: '/contact' }]} />

      <h1 className="text-3xl font-light text-foreground">Contact</h1>
      <p className="mt-3 text-muted">
        Have a question, correction, or media inquiry? Use the form below. I read every message.
      </p>

      {status === 'sent' ? (
        <div className="mt-8 rounded-xl border border-accent/20 bg-soft-sky/30 p-8 text-center">
          <h2 className="text-lg text-foreground">Message sent</h2>
          <p className="mt-2 text-muted">
            Thanks for reaching out. I will get back to you as soon as I can.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 text-sm text-accent transition-colors hover:text-accent-hover"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 rounded-xl border border-border bg-card p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="subject" className="block text-sm font-medium text-foreground">
              Subject
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
            >
              <option value="">Select a topic</option>
              <option value="correction">Content correction or factual error</option>
              <option value="question">Question about a peptide or protocol</option>
              <option value="media">Media or press inquiry</option>
              <option value="collaboration">Collaboration or partnership</option>
              <option value="advertising">Advertising inquiry</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="block text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              required
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          {status === 'error' && (
            <p className="mt-4 text-sm text-red-600">
              Something went wrong. Please try again or email us directly.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-6 w-full rounded-full bg-cta px-6 py-3 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending...' : 'Send message'}
          </button>
        </form>
      )}

      <div className="mt-10 prose-custom">
        <h2>Other ways to connect</h2>
        <ul>
          <li>
            <strong>Instagram:</strong>{' '}
            <a href="https://instagram.com/fatmaninthearena" target="_blank" rel="noopener noreferrer">
              @fatmaninthearena
            </a>
          </li>
          <li>
            <strong>Newsletter:</strong> Sign up at the bottom of any page for weekly research breakdowns
            and protocol updates.
          </li>
        </ul>

        <h2>Content corrections</h2>
        <p>
          If you find a factual error, outdated information, or a broken citation on any page, please let
          me know. I take accuracy seriously and will update the content promptly. Select &quot;Content correction
          or factual error&quot; in the subject dropdown above.
        </p>

        <h2>Media and press</h2>
        <p>
          For media inquiries, expert commentary requests, or interview opportunities, use the form above
          with &quot;Media or press inquiry&quot; selected. Please include your publication, deadline, and topic.
        </p>
      </div>
    </div>
  )
}
