// API functions for property data
export interface Property {
  _id: string
  externalId: string
  status: string
  ref: string
  original_price: number
  price: number
  type: string
  subtype: string
  country: string
  province: string
  town: string
  area: string
  beds: number
  baths: number
  surface_area: {
    built: number
    terrace: number
    plot: number
  }
  own_property: boolean
  has_pool: boolean
  has_garden: boolean
  characteristics: {
    category: Array<{
      name: string
      values: string[]
    }>
  }
  description: string
  images: Array<{
    src: string
    alt: string
  }>
}

export interface ApiResponse {
  houses: Property[]
  numPages?: number
}

export interface FilterParams {
  page?: number
  pageSize?: number
  minPrice?: number
  maxPrice?: number
  beds?: number
  baths?: number
  has_pool?: boolean
  has_garden?: boolean
  search?: string
  type?: string
  area?: string
  location?: string
  town?: string
  amenities?: string[]
}

export interface NewDevelopmentFilterParams {
  page?: number
  pageSize?: number
  minPrice?: number
  maxPrice?: number
  beds?: number
  baths?: number
  search?: string
  type?: string
  area?: string
  location?: string
  town?: string
  amenities?: string[]
}

// New development interface
export interface NewDevelopment {
  _id: string
  id: string
  date: string
  key_date: string
  ref: string
  price: string
  currency: string
  price_freq: string
  part_ownership: string
  leasehold: string
  new_build: string
  type: string
  town: string
  province: string
  country: string
  location: {
    latitude: string
    longitude: string
  }
  location_detail: string
  beds: string
  baths: string
  pool: string
  surface_area: {
    built: string
    plot: string
  }
  energy_rating: {
    consumption: string
    emissions: string
  }
  url: Record<string, string>
  desc: Record<string, string>
  features: {
    feature: string[]
  }
  images: {
    image: Array<{
      $: { id: string }
      url: string
    }>
  }
  commission: {
    type: string
    quantity: string
  }
  restrictions: {
    website: string
    national_portals: string
    international_portals: string
  }
  dateCreated: string
  lastUpdated: string
}

// New development API response interface
export interface NewDevelopmentApiResponse {
  properties: NewDevelopment[]
  numPages: number
  count: number
}

// New development filter parameters interface
export interface NewDevelopmentFilterParams {
  page?: number
  pageSize?: number
}

const API_BASE_URL = "http://localhost:3001"
// const API_BASE_URL = "https://api.fresh-propertymanagement.com"

