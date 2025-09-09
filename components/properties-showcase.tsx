"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, useInView, useAnimation } from "framer-motion"
import { Star, MapPin, Euro } from "lucide-react"

export function PropertiesShowcase() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const properties = [
    {
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Propertyfirst-kaVovrnvmnox33LzdnPUctzmrm73BP.png",
      title: "LUXURY VILLA",
      location: "Costa Tropical, Spain",
      price: "€3,500",
      commission: "€700",
      badge: "PREMIUM",
      badgeColor: "from-[#1F9D4D] to-[#1F9D4D]/80",
      rating: 5,
    },
    {
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/card3-9hY48743iMNxEUzPqTYzUzsf4tUKhi.png",
      title: "GARDEN APARTMENT",
      location: "Nerja, Spain",
      price: "€1,800",
      commission: "€360",
      badge: "POPULAR",
      badgeColor: "from-[#E0E01F] to-[#E0E01F]/80",
      rating: 5,
    },
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gallerysection1-isslcdKuZDanTHz86VoqZIpbbSTbiY.png",
      title: "BEACHFRONT CONDO",
      location: "Motril, Spain",
      price: "€2,200",
      commission: "€440",
      badge: "NEW LISTING",
      badgeColor: "from-[#1F9D4D] to-[#E0E01F]",
      rating: 5,
    },
  ]

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-20 w-32 h-32 bg-[#E0E01F]/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-[#1F9D4D]/10 rounded-full blur-2xl"></div>
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
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-[#1F9D4D] to-[#E0E01F] text-transparent bg-clip-text text-lg font-bold tracking-wider">
              ● PROPERTY PORTFOLIO ●
            </span>
          </div>
          <h2
            className="text-4xl sm:text-6xl lg:text-7xl text-[#1F9D4D] mb-6 tracking-tight"
            style={{
              fontFamily: "Unica One, cursive",
              fontWeight: "normal",
              textShadow: "0 4px 20px rgba(31,157,77,0.3)",
            }}
          >
            PROPERTIES YOU'LL
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E0E01F] to-[#E0E01F]/80">
              MANAGE
            </span>
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
            Beautiful vacation homes that generate consistent income for owners and steady revenue for you
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate={controls}
        >
          {properties.map((property, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 50, opacity: 0, scale: 0.9 },
                visible: {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.8 },
                },
              }}
            >
              <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full overflow-hidden hover:scale-105 bg-white">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      className={`bg-gradient-to-r ${property.badgeColor} text-white border-none px-3 py-1 text-xs font-bold tracking-wider shadow-lg`}
                    >
                      {property.badge}
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    {[...Array(property.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-[#E0E01F] text-[#E0E01F]" />
                    ))}
                  </div>
                </div>

                <CardContent className="p-6 bg-gradient-to-br from-white to-gray-50">
                  <h3
                    className="text-xl mb-2 text-[#1F9D4D] tracking-wide"
                    style={{
                      fontFamily: "Unica One, cursive",
                      fontWeight: "normal",
                      textShadow: "0 4px 20px rgba(31,157,77,0.3)",
                    }}
                  >
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-4 text-[#1F9D4D]/70">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">{property.location}</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[#1F9D4D]/70">Weekly Rate:</span>
                      <span className="text-lg font-bold text-[#1F9D4D] flex items-center gap-1">
                        <Euro className="h-4 w-4" />
                        {property.price}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#1F9D4D]/10 to-[#E0E01F]/10 rounded-lg">
                      <span className="text-sm font-bold text-[#1F9D4D]">YOUR COMMISSION:</span>
                      <span className="text-lg font-bold text-[#1F9D4D] flex items-center gap-1">
                        <Euro className="h-4 w-4" />
                        {property.commission}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
          }}
        >
          <div className="bg-gradient-to-r from-[#1F9D4D] to-[#E0E01F] rounded-3xl p-8 text-white shadow-2xl">
            <h3
              className="text-2xl mb-4"
              style={{
                fontFamily: "Unica One, cursive",
                fontWeight: "normal",
                textShadow: "0 4px 20px rgba(255,255,255,0.3)",
              }}
            >
              BUILD YOUR PORTFOLIO
            </h3>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              With 15-20 properties under management, you'll build a sustainable business with consistent monthly
              income.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
