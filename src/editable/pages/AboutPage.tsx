import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  const heroImage = '/placeholder.svg?height=900&width=1200'
  return (
    <EditableSiteShell>
      <main>
        {/* Rounded hero band with cut-in bottom corners */}
        <section className="relative overflow-hidden rounded-b-[3rem] bg-[var(--slot4-dark-bg)] px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <div className="editable-dot-grid absolute inset-0 opacity-40" />
          <div className="relative mx-auto max-w-2xl">
            <p className="inline-flex items-center rounded-full bg-[var(--slot4-cream)]/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-[var(--slot4-cream)]">{pagesContent.about.badge}</p>
            <h1 className="editable-display mt-5 text-4xl font-extrabold tracking-[-0.01em] text-[var(--slot4-cream)] sm:text-5xl">About {SITE_CONFIG.name}</h1>
            <p className="mt-4 text-base leading-7 text-[var(--slot4-cream)]/85 sm:text-lg">{pagesContent.about.title}</p>
          </div>
        </section>

        {/* Who we are: two-column */}
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border-4 border-[var(--slot4-sage)]/50 bg-[var(--slot4-media-bg)] shadow-[0_20px_50px_rgba(78,34,15,0.14)]">
            <img src={heroImage} alt={`${SITE_CONFIG.name} team`} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Who we are</p>
            <h2 className="editable-display mt-3 text-3xl font-extrabold tracking-[-0.01em] sm:text-4xl">{pagesContent.about.title}</h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-[var(--slot4-muted-text)]">
              {pagesContent.about.paragraphs.slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--slot4-accent)_0%,#C08A55_100%)] px-6 py-3 text-sm font-bold text-[var(--slot4-on-accent)] shadow-[0_10px_24px_rgba(157,102,56,0.3)] transition duration-300 hover:-translate-y-0.5">
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {pagesContent.about.values.map((value, index) => (
              <div
                key={value.title}
                className={`rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 ${
                  index % 2 === 0
                    ? 'border-[var(--slot4-sage)]/50 bg-[var(--slot4-sage-soft)]'
                    : 'border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]'
                }`}
              >
                <h2 className="editable-display text-xl font-extrabold tracking-[-0.01em]">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}