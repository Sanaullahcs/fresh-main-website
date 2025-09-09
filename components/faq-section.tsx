"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export function FaqSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeCategory, setActiveCategory] = useState("general")

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const faqCategories = [
    { id: "general", name: "GENERAL" },
    { id: "investment", name: "INVESTMENT" },
    { id: "operations", name: "OPERATIONS" },
    { id: "support", name: "SUPPORT" },
  ]

  const faqs = {
    general: [
      {
        question: "WHAT IS THE FRESH PROPERTY FRANCHISE?",
        answer:
          "Fresh Property is a franchise opportunity that allows you to start your own property management business with our proven system, training, and ongoing support. We focus on short-term rentals and vacation properties, providing you with all the tools needed to succeed in this growing market.",
      },
      {
        question: "DO I NEED TO LIVE IN SPAIN TO JOIN?",
        answer:
          "No, you can operate your Fresh Property franchise from anywhere in the world. Our system is designed to be location-independent, allowing you to manage properties remotely while still providing excellent service to property owners and guests.",
      },
      {
        question: "HOW LONG DOES IT TAKE TO GET STARTED?",
        answer: "Most partners are up and running within 1-4 weeks after signing up.",
      },
    ],
    investment: [
      {
        question: "WHAT IS THE INITIAL INVESTMENT?",
        answer:
          "The initial franchise fee varies depending on your area and specific situation — please contact us for a tailored quote. This fee includes comprehensive training, access to all systems and tools, and ongoing support. In your first year, you should expect to invest between €20,000 and €30,000 to cover your startup costs, marketing, and initial income gap while building your portfolio.",
      },
      {
        question: "IS FINANCING AVAILABLE?",
        answer:
          "Yes, we have partnerships with several banks that offer financing options for qualified candidates. We can help connect you with these financial institutions during the application process.",
      },
      {
        question: "WHAT IS THE PROFIT-SHARING MODEL?",
        answer:
          "Fresh operates on a 20% profit-sharing model, meaning we take 20% of your profits while you keep 80%. This aligns our interests with yours - we only succeed when you succeed. There are no fixed monthly fees regardless of your performance.",
      },
    ],
    operations: [
      {
        question: "HOW DO I FIND PROPERTIES TO MANAGE?",
        answer:
          "We provide comprehensive training and marketing systems to help you acquire properties. This includes proven outreach strategies, marketing materials, and scripts for approaching property owners. Many partners find their first properties through networking, local advertising, and our lead generation systems.",
      },
      {
        question: "HOW MANY PROPERTIES DO I NEED TO BE PROFITABLE?",
        answer:
          "Most partners reach break-even with 5-8 properties under management. To achieve a full-time income (€40K-€70K annually), you'll typically need 15-20 properties. Our success plan is designed to help you reach these milestones systematically.",
      },
      {
        question: "WHAT TECHNOLOGY AND TOOLS ARE PROVIDED?",
        answer:
          "You'll receive access to our complete tech stack, including property management software, channel manager for listings across multiple platforms, dynamic pricing tools, guest communication systems, cleaning management software, and our CRM for managing property owner relationships.",
      },
    ],
    support: [
      {
        question: "WHAT TRAINING IS PROVIDED?",
        answer:
          "You'll receive comprehensive 1:1 training covering all aspects of the business: property acquisition, owner negotiations, pricing strategy, guest management, marketing, team building, and more. Training includes both live sessions and on-demand resources you can reference anytime.",
      },
      {
        question: "IS THERE ONGOING SUPPORT?",
        answer:
          "Absolutely. You'll have regular coaching calls with our team, access to our partner community for peer support, and direct access to our founders for guidance. We also provide continuous updates to training materials and systems as the industry evolves.",
      },
      {
        question: "WHAT MARKETING SUPPORT IS INCLUDED?",
        answer:
          "We provide complete marketing materials including website templates, social media content, email campaigns, property owner presentation materials, and advertising strategies. We also offer guidance on local market positioning and building your brand in your chosen territory.",
      },
    ],
  }

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#F9FCF7]" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
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
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto" style={{ fontFamily: "Poppins, sans-serif" }}>
            Everything you need to know about the Fresh Property franchise opportunity
          </p>
        </motion.div>

        <motion.div
          className="mb-8 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
          }}
        >
          {faqCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full ${
                activeCategory === category.id
                  ? "bg-[#1F9D4D] hover:bg-[#1F9D4D]/90 text-white"
                  : "border-[#1F9D4D] text-[#1F9D4D] hover:bg-[#1F9D4D]/10"
              }`}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {category.name}
            </Button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
          }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Accordion type="single" collapsible className="w-full">
                {faqs[activeCategory].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#1F9D4D]/10">
                    <AccordionTrigger
                      className="text-[#1F9D4D] font-medium text-lg py-4 hover:no-underline hover:text-[#1F9D4D]/80"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#1F9D4D]/80 py-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 } },
          }}
        >
          <p className="text-lg text-[#1F9D4D]/80" style={{ fontFamily: "Poppins, sans-serif" }}>
            Still have questions? We're here to help!
          </p>
          <Button
            className="mt-4 bg-[#1F9D4D] hover:bg-[#1F9D4D]/90 text-white rounded-full px-8 py-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
            onClick={() => {
              const element = document.getElementById("apply")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            CONTACT US
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
