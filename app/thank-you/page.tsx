"use client"

import { motion } from "framer-motion"
import { CheckCircle, ArrowLeft, Home, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"

export default function ThankYouPage() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <Card className="shadow-2xl border-0 bg-white overflow-hidden">
          <CardContent className="p-8 sm:p-12 text-center">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="w-16 h-16 text-[#1F9D4D]" />
            </motion.div>

            {/* Main Message */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl text-[#1F9D4D] mb-6"
              style={{
                fontFamily: "Unica One, cursive",
                fontWeight: "normal",
              }}
            >
              MESSAGE SENT!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-700 mb-8 leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Thank you for reaching out to Fresh Property Management!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-green-50 rounded-2xl p-6 mb-8"
            >
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
                We've received your message and our team will get back to you within <strong>24 hours</strong> to
                discuss your property management needs or franchise opportunities.
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            >
              <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Mail className="w-5 h-5 text-[#1F9D4D]" />
                <span className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                  info@fresh-propertymanagement.com
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Phone className="w-5 h-5 text-[#1F9D4D]" />
                <span className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                  +31 6 23700433
                </span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                className="bg-[#1F9D4D] hover:bg-[#1F9D4D]/90 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-[#1F9D4D] text-[#1F9D4D] hover:bg-[#1F9D4D] hover:text-white px-8 py-3 rounded-lg transition-all duration-300 bg-transparent"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Link href="/services/holiday-rental-management" onClick={() => setIsOpen(false)}>
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Learn More
                </Link>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
