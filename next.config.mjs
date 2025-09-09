/** @type {import('next').NextConfig} */
const nextConfig = {
  // static export output
  output: "export",
  trailingSlash: true, // ensures /route/ → /route/index.html

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // <--- important
  },
}

export default nextConfig
