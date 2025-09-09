"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"

const categories = [
  "All",
  "Andalucia",
  "Alcaucin",
  "Axarquia",
  "Cities of Spain",
  "Costa Tropical",
  "Costa del Sol",
  "Real Estate",
  "Why Choose Fresh",
]

const popularTags = [
  "Travel Guide",
  "Property Investment",
  "Beach Towns",
  "Historic Cities",
  "Market Analysis",
  "Local Insights",
  "Cultural Heritage",
  "Investment Tips",
]

const blogPosts = [
  {
    id: 1,
    title: "Plan Your Trip to Motril",
    subtitle: "Beaches, Culture, and Local Life in One Place",
    description:
      "Discover everything about Motril—from quiet beaches and tapas bars to shopping spots and cultural landmarks—in this full Costa Tropical travel guide.",
    image: "/motril-spain-coastal-town.png",
    category: "Costa Tropical",
    date: "2024-01-15",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "Plan Your Visit to Salobreña",
    subtitle: "A Beautiful Beach Town on Spain's Costa Tropical",
    description:
      "Explore Salobreña's castle views, peaceful beaches, and delicious food with this easy-to-follow travel guide.",
    image: "/salobrena-spain.png",
    category: "Costa Tropical",
    date: "2024-01-12",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Discover Granada's Hidden Gems",
    subtitle: "Beyond the Alhambra",
    description:
      "Uncover the secret spots and local favorites that make Granada a truly magical destination for property investors and travelers alike.",
    image: "/granada-architecture.png",
    category: "Andalucia",
    date: "2024-01-10",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "Real Estate Investment in Córdoba",
    subtitle: "Market Trends and Opportunities",
    description:
      "Analyze the current real estate market in Córdoba and discover why this historic city is becoming a hotspot for property investment.",
    image: "/cordoba-spain-real-estate.png",
    category: "Real Estate",
    date: "2024-01-08",
    readTime: "12 min read",
  },
  {
    id: 5,
    title: "Ronda: A Clifftop Paradise",
    subtitle: "Dramatic Views and Rich History",
    description:
      "Experience the breathtaking beauty of Ronda, perched dramatically on clifftops with stunning views and fascinating history.",
    image: "/placeholder-4oj7r.png",
    category: "Cities of Spain",
    date: "2024-01-05",
    readTime: "7 min read",
  },
  {
    id: 6,
    title: "Seville: The Heart of Andalusia",
    subtitle: "Culture, Architecture, and Lifestyle",
    description:
      "Immerse yourself in Seville's vibrant culture, stunning architecture, and passionate lifestyle in this comprehensive city guide.",
    image: "/seville-cathedral.png",
    category: "Andalucia",
    date: "2024-01-03",
    readTime: "9 min read",
  },
  {
    id: 7,
    title: "Why Choose Fresh Property Management",
    subtitle: "Your Success is Our Priority",
    description:
      "Learn about our comprehensive approach to property management and why property owners across Spain trust Fresh with their investments.",
    image: "/property-management-team.png",
    category: "Why Choose Fresh",
    date: "2024-01-01",
    readTime: "5 min read",
  },
  {
    id: 8,
    title: "Costa del Sol Investment Guide",
    subtitle: "Luxury Properties and Market Insights",
    description:
      "Explore the luxury property market on Costa del Sol and understand the investment potential in this prestigious coastal region.",
    image: "/costa-del-sol-luxury-properties.png",
    category: "Costa del Sol",
    date: "2023-12-28",
    readTime: "11 min read",
  },
]

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="flex flex-col">
          {/* Hero Background Section */}
          <div
            className="relative flex items-center justify-center py-8 sm:py-12 md:py-16"
            style={{
              backgroundImage: `url('/images/macrame-bedroom-hero.jpeg')`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              minHeight: "250px",
            }}
          >
            <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="text-center max-w-6xl mx-auto flex items-center justify-center min-h-[180px] sm:min-h-[200px] md:min-h-[220px]">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-black"
                    style={{
                      fontFamily: "Unica One, cursive",
                      fontWeight: "700",
                      textShadow: "none",
                    }}
                  >
                    BLOGS
                  </h1>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Subtitle Section */}
          <div className="bg-green-50 py-3 sm:py-4 md:py-5">
            <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-center max-w-4xl mx-auto">
                <p
                  className="text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-4"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "400",
                    color: "#374151",
                  }}
                >
                  Discover Spain's hidden gems, property investment opportunities, and expert insights from our local
                  team
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="bg-white py-4 sm:py-6 border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:gap-6 max-w-4xl mx-auto">
              {/* Centered Search */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-2xl">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl h-12 sm:h-14 w-full shadow-sm"
                  />
                </div>
              </div>

              {/* Category Buttons */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border-2 ${
                      selectedCategory === category
                        ? "bg-green-600 text-white border-green-600 shadow-lg transform scale-105"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-green-50 hover:border-green-300 hover:text-green-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-4">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12"
                >
                  {paginatedPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                          <span className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <span className="text-green-600 font-medium">{post.readTime}</span>
                        </div>

                        <h3
                          className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2"
                          style={{ fontFamily: "Unica One, cursive" }}
                        >
                          {post.title}
                        </h3>

                        {post.subtitle && (
                          <h4
                            className="text-base sm:text-lg font-medium mb-3 line-clamp-1"
                            style={{ color: "#6B7280" }}
                          >
                            {post.subtitle}
                          </h4>
                        )}

                        <p
                          className="mb-4 sm:mb-6 line-clamp-3 leading-relaxed text-sm sm:text-base"
                          style={{ color: "#6B7280" }}
                        >
                          {post.description}
                        </p>

                        <Link href={`/blogs/${post.id}`}>
                          <Button
                            variant="ghost"
                            className="group/btn p-0 h-auto font-medium text-green-600 hover:text-white hover:bg-green-600 transition-all duration-200 px-3 py-1.5 rounded-lg text-sm sm:text-base"
                          >
                            Read More
                            <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-1 sm:gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="border-green-200 hover:bg-green-50 text-sm sm:text-base px-3 sm:px-4 py-2"
                    >
                      Previous
                    </Button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 text-sm ${
                            currentPage === page
                              ? "bg-green-600 hover:bg-green-700"
                              : "border-green-200 hover:bg-green-50"
                          }`}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="border-green-200 hover:bg-green-50 text-sm sm:text-base px-3 sm:px-4 py-2"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