const MOCK_PROPERTIES: Property[] = [
  {
    _id: "6887cfb45299ba7500e995c9",
    externalId: "R4943791",
    status: "Available",
    ref: "R4943791",
    original_price: 180000000,
    price: 200000000,
    type: "Commercial",
    subtype: "Hotel",
    country: "Spain",
    province: "Málaga",
    town: "Doña Julia",
    area: "Costa del Sol",
    beds: 186,
    baths: 186,
    surface_area: {
      built: 59304,
      terrace: 0,
      plot: 43960,
    },
    own_property: false,
    has_pool: true,
    has_garden: false,
    characteristics: {
      category: [
        {
          name: "Setting",
          values: ["Frontline Golf", "Suburban", "Close To Golf", "Close To Shops", "Close To Sea"],
        },
        {
          name: "Pool",
          values: ["Private", "Indoor", "Heated", "Children`s Pool"],
        },
        {
          name: "Views",
          values: ["Sea", "Mountain", "Golf", "Country", "Panoramic", "Garden"],
        },
      ],
    },
    description:
      "Resort-style hotel project in the Doña Julia urbanization in Casares Costa surrounded by a golf course and panoramic sea views with Hilton Conrad as operator and manager from the moment it opens.",
    images: [
      {
        src: "/luxury-hotel-spain-golf-course.png",
        alt: "Hotel exterior view",
      },
      {
        src: "/hotel-pool-area-spain.png",
        alt: "Pool area",
      },
      {
        src: "/hotel-room-luxury-spain.png",
        alt: "Hotel room",
      },
    ],
  },
  {
    _id: "6887cfb45299ba7500e995ca",
    externalId: "R4943792",
    status: "Available",
    ref: "R4943792",
    original_price: 450000,
    price: 450000,
    type: "Apartment",
    subtype: "Penthouse",
    country: "Spain",
    province: "Málaga",
    town: "Marbella",
    area: "Costa del Sol",
    beds: 3,
    baths: 2,
    surface_area: {
      built: 120,
      terrace: 40,
      plot: 0,
    },
    own_property: false,
    has_pool: true,
    has_garden: false,
    characteristics: {
      category: [
        {
          name: "Setting",
          values: ["Beachfront", "Close To Sea", "Close To Town", "Marina"],
        },
        {
          name: "Pool",
          values: ["Communal"],
        },
        {
          name: "Views",
          values: ["Sea", "Beach", "Panoramic"],
        },
      ],
    },
    description:
      "Stunning penthouse apartment with panoramic sea views in the heart of Marbella. This luxury property features a spacious terrace perfect for entertaining and enjoying the Mediterranean lifestyle.",
    images: [
      {
        src: "/penthouse-apartment-marbella-sea-view.png",
        alt: "Penthouse exterior",
      },
      {
        src: "/luxury-apartment-interior-modern.png",
        alt: "Living room",
      },
      {
        src: "/apartment-terrace-sea-view-marbella.png",
        alt: "Terrace with sea view",
      },
    ],
  },
  {
    _id: "6887cfb45299ba7500e995cb",
    externalId: "R4943793",
    status: "Available",
    ref: "R4943793",
    original_price: 850000,
    price: 850000,
    type: "House",
    subtype: "Villa",
    country: "Spain",
    province: "Málaga",
    town: "Estepona",
    area: "Costa del Sol",
    beds: 4,
    baths: 3,
    surface_area: {
      built: 200,
      terrace: 50,
      plot: 800,
    },
    own_property: false,
    has_pool: true,
    has_garden: true,
    characteristics: {
      category: [
        {
          name: "Setting",
          values: ["Suburban", "Close To Golf", "Close To Shops", "Close To Sea"],
        },
        {
          name: "Pool",
          values: ["Private"],
        },
        {
          name: "Views",
          values: ["Mountain", "Golf", "Garden"],
        },
      ],
    },
    description:
      "Beautiful villa in Estepona with private pool and garden. This property offers the perfect combination of tranquility and convenience, located just minutes from the beach and golf courses.",
    images: [
      {
        src: "/villa-estepona-pool-garden-spain.png",
        alt: "Villa exterior",
      },
      {
        src: "/villa-pool-area-private-spain.png",
        alt: "Private pool",
      },
      {
        src: "/villa-interior-living-room-modern.png",
        alt: "Living area",
      },
    ],
  },
  // Additional mock variants to ensure generateStaticParams covers exported routes
  {
    _id: "6887cfb45299ba7500e995c8",
    externalId: "R4943798",
    status: "Available",
    ref: "R4943798",
    original_price: 850000,
    price: 850000,
    type: "House",
    subtype: "Villa",
    country: "Spain",
    province: "Málaga",
    town: "Estepona",
    area: "Costa del Sol",
    beds: 4,
    baths: 3,
    surface_area: { built: 200, terrace: 50, plot: 800 },
    own_property: false,
    has_pool: true,
    has_garden: true,
    characteristics: {
      category: [
        {
          name: "Setting",
          values: ["Suburban", "Close To Golf", "Close To Shops", "Close To Sea"],
        },
        {
          name: "Pool",
          values: ["Private"],
        },
        {
          name: "Views",
          values: ["Mountain", "Golf", "Garden"],
        },
      ],
    },
    description:
      "Beautiful villa in Estepona with private pool and garden. This property offers the perfect combination of tranquility and convenience, located just minutes from the beach and golf courses.",
    images: [
      { src: "/villa-estepona-pool-garden-spain.png", alt: "Villa exterior" },
      { src: "/villa-pool-area-private-spain.png", alt: "Private pool" },
      { src: "/villa-interior-living-room-modern.png", alt: "Living area" },
    ],
  },
  {
    _id: "6887cfb45299ba7500e995c3",
    externalId: "R4943793a",
    status: "Available",
    ref: "R4943793a",
    original_price: 850000,
    price: 850000,
    type: "House",
    subtype: "Villa",
    country: "Spain",
    province: "Málaga",
    town: "Estepona",
    area: "Costa del Sol",
    beds: 4,
    baths: 3,
    surface_area: { built: 200, terrace: 50, plot: 800 },
    own_property: false,
    has_pool: true,
    has_garden: true,
    characteristics: {
      category: [
        {
          name: "Setting",
          values: ["Suburban", "Close To Golf", "Close To Shops", "Close To Sea"],
        },
        {
          name: "Pool",
          values: ["Private"],
        },
        {
          name: "Views",
          values: ["Mountain", "Golf", "Garden"],
        },
      ],
    },
    description:
      "Beautiful villa in Estepona with private pool and garden. This property offers the perfect combination of tranquility and convenience, located just minutes from the beach and golf courses.",
    images: [
      { src: "/villa-estepona-pool-garden-spain.png", alt: "Villa exterior" },
      { src: "/villa-pool-area-private-spain.png", alt: "Private pool" },
      { src: "/villa-interior-living-room-modern.png", alt: "Living area" },
    ],
  },
  {
    _id: "6887cfb45299ba7500e995c2",
    externalId: "R4943793b",
    status: "Available",
    ref: "R4943793b",
    original_price: 850000,
    price: 850000,
    type: "House",
    subtype: "Villa",
    country: "Spain",
    province: "Málaga",
    town: "Estepona",
    area: "Costa del Sol",
    beds: 4,
    baths: 3,
    surface_area: { built: 200, terrace: 50, plot: 800 },
    own_property: false,
    has_pool: true,
    has_garden: true,
    characteristics: {
      category: [
        {
          name: "Setting",
          values: ["Suburban", "Close To Golf", "Close To Shops", "Close To Sea"],
        },
        {
          name: "Pool",
          values: ["Private"],
        },
        {
          name: "Views",
          values: ["Mountain", "Golf", "Garden"],
        },
      ],
    },
    description:
      "Beautiful villa in Estepona with private pool and garden. This property offers the perfect combination of tranquility and convenience, located just minutes from the beach and golf courses.",
    images: [
      { src: "/villa-estepona-pool-garden-spain.png", alt: "Villa exterior" },
      { src: "/villa-pool-area-private-spain.png", alt: "Private pool" },
      { src: "/villa-interior-living-room-modern.png", alt: "Living area" },
    ],
  },
]

