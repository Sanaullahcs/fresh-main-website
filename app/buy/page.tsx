"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
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
  X,
  ChevronDown,
  Check,
  Filter,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
// import { fetchProperties } from "@/lib/utils"
// import the pages you want to render (load client-only to avoid SSR localStorage access)
const ForsalePage = dynamic(() => import("@/app/forsale/page"), { ssr: false })
const NewDevelopmentsPage = dynamic(() => import("@/app/new-developments/page"), { ssr: false })
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const properties = [
  {
    id: 1,
    title: "Luxury Apartment in Estepona",
    location: "Estepona, Málaga",
    price: 2475000,
    bedrooms: "2 - 3",
    bathrooms: "2 - 3",
    size: "108 - 232 m²",
    type: "New Development",
    category: "new",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center",
    features: ["Sea View", "Pool", "Parking", "Terrace"],
  },
  {
    id: 2,
    title: "Modern House in Mijas",
    location: "Mijas, Málaga",
    price: 1305000,
    bedrooms: "4",
    bathrooms: "4",
    size: "149 - 195 m²",
    type: "New Development",
    category: "new",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop&crop=center",
    features: ["Mountain View", "Pool", "Garden", "Garage"],
  },
  {
    id: 3,
    title: "Villa in Algorfa",
    location: "Algorfa, Alicante",
    price: 1242500,
    bedrooms: "4 - 5",
    bathrooms: "4 - 5",
    size: "119 - 381 m²",
    type: "New Development",
    category: "new",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&crop=center",
    features: ["Golf View", "Pool", "Solarium", "Basement"],
  },
  {
    id: 4,
    title: "Traditional Villa in Granada",
    location: "Granada, Andalusia",
    price: 450000,
    bedrooms: "3",
    bathrooms: "2",
    size: "180 m²",
    type: "Existing Home",
    category: "existing",
    image: "/traditional-spanish-villa-granada.png",
    features: ["Historic", "Patio", "City View", "Renovated"],
  },
  {
    id: 5,
    title: "Coastal Apartment in Valencia",
    location: "Valencia, Valencia",
    price: 320000,
    bedrooms: "2",
    bathrooms: "1",
    size: "85 m²",
    type: "Existing Home",
    category: "existing",
    image: "/coastal-apartment-valencia.png",
    features: ["Beach Access", "Balcony", "Modern", "Furnished"],
  },
  {
    id: 6,
    title: "Country House in Seville",
    location: "Seville, Andalusia",
    price: 680000,
    bedrooms: "4",
    bathrooms: "3",
    size: "250 m²",
    type: "Existing Home",
    category: "existing",
    image: "/country-house-seville.png",
    features: ["Large Plot", "Pool", "Stables", "Olive Grove"],
  },
]

