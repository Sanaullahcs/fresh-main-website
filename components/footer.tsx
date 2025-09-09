"use client"

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-[#1F9D4D] text-white py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-center sm:justify-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FreshPropertyLogo-vUgMOJhAUN9UxvZzIKmM4PP8pPyBQi.svg"
                    alt="Fresh Properties"
                    className="h-8 w-8"
                  />
                </div>
                <span className="text-white text-lg font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                  FRESH PROPERTIES
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-center sm:text-left">Services</h3>
            <ul className="space-y-1 text-center sm:text-left">
              <li>
                <a
                  href="/services/holiday-rental-management"
                  className="text-white/80 hover:text-white transition-colors text-sm sm:text-base hover:underline"
                >
                  Property Management
                </a>
              </li>
              <li>
                <a
                  href="https://www.fresh.holiday/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors text-sm sm:text-base hover:underline"
                >
                  Book a Stay
                </a>
              </li>
              <li>
                <a
                  href="/buy"
                  className="text-white/80 hover:text-white transition-colors text-sm sm:text-base hover:underline"
                >
                  Property Sales
                </a>
              </li>
              <li>
                <a
                  href="https://franchise.fresh-properties.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors text-sm sm:text-base hover:underline"
                >
                  Franchise
                </a>
              </li>
              <li>
                <a
                  href="/blogs"
                  className="text-white/80 hover:text-white transition-colors text-sm sm:text-base hover:underline"
                >
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-center sm:text-left">Contact</h3>
            <div className="space-y-1 text-white/80 text-sm sm:text-base text-center sm:text-left">
              <p className="hover:text-white transition-colors">NL: +31 6 23700433</p>
              <p className="hover:text-white transition-colors">ES: +34 744 74 92 03</p>
              <p className="break-all hover:text-white transition-colors">info@fresh-propertymanagement.com</p>
              <p>
                <a
                  href="https://www.fresh-properties.com"
                  className="hover:text-white transition-colors hover:underline"
                >
                  www.fresh-properties.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="my-4 sm:my-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>

        <div className="text-center">
          <div className="mb-2">
            <a
              href="/privacy-policy"
              className="text-white/70 hover:text-white transition-colors text-xs sm:text-sm hover:underline"
            >
              Privacy Policy
            </a>
          </div>
          <p className="text-white/70 text-xs sm:text-sm">© 2025 Fresh Properties. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
