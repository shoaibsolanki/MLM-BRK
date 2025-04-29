import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import TestimonialCard from "./TestimonialCard"
import { Button } from "@mui/material"

export default function TestimonialCarousel({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef(null)
  const totalTestimonials = testimonials?.length

  // Calculate how many testimonials to show based on screen size
  const [itemsToShow, setItemsToShow] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsToShow(3)
      } else if (window.innerWidth >= 768) {
        setItemsToShow(2)
      } else {
        setItemsToShow(1)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalTestimonials - itemsToShow ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalTestimonials - itemsToShow : prevIndex - 1))
  }

  // Auto play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, currentIndex])

  // Pause auto play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  // Calculate visible testimonials
  const visibleTestimonials = testimonials?.slice(currentIndex, currentIndex + itemsToShow)

  // If we don't have enough testimonials to fill the view, add from the beginning
  if (visibleTestimonials?.length < itemsToShow) {
    const remaining = itemsToShow - visibleTestimonials?.length
    visibleTestimonials?.push(...testimonials?.slice(0, remaining))
  }

  return (
    <div
      className="relative w-full max-w-6xl mx-auto px-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{ transform: `translateX(0%)` }}
        >
          {visibleTestimonials?.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className={`flex-shrink-0 w-full ${
                itemsToShow === 3
                  ? "md:w-[calc(33.333%-1rem)]"
                  : itemsToShow === 2
                    ? "md:w-[calc(50%-0.5rem)]"
                    : "w-full"
              }`}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      {totalTestimonials > itemsToShow && (
        <div className="flex justify-center mt-6 gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full h-10 w-10 bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Pagination indicators */}
          <div className="flex items-center gap-1 mx-2">
            {Array.from({ length: totalTestimonials }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i >= currentIndex && i < currentIndex + itemsToShow
                    ? "bg-purple-600 w-4"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full h-10 w-10 bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  )
}
