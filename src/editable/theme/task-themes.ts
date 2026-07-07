import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  Playful directory task surfaces.

  Every task (archive + detail) shares one cohesive warm identity: cream
  paper surfaces, a terracotta accent, sage hairlines, and deep espresso
  text — the same "playful directory" palette used across the whole site.
  Per-task copy (kicker / note) still varies so each section keeps a little
  voice, but the visual language is unified. Tokens are delivered via CSS
  variables (`--tk-*`).
*/

export type TaskTheme = {
  /** short flavour word shown as an eyebrow kicker */
  kicker: string
  /** one-line mood note for the page intro */
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

// Shared "playful directory" palette — every task inherits this; only kicker/note differ.
const base = {
  dark: false,
  fontDisplay: DISPLAY_FONT,
  fontBody: DISPLAY_FONT,
  bg: '#F7F1DE',
  surface: '#FFFCF3',
  raised: '#EFE6CC',
  text: '#4E220F',
  muted: '#7A5B44',
  line: '#E1D6B5',
  accent: '#9D6638',
  accentSoft: '#EDE6D2',
  onAccent: '#FDF8EC',
  glow: 'rgba(157,102,56,0.10)',
  radius: '1.25rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Articles', note: 'In-depth reads, guides and stories worth your time.' },
  listing: { ...base, kicker: 'Businesses', note: 'Find, compare and connect with local businesses.' },
  classified: { ...base, kicker: 'Marketplace', note: 'Fresh offers and listings, ready to act on.' },
  image: { ...base, kicker: 'Photos', note: 'A visual feed of standout images and galleries.' },
  sbm: { ...base, kicker: 'Bookmarks', note: 'Curated resources and links worth saving.' },
  pdf: { ...base, kicker: 'Documents', note: 'Downloadable guides, reports and references.' },
  profile: { ...base, kicker: 'People', note: 'Discover creators, businesses and profiles.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

/** All `--tk-*` tokens + font overrides for a task surface, ready for `style`. */
export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    // Re-point the shared article-body accent vars so post HTML (headings,
    // links) inherits this task's accent instead of the global site accent.
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
