"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Building2,
  Filter,
  ChevronDown,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ImageCarousel from "@/components/image-carousel"
import { fetchNewDevelopments, fetchAreas, type NewDevelopment, type NewDevelopmentFilterParams } from "@/lib/api"

export default function NewDevelopmentsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [developments, setDevelopments] = useState<NewDevelopment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUsingMockData, setIsUsingMockData] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalDevelopments, setTotalDevelopments] = useState(0)
  const [pageSize] = useState(12)

  const [isClient, setIsClient] = useState(false)
  const developmentsSectionRef = useRef<HTMLDivElement>(null)

  const [filters, setFilters] = useState({
    priceRange: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    area: "",
    propertyType: "",
    minPrice: 0,
    maxPrice: 10000000,
    pool: false,
    garden: false,
    garage: false,
    seaView: false,
    airConditioning: false,
    terrace: false,
    furnished: false,
    parking: false,
    elevator: false,
    fireplace: false,
    balcony: false,
    storage: false,
  })

  const [showFilterModal, setShowFilterModal] = useState(false)
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>({})
  const [customInputs, setCustomInputs] = useState<Record<string, string>>({})
  const [areas, setAreas] = useState<Array<{ name: string; pueblos: string[] }>>([])
  const [availableLocations, setAvailableLocations] = useState<string[]>([])

  useEffect(() => {
    if (filters.area) {
      const selectedArea = areas.find((area) => area.name === filters.area)
      setAvailableLocations(selectedArea?.pueblos || [])
      // Clear selected locations when area changes
      setFilters((prev) => ({ ...prev, location: "" }))
    } else {
      setAvailableLocations([])
    }
  }, [filters.area, areas])

  const loadDevelopments = async (page: number = currentPage) => {
    setLoading(true)
    setError(null)

    try {
      const filterParams: NewDevelopmentFilterParams = {
        page: page,
        pageSize: pageSize,
      }

      // Search
      if (searchTerm.trim()) {
        filterParams.search = searchTerm.trim()
      }

      // Price filters
      if (filters.minPrice > 0) filterParams.minPrice = filters.minPrice
      if (filters.maxPrice < 10000000) filterParams.maxPrice = filters.maxPrice

      // Bedrooms
      if (filters.bedrooms && filters.bedrooms !== "Any") {
        const bedroomCount = Number.parseInt(filters.bedrooms.replace(/\D/g, ""))
        if (!isNaN(bedroomCount)) filterParams.beds = bedroomCount
      }

      // Bathrooms
      if (filters.bathrooms && filters.bathrooms !== "Any") {
        const bathroomCount = Number.parseInt(filters.bathrooms.replace(/\D/g, ""))
        if (!isNaN(bathroomCount)) filterParams.baths = bathroomCount
      }

      // Area
      if (filters.area) filterParams.area = filters.area

      // ✅ Location → API expects `locations`
      if (filters.location.length > 0) {
        filterParams.location = filters.location
      }

      // Property type → API expects `types`
      if (filters.propertyType) filterParams.type = filters.propertyType

      // ✅ Amenities mapping → API expects `has_pool`, `has_garden`, `own_property`
      const amenities: string[] = []
      if (filters.pool) amenities.push("has_pool")
      if (filters.garden) amenities.push("has_garden")
      if (filters.garage) amenities.push("own_property")
      // Agar API me `sea_view` param hai toh add kar lo
      if (filters.seaView) amenities.push("sea_view")

      if (amenities.length > 0) {
        filterParams.amenities = amenities
      }

      console.log("[v0] API request params:", filterParams)
      const response = await fetchNewDevelopments(filterParams) // ✅ yeh ab sahi mapping ke sath jayega
      console.log("[v0] API response:", response)

      setDevelopments(response.properties || [])

      const totalCount = response.properties?.length || 0
      const calculatedPages = response.numPages || Math.ceil(totalCount / pageSize)

      setTotalDevelopments(totalCount)
      setTotalPages(Math.max(1, calculatedPages))
      setCurrentPage(page)
    } catch (err) {
      console.log("[v0] API error:", err)
      setDevelopments([])
    } finally {
      setLoading(false)
    }
  }

  const loadAreas = async () => {
    try {
      const response = await fetchAreas()
      setAreas(response.areas || [])
    } catch (error) {
      console.error("Error loading areas:", error)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
    loadDevelopments(1)
  }, [
    searchTerm,
    filters.minPrice,
    filters.maxPrice,
    filters.bedrooms,
    filters.bathrooms,
    filters.area,
    filters.location,
    filters.propertyType,
    filters.pool,
    filters.garden,
    filters.garage,
    filters.seaView,
    filters.airConditioning,
    filters.terrace,
    filters.furnished,
    filters.parking,
    filters.elevator,
    filters.fireplace,
    filters.balcony,
    filters.storage,
  ])

  useEffect(() => {
    setIsClient(true)
    loadAreas()
  }, [])

  const toggleDropdown = (filterType: string) => {
    setDropdownStates((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }))
  }

  const selectOption = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
    setDropdownStates((prev) => ({
      ...prev,
      [filterType]: false,
    }))
  }

  const selectLocationOption = (location: string) => {
    setFilters((prev) => ({
      ...prev,
      location: prev.location.includes(location)
        ? prev.location.filter((l) => l !== location)
        : [...prev.location, location],
    }))
  }

  const handleCustomInput = (filterType: string, value: string) => {
    if (value.trim()) {
      setFilters((prev) => ({
        ...prev,
        [filterType]: value.trim(),
      }))
      setCustomInputs((prev) => ({
        ...prev,
        [filterType]: "",
      }))
    }
    setDropdownStates((prev) => ({
      ...prev,
      [filterType]: false,
    }))
  }

  const clearFilters = () => {
    setFilters({
      priceRange: "",
      bedrooms: "",
      bathrooms: "",
      location: [],
      area: "",
      propertyType: "",
      minPrice: 0,
      maxPrice: 10000000,
      pool: false,
      garden: false,
      garage: false,
      seaView: false,
      airConditioning: false,
      terrace: false,
      furnished: false,
      parking: false,
      elevator: false,
      fireplace: false,
      balcony: false,
      storage: false,
    })
    setSearchTerm("")
  }

  const hasActiveFilters = () => {
    return (
      filters.location.length > 0 ||
      filters.area !== "" ||
      filters.propertyType ||
      filters.bedrooms ||
      filters.bathrooms ||
      filters.pool ||
      filters.garden ||
      filters.garage ||
      filters.seaView ||
      filters.airConditioning ||
      filters.terrace ||
      filters.furnished ||
      filters.parking ||
      filters.elevator ||
      filters.fireplace ||
      filters.balcony ||
      filters.storage ||
      filters.minPrice !== 0 ||
      filters.maxPrice !== 10000000 ||
      searchTerm.trim() !== ""
    )
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      loadDevelopments(page)
      scrollToDevelopments()
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  const scrollToDevelopments = () => {
    developmentsSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const start = Math.max(1, currentPage - 2)
      const end = Math.min(totalPages, start + maxVisiblePages - 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }

    return pages
  }

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? Number.parseInt(price) : price
    return `€${numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  }

  const handleDevelopmentClick = (development: NewDevelopment) => {
    if (isClient) {
      router.push(`/new-developments/${development._id}`)
    }
  }

  const convertImagesToCarouselFormat = (images: NewDevelopment["images"]) => {
    return (
      images?.image?.map((img) => ({
        src: img.url,
        alt: `Development image ${img.$.id}`,
      })) || []
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* <Navigation /> */}

      {/* {isUsingMockData && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Demo Mode:</strong> This is showing sample data for demonstration. To connect to your actual API
                at localhost:3001, please run this code in your local development environment.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )} */}

      {/* Hero Section */}
      {/* <section className="flex flex-col" id="home">
        <div
          className="relative flex items-center justify-center py-16 sm:py-20"
          style={{
            backgroundImage: `url('/images/macrame-bedroom-hero.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 w-full">
            <div className="text-center max-w-6xl mx-auto">
              <div>
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight"
                  style={{
                    fontFamily: "Unica One, cursive",
                    fontWeight: "700",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                  }}
                >
                  <span className="text-white">NEW </span>
                  <span className="text-black">DEVELOPMENTS</span>
                  <span className="text-white"> IN </span>
                  <span className="text-black">SPAIN</span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <p
                className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Discover the latest new build developments across Spain's most sought-after locations. From modern
                apartments to luxury villas, find your perfect new home with contemporary design and premium amenities.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      <section className="bg-green-50 py-6 border-b border-green-100">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between max-w-6xl mx-auto">
            <div className="w-full lg:w-2/5">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by location, type, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                />
              </div>
            </div>

            {/* Advanced Filters Button */}
            <Button
              onClick={() => setShowFilterModal(true)}
              variant="outline"
              className="flex items-center gap-2 bg-white hover:bg-green-50 border-gray-300"
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters() && (
                <Badge className="ml-1 bg-green-600 text-white text-xs px-1.5 py-0.5">
                  {Object.values(filters).filter(Boolean).length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </section>

      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Filter New Developments</h2>
                <button onClick={() => setShowFilterModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>

                  {/* Area Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown("area")}
                        className="w-full bg-white border border-gray-300 py-2 px-3 rounded-md flex items-center justify-between hover:border-green-500 transition-colors text-sm"
                      >
                        <span className="text-gray-500">{filters.area || "Select Area"}</span>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      </button>
                      {dropdownStates.area && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                          <div className="flex justify-end p-2 border-b border-gray-100">
                            <button
                              onClick={() => toggleDropdown("area")}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => selectOption("area", "")}
                            className={`w-full px-3 py-2 text-left hover:bg-green-50 transition-colors text-sm ${
                              filters.area === "" ? "bg-green-500 text-white" : "text-gray-700"
                            }`}
                          >
                            All Areas
                          </button>
                          {areas.map((area) => (
                            <button
                              key={area.name}
                              onClick={() => selectOption("area", area.name)}
                              className={`w-full px-3 py-2 text-left hover:bg-green-50 transition-colors text-sm ${
                                filters.area === area.name ? "bg-green-500 text-white" : "text-gray-700"
                              }`}
                            >
                              {area.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown("location")}
                        className="w-full bg-white border border-gray-300 py-2 px-3 rounded-md flex items-center justify-between hover:border-green-500 transition-colors text-sm"
                      >
                        <span className="text-gray-500">{filters.location || "Select Location"}</span>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      </button>

                      {dropdownStates.location && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                          <div className="flex justify-end p-2 border-b border-gray-100">
                            <button
                              onClick={() => toggleDropdown("location")}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          {/* All Locations Option */}
                          <button
                            onClick={() => {
                              selectOption("location", "")
                              toggleDropdown("location") // close after select
                            }}
                            className={`w-full px-3 py-2 text-left hover:bg-green-50 transition-colors text-sm ${
                              filters.location === "" ? "bg-green-500 text-white" : "text-gray-700"
                            }`}
                          >
                            All Locations
                          </button>

                          {/* Dynamic Options */}
                          {availableLocations.map((location) => (
                            <button
                              key={location}
                              onClick={() => {
                                selectOption("location", location)
                                toggleDropdown("location") // close after select
                              }}
                              className={`w-full px-3 py-2 text-left hover:bg-green-50 transition-colors text-sm ${
                                filters.location === location ? "bg-green-500 text-white" : "text-gray-700"
                              }`}
                            >
                              {location}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Type</h3>
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown("propertyType")}
                      className="w-full bg-white border border-gray-300 py-2 px-3 rounded-md flex items-center justify-between hover:border-green-500 transition-colors text-sm"
                    >
                      <span className="text-gray-500">{filters.propertyType || "Any Type"}</span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    {dropdownStates.propertyType && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <div className="flex justify-end p-2 border-b border-gray-100">
                          <button
                            onClick={() => toggleDropdown("propertyType")}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        {["", "Apartment", "Penthouse", "ground-floor", "Villa", "Townhouse"].map((option) => (
                          <button
                            key={option}
                            onClick={() => selectOption("propertyType", option)}
                            className={`w-full px-3 py-2 text-left hover:bg-green-50 transition-colors text-sm ${
                              filters.propertyType === option ? "bg-green-500 text-white" : "text-gray-700"
                            }`}
                          >
                            {option === "" ? "Any Type" : option.charAt(0).toUpperCase() + option.slice(1)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bedrooms & Bathrooms */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown("bedrooms")}
                        className="w-full bg-white border border-gray-300 py-2 px-3 rounded-md flex items-center justify-between hover:border-green-500 transition-colors text-sm"
                      >
                        <span className="text-gray-500">{filters.bedrooms || "Any"}</span>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      </button>
                      {dropdownStates.bedrooms && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          <div className="flex justify-end p-2 border-b border-gray-100">
                            <button
                              onClick={() => toggleDropdown("bedrooms")}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          {["Any", "1", "2", "3", "4", "5+"].map((option) => (
                            <button
                              key={option}
                              onClick={() => selectOption("bedrooms", option)}
                              className={`w-full px-3 py-2 text-left hover:bg-green-50 transition-colors text-sm ${
                                filters.bedrooms === option ? "bg-green-500 text-white" : "text-gray-700"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown("bathrooms")}
                        className="w-full bg-white border border-gray-300 py-2 px-3 rounded-md flex items-center justify-between hover:border-green-500 transition-colors text-sm"
                      >
                        <span className="text-gray-500">{filters.bathrooms || "Any"}</span>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      </button>
                      {dropdownStates.bathrooms && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          <div className="flex justify-end p-2 border-b border-gray-100">
                            <button
                              onClick={() => toggleDropdown("bathrooms")}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          {["Any", "1", "2", "3", "4+"].map((option) => (
                            <button
                              key={option}
                              onClick={() => selectOption("bathrooms", option)}
                              className={`w-full px-3 py-2 text-left hover:bg-green-50 transition-colors text-sm ${
                                filters.bathrooms === option ? "bg-green-500 text-white" : "text-gray-700"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: "pool", label: "Pool" },
                      // { key: "garden", label: "Garden" },
                      // { key: "garage", label: "Garage" },
                      // { key: "seaView", label: "Sea View" },
                    ].map((amenity) => (
                      <label key={amenity.key} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters[amenity.key as keyof typeof filters] as boolean}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              [amenity.key]: e.target.checked,
                            }))
                          }
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">{amenity.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                        <input
                          type="number"
                          value={filters.minPrice}
                          onChange={(e) => {
                            const value = Number(e.target.value)
                            if (value < filters.maxPrice) {
                              setFilters((prev) => ({ ...prev, minPrice: value }))
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                        <div className="text-sm text-green-600 mt-1">{formatPrice(filters.minPrice)}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                        <input
                          type="number"
                          value={filters.maxPrice}
                          onChange={(e) => {
                            const value = Number(e.target.value)
                            if (value > filters.minPrice) {
                              setFilters((prev) => ({ ...prev, maxPrice: value }))
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                        <div className="text-sm text-green-600 mt-1">{formatPrice(filters.maxPrice)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear Filter
                </button>
                <Button
                  onClick={() => setShowFilterModal(false)}
                  className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Developments Section */}
      <section className="" id="developments-section" ref={developmentsSectionRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {loading ? "Loading..." : `${developments.length} New Developments`}
              </h2>
              <p className="text-gray-600">
                {loading
                  ? "Please wait..."
                  : `Showing ${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, developments.length)} of ${developments.length}`}
              </p>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          )}

          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {developments.map((development) => (
                <div key={development._id}>
                  <Card className="group overflow-hidden hover:shadow-lg border-0 shadow-md bg-white">
                    <div className="relative">
                      <ImageCarousel
                        images={convertImagesToCarouselFormat(development.images)}
                        className="w-full h-64"
                      />
                      <Badge className="absolute top-4 left-4 bg-blue-600 text-white">New Development</Badge>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-green-50">
                          <Heart className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-green-50">
                          <Share2 className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-6 pt-[165px]">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {development.type.charAt(0).toUpperCase() + development.type.slice(1)} in {development.town}
                        </h3>
                      </div>

                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-1 text-gray-600" />
                        <span className="text-sm">
                          {development.town}, {development.province}
                        </span>
                      </div>

                      <div className="text-2xl font-bold text-green-600 mb-4">{formatPrice(development.price)}</div>

                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1 text-gray-600" />
                          <span>{development.beds}</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1 text-gray-600" />
                          <span>{development.baths}</span>
                        </div>
                        <div className="flex items-center">
                          <Square className="h-4 w-4 mr-1 text-gray-600" />
                          <span>{development.surface_area.built}m²</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {development.pool === "1" && (
                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                            Pool
                          </Badge>
                        )}
                        {development.features.feature.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {development.desc.en?.substring(0, 120)}...
                      </p>

                      <Button
                        onClick={() => handleDevelopmentClick(development)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}

          {!loading && developments.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No developments found matching your search.</p>
              <Button onClick={() => setSearchTerm("")} variant="outline">
                Clear Search
              </Button>
            </div>
          )}

          {!loading && totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-center mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-2 mb-[40px] ">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center space-x-1">
                  {getPageNumbers().map((pageNum) => (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className={`min-w-[40px] ${
                        currentPage === pageNum ? "bg-green-600 hover:bg-green-700 text-white" : "hover:bg-green-50"
                      }`}
                    >
                      {pageNum}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 bg-transparent"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  )
}
