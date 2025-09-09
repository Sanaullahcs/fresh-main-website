"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
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
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const properties = [
  {
    id: 1,
    title: "Luxury Apartment in Estepona",
    location: "Estepona, Málaga",
    price: "€995,000 - €2,950,000",
    bedrooms: "2 - 3",
    bathrooms: "2 - 3",
    size: "108 - 232 m²",
    plotSize: "0 m²",
    terrace: "45 - 95 m²",
    type: "New Development",
    category: "new",
    reference: "R4989445",
    status: "Available",
    images: [
      "/estepona-apartment-sea-view.png",
      "/modern-kitchen-sea-view.png",
      "/luxury-mediterranean-bedroom.png",
      "/spacious-living-room.png",
      "/modern-marble-bathroom.png",
    ],
    features: ["Sea View", "Pool", "Parking", "Terrace"],
    description:
      "A Spacious, Three Bedroom, Semi Detached Villa in Blue Lagoon, located within a 10-minute walk of a variety of restaurants and café bars, while a main chain supermarket and commercial centre are also conveniently close by. For golf enthusiasts, there is a choice of three top courses within a 10-minute drive, and the popular La Zenia Boulevard shopping centre and stunning beaches are just 10 minutes away. The villa is accessed via steps leading up to a covered entrance terrace, which opens into a bright lounge/dining room featuring a charming fireplace; the fitted kitchen has a door providing access to a patio. Also on this level, there is a double bedroom and a shower room. On the first floor, there are two further bedrooms, both with fitted wardrobes, and a family bathroom.",
    propertyFeatures: {
      setting: ["Beachfront", "Close To Port", "Close To Shops", "Close To Sea"],
      orientation: ["South", "South West"],
      condition: ["New Construction"],
      pool: ["Communal", "Indoor"],
      climateControl: ["Hot A/C", "Cold A/C", "U/F Heating"],
      views: ["Sea", "Panoramic", "Pool"],
    },
    locationInfo: {
      townCity: "Blue Lagoon",
      area: "Costa Blanca",
      province: "Alicante",
      country: "Spain",
    },
  },
  // Add other properties here...
]

