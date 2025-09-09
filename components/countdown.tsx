"use client"

import { useEffect, useState } from "react"

export default function Countdown({ days = 4 }: { days?: number }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date(Date.now() + days * 24 * 60 * 60 * 1000)

    function update() {
      const now = new Date()
      const diff = Math.max(0, target.getTime() - now.getTime())
      const s = Math.floor(diff / 1000)
      const d = Math.floor(s / (3600 * 24))
      const h = Math.floor((s % (3600 * 24)) / 3600)
      const m = Math.floor((s % 3600) / 60)
      const sec = s % 60
      setTimeLeft({ days: d, hours: h, minutes: m, seconds: sec })
    }

    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [days])

  const pad = (n: number) => n.toString().padStart(2, "0")

  return (
    <div className="flex items-center gap-3 bg-white/60 px-3 py-2 rounded-lg shadow-sm border border-white/30">
      <div className="text-sm text-gray-600 hidden sm:block">Launch in</div>
      <div className="flex items-center gap-3 font-semibold text-sm sm:text-base">
        <div className="text-center min-w-[48px]">
          <div className="text-2xl md:text-3xl font-bold text-[#0F7A3D]">{timeLeft.days}</div>
          <div className="text-[10px] text-gray-500">d</div>
        </div>
        <div className="text-center min-w-[48px]">
          <div className="text-2xl md:text-3xl font-bold text-[#0F7A3D]">{pad(timeLeft.hours)}</div>
          <div className="text-[10px] text-gray-500">h</div>
        </div>
        <div className="text-center min-w-[48px]">
          <div className="text-2xl md:text-3xl font-bold text-[#0F7A3D]">{pad(timeLeft.minutes)}</div>
          <div className="text-[10px] text-gray-500">m</div>
        </div>
        <div className="text-center min-w-[48px]">
          <div className="text-2xl md:text-3xl font-bold text-[#0F7A3D]">{pad(timeLeft.seconds)}</div>
          <div className="text-[10px] text-gray-500">s</div>
        </div>
      </div>
    </div>
  )
}
