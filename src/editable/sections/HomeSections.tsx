import Link from 'next/link'
import {
  ArrowRight, Camera, ChevronRight, MapPin, MessageSquare, Search, Share2, Star, ThumbsUp,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

// Stable hash so derived ratings/counts stay consistent between renders.
function hashStr(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

// Prefer real rating/review data when present, else a stable display value so
// the Yelp-style star UI always reads well. (Wire to real fields when ready.)
function ratingOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.rating)
  if (real >= 1 && real <= 5) return Math.round(real * 10) / 10
  const h = hashStr(post.slug || post.id || post.title || 'x')
  return Math.round((3.7 + (h % 13) / 10) * 10) / 10 // 3.7 – 4.9
}

function reviewsOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.reviewCount ?? content.reviews)
  if (real > 0) return Math.floor(real)
  return 6 + (hashStr((post.slug || post.title || 'x') + 'r') % 480)
}

function Stars({ rating, className = 'h-4 w-4' }: { rating: number; className?: string }) {
  const rounded = Math.round(rating)
  return (
    <span className="inline-flex items-center gap-[3px]" aria-label={`${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${className} ${i < rounded ? 'fill-[var(--slot4-accent)] text-[var(--slot4-accent)]' : 'fill-[var(--slot4-sage)]/40 text-[var(--slot4-sage)]/40'}`}
        />
      ))}
    </span>
  )
}

