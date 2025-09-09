"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Share2,
  Phone,
  MessageCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Building2,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { fetchNewDevelopmentById, type NewDevelopment } from "@/lib/api"

type Props = {
  id?: string
  development?: NewDevelopment | null
}

export default function NewDevelopmentDetailContent({ id: developmentId, development: initialDevelopment }: Props) {
  // client will use the provided development if available, otherwise fetch by id
  const params = useParams()
  const router = useRouter()
  const routeId = developmentId || (params.id as string)

  const [development, setDevelopment] = useState<NewDevelopment | null>(initialDevelopment || null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // If initial development data was provided from server, skip fetching
    if (initialDevelopment) {
      setLoading(false)
      return
    }

    const loadDevelopment = async () => {
      if (!routeId) return

      setLoading(true)
      setError(null)

      try {
        const data = await fetchNewDevelopmentById(routeId)
        if (!data) {
          setError("Development not found")
        } else {
          setDevelopment(data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load development")
      } finally {
        setLoading(false)
      }
    }

    loadDevelopment()
  }, [developmentId])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    )
  }

  if (error || !development) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-20 pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Development Not Found</h2>
              <p className="text-gray-600 mb-6">{error || "The development you're looking for doesn't exist."}</p>
              <Button
                onClick={() => router.push("/buy")}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to New Developments
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const images = development.images?.image || []
  const formatPrice = (price: string) => {
    const numPrice = Number.parseInt(price)
    return `€${numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Button
            variant="outline"
            className="mt-8 mb-6 hover:bg-green-50 hover:border-green-500 hover:text-green-600 bg-white border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-sm"
            onClick={() => router.push("/buy")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            BACK TO NEW DEVELOPMENTS
          </Button>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3">
              {images.length > 0 && (
                <div className="relative mb-6">
                  <div className="relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={images[currentImageIndex]?.url || "/placeholder.svg"}
                      alt={`Development image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {images.length > 1 && (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-green-50 hover:text-green-600 shadow-md rounded-full w-10 h-10 p-0 border-0"
                          onClick={prevImage}
                        >
                          <ChevronLeft className="h-4 w-4 text-black" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-green-50 hover:text-green-600 shadow-md rounded-full w-10 h-10 p-0 border-0"
                          onClick={nextImage}
                        >
                          <ChevronRight className="h-4 w-4 text-black" />
                        </Button>
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                          {currentImageIndex + 1} / {images.length}
                        </div>
                      </>
                    )}
                  </div>
                  {images.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                      {images.map((image, index) => (
                        <img
                          key={image.$.id}
                          src={image.url || "/placeholder.svg"}
                          alt={`Development thumbnail ${index + 1}`}
                          className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-200 flex-shrink-0 ${
                            index === currentImageIndex
                              ? "ring-2 ring-green-500 shadow-md"
                              : "hover:ring-2 hover:ring-green-300 opacity-80 hover:opacity-100"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              <Card className="mb-6 shadow-sm border-0 bg-white">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-base sm:text-lg">
                      {development.town}, {development.province}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {development.type.charAt(0).toUpperCase() + development.type.slice(1)} IN{" "}
                    {development.town.toUpperCase()}
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-4">
                    <span className="text-gray-600 text-sm">Ref: {development.ref}</span>
                    <Badge className="bg-blue-100 text-blue-800 px-3 py-1 w-fit">New Development</Badge>
                    {development.new_build === "1" && (
                      <Badge className="bg-green-100 text-green-800 px-3 py-1 w-fit">New Build</Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-green-50 rounded-xl">
                    <div className="text-center">
                      <Bed className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-xl font-bold text-gray-900">{development.beds}</div>
                      <div className="text-xs text-gray-600 font-medium">BEDROOMS</div>
                    </div>
                    <div className="text-center">
                      <Bath className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-xl font-bold text-gray-900">{development.baths}</div>
                      <div className="text-xs text-gray-600 font-medium">BATHROOMS</div>
                    </div>
                    <div className="text-center">
                      <Square className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-xl font-bold text-gray-900">{development.surface_area.built}</div>
                      <div className="text-xs text-gray-600 font-medium">M² BUILT</div>
                    </div>
                    <div className="text-center">
                      <Zap className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-xl font-bold text-gray-900">{development.energy_rating.consumption}</div>
                      <div className="text-xs text-gray-600 font-medium">ENERGY RATING</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white border border-green-200 rounded-lg p-1 shadow-sm">
                  <TabsTrigger
                    value="description"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white hover:bg-green-50 hover:text-green-600 font-medium text-xs sm:text-sm"
                  >
                    DESCRIPTION
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white hover:bg-green-50 hover:text-green-600 font-medium text-xs sm:text-sm"
                  >
                    FEATURES
                  </TabsTrigger>
                  <TabsTrigger
                    value="location"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white hover:bg-green-50 hover:text-green-600 font-medium text-xs sm:text-sm"
                  >
                    LOCATION
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-4">
                  <Card className="shadow-sm border-0 bg-white">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-900">ABOUT THIS DEVELOPMENT</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {development.desc.en || "No description available."}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="features" className="mt-4">
                  <Card className="shadow-sm border-0 bg-white">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-900">DEVELOPMENT FEATURES</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-green-600 mb-3 text-base uppercase tracking-wide">
                            Property Features
                          </h4>
                          <ul className="space-y-2">
                            {development.features.feature.map((feature, index) => (
                              <li key={index} className="flex items-center text-gray-700">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-green-600 mb-3 text-base uppercase tracking-wide">
                            Development Details
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-center text-gray-700">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                              <span className="text-sm">Energy Rating: {development.energy_rating.consumption}</span>
                            </li>
                            <li className="flex items-center text-gray-700">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                              <span className="text-sm">Emissions Rating: {development.energy_rating.emissions}</span>
                            </li>
                            {development.pool === "1" && (
                              <li className="flex items-center text-gray-700">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                                <span className="text-sm">Swimming Pool</span>
                              </li>
                            )}
                            <li className="flex items-center text-gray-700">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                              <span className="text-sm">New Construction</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="location" className="mt-4">
                  <Card className="shadow-sm border-0 bg-white">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-900">LOCATION INFORMATION</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600 font-medium text-sm">Town/City:</span>
                          <span className="font-semibold text-gray-900 text-sm">{development.town}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600 font-medium text-sm">Province:</span>
                          <span className="font-semibold text-gray-900 text-sm">{development.province}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600 font-medium text-sm">Country:</span>
                          <span className="font-semibold text-gray-900 text-sm">{development.country}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600 font-medium text-sm">Location Detail:</span>
                          <span className="font-semibold text-gray-900 text-sm">{development.location_detail}</span>
                        </div>
                      </div>
                      <div className="h-60 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center border border-green-200">
                        <div className="text-center">
                          <MapPin className="h-10 w-10 text-green-600 mx-auto mb-2" />
                          <span className="text-green-700 font-medium text-sm">Interactive Map Coming Soon</span>
                          <p className="text-green-600 text-xs mt-1">
                            Coordinates: {development.location.latitude}, {development.location.longitude}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="xl:col-span-1">
              <Card className="sticky top-24 shadow-lg border-0 bg-white">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-xs text-gray-600 mb-2">PRICE</div>
                    <div className="text-lg font-bold text-green-600 mb-2">{formatPrice(development.price)}</div>
                    <div className="text-xs text-gray-600 mb-4">Ref: {development.ref}</div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-green-50 hover:border-green-500 hover:text-green-600 bg-white border-gray-300"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      SHARE
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 mb-6 p-3 bg-green-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">NEW DEVELOPMENT</div>
                      <div className="text-xs text-gray-600">Premium Properties</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                    Contact our team for more information about this new development or to arrange a viewing.
                  </p>

                  <div className="space-y-3">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 font-medium text-sm">
                      <Phone className="h-4 w-4 mr-2" />
                      CALL NOW
                    </Button>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 font-medium text-sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WHATSAPP
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
