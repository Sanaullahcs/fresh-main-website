import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X } from "lucide-react"

export function ComparisonSection() {
  const features = [
    { feature: "Proven Model", fresh: true, diy: false, others: true },
    { feature: "International Flexibility", fresh: true, diy: false, others: false },
    { feature: "1-on-1 Support", fresh: true, diy: false, others: false },
    { feature: "Marketing & Leads", fresh: true, diy: false, others: true },
    { feature: "Tech Stack Included", fresh: true, diy: false, others: true },
    { feature: "Startup Cost", fresh: "€4,800", diy: "€15K+", others: "€25K+" },
    { feature: "Ongoing Fees", fresh: "20% profit share", diy: "All costs on you", others: "Fixed monthly fees" },
    { feature: "Territory Restrictions", fresh: false, diy: false, others: true },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl text-[#1F9D4D] mb-4"
            style={{
              fontFamily: "Unica One, cursive",
              fontWeight: "normal",
              textShadow: "0 4px 20px rgba(31,157,77,0.3)",
            }}
          >
            HOW FRESH STACKS UP
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare your options and see why Fresh offers the best combination of support, flexibility, and value
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div></div>
              <Card className="border-2 border-[#2F8C44]">
                <CardHeader className="bg-[#2F8C44] text-white text-center py-4">
                  <CardTitle
                    className="text-lg"
                    style={{
                      fontFamily: "Unica One, cursive",
                      fontWeight: "normal",
                      textShadow: "0 4px 20px rgba(255,255,255,0.3)",
                    }}
                  >
                    FRESH PROPERTIES
                  </CardTitle>
                  <Badge className="bg-white text-[#2F8C44] mt-2">Recommended</Badge>
                </CardHeader>
              </Card>
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 text-center py-4">
                  <CardTitle
                    className="text-lg"
                    style={{
                      fontFamily: "Unica One, cursive",
                      fontWeight: "normal",
                      textShadow: "0 4px 20px rgba(255,255,255,0.3)",
                    }}
                  >
                    DIY APPROACH
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50 text-center py-4">
                  <CardTitle
                    className="text-lg"
                    style={{
                      fontFamily: "Unica One, cursive",
                      fontWeight: "normal",
                      textShadow: "0 4px 20px rgba(255,255,255,0.3)",
                    }}
                  >
                    OTHER FRANCHISES
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            {features.map((row, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 mb-2">
                <div className="flex items-center font-medium text-gray-900 p-4">{row.feature}</div>
                <Card className="border-[#2F8C44]/20">
                  <CardContent className="p-4 text-center">
                    {typeof row.fresh === "boolean" ? (
                      row.fresh ? (
                        <CheckCircle className="h-6 w-6 text-[#2F8C44] mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-gray-400 mx-auto" />
                      )
                    ) : (
                      <span className="text-sm font-medium text-[#2F8C44]">{row.fresh}</span>
                    )}
                  </CardContent>
                </Card>
                <Card className="border-gray-200">
                  <CardContent className="p-4 text-center">
                    {typeof row.diy === "boolean" ? (
                      row.diy ? (
                        <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-sm font-medium text-gray-600">{row.diy}</span>
                    )}
                  </CardContent>
                </Card>
                <Card className="border-gray-200">
                  <CardContent className="p-4 text-center">
                    {typeof row.others === "boolean" ? (
                      row.others ? (
                        <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-sm font-medium text-gray-600">{row.others}</span>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Badge className="bg-[#2F8C44]/10 text-[#2F8C44] p-4 text-center">12-month refund guarantee</Badge>
            <Badge className="bg-[#2F8C44]/10 text-[#2F8C44] p-4 text-center">Bank financing available</Badge>
            <Badge className="bg-[#2F8C44]/10 text-[#2F8C44] p-4 text-center">No territory restrictions</Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
