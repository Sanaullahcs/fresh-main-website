"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

interface FormData {
  name: string
  email: string
  phone: string
  location: string
  bedrooms: string
}

export function RentalAdviceFormSection() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    bedrooms: "",
  })

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2)
    } else {
      handleFormSubmit()
    }
  }

  const handleFormSubmit = async () => {
    try {
      const formElement = document.createElement("form")
      formElement.action = "https://formsubmit.co/info@fresh-propertymanagement.com"
      formElement.method = "POST"
      formElement.style.display = "none"

      // Add form data as hidden inputs
      const fields = [
        { name: "_subject", value: "New Rental Property Inquiry" },
        { name: "_next", value: `${window.location.origin}/thank-you` },
        { name: "_captcha", value: "false" },
        { name: "name", value: formData.name },
        { name: "email", value: formData.email },
        { name: "phone", value: formData.phone },
        { name: "location", value: formData.location },
        { name: "bedrooms", value: formData.bedrooms },
        { name: "form_type", value: "Rental Property Evaluation" },
      ]

      fields.forEach((field) => {
        const input = document.createElement("input")
        input.type = "hidden"
        input.name = field.name
        input.value = field.value
        formElement.appendChild(input)
      })

      document.body.appendChild(formElement)
      formElement.submit()
    } catch (error) {
      console.error("Form submission error:", error)
      setIsSubmitted(true) // Fallback to show success message
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(1)
  }

  const isStep1Valid = formData.location && formData.bedrooms
  const isStep2Valid = formData.name && formData.email && formData.phone

  return (
    <section className="py-8 sm:py-12 bg-white w-full">
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#1F9D4D] mb-3 sm:mb-4 leading-tight"
                style={{
                  fontFamily: "Unica One, cursive",
                  fontWeight: "normal",
                }}
              >
                FREE RENTAL ADVICE
              </h2>

              <h3
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-3 sm:mb-4 leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                INTERESTED IN WHAT YOUR PROPERTY COULD EARN?
              </h3>

              <p
                className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Please fill out the form and we will get back to you in no time!
              </p>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 w-full"
            >
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep === 1 ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="location" className="text-sm text-gray-700 font-medium mb-2 block">
                            Property location *
                          </Label>
                          <Input
                            id="location"
                            type="text"
                            value={formData.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            className="w-full h-11 text-sm border-2 border-gray-200 rounded-lg focus:border-[#1F9D4D] focus:ring-0"
                            placeholder="e.g., Spain"
                          />
                        </div>

                        <div>
                          <Label htmlFor="bedrooms" className="text-sm text-gray-700 font-medium mb-2 block">
                            Number of bedrooms *
                          </Label>
                          <Input
                            id="bedrooms"
                            type="number"
                            value={formData.bedrooms}
                            onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                            className="w-full h-11 text-sm border-2 border-gray-200 rounded-lg focus:border-[#1F9D4D] focus:ring-0"
                            placeholder="e.g., 2"
                            min="1"
                            max="10"
                          />
                        </div>

                        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 pt-4">
                          <Button
                            variant="outline"
                            className="w-full xs:flex-1 h-10 sm:h-11 text-xs sm:text-sm border-2 border-gray-300 text-gray-500 hover:bg-gray-50 bg-transparent order-2 xs:order-1"
                            disabled
                          >
                            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Previous
                          </Button>
                          <Button
                            onClick={handleNextStep}
                            disabled={!isStep1Valid}
                            className="w-full xs:flex-1 h-10 sm:h-11 text-xs sm:text-sm bg-[#1F9D4D] hover:bg-[#1F9D4D]/90 text-white disabled:bg-gray-300 order-1 xs:order-2"
                          >
                            <span className="hidden sm:inline">Calculate your income</span>
                            <span className="sm:hidden">Calculate income</span>
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-sm text-gray-700 font-medium mb-2 block">
                            Your name *
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="w-full h-11 text-sm border-2 border-gray-200 rounded-lg focus:border-[#1F9D4D] focus:ring-0"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-sm text-gray-700 font-medium mb-2 block">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="w-full h-11 text-sm border-2 border-gray-200 rounded-lg focus:border-[#1F9D4D] focus:ring-0"
                            placeholder="Enter your email address"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone" className="text-sm text-gray-700 font-medium mb-2 block">
                            Phone number *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="w-full h-11 text-sm border-2 border-gray-200 rounded-lg focus:border-[#1F9D4D] focus:ring-0"
                            placeholder="Enter your phone number"
                          />
                        </div>

                        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 pt-4">
                          <Button
                            onClick={handlePrevStep}
                            variant="outline"
                            className="w-full xs:flex-1 h-10 sm:h-11 text-xs sm:text-sm border-2 border-gray-300 text-gray-700 hover:bg-gray-50 order-2 xs:order-1 bg-transparent"
                          >
                            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Previous
                          </Button>
                          <Button
                            onClick={handleNextStep}
                            disabled={!isStep2Valid}
                            className="w-full xs:flex-1 h-10 sm:h-11 text-xs sm:text-sm bg-[#1F9D4D] hover:bg-[#1F9D4D]/90 text-white disabled:bg-gray-300 order-1 xs:order-2"
                          >
                            <span className="hidden sm:inline">Calculate your income</span>
                            <span className="sm:hidden">Calculate income</span>
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-6"
                  >
                    <div className="mb-6">
                      <CheckCircle className="w-12 h-12 text-[#1F9D4D] mx-auto mb-4" />
                      <h3
                        className="text-xl lg:text-2xl text-[#1F9D4D] mb-4"
                        style={{
                          fontFamily: "Unica One, cursive",
                          fontWeight: "normal",
                        }}
                      >
                        THANK YOU!
                      </h3>
                      <p
                        className="text-base text-gray-700 leading-relaxed"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        We have received your information and will get back to you with a detailed rental income
                        analysis within 24 hours.
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-[#1F9D4D]">
                      <p className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Our property experts will contact you at <strong>{formData.email}</strong> with personalized
                        rental advice for your {formData.bedrooms}-bedroom property in {formData.location}.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
