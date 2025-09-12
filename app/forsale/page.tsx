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
  X,
  ChevronDown,
  Filter,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ImageCarousel from "@/components/image-carousel"
import { fetchProperties, fetchAreas, type Property, type FilterParams } from "@/lib/api"

interface Area {
  name: string
  pueblos: string[]
}
const defaultFilters = {
  priceRange: "",
  bedrooms: "",
  bathrooms: "",
  location: "",
  area: "",
  propertyType: "",
  minPrice: 0,
  maxPrice: 10000000,
  has_pool: false,
  has_garden: false,
  own_property: false,
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
};
export default function BuyPage() {
  const router = useRouter()
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUsingMockData, setIsUsingMockData] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProperties, setTotalProperties] = useState(0)
  const [pageSize] = useState(20)
  const [areas, setAreas] = useState<Area[]>([])
  const [availableLocations, setAvailableLocations] = useState<string[]>([])
  // const [filters, setFilters] = useState({
  //   priceRange: "",
  //   bedrooms: "",
  //   bathrooms: "",
  //   location: "",
  //   area: "",
  //   propertyType: "",
  //   minPrice: 0,
  //   maxPrice: 10000000,
  //   has_pool: false,
  //   has_garden: false,
  //   own_property: false,
  //   garage: false,
  //   seaView: false,
  //   airConditioning: false,
  //   terrace: false,
  //   furnished: false,
  //   parking: false,
  //   elevator: false,
  //   fireplace: false,
  //   balcony: false,
  //   storage: false,
  // })
  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem("filters");
    return saved ? JSON.parse(saved) : defaultFilters;
  });
  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

   const clearFilters = () => {
    setFilters(defaultFilters);
    localStorage.removeItem("filters");
  };

  const [isClient, setIsClient] = useState(false)
  const propertiesSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log("fetching ")
  }, [])
  const loadProperties = async (page: number = currentPage) => {
    setLoading(true)
    setError(null)
    console.log("fetching in func ")
    try {
      const filterParams: FilterParams = {
        page: page,
        pageSize: pageSize,
      }

      // Apply search term
      if (searchTerm.trim()) {
        filterParams.search = searchTerm.trim()
      }

      // Apply price filters
      if (filters.minPrice > 0) filterParams.minPrice = filters.minPrice
      if (filters.maxPrice < 10000000) filterParams.maxPrice = filters.maxPrice

      // Apply bedroom/bathroom filters
      if (filters.bedrooms && filters.bedrooms !== "Any") {
        const bedroomCount = Number.parseInt(filters.bedrooms.replace(/\D/g, ""))
        if (!isNaN(bedroomCount)) filterParams.beds = bedroomCount
      }

      if (filters.bathrooms && filters.bathrooms !== "Any") {
        const bathroomCount = Number.parseInt(filters.bathrooms.replace(/\D/g, ""))
        if (!isNaN(bathroomCount)) filterParams.baths = bathroomCount
      }

      // Apply area filter
      if (filters.area) filterParams.area = filters.area
      if (filters.location) filterParams.location = filters.location
      // Apply property type filter
      if (filters.propertyType) filterParams.type = filters.propertyType

      const amenities = []
      if (filters.has_pool) amenities.push("has_pool")
      if (filters.has_garden) amenities.push("has_garden")
      if (filters.own_property) amenities.push("own_property")
      if (filters.seaView) amenities.push("seaView")

      if (amenities.length > 0) {
        filterParams.amenities = amenities
      }

      const response = await fetchProperties(filterParams)
      console.log("[v0] API response:", response)

      setProperties(response.houses || [])

      const isMock = response.houses?.some((p) => p.images?.[0]?.src?.includes("placeholder.svg"))
      setIsUsingMockData(!!isMock)

      const totalCount = response.totalCount
      console.log("totalCount", totalCount)
      const calculatedPages = Math.ceil(totalCount / pageSize)

      setTotalProperties(totalCount)
      setTotalPages(Math.max(1, calculatedPages))
      setCurrentPage(page)
    } catch (err) {
      console.log("[v0] API error:", err)
      setError(err instanceof Error ? err.message : "Failed to load properties")
      setProperties([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadAreas = async () => {
      try {
        const areasData = await fetchAreas()
        setAreas(areasData.areas || [])
      } catch (err) {
        console.error("Failed to load areas:", err)
      }
    }
    loadAreas()
  }, [])

  useEffect(() => {
    if (filters.area) {
      const selectedArea = areas.find((area) => area.name === filters.area)
      setAvailableLocations(selectedArea?.pueblos || [])
      // Clear selected locations when area changes
      // setFilters((prev) => ({ ...prev, location: "" }))
    } else {
      setAvailableLocations([])
    }
  }, [filters.area, areas])

  // Load properties on component mount and when filters change
  useEffect(() => {
    setCurrentPage(1)
    loadProperties(1)
  }, [
    searchTerm,
    filters.minPrice,
    filters.maxPrice,
    filters.bedrooms,
    filters.bathrooms,
    filters.area,
    filters.location,
    filters.propertyType,
    filters.has_pool,
    filters.has_garden,
    filters.own_property,
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
  }, [])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      loadProperties(page)
      // Scroll to top of properties section
      scrollToProperties()
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

  const scrollToProperties = () => {
    propertiesSectionRef.current?.scrollIntoView({ behavior: "smooth" })
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

  const [dropdownStates, setDropdownStates] = useState({
    priceRange: false,
    location: false,
    area: false,
    propertyType: false,
    bedrooms: false,
    bathrooms: false,
  })

  const [customInputs, setCustomInputs] = useState({
    location: "",
    area: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
  })

  const [searchTerms, setSearchTerms] = useState({
    location: "",
    area: "",
    propertyType: "",
  })

  const priceRanges = [
    { value: "0-500k", label: "€0 - €500,000" },
    { value: "500k-1m", label: "€500,000 - €1,000,000" },
    { value: "1m-2m", label: "€1,000,000 - €2,000,000" },
    { value: "2m+", label: "€2,000,000+" },
  ]

  // const locations = [
  //   "Costa del Sol",
  //   "Costa Blanca",
  //   "Valencia",
  //   "Andalusia",
  //   "Costa Brava",
  //   "Costa Tropical",
  //   "Costa de la Luz",
  //   "Costa Calida",
  //   "Balearic Islands",
  // ]  // const locations = [
  //   "Costa del Sol",
  //   "Costa Blanca",
  //   "Valencia",
  //   "Andalusia",
  //   "Costa Brava",
  //   "Costa Tropical",
  //   "Costa de la Luz",
  //   "Costa Calida",
  //   "Balearic Islands",
  // ]

  const bedroomOptions = ["Any", "1+ Bedrooms", "2+ Bedrooms", "3+ Bedrooms", "4+ Bedrooms", "5+ Bedrooms"]
  const bathroomOptions = ["Any", "1+ Bathrooms", "2+ Bathrooms", "3+ Bathrooms", "4+ Bathrooms"]

  // const filteredLocations = locations.filter((location) =>
  //   location.toLowerCase().includes(searchTerms.location.toLowerCase()),
  // )

  const availablePropertyTypes = ["Apartment", "House", "Commercial", "Plot"]

  const filteredPropertyTypes = availablePropertyTypes.filter((type) =>
    type.toLowerCase().includes(searchTerms.propertyType.toLowerCase()),
  )

  const filteredProperties = properties

  const toggleDropdown = (dropdown: string) => {
    setDropdownStates((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown as keyof typeof prev],
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

  // const clearFilters = () => {
  //   setFilters({
  //     priceRange: "",
  //     bedrooms: "",
  //     bathrooms: "",
  //     location: "",
  //     area: "",
  //     propertyType: "",
  //     minPrice: 0,
  //     maxPrice: 10000000,
  //     has_pool: false,
  //     has_garden: false,
  //     own_property: false,
  //     garage: false,
  //     seaView: false,
  //     airConditioning: false,
  //     terrace: false,
  //     furnished: false,
  //     parking: false,
  //     elevator: false,
  //     fireplace: false,
  //     balcony: false,
  //     storage: false,
  //   })
  //   setCustomInputs({
  //     location: "",
  //     area: "",
  //     propertyType: "",
  //     bedrooms: "",
  //     bathrooms: "",
  //   })
  // }

  const clearIndividualFilter = (filterType: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: "",
    }))
  }

  const selectAreaOption = (area: string) => {
    setFilters((prev) => ({
      ...prev,
      area: prev.area === area ? "" : area,
    }))
  }

  const hasActiveFilters = () => {
    return (
      filters.location !== "" ||
      filters.area !== "" ||
      filters.propertyType ||
      filters.bedrooms ||
      filters.bathrooms ||
      filters.has_pool ||
      filters.has_garden ||
      filters.own_property ||
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
      filters.maxPrice !== 10000000
    )
  }

  const formatPrice = (price: number) => {
    return `€${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  }

  const selectLocationOption = (location: string) => {
    setFilters((prev) => ({
      ...prev,
      location: prev.location.includes(location)
        ? prev.location.filter((l) => l !== location)
        : [...prev.location, location],
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      priceRange: "",
      bedrooms: "",
      bathrooms: "",
      location: "",
      area: "",
      propertyType: "",
      minPrice: 0,
      maxPrice: 10000000,
      has_pool: false,
      has_garden: false,
      own_property: false,
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
    setCustomInputs({
      location: "",
      area: "",
      propertyType: "",
      bedrooms: "",
      bathrooms: "",
    })
  }

  const handlePropertyClick = (property: Property) => {
    if (isClient) {
      router.push(`/forsale/${property._id}`)
    }
  }

  return (
    <div className="min-h-screen">
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
                  <span className="text-white">FIND YOUR </span>
                  <span className="text-black">DREAM HOME</span>
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
                Explore both existing homes and new build properties across Spain's most desirable locations. Whether
                you're looking for a charming villa or a modern new apartment, our team offers local expertise and full
                support from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Filters Section with light green background */}
      <section className="bg-green-50 py-6 border-b border-green-100">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between max-w-6xl mx-auto">
            {/* Search - increased width */}
            <div className="w-full lg:w-2/5">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search location, type, reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                />
              </div>
            </div>

            {/* Filter Categories */}
            {/* <div className="flex flex-wrap gap-2 lg:gap-3">
              {["all", "existing", "new"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedFilter === filter
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-green-50 border border-gray-300"
                    }`}
                >
                  {filter === "all" ? "All Properties" : filter === "existing" ? "Existing Homes" : "New Build"}
                </button>
              ))}
            </div> */}

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
                <h2 className="text-2xl font-bold text-gray-900">Filter Properties</h2>
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
                            className={`w-full px-3 py-2 text-left hover:bg-green-50 transition-colors text-sm ${filters.area === "" ? "bg-green-500 text-white" : "text-gray-700"
                              }`}
                          >
                            All Areas
                          </button>
                          {areas.map((area) => (
                            <button
                              key={area.name}
                              onClick={() => selectOption("area", area.name)}
                              className={`w-full px-3 py-2 text-left hover:bg-green-50 transition-colors text-sm ${filters.area === area.name ? "bg-green-500 text-white" : "text-gray-700"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown("location")}
                        className="w-full bg-white border border-gray-300 py-2 px-3 rounded-md flex items-center justify-between hover:border-green-500 transition-colors text-sm"
                      >
                        <span className="text-gray-500">
                          {filters.location || "Select Location"}
                        </span>
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

                          <button
                            onClick={() => selectOption("location", "")}
                            className={`w-full px-3 py-2 text-left hover:bg-green-50 transition-colors text-sm ${filters.location === "" ? "bg-green-500 text-white" : "text-gray-700"
                              }`}
                          >
                            All Locations
                          </button>

                          {availableLocations.map((location) => (
                            <button
                              key={location}
                              onClick={() => selectOption("location", location)}
                              className={`w-full px-3 py-2 text-left hover:bg-green-50 transition-colors text-sm ${filters.location === location ? "bg-green-500 text-white" : "text-gray-700"
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
                        {["Any Type", "Apartment", "Commercial", "House", "Plot", "Townhouse"].map((option) => (
                          <button
                            key={option}
                            onClick={() => selectOption("propertyType", option === "Any Type" ? "" : option)}
                            className={`w-full px-3 py-2 text-left hover:bg-green-50 transition-colors text-sm ${(filters.propertyType === "" && option === "Any Type") || filters.propertyType === option
                              ? "bg-green-500 text-white"
                              : "text-gray-700"
                              }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Requirements</h3>

                  {/* Bedrooms and Bathrooms */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
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
                                onClick={() => selectOption("bedrooms", option === "Any" ? "" : option)}
                                className={`w-full px-3 py-2 text-left hover:bg-green-50 transition-colors text-sm ${(filters.bedrooms === "" && option === "Any") || filters.bedrooms === option
                                  ? "bg-green-500 text-white"
                                  : "text-gray-700"
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
                                onClick={() => selectOption("bathrooms", option === "Any" ? "" : option)}
                                className={`w-full px-3 py-2 text-left hover:bg-green-50 transition-colors text-sm ${(filters.bathrooms === "" && option === "Any") || filters.bathrooms === option
                                  ? "bg-green-500 text-white"
                                  : "text-gray-700"
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

                  {/* Enhanced Amenities Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: "has_pool", label: "Pool" },
                      { key: "has_garden", label: "Garden" },
                      { key: "own_property", label: "Own Property" },
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

      {/* Properties Section */}
      <section className="container" id="properties-section" ref={propertiesSectionRef}>
        <div className=" mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {loading ? "Loading..." : `${totalProperties} Properties`}
              </h2>
              <p className="text-gray-600">
                {loading
                  ? "Please wait..."
                  : `Showing ${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, totalProperties)} of ${totalProperties}`}
              </p>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">Error loading properties: {error}</p>
              <Button onClick={() => loadProperties()} className="bg-green-600 hover:bg-green-700">
                Try Again
              </Button>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <div key={property._id}>
                  <Card className="group overflow-hidden hover:shadow-lg border-0 shadow-md bg-white">
                    <div className="relative">
                      <ImageCarousel images={property.images || []} className="w-full h-64" />
                      <Badge className="absolute top-4 left-4 bg-green-600 text-white">{property.type}</Badge>
                      {/* <div className="absolute top-4 right-4 flex gap-2">
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-green-50">
                          <Heart className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-green-50">
                          <Share2 className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div> */}
                    </div>

                    <CardContent className="p-6 pt-[165px]">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {property.subtype} in {property.town}
                        </h3>
                      </div>

                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-1 text-gray-600" />
                        <span className="text-sm">
                          {property.area}, {property.town}
                        </span>
                      </div>

                      <div className="text-2xl font-bold text-green-600 mb-4">{formatPrice(property.price)}</div>

                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1 text-gray-600" />
                          <span>{property.beds || 0}</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1 text-gray-600" />
                          <span>{property.baths || 0}</span>
                        </div>
                        <div className="flex items-center">
                          <Square className="h-4 w-4 mr-1 text-gray-600" />
                          <span>{property.surface_area?.built || 0}m²</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {property.has_pool && (
                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                            Pool
                          </Badge>
                        )}
                        {property.has_garden && (
                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                            Garden
                          </Badge>
                        )}
                        {property.own_property && (
                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                            Own Property
                          </Badge>
                        )}
                        {property.characteristics?.category?.slice(0, 2).map((cat, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                            {cat.values[0]}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        onClick={() => handlePropertyClick(property)}
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

          {!loading && !error && filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No properties found matching your criteria.</p>
              <Button onClick={clearAllFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          )}

          {!loading && !error && totalPages > 1 && (
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
                      className={`min-w-[40px] ${currentPage === pageNum ? "bg-green-600 hover:bg-green-700 text-white" : "hover:bg-green-50"
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
