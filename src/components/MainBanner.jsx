import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/0c706f11307587f3.jpg',
    alt: 'Flight Booking Offer'
  },
  {
    id: 2,
    image: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/352e6f0f8034fab5.jpg',
    alt: 'Electronics Sale'
  },
  {
    id: 3,
    image: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/c3990b1d75ea5468.jpg',
    alt: 'Big Savings'
  }
];

const MainBanner = ({ currentSlide, setCurrentSlide }) => {
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative my-2 overflow-hidden rounded-sm">
      {/* Banner Image */}
      <div className="relative h-[150px] sm:h-[200px] md:h-[250px] overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full h-full">
              <img 
                src={slide.image} 
                alt={slide.alt}
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
        {slides.map((_, index) => (
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
