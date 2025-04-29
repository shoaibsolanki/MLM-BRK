// import { format } from "date-fns"
import { Card } from "@mui/material"
import { Quote } from "lucide-react"
import DOMPurify from 'dompurify'
export default function TestimonialCard({ testimonial }) {
  // Format the date to be more readable
//   const formattedDate = format(new Date(testimonial.created), "MMMM d, yyyy")

  // Extract plain text from HTML description
  const plainDescription = testimonial.description.replace(/<\/?[^>]+(>|$)/g, "")

  // Generate initials for avatar fallback
  const initials = testimonial.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  return (
    <Card className="w-full overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
      {/* Top gradient bar */}
      <div className="h-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>

      <div className="p-6 relative h-full flex flex-col">
        {/* Quote icon */}
        <div className="absolute -top-4 right-6 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md">
          <Quote className="w-6 h-6 text-purple-500" />
        </div>

        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg bg-purple-100 flex items-center justify-center">
              {testimonial.image ? (
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target
                    target.src = "/placeholder.svg?height=64&width=64"
                  }}
                />
              ) : (
                <span className="text-xl font-bold text-purple-700">{initials}</span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{testimonial.name}</h3>
            {/* <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p> */}

            <div className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                <div
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(testimonial.description) }}
                                style={{ maxWidth: '200px', overflow: 'hidden' }}
                              />
            </div>

            {/* Rating stars */}
            <div className="mt-4 flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < 5 ? "text-yellow-400" : "text-gray-300"} fill-current`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Verified Customer</span>
            </div>
          </div>
        </div>

        {/* Store ID badge */}
        {/* <div className="mt-auto pt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
          Store #{testimonial.storeId}
        </div> */}
      </div>
    </Card>
  )
}
