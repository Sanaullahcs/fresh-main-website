"use client"

import { useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

export function SuccessPlanSection() {
  const steps = [
    {
      step: 1,
      title: "TRAINING & ONBOARDING",
      description: "We'll get you up to speed quickly with our comprehensive training program",
      duration: "Week 1-2",
      color: "from-[#1F9D4D] to-green-500",
      iconUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%2016%2C%202025%2C%2010_14_40%20PM-w3QrhyS1HjG6x59igrYm9f47jQCiEY.png",
      features: ["Daily live sessions", "Full system setup", "Ready-to-use marketing materials"],
    },
    {
      step: 2,
      title: "FIRST PROPERTIES",
      description: "We'll help you get your first listings live and ready to welcome guests",
      duration: "Week 3-6",
      color: "from-green-500 to-green-600",
      iconUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%2016%2C%202025%2C%2010_40_46%20PM-ssuwGtxHaGi1lXk6yDOyJz9E6jktYo.png",
      features: [
        "Find great homes to manage",
        "Guided support through the full setup",
        "Publish your listings the right way",
      ],
    },
    {
      step: 3,
      title: "REACH BREAK-EVEN",
      description: "Start bringing in guests and cover your initial expenses",
      duration: "Month 3-12",
      color: "from-green-600 to-green-700",
      iconUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jul%2016%2C%202025%2C%2010_22_42%20PM-ZeL9Do4fFNeMIRyrVElaPSOsOzgP6C.png",
      features: [
        "Go live on Airbnb and other platforms",
        "Get your first guests booked",
        "Start earning reviews and building trust",
      ],
    },
    {
      step: 4,
      title: "RUN SMOOTH OPERATIONS",
      description:
        "Outsource communication and coordination to a virtual assistant so you can focus on growing your business",
      duration: "Month 6+",
      color: "from-green-700 to-[#1F9D4D]",
      iconUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%2016%2C%202025%2C%2010_07_23%20PM-2zRZugMaMAQdL2xZ5DXN7c3jHwvid8.png",
      features: [
        "Save hours per week with automated guest messaging",
        "Let your VA handle cleanings, maintenance, and guest follow-up",
        "Free up time to work as a buyer's agent and grow your income",
      ],
    },
    {
      step: 5,
      title: "GROW & SCALE",
      description: "Build a real business and grow with confidence",
      duration: "Year 2+",
      color: "from-[#1F9D4D] to-green-800",
      iconUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%2016%2C%202025%2C%2010_24_44%20PM-f3X77rOs95TqatrkkFyFaRlCwwC5zv.png",
      features: ["Automate daily tasks", "Add more homes", "Build a steady income"],
    },
  ]

  const scrollToApply = useCallback(() => {
    const element = document.getElementById("apply")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  return (
    <section id="success-plan" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1F9D4D]/10 text-[#1F9D4D] px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6">
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
              Your Path to Success
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1F9D4D] mb-4 sm:mb-6 leading-tight"
            style={{ fontFamily: "Unica One, cursive", fontWeight: "normal" }}
          >
            YOUR SUCCESS PLAN
          </h2>

          <p
            className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-5xl mx-auto leading-relaxed px-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Follow our proven 5-step system to build a profitable property management business
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.step}>
              <Card className="border-0 shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-0">
                  <div className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
                    {/* Icon Side */}
                    <div className="lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <div className="h-64 sm:h-80 lg:h-96 relative flex items-center justify-center">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white rounded-3xl shadow-xl flex items-center justify-center">
                          <img
                            src={step.iconUrl || "/placeholder.svg"}
                            alt={`Step ${step.step} - ${step.title}`}
                            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain"
                          />
                        </div>

                        {/* Step Number */}
                        <div className="absolute top-6 sm:top-8 left-6 sm:left-8 w-16 h-16 sm:w-20 sm:h-20 bg-[#1F9D4D] rounded-3xl flex items-center justify-center shadow-lg">
                          <span
                            className="text-2xl sm:text-3xl text-white font-bold"
                            style={{ fontFamily: "Unica One, cursive" }}
                          >
                            {step.step}
                          </span>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute top-6 sm:top-8 right-6 sm:right-8 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-lg">
                          <span
                            className="text-[#1F9D4D] text-xs sm:text-sm font-medium"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {step.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                      <h3
                        className="text-2xl sm:text-3xl lg:text-4xl text-[#1F9D4D] mb-3 sm:mb-4"
                        style={{ fontFamily: "Unica One, cursive" }}
                      >
                        {step.title}
                      </h3>

                      <p
                        className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {step.description}
                      </p>

                      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                        {step.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#1F9D4D] rounded-full flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                            </div>
                            <span
                              className="text-sm sm:text-base text-gray-700 font-medium"
                              style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span
                          className="text-xs sm:text-sm text-gray-500 font-medium"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Step {step.step} of 5
                        </span>
                        <div className="flex-1 h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#1F9D4D] rounded-full"
                            style={{ width: `${(step.step / 5) * 100}%` }}
                          />
                        </div>
                        <span
                          className="text-xs sm:text-sm font-bold text-[#1F9D4D]"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {Math.round((step.step / 5) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Success Guarantee */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#1F9D4D] to-green-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6" style={{ fontFamily: "Unica One, cursive" }}>
              SUCCESS GUARANTEE
            </h3>
            <p
              className="text-lg sm:text-xl opacity-90 mb-6 sm:mb-8 max-w-6xl mx-auto"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              We're so confident in our system that we offer a 12-month money-back guarantee. <br />
              If you follow our plan and don't see results, we'll refund your investment.
            </p>
            <button
              onClick={scrollToApply}
              className="bg-white text-[#1F9D4D] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <span className="flex items-center gap-2">
                Start Your Success Journey
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
