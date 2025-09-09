"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Award } from "lucide-react"
import { motion, useInView, useAnimation } from "framer-motion"

export function CostaTropicalTeam() {
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
            className="text-4xl sm:text-5xl text-[#1F9D4D] mb-4"
            style={{
              fontFamily: "Unica One, cursive",
              fontWeight: "normal",
              textShadow: "0 4px 20px rgba(31,157,77,0.3)",
            }}
          >
            FRESH PROPERTIES COSTA TROPICAL
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: "Poppins, sans-serif" }}>
            Meet Mario and Lissy, your local experts managing properties from Nerja to Motril
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
        >
          {/* Lissy */}
          <Card className="border-0 shadow-lg overflow-hidden bg-white hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center mb-6">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lissy.jpg-Y0eOwbDPAHDzVxEkNSqn3OaO4TjQFO.jpeg"
                  alt="Lissy Bosl - Hospitality Expert"
                  className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg"
                />
                <h3
                  className="text-2xl text-[#1F9D4D] mb-2"
                  style={{
                    fontFamily: "Unica One, cursive",
                    fontWeight: "normal",
                    textShadow: "0 4px 20px rgba(31,157,77,0.3)",
                  }}
                >
                  LISSY BOSL
                </h3>
                <p className="text-lg text-[#1F9D4D] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Hospitality & Guest Experience Expert
                </p>
              </div>

              <p className="text-[#1F9D4D] mb-6 text-center italic" style={{ fontFamily: "Poppins, sans-serif" }}>
                "We fell in love with Costa Tropical and bought our own apartment in La Herradura. Now we manage it
                through Fresh Properties and help other owners achieve the same success."
              </p>

              <p className="text-gray-600 mb-6 text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
                Lissy brings her natural talent for hospitality and guest satisfaction to everything we do. She ensures
                exceptional experiences for both homeowners and guests.
              </p>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-[#1F9D4D]/10 rounded-lg p-3">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-5 w-5 text-[#1F9D4D]" />
                  </div>
                  <div className="text-lg text-[#1F9D4D]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    4.9/5
                  </div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Guest Satisfaction
                  </div>
                </div>
                <div className="bg-[#1F9D4D]/10 rounded-lg p-3">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-[#1F9D4D]" />
                  </div>
                  <div className="text-lg text-[#1F9D4D]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    &lt;2hrs
                  </div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Response Time
                  </div>
                </div>
                <div className="bg-[#1F9D4D]/10 rounded-lg p-3">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="h-5 w-5 text-[#1F9D4D]" />
                  </div>
                  <div className="text-lg text-[#1F9D4D]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    5+ years
                  </div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Experience
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mario */}
          <Card className="border-0 shadow-lg overflow-hidden bg-white hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center mb-6">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mario.jpg-VGNMUmkOdRZ5kLfe8IfUcKPINUOmdx.jpeg"
                  alt="Mario Schrader - Photography & Operations Expert"
                  className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg"
                />
                <h3
                  className="text-2xl text-[#1F9D4D] mb-2"
                  style={{
                    fontFamily: "Unica One, cursive",
                    fontWeight: "normal",
                    textShadow: "0 4px 20px rgba(31,157,77,0.3)",
                  }}
                >
                  MARIO SCHRADER
                </h3>
                <p className="text-lg text-[#1F9D4D] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Photography & Operations Expert
                </p>
              </div>

              <p className="text-[#1F9D4D] mb-6 text-center italic" style={{ fontFamily: "Poppins, sans-serif" }}>
                "My photography expertise combined with Fresh Properties' systems creates stunning listings that
                maximize bookings and rental income for our clients."
              </p>

              <p className="text-gray-600 mb-6 text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
                Mario is passionate about photography and capturing the beauty of the region. He handles operations and
                visual marketing with meticulous attention to detail.
              </p>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-[#1F9D4D]/10 rounded-lg p-3">
                  <div className="text-lg text-[#1F9D4D]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    100+
                  </div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Properties Shot
                  </div>
                </div>
                <div className="bg-[#1F9D4D]/10 rounded-lg p-3">
                  <div className="text-lg text-[#1F9D4D]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    18
                  </div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Properties Managed
                  </div>
                </div>
                <div className="bg-[#1F9D4D]/10 rounded-lg p-3">
                  <div className="text-lg text-[#1F9D4D]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    95%
                  </div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Occupancy Rate
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Location Badge */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
          }}
        >
          <Badge className="bg-[#1F9D4D] text-white px-6 py-3 text-lg">
            <span style={{ fontFamily: "Unica One, cursive" }}>BASED IN LA HERRADURA - SERVING COSTA TROPICAL</span>
          </Badge>
        </motion.div>
      </div>
    </section>
  )
}
