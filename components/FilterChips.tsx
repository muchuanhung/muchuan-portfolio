import { cn } from '@/lib/utils'

export type FilterOption = { value: string; label: string; count?: number }

type FilterChipsProps = {
  /** 給螢幕閱讀器的群組名稱，同時顯示為小標 */
  label: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
}

export function FilterChips({ label, options, value, onChange }: FilterChipsProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="w-12 shrink-0 text-xs font-bold tracking-[.13em] text-muted" aria-hidden>
        {label}
      </span>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.value === value
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition-colors',
                active
                  ? 'border-brand bg-brand font-bold text-on-brand'
                  : 'border-line text-muted hover:border-highlight hover:text-highlight',
              )}
            >
              {option.label}
              {option.count !== undefined && <span className="ml-1.5 tabular-nums">{option.count}</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
