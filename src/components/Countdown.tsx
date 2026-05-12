import { useState, useEffect } from 'react'

type T = { h: number; m: number; s: number }

function useTick(init: T, onEnd?: () => void): T {
  const [t, setT] = useState<T>(init)
  useEffect(() => {
    const id = setInterval(() => {
      setT(prev => {
        let { h, m, s } = prev
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) {
          clearInterval(id)
          if (onEnd) onEnd()
          return { h: 0, m: 0, s: 0 }
        }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

function Unit({ v, l }: { v: number; l: string }) {
  return (
    <div className="cd-unit">
      <span className="cd-val">{String(v).padStart(2, '0')}</span>
      <span className="cd-lbl">{l}</span>
    </div>
  )
}

export default function Countdown({ initial, onEnd }: { initial: T; onEnd?: () => void }) {
  const t = useTick(initial, onEnd)
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
