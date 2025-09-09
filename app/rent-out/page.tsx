"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RentOutRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/services/holiday-rental-management")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to Holiday Rental Management...</p>
      </div>
    </div>
  )
}
