import { NeonButton } from '@/components/NeonButton'

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[60vh] flex-col items-start justify-center pt-24">
      <p className="text-xs font-bold tracking-[.13em] text-muted">404 / NOT FOUND</p>
      <h1 className="mt-4 text-[clamp(3rem,10vw,8rem)] leading-[0.95] font-black tracking-[-0.05em]">
        這頁
        <br />
        <span className="text-highlight">不在這裡。</span>
      </h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <NeonButton href="/">回首頁</NeonButton>
        <NeonButton href="/projects" variant="outline">
          看作品
        </NeonButton>
      </div>
    </div>
  )
}
