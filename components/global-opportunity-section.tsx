"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, useInView, useAnimation } from "framer-motion"
import { TrendingUp, Users, DollarSign, Globe, Target, Zap } from "lucide-react"

export function GlobalOpportunitySection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const stats = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      number: "€2M+",
      label: "Revenue Generated",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Users className="h-8 w-8" />,
      number: "500+",
      label: "Successful Partners",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Target className="h-8 w-8" />,
      number: "98%",
      label: "Success Rate",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      number: "15+",
      label: "Countries",
      color: "from-orange-500 to-orange-600",
    },
  ]

  const opportunities = [
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "HIGH PROFIT MARGINS",
      description: "Property management offers 20-40% profit margins with recurring monthly income",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "GROWING MARKET",
      description: "Short-term rental market growing 20% annually with increasing demand",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "SCALABLE BUSINESS",
      description: "Start with 5 properties and scale to 50+ with our proven systems",
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#F9FCF7] to-white" ref={ref}>
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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1F9D4D]/10 to-green-500/10 text-[#1F9D4D] px-6 py-3 rounded-full mb-6">
            <Globe className="h-5 w-5" />
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: "400" }}>Global Success</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl text-[#1F9D4D] mb-6 leading-tight"
            style={{
              fontFamily: "Unica One, cursive",
              fontWeight: "normal",
              textShadow: "0 4px 20px rgba(31,157,77,0.3)",
            }}
          >
            SUCCESS BY THE NUMBERS
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
              }}
            >
              <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white text-center">
                <CardContent className="p-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.icon}
                  </div>
                  <div
                    className="text-3xl sm:text-4xl text-[#1F9D4D] mb-2"
                    style={{
                      fontFamily: "Unica One, cursive",
                      fontWeight: "normal",
                    }}
                  >
                    {stat.number}
                  </div>
                  <p
                    className="text-gray-600 text-sm sm:text-base"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: "400" }}
                  >
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Opportunities */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
          }}
        >
          <div className="text-center mb-8">
            <h3
              className="text-2xl sm:text-3xl lg:text-4xl text-[#1F9D4D] mb-4"
              style={{
                fontFamily: "Unica One, cursive",
                fontWeight: "normal",
              }}
            >
              PROFESSIONAL PLATFORM & TOOLS
            </h3>
            <p
              className="text-lg text-gray-700 max-w-3xl mx-auto"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: "300" }}
            >
              Why property management is the perfect business opportunity right now
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {opportunities.map((opportunity, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-[#1F9D4D]/5 to-green-500/5 hover:from-[#1F9D4D]/10 hover:to-green-500/10 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 + index * 0.1 } },
                }}
              >
                <div className="w-12 h-12 bg-[#1F9D4D] rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                  {opportunity.icon}
                </div>
                <h4
                  className="text-lg text-[#1F9D4D] mb-3"
                  style={{
                    fontFamily: "Unica One, cursive",
                    fontWeight: "normal",
                  }}
                >
                  {opportunity.title}
                </h4>
                <p className="text-gray-600" style={{ fontFamily: "Poppins, sans-serif", fontWeight: "300" }}>
                  {opportunity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