// Helper: return all mock property IDs
export function listMockPropertyIds(): string[] {
  return MOCK_PROPERTIES.map((p) => p._id)
}

const MOCK_AREAS = [
  {
    name: "Costa del Sol",
    pueblos: ["Marbella", "Estepona", "Fuengirola", "Torremolinos", "Benalmádena", "Mijas", "Doña Julia"],
  },
  {
    name: "Costa Blanca",
    pueblos: ["Alicante", "Benidorm", "Calpe", "Denia", "Javea", "Altea", "Villajoyosa"],
  },
  {
    name: "Costa Brava",
    pueblos: ["Lloret de Mar", "Tossa de Mar", "Girona", "Cadaqués", "Roses", "Empuriabrava"],
  },
]

// Mock new development data
const MOCK_NEW_DEVELOPMENTS: NewDevelopment[] = [
  {
    _id: "67de952b1c097fda7f462634",
    id: "8045",
    date: "2025-03-03 14:18:01",
    key_date: "2024",
    ref: "13173705-01",
    price: "521000",
    currency: "EUR",
    price_freq: "sale",
    part_ownership: "0",
    leasehold: "0",
    new_build: "1",
    type: "penthouse",
    town: "Torre-Pacheco",
    province: "Murcia",
    country: "Spain",
    location: {
      latitude: "37.740063",
      longitude: "-0.893240",
    },
    location_detail: "Torre-Pacheco",
    beds: "3",
    baths: "2",
    pool: "1",
    surface_area: {
      built: "109",
      plot: "0",
    },
    energy_rating: {
      consumption: "B",
      emissions: "B",
    },
    url: {
      en: "https://agent.habihub.com/developments/13173705",
    },
    desc: {
      en: "El Lago offers 42 luxury flats in the Santa Rosalia Lake & Life Resort, with options of 2 or 3 bedrooms and penthouses, all with 2 bathrooms. The interiors have a modern and open plan design, with garden on the ground floor, terraces on the first floor and spacious private terraces in the penthouses. Each unit is equipped with modern kitchen, electrical appliances, full bathrooms and fitted wardrobes. Panoramic views over the communal swimming pool, gardens and, in some cases, the countryside and lake.",
    },
    features: {
      feature: [
        "Community garage",
        "Mountain views",
        "Hospital",
        "Kitchen: furnished+appliances",
        "Private parking: 1",
        "Airport distance: 11331m",
        "Sea distance: 4000m",
        "Near sea",
        "Community pool",
        "Elevator",
        "Green areas",
        "School",
        "Community garden",
        "Built-in cabinets",
        "Golf",
        "Parking",
        "City views",
      ],
    },
    images: {
      image: [
        {
          $: { id: "1" },
          url: "/luxury-hotel-spain-golf-course.png",
        },
        {
          $: { id: "2" },
          url: "/hotel-pool-area-spain.png",
        },
        {
          $: { id: "3" },
          url: "/hotel-room-luxury-spain.png",
        },
      ],
    },
    commission: {
      type: "percentage",
      quantity: "10",
    },
    restrictions: {
      website: "0",
      national_portals: "0",
      international_portals: "0",
    },
    dateCreated: "2025-03-22T10:47:07.939Z",
    lastUpdated: "2025-03-22T14:11:26.755Z",
  },
  // Additional mock new development variant to match export requests
  {
    _id: "67de952b1c097fda7f462636",
    id: "8047",
    date: "2025-03-03 14:18:02",
    key_date: "2024",
    ref: "13173705-03",
    price: "625000",
    currency: "EUR",
    price_freq: "sale",
    part_ownership: "0",
    leasehold: "0",
    new_build: "1",
    type: "apartment",
    town: "Torre-Pacheco",
    province: "Murcia",
    country: "Spain",
    location: { latitude: "37.740063", longitude: "-0.893240" },
    location_detail: "Torre-Pacheco",
    beds: "3",
    baths: "2",
    pool: "1",
    surface_area: { built: "115", plot: "0" },
    energy_rating: { consumption: "B", emissions: "B" },
    url: { en: "https://agent.habihub.com/developments/13173707" },
    desc: { en: "A sister phase of El Lago offering modern 2-3 bedroom apartments." },
    features: { feature: ["Community pool", "Parking"] },
    images: { image: [{ $: { id: "1" }, url: "/newdev-sample-1.png" }] },
    commission: { type: "percentage", quantity: "10" },
    restrictions: { website: "0", national_portals: "0", international_portals: "0" },
    dateCreated: "2025-03-22T10:47:07.939Z",
    lastUpdated: "2025-03-22T14:11:26.755Z",
  },
]

