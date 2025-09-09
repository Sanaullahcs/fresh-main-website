"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Camera, Heart } from "lucide-react"
import { motion, useInView, useAnimation } from "framer-motion"

export function CostaTropicalPartners() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <section
      id="partners"
      className="py-16 lg:py-24 bg-gradient-to-br from-[#1F9D4D]/5 to-green-50 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-[#1F9D4D]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-[#1F9D4D]/10 text-[#1F9D4D] px-6 py-3 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <MapPin className="h-5 w-5" />
            <span className="font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
              Costa Tropical Success Story
            </span>
          </motion.div>

          <h2
            className="text-4xl lg:text-5xl text-[#1F9D4D] mb-6 leading-tight"
            style={{
              fontFamily: "Unica One, cursive",
              fontWeight: "normal",
              textShadow: "0 4px 20px rgba(31,157,77,0.3)",
            }}
          >
            COSTA TROPICAL PARTNERS
          </h2>
          <p
            className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Meet Mario and Lissy, your local experts managing properties from Nerja to Motril and beyond
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Lissy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
          >
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-6">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lissy.jpg-Y0eOwbDPAHDzVxEkNSqn3OaO4TjQFO.jpeg"
                      alt="Lissy Bosl - Hospitality Expert"
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white">
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </div>
                  <h3
                    className="text-xl sm:text-2xl text-[#1F9D4D] mb-2"
                    style={{
                      fontFamily: "Unica One, cursive",
                      fontWeight: "normal",
                      textShadow: "0 4px 20px rgba(31,157,77,0.3)",
                    }}
                  >
                    LISSY BOSL
                  </h3>
                  <p
                    className="text-base sm:text-lg text-[#1F9D4D] font-medium mb-4"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Hospitality & Guest Experience Expert
                  </p>
                </div>

                <div className="bg-gradient-to-r from-[#1F9D4D]/10 to-pink-500/10 rounded-xl p-4 sm:p-6 mb-6">
                  <p
                    className="text-[#1F9D4D] italic text-center leading-relaxed text-sm sm:text-base"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    "We fell in love with Costa Tropical and bought our own apartment in La Herradura. Now we manage it
                    through Fresh Properties and help other owners achieve the same success."
                  </p>
                </div>

                <p
                  className="text-gray-600 mb-6 text-center leading-relaxed text-sm sm:text-base"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Lissy brings her natural talent for hospitality and guest satisfaction to everything we do. She
                  ensures exceptional experiences for both homeowners and guests.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mario */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
          >
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-6">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mario.jpg-VGNMUmkOdRZ5kLfe8IfUcKPINUOmdx.jpeg"
                      alt="Mario Schrader - Photography & Operations Expert"
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                      <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </div>
                  <h3
                    className="text-xl sm:text-2xl text-[#1F9D4D] mb-2"
                    style={{
                      fontFamily: "Unica One, cursive",
                      fontWeight: "normal",
                      textShadow: "0 4px 20px rgba(31,157,77,0.3)",
                    }}
                  >
                    MARIO SCHRADER
                  </h3>
                  <p
                    className="text-base sm:text-lg text-[#1F9D4D] font-medium mb-4"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Photography & Operations Expert
                  </p>
                </div>

                <div className="bg-gradient-to-r from-[#1F9D4D]/10 to-blue-500/10 rounded-xl p-4 sm:p-6 mb-6">
                  <p
                    className="text-[#1F9D4D] italic text-center leading-relaxed text-sm sm:text-base"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    "My photography expertise combined with Fresh Properties' systems creates stunning listings that
                    maximize bookings and rental income for our clients."
                  </p>
                </div>

                <p
                  className="text-gray-600 mb-6 text-center leading-relaxed text-sm sm:text-base"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Mario is passionate about photography and capturing the beauty of the region. He handles operations
                  and visual marketing with meticulous attention to detail.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Location Badge */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
          }}
        >
          <div className="bg-gradient-to-r from-[#1F9D4D] to-green-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="h-6 w-6" />
              <h3
                className="text-xl sm:text-2xl"
                style={{
                  fontFamily: "Unica One, cursive",
                  fontWeight: "normal",
                  textShadow: "0 4px 20px rgba(255,255,255,0.3)",
                }}
              >
                BASED IN LA HERRADURA - SERVING COSTA TROPICAL
              </h3>
            </div>
            <p
              className="text-lg sm:text-xl opacity-90 max-w-5xl mx-auto"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              From the beaches of Nerja to the mountains of Motril, Mario and Lissy have built a thriving property
              management business that serves the entire Costa Tropical region.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
