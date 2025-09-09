"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface ActionProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
}

export function Actions() {
  const actions = [
    {
      title: "ADD TESTIMONIAL SLIDER",
      description: "Create a dynamic testimonial carousel with client photos",
      onClick: () => console.log("Add testimonial slider"),
      icon: "📸",
    },
    {
      title: "ADD PROPERTY CALCULATOR",
      description: "Create an interactive calculator for potential earnings",
      onClick: () => console.log("Add property calculator"),
      icon: "🧮",
    },
    {
      title: "ADD VIDEO TESTIMONIALS",
      description: "Integrate video testimonials from successful partners",
      onClick: () => console.log("Add video testimonials"),
      icon: "🎥",
    },
    {
      title: "ADD INTERACTIVE MAP",
      description: "Show global partner locations on an interactive map",
      onClick: () => console.log("Add interactive map"),
      icon: "🗺️",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1F9D4D] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            ENHANCE YOUR FRANCHISE EXPERIENCE
          </h2>
          <p className="text-lg text-[#1F9D4D]/80 max-w-3xl mx-auto" style={{ fontFamily: "Poppins, sans-serif" }}>
            Explore these additional features to maximize your success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Button
                variant="outline"
                onClick={action.onClick}
                className="w-full h-full flex flex-col items-center justify-center p-6 border-2 border-[#1F9D4D]/20 hover:border-[#1F9D4D] hover:bg-[#1F9D4D]/5 rounded-xl transition-all duration-300"
              >
                <span className="text-3xl mb-3">{action.icon}</span>
                <h3 className="text-sm font-semibold text-[#1F9D4D] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {action.title}
                </h3>
                <p className="text-xs text-[#1F9D4D]/70 text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {action.description}
                </p>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
