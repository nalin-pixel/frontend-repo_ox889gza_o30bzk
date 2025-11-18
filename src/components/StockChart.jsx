import { useMemo } from 'react'

function StockChart({ data }) {
  const points = useMemo(() => {
    if (!data || data.length === 0) return ''
    const w = 700
    const h = 220
    const padding = 20
    const xs = data.map((_, i) => i)
    const ys = data.map(d => d.close)
    const minY = Math.min(...ys)
    const maxY = Math.max(...ys)
    const scaleX = (x) => padding + (x / (xs.length - 1)) * (w - padding * 2)
    const scaleY = (y) => h - padding - ((y - minY) / (maxY - minY || 1)) * (h - padding * 2)
    return data.map((d, i) => `${scaleX(i)},${scaleY(d.close)}`).join(' ')
  }, [data])

  if (!data || data.length === 0) return (
    <div className="w-full h-[240px] grid place-items-center text-blue-200/70 border border-blue-500/20 rounded-xl bg-slate-900/40">
      No data
    </div>
  )

  const w = 700
  const h = 220

  return (
    <div className="w-full overflow-x-auto">
      <svg width={w} height={h} className="min-w-[700px] rounded-xl border border-blue-500/20 bg-slate-900/40">
        <defs>
          <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(59,130,246,0.6)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.05)" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="url(#grad)"
          strokeWidth="2.5"
          points={points}
        />
      </svg>
    </div>
  )
}

export default StockChart
