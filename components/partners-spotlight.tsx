"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, useInView, useAnimation } from "framer-motion"
import { Star, Quote } from "lucide-react"

export function PartnersSpotlight() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <section id="partners" className="py-20 bg-[#F9FCF7]" ref={ref}>
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
            FRANCHISE SPOTLIGHT
          </h2>
          <p className="text-xl text-[#1F9D4D]/80 max-w-3xl mx-auto" style={{ fontFamily: "Poppins, sans-serif" }}>
            Meet Lissy & Mario, our successful partners in Costa Tropical
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
          {/* Partner Photos */}
          <motion.div
            variants={{
              hidden: { x: -40, opacity: 0 },
              visible: {
                x: 0,
                opacity: 1,
                transition: { duration: 0.7 },
              },
            }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lissy.jpg-Y0eOwbDPAHDzVxEkNSqn3OaO4TjQFO.jpeg"
                alt="Lissy - Fresh Property Partner"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mario.jpg-VGNMUmkOdRZ5kLfe8IfUcKPINUOmdx.jpeg"
                alt="Mario - Fresh Property Partner"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Partner Story */}
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
            <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-white to-[#E0E01F]/5">
              <CardContent className="p-8 lg:p-12">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-[#E0E01F] text-[#E0E01F]" />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-[#1F9D4D]/20" />
                  <blockquote
                    className="text-2xl font-medium text-[#1F9D4D] italic mb-6 pl-6"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    "Joining the franchise was the best decision we ever made. The support system is incredible and we
                    finally feel in control of our future."
                  </blockquote>
                </div>

                <div className="mt-8">
                  <h3
                    className="text-xl text-[#1F9D4D]"
                    style={{
                      fontFamily: "Unica One, cursive",
                      fontWeight: "normal",
                      textShadow: "0 4px 20px rgba(31,157,77,0.3)",
                    }}
                  >
                    LISSY & MARIO
                  </h3>
                  <p className="text-[#1F9D4D]/80" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Costa Tropical Partners
                  </p>
                  <div className="mt-4 p-4 bg-[#1F9D4D]/10 rounded-lg">
                    <p className="text-lg font-semibold text-[#1F9D4D]" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Went from 0 to 18 properties in 14 months
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Additional Partner Success */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
          }}
        >
          <div className="bg-gradient-to-r from-[#1F9D4D] to-[#1F9D4D]/80 rounded-2xl p-8 text-white">
            <h3
              className="text-2xl mb-4"
              style={{
                fontFamily: "Unica One, cursive",
                fontWeight: "normal",
                textShadow: "0 4px 20px rgba(255,255,255,0.3)",
              }}
            >
              BASED IN LA HERRADURA
            </h3>
            <p className="text-xl opacity-90" style={{ fontFamily: "Poppins, sans-serif" }}>
              Managing properties from Nerja to Motril and inland villages
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
