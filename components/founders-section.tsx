"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Lightbulb, Target, Globe } from "lucide-react"
import { motion, useInView, useAnimation } from "framer-motion"

export function FoundersSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1F9D4D]/10 to-blue-500/10 text-[#1F9D4D] px-6 py-3 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Users className="h-5 w-5" />
            <span className="font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
              Meet the Founders
            </span>
          </motion.div>

          <h2
            className="text-5xl lg:text-6xl text-[#1F9D4D] mb-6 leading-tight"
            style={{
              fontFamily: "Unica One, cursive",
              fontWeight: "normal",
              textShadow: "0 4px 20px rgba(31,157,77,0.3)",
            }}
          >
            FRESH PROPERTIES FOUNDERS
          </h2>
          <p
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            The visionaries behind the Fresh Properties franchise system
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Mike */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50 hover:shadow-2xl transition-all duration-500 h-full">
              <CardContent className="p-8 text-center">
                <div className="relative mb-8">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mike.jpg-opAYxmxTjB2Bh8nqQYYHVFHE2EG9TY.webp"
                    alt="Mike - Fresh Properties Founder"
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-8 w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                </div>

                <h3
                  className="text-2xl text-[#1F9D4D] mb-2"
                  style={{
                    fontFamily: "Unica One, cursive",
                    fontWeight: "normal",
                    textShadow: "0 4px 20px rgba(31,157,77,0.3)",
                  }}
                >
                  MIKE
                </h3>
                <p className="text-lg text-blue-600 font-medium mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Founder & CEO
                </p>

                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
                      10+ years in property management and real estate
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Developed the Fresh franchise system from the ground up
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Expert in international property markets and scaling
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Maayke */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50 hover:shadow-2xl transition-all duration-500 h-full">
              <CardContent className="p-8 text-center">
                <div className="relative mb-8">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maayke.jpg-KFKQ9fQusKld4iiRsG4vYdKodOjJsz.webp"
                    alt="Maayke - Fresh Properties Co-Founder"
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-8 w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white">
                    <Target className="h-5 w-5" />
                  </div>
                </div>

                <h3
                  className="text-2xl text-[#1F9D4D] mb-2"
                  style={{
                    fontFamily: "Unica One, cursive",
                    fontWeight: "normal",
                    textShadow: "0 4px 20px rgba(31,157,77,0.3)",
                  }}
                >
                  MAAYKE
                </h3>
                <p className="text-lg text-green-600 font-medium mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Co-Founder & Operations Director
                </p>

                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Hospitality industry expert with international experience
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Leads partner training and ongoing support programs
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Specializes in guest experience and operational excellence
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Company Vision */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
          }}
        >
          <div className="bg-gradient-to-r from-[#1F9D4D] to-green-600 rounded-3xl p-8 text-white shadow-2xl max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Globe className="h-6 w-6" />
              <h3
                className="text-xl"
                style={{
                  fontFamily: "Unica One, cursive",
                  fontWeight: "normal",
                  textShadow: "0 4px 20px rgba(255,255,255,0.3)",
                }}
              >
                OUR VISION
              </h3>
            </div>
            <p
              className="text-white/90 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              To empower entrepreneurs worldwide with the tools, training, and support they need to build successful
              property management businesses. We believe in creating opportunities that provide both financial freedom
              and the flexibility to live life on your own terms.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
