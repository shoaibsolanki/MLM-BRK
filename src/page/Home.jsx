import React, { useState } from 'react'
import Header from '../components/Header'
import CategoryBar from '../components/CategoryBar'
import MainBanner from '../components/MainBanner'
import ProductSection from '../components/ProductSection'
import Footer from '../components/Footer'

const Home = () => {
      const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <CategoryBar />
      <main className="max-w-screen-2xl mx-auto px-2 sm:px-4">
        <MainBanner currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
        <ProductSection />
      
      </main>
      <Footer />
    </div>
  )
}

export default Home