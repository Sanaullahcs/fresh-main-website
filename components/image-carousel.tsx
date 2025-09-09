"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageCarouselProps {
  images: Array<{ src: string; alt: string }>
  className?: string
}

export default function ImageCarousel({ images, className = "" }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // images that passed a quick resolution check
  const [measuredImages, setMeasuredImages] = useState<ImageCarouselProps["images"]>([])
  const [checking, setChecking] = useState(true)

  // initial filename-based filter to avoid obvious placeholders
  const filenameFiltered = (images || []).filter((img) => {
    if (!img || !img.src) return false
    const s = img.src.toLowerCase()
    if (s.includes("placeholder") || s.includes("placeholder-") || s.includes("placeholder_logo")) return false
    if (s.endsWith(".svg") && s.includes("placeholder")) return false
    return true
  })

  // Measure natural dimensions for images in the browser and drop low-res ones
  useEffect(() => {
    let canceled = false
    setChecking(true)
    const minimumWidth = 800 // require reasonably large source images for the hero
    const minimumHeight = 400

    const toCheck = filenameFiltered.slice()
    if (toCheck.length === 0) {
      setMeasuredImages([])
      setChecking(false)
      return
    }

    const results: typeof toCheck = []
    let loaded = 0

    toCheck.forEach((img) => {
      try {
        const tester = new window.Image()
        tester.src = img.src
        tester.onload = () => {
          loaded += 1
          if (!canceled) {
            if ((tester.naturalWidth || 0) >= minimumWidth && (tester.naturalHeight || 0) >= minimumHeight) {
              results.push(img)
            }
            if (loaded === toCheck.length) {
              // if nothing passed, fallback to filenameFiltered to avoid empty carousel
              setMeasuredImages(results.length > 0 ? results : filenameFiltered)
              setChecking(false)
            }
          }
        }
        tester.onerror = () => {
          loaded += 1
          if (!canceled && loaded === toCheck.length) {
            setMeasuredImages(results.length > 0 ? results : filenameFiltered)
            setChecking(false)
          }
        }
      } catch (e) {
        loaded += 1
      }
    })

    return () => {
      canceled = true
    }
  }, [images])

  const filteredImages = measuredImages.length > 0 ? measuredImages : filenameFiltered

  if (!filteredImages || filteredImages.length === 0) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500">No images available</span>
      </div>
    )
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className={`relative group ${className}`}>
      {/* provide an explicit height so next/image can generate correctly-sized images */}
      {/* Keep a consistent aspect ratio so the hero image doesn't stretch bizarrely */}
      <div className="w-full h-full relative" style={{ minHeight: 300, maxHeight: 720 }}>
        <Image
          src={filteredImages[currentIndex]?.src}
          alt={filteredImages[currentIndex]?.alt || "Property image"}
          fill
          quality={90}
          priority={currentIndex === 0}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
          className="object-cover rounded-md"
        />
      </div>

      {filteredImages.length > 1 && (
        <>
          <Button
            size="sm"
            variant="secondary"
            className="absolute left-2 top-1/2 transform  h-8 w-8 p-0 bg-[#35934B] hover:bg-[#35934B] opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="secondary"
            className="absolute right-2 top-1/2 transform  h-8 w-8 p-0 bg-[#35934B] hover:bg-[#35934B] opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {filteredImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div> */}

          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {currentIndex + 1} / {filteredImages.length}
          </div>
        </>
      )}

      {/* Thumbnail strip below the main image for quick navigation */}
      {filteredImages.length > 1 && (
        <div className="mt-3 flex items-center gap-2 overflow-x-auto px-1">
          {filteredImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 rounded overflow-hidden border-2 transition-all duration-150 ${idx === currentIndex ? "border-green-600 scale-105" : "border-transparent"
                }`}
              style={{ width: 96, height: 64 }}
              aria-label={`View image ${idx + 1}`}
            >
              <Image
                src={img.src}
                alt={img.alt || `Thumbnail ${idx + 1}`}
                width={96}
                height={64}
                quality={80}
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
