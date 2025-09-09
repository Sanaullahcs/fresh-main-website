"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Euro, Home, Handshake, Shield, TrendingUp, Calculator } from "lucide-react"
import { motion, useInView, useAnimation } from "framer-motion"

export function EarningsSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const incomeStreams = [
    {
      icon: <Home className="h-8 w-8" />,
      title: "PROPERTY MANAGEMENT",
      amount: "€3K-€5K",
      period: "per month",
      description: "20% commission on rental income plus cleaning & maintenance margins",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      title: "REAL ESTATE SALES",
      amount: "€12K+",
      period: "per deal",
      description: "Average commission per property sale to investors",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "SCALABLE GROWTH",
      amount: "€40K-€70K",
      period: "year 1 potential",
      description: "Unlimited earning potential as your portfolio expands",
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <section id="earnings" className="py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 text-[#1F9D4D] px-6 py-3 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Calculator className="h-5 w-5" />
            <span className="font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
              Earnings & Investment
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
            EARNINGS & INVESTMENT
          </h2>
          <p
            className="text-xl text-black max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Multiple income streams with transparent costs and strong earning potential
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Investment Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
          >
            <Card className="border-0 shadow-xl h-full bg-gradient-to-br from-gray-50 to-white">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#1F9D4D] to-green-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                    <Euro className="h-8 w-8" />
                  </div>
                  <h3
                    className="text-2xl text-[#1F9D4D]"
                    style={{
                      fontFamily: "Unica One, cursive",
                      fontWeight: "normal",
                      textShadow: "0 4px 20px rgba(31,157,77,0.3)",
                    }}
                  >
                    YOUR INVESTMENT
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-lg text-gray-700 font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Franchise + Training
                    </span>
                    <span className="text-lg font-bold text-[#1F9D4D]" style={{ fontFamily: "Poppins, sans-serif" }}>
                      €4,800 + VAT
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-lg text-gray-700 font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Monthly Marketing
                    </span>
                    <span className="text-lg font-bold text-[#1F9D4D]" style={{ fontFamily: "Poppins, sans-serif" }}>
                      €800-€1,000
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-lg text-gray-700 font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Profit Share
                    </span>
                    <span className="text-lg font-bold text-[#1F9D4D]" style={{ fontFamily: "Poppins, sans-serif" }}>
                      20%
                    </span>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-[#1F9D4D]">
                    <Shield className="h-5 w-5" />
                    <span style={{ fontFamily: "Poppins, sans-serif" }}>Bank financing available</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#1F9D4D]">
                    <Shield className="h-5 w-5" />
                    <span style={{ fontFamily: "Poppins, sans-serif" }}>12-month refund guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Earnings Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
          >
            <Card className="border-0 shadow-xl h-full bg-gradient-to-br from-[#1F9D4D] to-green-600 text-white">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <h3
                    className="text-2xl"
                    style={{
                      fontFamily: "Unica One, cursive",
                      fontWeight: "normal",
                      textShadow: "0 4px 20px rgba(255,255,255,0.3)",
                    }}
                  >
                    EARNING POTENTIAL
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Monthly Rental Income
                      </span>
                      <span className="text-lg font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                        €3K-€5K
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Real Estate Bonus
                      </span>
                      <span className="text-lg font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                        €12K+ per deal
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm border-2 border-white/30">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Year 1 Projection
                      </span>
                      <span className="text-xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                        €40K-€70K
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <div
                    className="bg-white/20 rounded-xl p-4 backdrop-blur-sm"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Part-time effort, full-time income potential
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Income Streams */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
          }}
        >
          <h3
            className="text-3xl text-center text-[#1F9D4D] mb-12"
            style={{
              fontFamily: "Unica One, cursive",
              fontWeight: "normal",
              textShadow: "0 4px 20px rgba(31,157,77,0.3)",
            }}
          >
            MULTIPLE INCOME STREAMS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {incomeStreams.map((stream, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 h-full group hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${stream.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {stream.icon}
                    </div>
                    <h4
                      className="text-xl text-[#1F9D4D] mb-2"
                      style={{
                        fontFamily: "Unica One, cursive",
                        fontWeight: "normal",
                        textShadow: "0 4px 20px rgba(31,157,77,0.3)",
                      }}
                    >
                      {stream.title}
                    </h4>
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-[#1F9D4D]" style={{ fontFamily: "Poppins, sans-serif" }}>
                        {stream.amount}
                      </div>
                      <div className="text-sm text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}>
                        {stream.period}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {stream.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
