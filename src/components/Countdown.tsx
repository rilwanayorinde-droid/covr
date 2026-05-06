import { useState, useEffect } from 'react'
type T = { h: number; m: number; s: number }
function useTick(i: T): T {
  const [t, setT] = useState<T>(i)
  useEffect(() => {
    const id = setInterval(() => setT(prev => {
      let { h, m, s } = prev
      s--; if (s < 0) { s = 59; m-- } if (m < 0) { m = 59; h-- } if (h < 0) { h = m = s = 0 }
      return { h, m, s }
    }), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}
function Unit({ v, l }: { v: number; l: string }) {
  return <div className="cd-unit"><span className="cd-val">{String(v).padStart(2,'0')}</span><span className="cd-lbl">{l}</span></div>
}
export default function Countdown({ initial }: { initial: T }) {
  const t = useTick(initial)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
      <Unit v={t.h} l="hr" />
      <span className="cd-val" style={{ color: 'var(--c-rule2)', marginBottom: '12px', fontSize: '14px' }}>:</span>
      <Unit v={t.m} l="min" />
      <span className="cd-val" style={{ color: 'var(--c-rule2)', marginBottom: '12px', fontSize: '14px' }}>:</span>
      <Unit v={t.s} l="sec" />
    </div>
  )
}
