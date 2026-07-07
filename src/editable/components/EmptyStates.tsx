import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'Nothing here yet — check back soon',
  description = 'Fresh posts will show up here automatically once this section has published content.',
  actionLabel = 'Back to home',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('rounded-[2rem] border-2 border-dashed border-current/15 bg-current/[0.03] p-8 text-center', className)}>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-current/10 text-3xl">
        🌱
      </div>
      <h2 className="mt-5 text-2xl font-extrabold tracking-[-0.01em]">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-current/65">{description}</p>
      <Link href={actionHref} className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-current/20 px-5 py-3 text-sm font-bold transition duration-300 hover:-translate-y-0.5 hover:bg-current hover:text-background">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'posts', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`New ${taskLabel} will appear here automatically as soon as they're published. This page is ready and waiting.`}
      actionLabel="Explore the site"
      actionHref="/"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      title="Message received"
      description="Thanks for reaching out — we've got your message and will follow up soon."
      actionLabel="Return home"
      actionHref="/"
    />
  )
}
