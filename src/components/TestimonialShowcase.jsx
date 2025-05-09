import { useEffect, useState } from "react"
import TestimonialCarousel from "../admincomponents/Microcomponents/TestimonialCarousel"
import DataService from '../services/requestApi'
export default function TestimonialShowcase() {
  const [testimonials , setTestimonials] =useState([])
const FetchData = async () => {
        try {
            const response = await DataService.GetTestimonialforcustomer();
            console.log(response.data);
            setTestimonials(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        FetchData()
    }, [])


  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Don't just take our word for it, hear from our satisfied customers
          </p>
          <div className="mt-2 w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>

        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </div>
  )
}
