'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  // Business Listing / Image were removed from primary nav (kept as routes only).
  const navItems = useMemo(
    () => [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Search', href: '/search' },
    ],
    []
  )

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/95 text-[var(--editable-nav-text)] shadow-[0_2px_16px_rgba(78,34,15,0.06)] backdrop-blur-md">
      <nav className="mx-auto flex min-h-[80px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--slot4-accent)]/50 bg-[var(--slot4-surface-bg)] shadow-[0_3px_10px_rgba(157,102,56,0.18)] transition duration-300 group-hover:-rotate-6 group-hover:border-[var(--slot4-accent)]">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
          </span>
          <span className="hidden min-w-0 md:block">
            <span className="editable-display block max-w-[220px] truncate text-xl font-extrabold leading-none tracking-[-0.01em]">{SITE_CONFIG.name}</span>
            <span className="mt-1 block max-w-[220px] truncate text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        <div className="ml-4 hidden items-center gap-1 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]/60 p-1 lg:flex">
          {[{ label: 'Home', href: '/' }, ...navItems].slice(0, 6).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-[13px] font-bold transition ${
                  active
                    ? 'bg-[var(--slot4-accent)] text-[var(--slot4-on-accent)] shadow-[0_4px_12px_rgba(157,102,56,0.28)]'
                    : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-sage-soft)] hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <form action="/search" className="mx-auto hidden min-w-0 max-w-xs flex-1 md:flex">
          <label className="flex w-full items-center gap-2 rounded-full border border-[var(--slot4-sage)]/60 bg-[var(--slot4-surface-bg)] px-4 py-2.5 transition focus-within:border-[var(--slot4-accent)]">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
            <input
              name="q"
              type="search"
              placeholder="Search posts"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--slot4-muted-text)]"
            />
          </label>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--slot4-accent)_0%,#C08A55_100%)] px-5 py-2.5 text-[13px] font-bold text-[var(--editable-cta-text)] shadow-[0_6px_16px_rgba(157,102,56,0.3)] transition duration-300 hover:-translate-y-0.5 sm:inline-flex"
              >
                <PlusCircle className="h-3.5 w-3.5" /> Get Listed
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden items-center gap-2 px-3 py-2 text-[13px] font-bold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2.5 text-[13px] font-bold text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/50 hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                <LogIn className="h-3.5 w-3.5" /> Login
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--slot4-accent)_0%,#C08A55_100%)] px-5 py-2.5 text-[13px] font-bold text-[var(--editable-cta-text)] shadow-[0_6px_16px_rgba(157,102,56,0.3)] transition duration-300 hover:-translate-y-0.5 sm:inline-flex"
              >
                <UserPlus className="h-3.5 w-3.5" /> Get Listed
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-2.5 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-5 lg:hidden">
          <form action="/search" className="mb-5 flex items-center gap-2 rounded-full border border-[var(--slot4-sage)]/60 bg-[var(--slot4-surface-bg)] px-4 py-2.5">
            <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
            <input name="q" type="search" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
          </form>
          <div className="grid gap-1.5">
            {[{ label: 'Home', href: '/' }, ...navItems, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-full px-4 py-3 text-sm font-bold transition ${
                    active
                      ? 'bg-[var(--slot4-accent)] text-[var(--slot4-on-accent)]'
                      : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-sage-soft)] hover:text-[var(--slot4-page-text)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </header>
  )
}
