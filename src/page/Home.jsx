import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import CategoryBar from '../components/CategoryBar'
import MainBanner from '../components/MainBanner'
import ProductSection from '../components/ProductSection'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { getCategories, getFeaturedProducts } from '../components/data/mockData.jsx';
import DataService from "../services/requestApi.js";
import { useAuth } from '../contexts/AuthConext.jsx'

const Home = () => {
      const [currentSlide, setCurrentSlide] = useState(0);
      const categories = getCategories();
      // const featuredProducts = getFeaturedProducts();
  const [featuredProducts, setfeaturedProducts] = useState([]);
  const { saasid, storeid,searchKeyword, searchResults } = useAuth();

 const fetchAllProducts = async () => {
    const response = await DataService.GetrecommendedItemByPage(storeid,saasid, "1");
    if (response.status) {
      setfeaturedProducts(response.data.data || []);
      // setTitle("All Products");
    } else {
      setProducts([]);
    }
  };
useEffect(() => {
  fetchAllProducts()
}, [])

      console.log("featuredProducts",featuredProducts)
      
  return (
    <>
    {!searchKeyword ? (
      
      <div className="min-h-screen bg-gray-100">
      {/* <Header /> */}
      <main className="max-w-screen-2xl mx-auto px-2 sm:px-4">
        <MainBanner currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
      <CategoryBar />
        {/* Featured Products Section */}
        <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      </main>
      {/* <Footer /> */}
    </div>) : (
         <section className="py-12 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {searchResults.map((product) => (
               <ProductCard key={product.id} product={product} />
             ))}
           </div>
         </div>
       </section>)}
    </>
  )
}

export default Home