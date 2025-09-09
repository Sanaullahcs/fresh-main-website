import type React from "react";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { listMockBlogIds } from "@/lib/api";
import BlogShare from "@/components/blog-share";

type PageProps = {
  params: { id: string };
};

// ---- static content (replace with CMS/API) ----
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
    author: "Fresh Property Team",
    content: `
      <h2>Welcome to Motril</h2>
      <p>Motril, located on Spain's stunning Costa Tropical, offers visitors a perfect blend of beautiful beaches, rich culture, and authentic local experiences. This comprehensive guide will help you make the most of your visit to this charming coastal town.</p>
      <h3>Beautiful Beaches</h3>
      <p>Motril boasts some of the most pristine beaches on the Costa Tropical. The main beach, Playa Granada, stretches for miles with fine dark sand and crystal-clear waters. It's perfect for swimming, sunbathing, and water sports.</p>
      <h3>Cultural Attractions</h3>
      <p>The town center features beautiful architecture and several historical sites worth exploring. Don't miss the Church of the Incarnation and the old sugar factory, which tells the story of Motril's industrial heritage.</p>
      <h3>Local Cuisine</h3>
      <p>Experience authentic Andalusian cuisine at the local tapas bars. Try the fresh seafood, especially the locally caught fish, and don't forget to sample the tropical fruits grown in the region.</p>
      <h3>Getting Around</h3>
      <p>Motril is easily walkable, but renting a car gives you the freedom to explore the surrounding areas, including the beautiful villages of the Alpujarras mountains.</p>
      <h3>Property Investment Opportunities</h3>
      <p>Motril presents excellent opportunities for property investment, with its growing tourism sector and beautiful coastal location. The town offers a perfect balance of traditional Spanish charm and modern amenities, making it attractive to both tourists and permanent residents.</p>
      <h3>Best Time to Visit</h3>
      <p>The Costa Tropical enjoys mild weather year-round, but the best time to visit Motril is during spring (April-June) and autumn (September-November) when temperatures are comfortable and crowds are smaller.</p>
    `,
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
    author: "Fresh Property Team",
    content: `
      <h2>Discover Salobreña</h2>
      <p>Perched on a hilltop overlooking the Mediterranean Sea, Salobreña is one of the most picturesque towns on Spain's Costa Tropical. This whitewashed village offers stunning views, rich history, and some of the best beaches in the region.</p>
      <h3>The Historic Castle</h3>
      <p>The 10th-century Moorish castle dominates the town's skyline and offers breathtaking panoramic views of the coast and surrounding countryside. The castle has been beautifully restored and houses a small museum showcasing the town's history.</p>
      <h3>Beautiful Beaches</h3>
      <p>Salobreña's beaches are among the finest on the Costa Tropical. Playa de Salobreña is the main beach, offering excellent facilities and water sports opportunities. For a quieter experience, head to the smaller coves along the coastline.</p>
      <h3>Local Gastronomy</h3>
      <p>The town's restaurants serve excellent fresh seafood and traditional Andalusian dishes. Don't miss trying the local specialty - pescaíto frito (fried fish) - paired with a glass of local wine while enjoying the sea views.</p>
    `,
  },
  {
    id: 3,
    title: "Discover Granada's Hidden Gems",
    subtitle: "Beyond the Alhambra",
    description:
      "Uncover the secret spots and local favorites that make Granada a truly magical destination.",
    image: "/granada-architecture.png",
    category: "Andalucia",
    date: "2024-01-10",
    readTime: "10 min read",
    author: "Fresh Property Team",
    content: `
      <h2>Granada Beyond the Tourist Trail</h2>
      <p>While the Alhambra rightfully draws millions of visitors, Granada offers so much more for those willing to explore beyond the obvious attractions. This guide reveals the hidden gems that locals cherish.</p>
      <h3>The Albaicín Neighborhood</h3>
      <p>This UNESCO World Heritage site is a maze of narrow cobblestone streets, traditional white houses, and stunning viewpoints. The best time to explore is during sunset when the light creates magical shadows across the ancient walls.</p>
      <h3>Sacromonte Caves</h3>
      <p>Experience authentic flamenco in the cave dwellings of Sacromonte. These unique homes carved into the hillside offer an intimate setting for traditional performances and provide insight into Granada's gypsy culture.</p>
      <h3>Property Investment Potential</h3>
      <p>Granada's growing international student population and increasing tourism make it an attractive market for property investment. The city offers excellent rental yields and strong capital appreciation potential.</p>
    `,
  },
];