export default function PropertyDetailPage() {
  const params = useParams()
  const propertyId = Number.parseInt(params.id as string)
  const property = properties.find((p) => p.id === propertyId) || properties[0]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Button
            variant="outline"
            className="mt-8 mb-6 hover:bg-green-50 hover:border-green-500 hover:text-green-600 bg-white border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-sm"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            BACK TO PROPERTIES
          </Button>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3">
              <div className="relative mb-6">
                <div className="relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={property.images[currentImageIndex] || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
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
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </div>
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${property.title} ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-200 flex-shrink-0 ${
                        index === currentImageIndex
                          ? "ring-2 ring-green-500 shadow-md"
                          : "hover:ring-2 hover:ring-green-300 opacity-80 hover:opacity-100"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>

              <Card className="mb-6 shadow-sm border-0 bg-white">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-base sm:text-lg">{property.location}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {property.title.toUpperCase()}
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-4">
                    <span className="text-gray-600 text-sm">Ref: {property.reference}</span>
                    <Badge className="bg-green-100 text-green-800 px-3 py-1 w-fit">{property.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-green-50 rounded-xl">
                    <div className="text-center">
                      <Bed className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-xl font-bold text-gray-900">{property.bedrooms}</div>
                      <div className="text-xs text-gray-600 font-medium">BEDROOMS</div>
                    </div>
                    <div className="text-center">
                      <Bath className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-xl font-bold text-gray-900">{property.bathrooms}</div>
                      <div className="text-xs text-gray-600 font-medium">BATHROOMS</div>
                    </div>
                    <div className="text-center">
                      <Square className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-xl font-bold text-gray-900">{property.size.split(" ")[0]}</div>
                      <div className="text-xs text-gray-600 font-medium">M² BUILT</div>
                    </div>
                    <div className="text-center">
                      <Square className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-xl font-bold text-gray-900">{property.plotSize.split(" ")[0]}</div>
                      <div className="text-xs text-gray-600 font-medium">M² PLOT</div>
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
                      <h3 className="text-xl font-bold mb-4 text-gray-900">ABOUT THIS PROPERTY</h3>
                      <p className="text-gray-700 leading-relaxed">{property.description}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="features" className="mt-4">
                  <Card className="shadow-sm border-0 bg-white">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-900">PROPERTY FEATURES</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(property.propertyFeatures).map(([category, features]) => (
                          <div key={category}>
                            <h4 className="font-bold text-green-600 mb-3 text-base uppercase tracking-wide">
                              {category.replace(/([A-Z])/g, " $1").trim()}
                            </h4>
                            <ul className="space-y-2">
                              {features.map((feature, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                                  <span className="text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
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
                          <span className="font-semibold text-gray-900 text-sm">{property.locationInfo.townCity}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600 font-medium text-sm">Area:</span>
                          <span className="font-semibold text-gray-900 text-sm">{property.locationInfo.area}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600 font-medium text-sm">Province:</span>
                          <span className="font-semibold text-gray-900 text-sm">{property.locationInfo.province}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600 font-medium text-sm">Country:</span>
                          <span className="font-semibold text-gray-900 text-sm">{property.locationInfo.country}</span>
                        </div>
                      </div>
                      <div className="h-60 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center border border-green-200">
                        <div className="text-center">
                          <MapPin className="h-10 w-10 text-green-600 mx-auto mb-2" />
                          <span className="text-green-700 font-medium text-sm">Interactive Map Coming Soon</span>
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
                    <div className="text-xs text-gray-600 mb-2">PRICE RANGE</div>
                    <div className="text-lg font-bold text-green-600 mb-2">{property.price}</div>
                    <div className="text-xs text-gray-600 mb-4">Ref: {property.reference}</div>
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
                      <Home className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">FRESH PROPERTIES</div>
                      <div className="text-xs text-gray-600">Real Estate Agency</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                    Contact our team for more information about this property or to arrange a viewing.
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
"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
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
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const properties = [
  {
    id: 1,
    title: "Luxury Apartment in Estepona",
    location: "Estepona, Málaga",
    price: "€995,000 - €2,950,000",
    bedrooms: "2 - 3",
    bathrooms: "2 - 3",
    size: "108 - 232 m²",
    plotSize: "0 m²",
    terrace: "45 - 95 m²",
    type: "New Development",
    category: "new",
    reference: "R4989445",
    status: "Available",
    images: [
      "/estepona-apartment-sea-view.png",
      "/modern-kitchen-sea-view.png",
      "/luxury-mediterranean-bedroom.png",
      "/spacious-living-room.png",
      "/modern-marble-bathroom.png",
    ],
    features: ["Sea View", "Pool", "Parking", "Terrace"],
    description:
      "A Spacious, Three Bedroom, Semi Detached Villa in Blue Lagoon, located within a 10-minute walk of a variety of restaurants and café bars, while a main chain supermarket and commercial centre are also conveniently close by. For golf enthusiasts, there is a choice of three top courses within a 10-minute drive, and the popular La Zenia Boulevard shopping centre and stunning beaches are just 10 minutes away. The villa is accessed via steps leading up to a covered entrance terrace, which opens into a bright lounge/dining room featuring a charming fireplace; the fitted kitchen has a door providing access to a patio. Also on this level, there is a double bedroom and a shower room. On the first floor, there are two further bedrooms, both with fitted wardrobes, and a family bathroom.",
    propertyFeatures: {
      setting: ["Beachfront", "Close To Port", "Close To Shops", "Close To Sea"],
      orientation: ["South", "South West"],
      condition: ["New Construction"],
      pool: ["Communal", "Indoor"],
      climateControl: ["Hot A/C", "Cold A/C", "U/F Heating"],
      views: ["Sea", "Panoramic", "Pool"],
    },
    locationInfo: {
      townCity: "Blue Lagoon",
      area: "Costa Blanca",
      province: "Alicante",
      country: "Spain",
    },
  },
  // Add other properties here...
]

export default function PropertyDetailPage() {
  const params = useParams()
  const propertyId = Number.parseInt(params.id as string)
  const property = properties.find((p) => p.id === propertyId) || properties[0]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Button
            variant="outline"
            className="mt-8 mb-6 hover:bg-green-50 hover:border-green-500 hover:text-green-600 bg-white border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-sm"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            BACK TO PROPERTIES
          </Button>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3">
              <div className="relative mb-6">
                <div className="relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={property.images[currentImageIndex] || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
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
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </div>
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${property.title} ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-200 flex-shrink-0 ${
                        index === currentImageIndex
                          ? "ring-2 ring-green-500 shadow-md"
                          : "hover:ring-2 hover:ring-green-300 opacity-80 hover:opacity-100"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>

              <Card className="mb-6 shadow-sm border-0 bg-white">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-base sm:text-lg">{property.location}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {property.title.toUpperCase()}
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-4">
                    <span className="text-gray-600 text-sm">Ref: {property.reference}</span>
                    <Badge className="bg-green-100 text-green-800 px-3 py-1 w-fit">{property.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-green-50 rounded-xl">
                    <div className="text-center">
                      <Bed className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-xl font-bold text-gray-900">{property.bedrooms}</div>
                      <div className="text-xs text-gray-600 font-medium">BEDROOMS</div>
                    </div>
                    <div className="text-center">
                      <Bath className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-xl font-bold text-gray-900">{property.bathrooms}</div>
                      <div className="text-xs text-gray-600 font-medium">BATHROOMS</div>
                    </div>
                    <div className="text-center">
                      <Square className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-xl font-bold text-gray-900">{property.size.split(" ")[0]}</div>
                      <div className="text-xs text-gray-600 font-medium">M² BUILT</div>
                    </div>
                    <div className="text-center">
                      <Square className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-xl font-bold text-gray-900">{property.plotSize.split(" ")[0]}</div>
                      <div className="text-xs text-gray-600 font-medium">M² PLOT</div>
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
                      <h3 className="text-xl font-bold mb-4 text-gray-900">ABOUT THIS PROPERTY</h3>
                      <p className="text-gray-700 leading-relaxed">{property.description}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="features" className="mt-4">
                  <Card className="shadow-sm border-0 bg-white">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-900">PROPERTY FEATURES</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(property.propertyFeatures).map(([category, features]) => (
                          <div key={category}>
                            <h4 className="font-bold text-green-600 mb-3 text-base uppercase tracking-wide">
                              {category.replace(/([A-Z])/g, " $1").trim()}
                            </h4>
                            <ul className="space-y-2">
                              {features.map((feature, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                                  <span className="text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
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
                          <span className="font-semibold text-gray-900 text-sm">{property.locationInfo.townCity}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600 font-medium text-sm">Area:</span>
                          <span className="font-semibold text-gray-900 text-sm">{property.locationInfo.area}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600 font-medium text-sm">Province:</span>
                          <span className="font-semibold text-gray-900 text-sm">{property.locationInfo.province}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600 font-medium text-sm">Country:</span>
                          <span className="font-semibold text-gray-900 text-sm">{property.locationInfo.country}</span>
                        </div>
                      </div>
                      <div className="h-60 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center border border-green-200">
                        <div className="text-center">
                          <MapPin className="h-10 w-10 text-green-600 mx-auto mb-2" />
                          <span className="text-green-700 font-medium text-sm">Interactive Map Coming Soon</span>
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
                    <div className="text-xs text-gray-600 mb-2">PRICE RANGE</div>
                    <div className="text-lg font-bold text-green-600 mb-2">{property.price}</div>
                    <div className="text-xs text-gray-600 mb-4">Ref: {property.reference}</div>
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
                      <Home className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">FRESH PROPERTIES</div>
                      <div className="text-xs text-gray-600">Real Estate Agency</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                    Contact our team for more information about this property or to arrange a viewing.
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
