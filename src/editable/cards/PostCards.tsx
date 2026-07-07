import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

// ---- Featured / hero card: large image, big headline, one-off use at the
// top of a listing/gallery page. Deep espresso panel + terracotta eyebrow. ----
export function EditorialFeatureCard({ post, href, label = 'Featured read' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden rounded-[2rem] ${dc.motion.lift}`}>
      <div className="relative min-h-[460px] bg-[var(--slot4-dark-bg)] p-6 sm:p-8 lg:min-h-[560px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(78,34,15,0.15),rgba(78,34,15,0.9))]" />
        <div className="relative z-10 flex h-full min-h-[400px] flex-col justify-end lg:min-h-[500px]">
          <span className="inline-flex w-fit items-center rounded-full bg-[var(--slot4-accent)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-on-accent)]">{label}</span>
          <h3 className="editable-display mt-5 max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-[-0.01em] text-[var(--slot4-cream)] sm:text-4xl lg:text-5xl">{post.title}</h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--slot4-cream)]/80 sm:text-base">{getEditableExcerpt(post, 190)}</p>
          <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--slot4-cream)] px-5 py-3 text-sm font-bold text-[var(--slot4-dark-bg)] shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition duration-300 group-hover:-translate-y-0.5">
            Read more <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

// ---- Compact card: small thumbnail + tight text, for dense grids. Sage
// number badge, cream panel. ----
export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] ${dc.motion.lift}`}>
      <div className={`${dc.media.frame} ${dc.media.ratio}`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-[var(--slot4-sage)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-page-text)]">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="p-4">
        <p className={`text-[11px] font-bold uppercase tracking-[0.18em] ${pal.accentText}`}>{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-base font-extrabold leading-tight tracking-[-0.01em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 90)}</p>
      </div>
    </Link>
  )
}

// ---- Horizontal card: image beside content, for list-style sections.
// Sage border, terracotta index badge. ----
export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex min-w-0 items-center gap-4 rounded-2xl border border-[var(--slot4-sage)]/50 bg-[var(--slot4-surface-bg)] p-4 transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/60 hover:shadow-[0_14px_32px_rgba(78,34,15,0.14)]">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 flex-1">
        <p className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] ${pal.accentText}`}><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</p>
        <h3 className="mt-1.5 line-clamp-2 text-lg font-extrabold leading-tight tracking-[-0.01em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-1.5 line-clamp-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 90)}</p>
      </div>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-xs font-bold text-[var(--slot4-accent)]">{index + 1}</span>
    </Link>
  )
}

// ---- Editorial / list row: text-forward, thin divider rows, minimal image. ----
export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 gap-4 border-b border-[var(--editable-border)] py-5 transition duration-300 hover:pl-2 sm:grid-cols-[100px_minmax(0,1fr)] sm:items-center sm:gap-6">
      <div className="hidden aspect-square overflow-hidden rounded-xl bg-[var(--slot4-media-bg)] sm:block">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0">
        <p className={`text-[11px] font-bold uppercase tracking-[0.18em] ${pal.accentText}`}>Read {String(index + 1).padStart(2, '0')}</p>
        <h2 className="editable-display mt-2 line-clamp-2 text-xl font-extrabold leading-tight tracking-[-0.01em] text-[var(--slot4-page-text)] sm:text-2xl">{post.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 150)}</p>
        <span className={`mt-3 inline-flex items-center gap-1.5 text-sm font-bold ${pal.accentText}`}>Open <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" /></span>
      </div>
    </Link>
  )
}

// ---- Image-first card: image dominates, caption overlay — for the
// image/gallery task and any visual-led grid. ----
export function ImageFirstCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group block min-w-0 overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(78,34,15,0.18)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(78,34,15,0.85))] opacity-90 transition group-hover:opacity-100" />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-[var(--slot4-sage)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--slot4-page-text)]">{getEditableCategory(post)}</span>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="editable-display line-clamp-2 text-lg font-extrabold leading-snug tracking-[-0.01em] text-[var(--slot4-cream)]">{post.title}</h3>
          <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--slot4-cream)]/75">View <ArrowRight className="h-3.5 w-3.5" /></span>
        </div>
      </div>
    </Link>
  )
}