// Helper: return all mock new development IDs
export function listMockNewDevelopmentIds(): string[] {
  return MOCK_NEW_DEVELOPMENTS.map((d) => d._id || d.id)
}

// Helper: return mock blog ids (simple numeric ids based on mock blog content)
export function listMockBlogIds(): string[] {
  // small set for demonstration, match what's used in app/blogs/[id]/page.tsx
  return ["1", "2", "3"]
}

export async function fetchProperties(filters: FilterParams = {}): Promise<ApiResponse> {
  const params = new URLSearchParams()

  // Set default pagination
  params.append("page", (filters.page || 1).toString())
  params.append("pageSize", (filters.pageSize || 200).toString())

  // Add filter parameters
  if (filters.location) params.append("location_detail", filters.location.toString())
  if (filters.minPrice) params.append("minPrice", filters.minPrice.toString())
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString())
  if (filters.beds) params.append("beds", filters.beds.toString())
  if (filters.baths) params.append("baths", filters.baths.toString())
  if (filters.search) params.append("search", filters.search)
  if (filters.type) params.append("types", filters.type)
  if (filters.area) params.append("area", filters.area)
  if (filters.town) params.append("town", filters.town)
  if (filters.amenities && filters.amenities.length > 0) {
    filters.amenities.forEach((a) => {
      if (a === "pool") params.append("has_pool", "true")
      if (a === "has_garden") params.append("has_garden", "true")
      if (a === "own_property") params.append("own_property", "true")
    })
  }
