import { cn } from '@/lib/utils'

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line px-2.5 py-1 text-xs text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function TagList({ tags, label = '標籤' }: { tags: string[]; label?: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {tags.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  )
}