export default function BuyPage() {
  const [selectedFilter, setSelectedFilter] = useState("existing")
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilterModal, setShowFilterModal] = useState(false)



  const [filters, setFilters] = useState({
    priceRange: "",
    bedrooms: "",
    bathrooms: "",
    location: [] as string[], // Multiple selections allowed
    area: "", // Changed from array to string for single selection
    propertyType: "",
    minPrice: 500000,
    maxPrice: 5000000,
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
  useEffect(() => {
    const savedFilter = localStorage.getItem("tabName");
    if (savedFilter) {
      setSelectedFilter(savedFilter);
    }
  }, []);
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    localStorage.setItem("tabName", filter);
  };
  const priceRanges = [
    { value: "0-500k", label: "€0 - €500,000" },
    { value: "500k-1m", label: "€500,000 - €1,000,000" },
    { value: "1m-2m", label: "€1,000,000 - €2,000,000" },
    { value: "2m+", label: "€2,000,000+" },
  ]

  const locations = [
    "Costa del Sol",
    "Costa Blanca",
    "Valencia",
    "Andalusia",
    "Costa Brava",
    "Costa Tropical",
    "Costa de la Luz",
    "Costa Calida",
    "Balearic Islands",
  ]

  const areas = [
    "Costa del Sol",
    "Costa Blanca",
    "Costa Brava",
    "Costa Tropical",
    "Costa de la Luz",
    "Costa Calida",
    "Costa Verde",
    "Costa Dorada",
    "Balearic Islands",
    "Canary Islands",
    "Madrid",
    "Barcelona",
    "Valencia",
    "Seville",
    "Bilbao",
    "Malaga",
    "Alicante",
    "Marbella",
    "Estepona",
    "Fuengirola",
    "Torremolinos",
    "Benalmadena",
    "Mijas",
    "Nerja",
    "Frigiliana",
    "Competa",
    "Torrox",
    "Velez-Malaga",
    "Rincon de la Victoria",
  ]

  const bedroomOptions = ["Any", "1+ Bedrooms", "2+ Bedrooms", "3+ Bedrooms", "4+ Bedrooms", "5+ Bedrooms"]
  const bathroomOptions = ["Any", "1+ Bathrooms", "2+ Bathrooms", "3+ Bathrooms", "4+ Bathrooms"]

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchTerms.location.toLowerCase()),
  )

  // useEffect(() => {
  //   loading();
  //   console.log("fetching")

  // }, [])
  // const loading = async () => {
  //   try {
  //     const response = await fetchProperties();
  //     return response;
  //   } catch (error) {
  //     console.error("Error fetching properties:", error);
  //   }
  // };

  const filteredAreas = areas.filter((area) => area.toLowerCase().includes(searchTerms.area.toLowerCase()))

  const availablePropertyTypes = [
    "Apartment",
    "Villa",
    "Townhouse",
    "Penthouse",
    "Studio",
    "Duplex",
    "Country House",
    "Commercial Property",
    "Plot",
    "Garage",
  ]

  const filteredPropertyTypes = availablePropertyTypes.filter((type) =>
    type.toLowerCase().includes(searchTerms.propertyType.toLowerCase()),
  )

  const filteredProperties = properties.filter((property) => {
    const matchesFilter = selectedFilter === "all" || property.category === selectedFilter
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPriceRange = property.price >= filters.minPrice && property.price <= filters.maxPrice

    const matchesBedrooms = filters.bedrooms === "" || property.bedrooms.includes(filters.bedrooms)
    const matchesBathrooms = filters.bathrooms === "" || property.bathrooms.includes(filters.bathrooms)
    const matchesLocation =
      filters.location.length === 0 || filters.location.some((loc) => property.location.includes(loc))
    const matchesArea = filters.area === "" || property.location.includes(filters.area)
    const matchesPropertyType = filters.propertyType === "" || property.type.includes(filters.propertyType)
    const matchesAmenities =
      (!filters.pool || property.features.includes("Pool")) &&
      (!filters.garden || property.features.includes("Garden")) &&
      (!filters.garage || property.features.includes("Garage")) &&
      (!filters.seaView || property.features.includes("Sea View")) &&
      (!filters.airConditioning || property.features.includes("Air Conditioning")) &&
      (!filters.terrace || property.features.includes("Terrace")) &&
      (!filters.furnished || property.features.includes("Furnished")) &&
      (!filters.parking || property.features.includes("Parking")) &&
      (!filters.elevator || property.features.includes("Elevator")) &&
      (!filters.fireplace || property.features.includes("Fireplace")) &&
      (!filters.balcony || property.features.includes("Balcony")) &&
      (!filters.storage || property.features.includes("Storage"))

    return (
      matchesFilter &&
      matchesSearch &&
      matchesPriceRange &&
      matchesBedrooms &&
      matchesBathrooms &&
      matchesLocation &&
      matchesArea &&
      matchesPropertyType &&
      matchesAmenities
    )
  })

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

  const clearFilters = () => {
    setFilters({
      priceRange: "",
      bedrooms: "",
      bathrooms: "",
      location: [],
      area: "",
      propertyType: "",
      minPrice: 500000,
      maxPrice: 5000000,
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
    setCustomInputs({
      location: "",
      area: "",
      propertyType: "",
      bedrooms: "",
      bathrooms: "",
    })
  }

  const clearIndividualFilter = (filterType: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: "",
    }))
  }

  const selectAreaOption = (area: string) => {
    setFilters((prev) => ({
      ...prev,
      area: prev.area === area ? "" : area, // Single selection logic
    }))
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
      filters.minPrice !== 500000 ||
      filters.maxPrice !== 5000000
    )
  }

  const formatPrice = (price: number) => {
    return `${(price / 1000).toFixed(0)}.000 €`
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
      location: [],
      area: "", // Reset to empty string
      propertyType: "",
      minPrice: 500000,
      maxPrice: 5000000,
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
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="flex flex-col" id="home">
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
      </section>

      {/* Filters Section with light green background */}
      <section className="mb-[30px]">
        <div className="container mx-auto px-4 mb-[30px] sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between max-w-6xl mx-auto">
            {/* Search - increased width */}
            <div className="w-full lg:w-2/5">
              {/* <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search location, type, reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                />
              </div> */}
            </div>

            {/* Filter Categories */}
            {/* <div className="flex flex-wrap gap-2 lg:gap-3">
              {["existing", "new"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedFilter === filter
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-green-50 border border-gray-300"
                    }`}
                >
                  {filter === "all" ? "All" : filter === "existing" ? "Existing Homes" : "New Homes"}
                </button>
              ))}
            </div> */}
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {["existing", "new"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedFilter === filter
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-green-50 border border-gray-300"
                    }`}
                >
                  {filter === "existing" ? "Existing Homes" : "New Homes"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between max-w-6xl mx-auto">
            {/* <div className="w-full flex items-center justify-center mb-4 sm:hidden">
              <div className="flex items-center gap-4">
                <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-green-300 w-16 sm:w-20"></div>
                <div className="flex items-center justify-center">
                  <Home className="w-5 h-5 text-green-500" />
                </div>
                <div className="h-px bg-gradient-to-l from-transparent via-green-400 to-green-300 w-16 sm:w-20"></div>
              </div>
            </div> */}

            {/* Adjustable Price Range Bar */}
            {/* <div className="flex-1 max-w-md">
              <div className="bg-white p-4 rounded-lg border border-green-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Price Range</span>
                  <span className="text-xs text-green-600">
                    €{(filters.minPrice / 1000).toFixed(0)}K - €{(filters.maxPrice / 1000000).toFixed(1)}M
                  </span>
                </div>

                <div className="relative px-2">
       
                  <div className="h-2 bg-gray-200 rounded-full relative">
         
                    <div
                      className="absolute h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-sm"
                      style={{
                        left: `${((filters.minPrice - 500000) / (5000000 - 500000)) * 100}%`,
                        width: `${((filters.maxPrice - filters.minPrice) / (5000000 - 500000)) * 100}%`,
                      }}
                    />
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="5000000"
                    step="25000"
                    value={filters.minPrice}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      if (value < filters.maxPrice) {
                        setFilters((prev) => ({ ...prev, minPrice: value }))
                      }
                    }}
                    className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-600 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer"
                  />

                  <input
                    type="range"
                    min="500000"
                    max="5000000"
                    step="25000"
                    value={filters.maxPrice}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      if (value > filters.minPrice) {
                        setFilters((prev) => ({ ...prev, maxPrice: value }))
                      }
                    }}
                    className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-600 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer"
                  />
                </div>
              </div>
            </div> */}
            {/* <button
              onClick={() => setShowFilterModal(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              More Filters
            </button> */}

            {/* Clear All Filters */}
            {/* {hasActiveFilters() && (
              <button
                onClick={clearAllFilters}
                className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors bg-white px-4 py-3 rounded-lg border border-green-200 hover:bg-green-50 shadow-sm flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear All
              </button>
            )} */}
          </div>

          {/* <div className="hidden sm:flex items-center justify-center max-w-6xl mx-auto mt-6 mb-2">
            <div className="flex items-center gap-4">
              <div className="h-px bg-gradient-to-r from-transparent via-green-300 to-green-400 w-20"></div>
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <div className="h-px bg-gradient-to-l from-transparent via-green-300 to-green-400 w-20"></div>
            </div>
          </div> */}

          {hasActiveFilters() && (
            <div className="max-w-6xl mx-auto mt-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                {filters.location.map((location) => (
                  <span
                    key={location}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                  >
                    {location}
                    <button
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, location: prev.location.filter((l) => l !== location) }))
                      }
                      className="hover:text-green-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {filters.area && (
                  <span
                    key={filters.area}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                  >
                    {filters.area}
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, area: "" }))}
                      className="hover:text-green-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filters.propertyType && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {filters.propertyType}
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, propertyType: "" }))}
                      className="hover:text-green-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {Object.entries(filters)
                  .filter(
                    ([key, value]) =>
                      typeof value === "boolean" && value && !["location", "area", "propertyType"].includes(key),
                  )
                  .map(([key, value]) => (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                      <button
                        onClick={() => setFilters((prev) => ({ ...prev, [key]: false }))}
                        className="hover:text-green-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
              </div>
            </div>
          )}
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
                {/* Areas */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Area</h3>
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown("area")}
                      className="w-full bg-white border border-gray-300 py-3 px-4 rounded-md flex items-center justify-between hover:border-green-500 transition-colors"
                    >
                      <span className="text-gray-500">{filters.area === "" ? "Select area" : filters.area}</span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    {dropdownStates.area && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                        <div className="p-3 border-b border-gray-100">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                              type="text"
                              placeholder="Search areas..."
                              value={searchTerms.area}
                              onChange={(e) => setSearchTerms((prev) => ({ ...prev, area: e.target.value }))}
                              className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                            <button
                              onClick={() => toggleDropdown("area")}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        {filteredAreas.map((area) => (
                          <button
                            key={area}
                            onClick={() => selectAreaOption(area)}
                            className={`w-full px-4 py-2 text-left transition-colors flex items-center justify-between ${filters.area === area ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-50"
                              }`}
                          >
                            <span>{area}</span>
                            {filters.area === area && <Check className="h-4 w-4 text-green-600" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown("location")}
                      className="w-full bg-white border border-gray-300 py-3 px-4 rounded-md flex items-center justify-between hover:border-green-500 transition-colors"
                    >
                      <span className="text-gray-500">
                        {filters.location.length === 0
                          ? "Select locations"
                          : filters.location.length === 1
                            ? filters.location[0]
                            : `${filters.location.length} locations selected`}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    {dropdownStates.location && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                        <div className="p-3 border-b border-gray-100">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                              type="text"
                              placeholder="Search locations..."
                              value={searchTerms.location}
                              onChange={(e) => setSearchTerms((prev) => ({ ...prev, location: e.target.value }))}
                              className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                            <button
                              onClick={() => toggleDropdown("location")}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        {filteredLocations.map((location) => (
                          <button
                            key={location}
                            onClick={() => selectLocationOption(location)}
                            className={`w-full px-4 py-2 text-left hover:bg-green-50 transition-colors flex items-center justify-between ${filters.location.includes(location) ? "bg-green-50 text-green-700" : "text-gray-700"
                              }`}
                          >
                            <span>{location}</span>
                            {filters.location.includes(location) && <Check className="h-4 w-4 text-green-600" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Type</h3>
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown("propertyType")}
                      className="w-full bg-white border border-gray-300 py-3 px-4 rounded-md flex items-center justify-between hover:border-green-500 transition-colors"
                    >
                      <span className="text-gray-500">{filters.propertyType || "Select type"}</span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    {dropdownStates.propertyType && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                        <div className="p-3 border-b border-gray-100">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                              type="text"
                              placeholder="Search property types..."
                              value={searchTerms.propertyType}
                              onChange={(e) => setSearchTerms((prev) => ({ ...prev, propertyType: e.target.value }))}
                              className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                            <button
                              onClick={() => toggleDropdown("propertyType")}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        {filteredPropertyTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => selectOption("propertyType", type)}
                            className={`w-full px-4 py-2 text-left hover:bg-green-50 transition-colors ${filters.propertyType === type ? "bg-green-500 text-white" : "text-gray-700"
                              }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Requirements Section */}
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
                      { key: "pool", label: "Pool" },
                      { key: "garden", label: "Garden" },
                      { key: "garage", label: "Garage" },
                      { key: "seaView", label: "Sea View" },
                      { key: "airConditioning", label: "Air Conditioning" },
                      { key: "terrace", label: "Terrace" },
                      { key: "furnished", label: "Furnished" },
                      { key: "parking", label: "Parking" },
                      { key: "elevator", label: "Elevator" },
                      { key: "fireplace", label: "Fireplace" },
                      { key: "balcony", label: "Balcony" },
                      { key: "storage", label: "Storage" },
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

                {/* Price Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Price</h3>
                  <div className="space-y-4">
                    <div className="relative px-2">
                      {/* Track */}
                      <div className="h-2 bg-gray-200 rounded-full relative">
                        {/* Active range */}
                        <div
                          className="absolute h-2 bg-green-500 rounded-full"
                          style={{
                            left: `${((filters.minPrice - 500000) / (5000000 - 500000)) * 100}%`,
                            width: `${((filters.maxPrice - filters.minPrice) / (5000000 - 500000)) * 100}%`,
                          }}
                        />
                      </div>

                      {/* Min Price Slider */}
                      <input
                        type="range"
                        min="500000"
                        max="5000000"
                        step="25000"
                        value={filters.minPrice}
                        onChange={(e) => {
                          const value = Number(e.target.value)
                          if (value < filters.maxPrice) {
                            setFilters((prev) => ({ ...prev, minPrice: value }))
                          }
                        }}
                        className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb-green pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                      />

                      {/* Max Price Slider */}
                      <input
                        type="range"
                        min="500000"
                        max="5000000"
                        step="25000"
                        value={filters.maxPrice}
                        onChange={(e) => {
                          const value = Number(e.target.value)
                          if (value > filters.minPrice) {
                            setFilters((prev) => ({ ...prev, maxPrice: value }))
                          }
                        }}
                        className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb-green pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                      />
                    </div>

                    {/* Price inputs */}
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
      <section className="">
        <div className="mx-auto">
          {/* <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{filteredProperties.length} Properties</h2>
              <p className="text-gray-600">
                Showing 1-{Math.min(filteredProperties.length, 12)} of {filteredProperties.length}
              </p>
            </div>
          </div> */}
          {/* Show content based on filter */}
          <div>
            {selectedFilter === "existing" && <ForsalePage />}
            {selectedFilter === "new" && <NewDevelopmentsPage />}

          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div key={property.id}>
                <Card className="group overflow-hidden hover:shadow-lg border-0 shadow-md bg-white">
                  <div className="relative">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-64 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-green-600 text-white">{property.type}</Badge>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-green-50">
                        <Heart className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-green-50">
                        <Share2 className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
                    </div>

                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1 text-gray-600" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    <div className="text-2xl font-bold text-green-600 mb-4">{formatPrice(property.price)}</div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1 text-gray-600" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1 text-gray-600" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1 text-gray-600" />
                        <span>{property.size}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.features.slice(0, 3).map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors cursor-pointer"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      className="w-full bg-green-600 hover:bg-green-50 hover:text-green-600 hover:border-green-500 text-white border border-transparent"
                      onClick={() => (window.location.href = `/buy/${property.id}`)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div> */}

          {/* <div className="flex justify-center items-center mt-12 gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="border-gray-300 bg-white hover:bg-green-50 hover:border-green-500 text-gray-600"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "outline"}
                  size="sm"
                  className={`w-10 h-10 ${page === 1
                    ? "bg-green-600 hover:bg-green-700 text-white border-green-600"
                    : "border-gray-300 bg-white hover:bg-green-50 hover:border-green-500 hover:text-green-600 text-gray-600"
                    }`}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 bg-white hover:bg-green-50 hover:border-green-500 text-gray-600"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div> */}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .slider-thumb-green::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #16a34a;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
        }
        .slider-thumb-green::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .slider-thumb-green::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #16a34a;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
        }
        .slider-thumb-green::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}