console.log(filters,"filtersfilters");
  const url = `${API_BASE_URL}/for-sale-feed-new-webite?${params.toString()}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching properties:", error)

    console.log("Using mock data for demonstration purposes")

    // Apply basic filtering to mock data
    let filteredProperties = [...MOCK_PROPERTIES]

    if (filters.type) {
      filteredProperties = filteredProperties.filter((p) => p.type.toLowerCase() === filters.type?.toLowerCase())
    }

    if (filters.area) {
      filteredProperties = filteredProperties.filter((p) =>
        p.area.toLowerCase().includes(filters.area?.toLowerCase() || ""),
      )
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredProperties = filteredProperties.filter(
        (p) =>
          p.town.toLowerCase().includes(searchTerm) ||
          p.area.toLowerCase().includes(searchTerm) ||
          p.subtype.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm),
      )
    }

    return {
      houses: filteredProperties,
      numPages: filteredProperties.length,
    }
  }
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/for-sale-detail/${id}`)
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching property:", error)

    console.log("Using mock data for demonstration purposes")
    const mockProperty = MOCK_PROPERTIES.find((p) => p._id === id)
    return mockProperty || null
  }
}

export async function fetchAreas(): Promise<{ areas: Array<{ name: string; pueblos: string[] }> }> {
  try {
    const response = await fetch(`${API_BASE_URL}/pueblos`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching areas:", error)

    console.log("Using mock areas data for demonstration purposes")
    return { areas: MOCK_AREAS }
  }
}

// Fetch new developments function
export async function fetchNewDevelopments(
  filters: NewDevelopmentFilterParams = {},
): Promise<NewDevelopmentApiResponse> {
  const params = new URLSearchParams()

  // Set default pagination
  params.append("page", (filters.page || 1).toString())
  params.append("pageSize", (filters.pageSize || 12).toString())

    // Add filter parameters
  if (filters.location) params.append("location_detail", filters.location.toString())
  if (filters.minPrice) params.append("minPrice", filters.minPrice.toString())
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString())
  if (filters.beds) params.append("beds", filters.beds.toString())
  if (filters.baths) params.append("baths", filters.baths.toString())
  if (filters.search) params.append("search", filters.search)
  if (filters.type) params.append("type", filters.type)
  if (filters.area) params.append("area", filters.area)
  if (filters.town) params.append("town", filters.town)
  if (filters.amenities && filters.amenities.length > 0) {
    filters.amenities.forEach((a) => {
      if (a === "has_pool") params.append("pool", "true")
      if (a === "has_garden") params.append("has_garden", "true")
      if (a === "own_property") params.append("own_property", "true")
    })
  }

  const url = `${API_BASE_URL}/get-new-development?${params.toString()}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching new developments:", error)

    console.log("Using mock data for demonstration purposes")

    return {
      properties: MOCK_NEW_DEVELOPMENTS,
      numPages: 7,
    }
  }
}

// Fetch new development by ID function
export async function fetchNewDevelopmentById(id: string): Promise<NewDevelopment | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/get-development-detail/${id}`)
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching new development:", error)

    console.log("Using mock data for demonstration purposes")
    const mockDevelopment = MOCK_NEW_DEVELOPMENTS.find((d) => d._id === id || d.id === id)
    return mockDevelopment || null
  }
}
