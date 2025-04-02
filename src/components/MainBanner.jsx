import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthConext';
import { useEffect, useState } from 'react';
import DataService from "../services/requestApi";

const MainBanner = ({ currentSlide, setCurrentSlide }) => {
    const [banners, setBanners] = useState([]);
    const { saasid } = useAuth();
  
    const fetchAllBanner = async () => {
        try {
            const response = await DataService.GetAllBanner(saasid);
            if (response.status) {
                const bannerData = response.data;
                const bannerImages = Object.values(bannerData); // Extract URLs dynamically
                setBanners(bannerImages);
            } else {
                setBanners([]);
            }
        } catch (error) {
            console.error("Error fetching banners:", error);
            setBanners([]);
        }
    };

    useEffect(() => {
        fetchAllBanner();
    }, []);
  
    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };
  
    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };
  
    return (
        <div className="relative my-2 overflow-hidden rounded-sm">
            {/* Banner Image */}
            <div className="relative h-[250px] sm:h-[200px] md:h-[250px] lg:h-[250px] overflow-hidden">
                <div 
                    className="flex transition-transform duration-300 ease-out h-full"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {banners.map((image, index) => (
                        <div key={index} className="min-w-full h-full">
                            <img 
                                src={image} 
                                alt={`Banner ${index + 1}`}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                    ))}
                </div>
            </div>
  
            {/* Navigation Arrows */}
            <button 
                onClick={goToPrevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-r-full shadow-md"
            >
                <ChevronLeft size={20} />
            </button>
            <button 
                onClick={goToNextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-l-full shadow-md"
            >
                <ChevronRight size={20} />
            </button>
  
            {/* Dot Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all ${
                            index === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainBanner;
