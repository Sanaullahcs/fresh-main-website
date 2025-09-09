"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Copy, Check } from "lucide-react"

export default function BlogShare({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async (platform: string) => {
    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank")
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        break
      case "copy":
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
  }

  return (
    <div className="flex justify-center sm:justify-start gap-2 sm:gap-3">
      <Button variant="outline" size="sm" onClick={() => handleShare("facebook")} className="border-green-200 hover:bg-green-100 hover:border-green-300 text-xs sm:text-sm">
        <Facebook className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleShare("twitter")} className="border-green-200 hover:bg-green-100 hover:border-green-300 text-xs sm:text-sm">
        <Twitter className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleShare("linkedin")} className="border-green-200 hover:bg-green-100 hover:border-green-300 text-xs sm:text-sm">
        <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleShare("copy")} className="border-green-200 hover:bg-green-100 hover:border-green-300 text-xs sm:text-sm">
        {copied ? <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" /> : <Copy className="h-3 w-3 sm:h-4 sm:w-4" />}
      </Button>
    </div>
  )
}
