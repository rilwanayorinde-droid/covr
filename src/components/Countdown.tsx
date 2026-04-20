import { useState, useEffect } from 'react'

type T = { h: number; m: number; s: number }

function useTick(init: T): T {
  const [time, setTime] = useState<T>(init)
  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        let { h, m, s } = t
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 0; m = 0; s = 0 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function Seg({ value, label }: { value: number; label: string }) {
  return (
    <div className="cd-seg">
      <span className="cd-num">{String(value).padStart(2, '0')}</span>
      <span className="cd-label">{label}</span>
    </div>
  )
}

export default function Countdown({ initial }: { initial: T }) {
  const time = useTick(initial)
  return (
    <div className="flex items-end gap-1">
      <Seg value={time.h} label="hr" />
      <span className="cd-num" style={{ color: 'var(--rule-2)', marginBottom: '12px', animation: 'blink 1.1s step-end infinite' }}>:</span>
      <Seg value={time.m} label="min" />
      <span className="cd-num" style={{ color: 'var(--rule-2)', marginBottom: '12px', animation: 'blink 1.1s step-end infinite' }}>:</span>
      <Seg value={time.s} label="sec" />
    </div>
  )
}
