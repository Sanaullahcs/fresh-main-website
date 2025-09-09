"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, Mail, Send } from "lucide-react"
import { motion } from "framer-motion"

export function PropertyEvaluationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyAddress: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    currentStatus: "",
    expectedIncome: "",
    additionalInfo: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // You can add actual form submission logic here
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="property-evaluation-form" className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1F9D4D] mb-4"
            style={{ fontFamily: "Unica One, cursive", fontWeight: "normal" }}
            variants={itemVariants}
          >
            GET YOUR FREE PROPERTY EVALUATION
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "Poppins, sans-serif" }}
            variants={itemVariants}
          >
            Discover your property's rental potential with our comprehensive evaluation. Get personalized insights and
            revenue projections at no cost.
          </motion.p>
        </div>

        <motion.div variants={itemVariants}>
          <Card className="shadow-2xl border-0 bg-white">
            <CardHeader className="bg-[#1F9D4D] text-white rounded-t-lg">
              <CardTitle
                className="text-2xl font-bold text-center flex items-center justify-center gap-3"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Home className="h-8 w-8" />
                Property Evaluation Request
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="border-2 border-gray-200 focus:border-[#1F9D4D] rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="border-2 border-gray-200 focus:border-[#1F9D4D] rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="border-2 border-gray-200 focus:border-[#1F9D4D] rounded-lg"
                  />
                </div>

                {/* Property Information */}
                <div className="border-t border-gray-200 pt-6">
                  <h3
                    className="text-lg font-semibold text-gray-900 mb-4"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Property Details
                  </h3>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="propertyAddress"
                        className="text-sm font-medium text-gray-700"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Property Address *
                      </Label>
                      <Input
                        id="propertyAddress"
                        type="text"
                        placeholder="Enter full property address"
                        value={formData.propertyAddress}
                        onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                        required
                        className="border-2 border-gray-200 focus:border-[#1F9D4D] rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="propertyType"
                          className="text-sm font-medium text-gray-700"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Property Type *
                        </Label>
                        <Select
                          value={formData.propertyType}
                          onValueChange={(value) => handleInputChange("propertyType", value)}
                        >
                          <SelectTrigger className="border-2 border-gray-200 focus:border-[#1F9D4D] rounded-lg">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="condo">Condo</SelectItem>
                            <SelectItem value="studio">Studio</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="bedrooms"
                          className="text-sm font-medium text-gray-700"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Bedrooms *
                        </Label>
                        <Select
                          value={formData.bedrooms}
                          onValueChange={(value) => handleInputChange("bedrooms", value)}
                        >
                          <SelectTrigger className="border-2 border-gray-200 focus:border-[#1F9D4D] rounded-lg">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="studio">Studio</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5+">5+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="bathrooms"
                          className="text-sm font-medium text-gray-700"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Bathrooms *
                        </Label>
                        <Select
                          value={formData.bathrooms}
                          onValueChange={(value) => handleInputChange("bathrooms", value)}
                        >
                          <SelectTrigger className="border-2 border-gray-200 focus:border-[#1F9D4D] rounded-lg">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="1.5">1.5</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="2.5">2.5</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="3+">3+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="currentStatus"
                          className="text-sm font-medium text-gray-700"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Current Status
                        </Label>
                        <Select
                          value={formData.currentStatus}
                          onValueChange={(value) => handleInputChange("currentStatus", value)}
                        >
                          <SelectTrigger className="border-2 border-gray-200 focus:border-[#1F9D4D] rounded-lg">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vacant">Vacant</SelectItem>
                            <SelectItem value="owner-occupied">Owner Occupied</SelectItem>
                            <SelectItem value="long-term-rental">Long-term Rental</SelectItem>
                            <SelectItem value="short-term-rental">Short-term Rental</SelectItem>
                            <SelectItem value="under-construction">Under Construction</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="expectedIncome"
                          className="text-sm font-medium text-gray-700"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Expected Monthly Income
                        </Label>
                        <Input
                          id="expectedIncome"
                          type="text"
                          placeholder="e.g., €2,000"
                          value={formData.expectedIncome}
                          onChange={(e) => handleInputChange("expectedIncome", e.target.value)}
                          className="border-2 border-gray-200 focus:border-[#1F9D4D] rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="additionalInfo"
                        className="text-sm font-medium text-gray-700"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Additional Information
                      </Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="Tell us about any special features, recent renovations, or specific questions you have..."
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                        rows={4}
                        className="border-2 border-gray-200 focus:border-[#1F9D4D] rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-[#1F9D4D] hover:bg-[#1F9D4D]/90 text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <Send className="mr-3 h-6 w-6" />
                    Get My Free Property Evaluation
                    <Mail className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-500 pt-4">
                  <p style={{ fontFamily: "Poppins, sans-serif" }}>
                    We'll contact you within 24 hours with your personalized property evaluation and rental income
                    projections.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
