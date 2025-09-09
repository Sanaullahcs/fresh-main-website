"use client"

import { useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"

export default function ThankYouClient() {
  const searchParams = useSearchParams()
  const source = searchParams?.get("source")

  return (
    <>
      <h1
        className="text-3xl sm:text-4xl lg:text-5xl text-[#1F9D4D] mb-6"
        style={{ fontFamily: "Unica One, cursive", fontWeight: "normal" }}
      >
        {source === "rental" ? "RENTAL ADVICE REQUEST RECEIVED" : "MESSAGE SENT!"}
      </h1>

      <p className="text-xl text-gray-700 mb-8 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
        {source === "rental"
          ? "Thanks — our rental team has received your property details. We'll email your tailored rental income analysis within 24 hours."
          : "Thank you for reaching out to Fresh Property Management!"}
      </p>
    </>
  )
}
