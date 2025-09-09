"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, useInView, useAnimation } from "framer-motion"

export function TechSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <h2
            className="text-3xl sm:text-5xl text-[#1F9D4D] mb-4"
            style={{
              fontFamily: "Unica One, cursive",
              fontWeight: "normal",
              textShadow: "0 4px 20px rgba(31,157,77,0.3)",
            }}
          >
            Technology & Marketing
          </h2>
          <p className="text-xl text-[#1F9D4D]/80 max-w-3xl mx-auto">
            Professional tools and marketing that make you stand out from the competition
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
          initial="hidden"
          animate={controls}
        >
          {/* Property Management Interface */}
          <motion.div
            variants={{
              hidden: { x: -40, opacity: 0 },
              visible: {
                x: 0,
                opacity: 1,
                transition: { duration: 0.7 },
              },
            }}
          >
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gallerysection2-Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8.png"
                  alt="Property management calendar interface"
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
            <div className="mt-6 text-center">
              <h3
                className="text-xl text-[#1F9D4D] mb-2"
                style={{
                  fontFamily: "Unica One, cursive",
                  fontWeight: "normal",
                  textShadow: "0 4px 20px rgba(31,157,77,0.3)",
                }}
              >
                PROPERTY MANAGEMENT SYSTEM
              </h3>
              <p className="text-[#1F9D4D]/80">Professional booking calendar and management tools included</p>
            </div>
          </motion.div>

          {/* Marketing Materials */}
          <motion.div
            variants={{
              hidden: { x: 40, opacity: 0 },
              visible: {
                x: 0,
                opacity: 1,
                transition: { duration: 0.7 },
              },
            }}
          >
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gallerysection3-Ucy2x.png"
                  alt="Fresh Property Management billboard"
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
            <div className="mt-6 text-center">
              <h3
                className="text-xl text-[#1F9D4D] mb-2"
                style={{
                  fontFamily: "Unica One, cursive",
                  fontWeight: "normal",
                  textShadow: "0 4px 20px rgba(31,157,77,0.3)",
                }}
              >
                PROFESSIONAL MARKETING
              </h3>
              <p className="text-[#1F9D4D]/80">
                Billboards, signage, and marketing materials to establish your presence
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, delay: 0.3 },
            },
          }}
          initial="hidden"
          animate={controls}
        >
          <Card className="text-center border-0 shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.03] bg-gradient-to-br from-white to-[#E0E01F]/5">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-[#1F9D4D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#1F9D4D]">24/7</span>
              </div>
              <h4
                className="text-xl mb-2 text-[#1F9D4D]"
                style={{
                  fontFamily: "Unica One, cursive",
                  fontWeight: "normal",
                  textShadow: "0 4px 20px rgba(31,157,77,0.3)",
                }}
              >
                24/7 SUPPORT SYSTEM
              </h4>
              <p className="text-[#1F9D4D]/80">Round-the-clock support for you and your guests</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.03] bg-gradient-to-br from-white to-[#E0E01F]/5">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-[#1F9D4D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#1F9D4D]">AI</span>
              </div>
              <h4
                className="text-xl mb-2 text-[#1F9D4D]"
                style={{
                  fontFamily: "Unica One, cursive",
                  fontWeight: "normal",
                  textShadow: "0 4px 20px rgba(31,157,77,0.3)",
                }}
              >
                SMART PRICING
              </h4>
              <p className="text-[#1F9D4D]/80">AI-powered dynamic pricing to maximize revenue</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.03] bg-gradient-to-br from-white to-[#E0E01F]/5">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-[#1F9D4D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#1F9D4D]">CRM</span>
              </div>
              <h4
                className="text-xl mb-2 text-[#1F9D4D]"
                style={{
                  fontFamily: "Unica One, cursive",
                  fontWeight: "normal",
                  textShadow: "0 4px 20px rgba(31,157,77,0.3)",
                }}
              >
                LEAD MANAGEMENT
              </h4>
              <p className="text-[#1F9D4D]/80">Complete CRM system for managing property owners</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
