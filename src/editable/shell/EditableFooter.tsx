'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const HIDDEN_FOOTER_TASKS = new Set(['listing', 'image'])

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && !HIDDEN_FOOTER_TASKS.has(task.key))
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className={`mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 lg:px-8 ${taskLinks.length ? 'lg:grid-cols-[1.2fr_1fr_1fr]' : 'lg:grid-cols-[1.2fr_1fr]'}`}>
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--slot4-accent)]/45 bg-[var(--slot4-surface-bg)]">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
            </span>
            <span className="editable-display text-xl font-extrabold tracking-[-0.01em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">{globalContent.footer?.description || SITE_CONFIG.description}</p>
        </div>

        {taskLinks.length ? (
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Explore</h3>
          <div className="mt-4 grid gap-2.5">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent)]">
                <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                {task.label}
              </Link>
            ))}
          </div>
        </div>
        ) : null}

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Site</h3>
          <div className="mt-4 grid gap-2.5">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent)]">
                <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                {label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={logout} className="text-left text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent)]">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--editable-border)] px-4 py-5 text-center text-xs font-semibold tracking-[0.08em] text-[var(--slot4-muted-text)]">
        © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
