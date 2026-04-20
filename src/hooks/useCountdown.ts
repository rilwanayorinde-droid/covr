import { useState, useEffect } from 'react'

export type CountdownTime = { h: number; m: number; s: number }

export function useCountdown(initial: CountdownTime): CountdownTime {
  const [time, setTime] = useState<CountdownTime>(initial)
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
