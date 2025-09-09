"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { motion, useInView, useAnimation } from "framer-motion"

export function IsThisForYouSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const criteria = [
    "You want the freedom of being your own boss",
    "You're ready to invest in a real business opportunity",
    "You're looking for full support — not a DIY approach",
    "You enjoy helping others & growing sustainable income",
    "You want flexible, location-independent work",
    "You're committed to following a proven system",
  ]

  return (
    <section id="who-its-for" className="py-24 bg-[#1F9D4D] relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            className="text-3xl sm:text-5xl text-white mb-4"
            style={{
              fontFamily: "Unica One, cursive",
              fontWeight: "normal",
              textShadow: "0 4px 20px rgba(255,255,255,0.3)",
            }}
          >
            IS THIS OPPORTUNITY RIGHT FOR YOU?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            This isn't for everyone. Here's who tends to succeed with our system:
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
        >
          <Card className="border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-8 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {criteria.map((criterion, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-[#1F9D4D] flex-shrink-0 mt-1" />
                    <span className="text-lg text-[#1F9D4D]/80 leading-relaxed">{criterion}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-[#E0E01F]/10 rounded-lg border border-[#E0E01F]/30">
                <h3
                  className="text-xl text-[#1F9D4D] mb-3"
                  style={{
                    fontFamily: "Unica One, cursive",
                    fontWeight: "normal",
                    textShadow: "0 4px 20px rgba(31,157,77,0.3)",
                  }}
                >
                  MOST IMPORTANTLY:
                </h3>
                <p className="text-lg text-[#1F9D4D]/80 leading-relaxed">
                  You're looking for <strong>real income</strong> — not just a hobby or side gig. This is a legitimate
                  business opportunity that requires commitment but offers genuine financial freedom.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
