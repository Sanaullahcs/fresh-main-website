"use client"

import dynamic from "next/dynamic"

const MobileMenu = dynamic(() => import("./mobile-menu"), { ssr: false })

export default function MobileMenuLoader(props: any) {
  return <MobileMenu {...props} />
}