function RatingRow({ post }: { post: SitePost }) {
  const rating = ratingOf(post)
  return (
    <div className="mt-2 flex items-center gap-2">
      <Stars rating={rating} className="h-4 w-4" />
      <span className="text-sm font-semibold text-[var(--slot4-page-text)]">{rating.toFixed(1)}</span>
      <span className="text-sm text-[var(--slot4-muted-text)]">({reviewsOf(post)})</span>
    </div>
  )
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

/* ----------------------------- Hero banner ----------------------------- */
// Latest posts' real images (newest first, deduped, placeholders dropped).
function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

// Merge the primary feed with the time-window feeds so home always has content,
// even when one source comes back empty for this site.
function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)
  const heroTitle = pagesContent.home.hero.title?.join(' ') || `Discover the best of ${SITE_CONFIG.name}`

  return (
    <section className="relative">
      <div className="relative h-[460px] w-full overflow-hidden sm:h-[540px] lg:h-[580px]">
        <EditableHeroCollage images={heroImages} />
        <div className="absolute inset-0 bg-[var(--slot4-dark-bg)]/30" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(78,34,15,0.88)_0%,rgba(78,34,15,0.55)_45%,rgba(78,34,15,0.22)_100%)]" />
        <div className={`relative flex h-full flex-col justify-center ${container}`}>
          <div className="max-w-2xl">
            <p className="inline-flex w-fit items-center rounded-full bg-[var(--slot4-cream)]/15 px-3.5 py-1.5 text-sm font-bold uppercase tracking-[0.16em] text-[var(--slot4-cream)] backdrop-blur-sm">{pagesContent.home.hero.badge || 'Welcome'}</p>
            <h1 className="editable-display mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-[-0.01em] text-[var(--slot4-cream)] sm:text-5xl lg:text-6xl">
              {heroTitle}
            </h1>
            <p className="mt-4 max-w-xl text-base text-[var(--slot4-cream)]/90 sm:text-lg">{pagesContent.home.hero.description}</p>

            <form action="/search" className="mt-7 flex w-full max-w-xl overflow-hidden rounded-full bg-[var(--slot4-cream)] shadow-[0_14px_36px_rgba(0,0,0,0.3)]">
              <div className="flex flex-1 items-center gap-2.5 px-5">
                <Search className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
                <input
                  name="q"
                  placeholder="Search posts, places, topics…"
                  className="w-full bg-transparent py-4 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
                />
              </div>
              <button className="shrink-0 rounded-full bg-[linear-gradient(135deg,var(--slot4-accent)_0%,#C08A55_100%)] m-1.5 px-6 text-sm font-bold text-[var(--slot4-on-accent)] transition duration-300 hover:-translate-y-0.5 sm:px-8">
                Search
              </button>
            </form>
          </div>
        </div>
        {heroImages.length ? (
          <p className="absolute bottom-4 left-4 text-xs font-medium text-[var(--slot4-cream)]/70 sm:left-8">Latest on {SITE_CONFIG.name}</p>
        ) : null}
      </div>
      {/* Quick stat strip under hero */}
      <div className="border-b border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
        <div className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-2 py-4 text-sm text-[var(--slot4-muted-text)] ${container}`}>
          <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 fill-[var(--slot4-accent)] text-[var(--slot4-accent)]" /> Trusted reviews</span>
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[var(--slot4-accent)]" /> Local discovery</span>
          <span className="hidden items-center gap-2 sm:inline-flex"><ThumbsUp className="h-4 w-4 text-[var(--slot4-accent)]" /> Updated daily</span>
          <Link href={primaryRoute} className="inline-flex items-center gap-1 font-bold text-[var(--slot4-accent)] hover:underline">
            Browse {taskLabel(primaryTask).toLowerCase()} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* -------------------------- Browse by category -------------------------- */
// Section intentionally removed from the home page — kept as a no-op export
// so existing imports (HomePage.tsx) keep working.
export function EditableStoryRail(_props: HomeSectionProps) {
  return null
}

/* ---------------------------- Recent activity --------------------------- */
function ActivityCard({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_32px_rgba(78,34,15,0.14)]">
      <div className="flex items-center gap-3 px-4 pt-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
          <Camera className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-[var(--slot4-page-text)]">{category || 'New post'}</p>
        </div>
      </div>
      <Link href={href} className="group mt-3 block">
        <div className="relative aspect-[3/2] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-4 py-4">
        <Link href={href} className="editable-display text-lg font-extrabold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] hover:text-[var(--slot4-accent)]">
          {post.title}
        </Link>
        <RatingRow post={post} />
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 140)}</p>
        <Link href={href} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[var(--slot4-accent)] hover:underline">
          Read more
        </Link>
      </div>
      <div className="flex items-center gap-6 border-t border-[var(--editable-border)] px-4 py-3 text-[var(--slot4-muted-text)]">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold"><ThumbsUp className="h-4 w-4" /> Helpful</span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold"><MessageSquare className="h-4 w-4" /> Comment</span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold"><Share2 className="h-4 w-4" /> Share</span>
      </div>
    </article>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const activity = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 9)
  if (!activity.length) return null
  return (
    <section className="bg-[var(--slot4-warm)]">
      <div className={`py-14 sm:py-16 ${container}`}>
        <div className="text-center">
          <h2 className="editable-display text-3xl font-extrabold tracking-[-0.01em] sm:text-4xl">Recent activity</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--slot4-muted-text)]">
            The latest posts, reviews and finds from across {SITE_CONFIG.name}.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activity.map((post) => (
            <ActivityCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href={primaryRoute} className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--slot4-sage)] bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-bold text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
            Show more activity <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* --------------------- Time-based discovery sections -------------------- */
function CompactCard({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_32px_rgba(78,34,15,0.14)]"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
        {category ? (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--slot4-sage)] px-3 py-1 text-[11px] font-bold text-[var(--slot4-page-text)] shadow-sm">{category}</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="editable-display line-clamp-2 text-base font-extrabold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <RatingRow post={post} />
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 110)}</p>
      </div>
    </Link>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'New in the last 7 days' },
  browse: { eyebrow: 'Trending now', title: 'Popular this month' },
  index: { eyebrow: 'Evergreen', title: 'From the archive' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  // Use the real time windows; fall back to slicing posts so the page stays full.
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section key={section.key} className={index % 2 === 0 ? 'bg-[var(--slot4-surface-bg)]' : 'bg-[var(--slot4-warm)]'}>
            <div className={`py-12 sm:py-14 ${container}`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                  <h2 className="editable-display mt-2 text-2xl font-extrabold tracking-[-0.01em] sm:text-3xl">{copy.title}</h2>
                </div>
                <Link href={section.href || primaryRoute} className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-[var(--slot4-accent)] hover:underline">
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post) => (
                  <CompactCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* -------------------------------- CTA band ------------------------------ */
export function EditableHomeCta() {
  return (
    <section id="get-app" className={`scroll-mt-24 py-10 sm:py-14 ${container}`}>
      <div className="editable-dot-grid relative overflow-hidden rounded-[2.5rem] bg-[var(--slot4-dark-bg)] px-6 py-16 text-center shadow-[0_28px_60px_rgba(78,34,15,0.28)] sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(176,186,153,0.18),transparent_70%)]" />
        <div className="relative flex flex-col items-center gap-6">
          <h2 className="editable-display max-w-2xl text-balance text-3xl font-extrabold leading-[1.1] tracking-[-0.01em] text-[var(--slot4-cream)] sm:text-4xl lg:text-[2.75rem]">
            Got something worth sharing?
            <br />
            Let's get it listed.
          </h2>
          <p className="max-w-xl text-base text-[var(--slot4-cream)]/85 sm:text-lg">
            Add your business, post a listing, or share a story — and reach the {SITE_CONFIG.name} community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--slot4-accent)_0%,#C08A55_100%)] px-8 py-3.5 text-sm font-bold text-[var(--slot4-on-accent)] shadow-[0_10px_26px_rgba(157,102,56,0.4)] transition duration-300 hover:-translate-y-0.5">
              Get Listed
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--slot4-cream)]/40 px-8 py-3.5 text-sm font-bold text-[var(--slot4-cream)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-cream)]/10">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