// Pre-generate static params for SSG/export (ids must be strings)
export async function generateStaticParams() {
  try {
    const ids = listMockBlogIds(); // ensure this returns string[]; if numbers, String() them
    return ids.map((id: string | number) => ({ id: String(id) }));
  } catch {
    // Fallback to local content if the helper isn't available at build time
    return blogPosts.map((p) => ({ id: String(p.id) }));
  }
}

// If your list of ids is complete at build time, keep this false (smaller output).
// Set to true if new ids might appear at runtime and you want 404 -> dynamic render.
export const dynamicParams = false;

export default async function BlogPost({ params }: PageProps) {
  // ✅ do NOT await params; it's a plain object
  const postId = Number(params.id);
  const post = blogPosts.find((p) => p.id === postId) ?? blogPosts[0];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section
          className="relative flex items-center justify-center py-8 sm:py-12 md:py-16"
          style={{
            backgroundImage: `url('/images/macrame-bedroom-hero.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            minHeight: "250px",
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
              <Link href="/blogs">
                <Button
                  variant="ghost"
                  className="hover:text-white hover:bg-white/20 border border-white/30 text-black text-sm sm:text-base bg-white/90 backdrop-blur-sm transition-all duration-200"
                >
                  <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Back to Blogs
                </Button>
              </Link>
            </div>

            <div className="max-w-4xl mx-auto text-center pt-12 sm:pt-16">
              <div className="mb-3 sm:mb-4">
                <span className="bg-green-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                  {post.category}
                </span>
              </div>

              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-black px-2"
                style={{ fontFamily: "Unica One, cursive", textShadow: "none" }}
              >
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Article Metadata */}
        <section className="bg-green-50 py-3 sm:py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {post.subtitle && (
                <h2 className="text-base sm:text-lg md:text-xl mb-2 sm:mb-3 leading-relaxed text-gray-800 px-2 sm:px-4">
                  {post.subtitle}
                </h2>
              )}

              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 text-gray-600 text-xs sm:text-sm">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="whitespace-nowrap">{post.readTime}</span>
                </div>
                <div className="font-medium text-center">By {post.author}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Subtitle */}
        <section className="bg-white py-2 sm:py-3 border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed px-2 sm:px-4">
                Discover Spain's hidden gems, property investment opportunities, and expert insights from our local team
              </p>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-3 sm:py-4 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-40 sm:h-48 md:h-56 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Article Content + Share */}
        <section className="py-4 sm:py-6 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-green-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <span className="text-gray-700 font-medium text-sm sm:text-base text-center sm:text-left">
                    Share this article:
                  </span>
                  <div>
                    {/* Client-only component for sharing */}
                    <BlogShare
                      url={typeof window !== "undefined" ? window.location.href : "/blogs"}
                      title={post.title}
                    />
                  </div>
                </div>
              </div>

              <div
                className="prose prose-sm sm:prose-base max-w-none 
                prose-headings:text-gray-900 prose-headings:font-bold 
                prose-h2:text-lg sm:prose-h2:text-xl prose-h2:mt-6 sm:prose-h2:mt-8 prose-h2:mb-3 sm:prose-h2:mb-4 
                prose-h3:text-base sm:prose-h3:text-lg prose-h3:mt-4 sm:prose-h3:mt-6 prose-h3:mb-2 sm:prose-h3:mb-3 
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-3 sm:prose-p:mb-4 prose-p:text-sm sm:prose-p:text-base
                prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline"
                style={
                  {
                    "--tw-prose-headings-font-family": "Unica One, cursive",
                  } as React.CSSProperties
                }
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-8 sm:py-12 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h3
                className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4"
                style={{ fontFamily: "Unica One, cursive" }}
              >
                Continue Reading
              </h3>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base px-2">
                Discover more insights about Spain's property market and travel destinations
              </p>
              <Link href="/blogs">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 rounded-xl text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  View All Articles
                  <ArrowLeft className="ml-2 h-4 w-4 sm:h-5 sm:w-5 rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
