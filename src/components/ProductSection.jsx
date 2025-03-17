import { ChevronRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'SmartWatch Pro',
    image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/smartwatch/u/m/y/-original-imaghxg9gzfmsdtf.jpeg',
    price: '2,999',
    originalPrice: '5,999',
    discount: '50% off'
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/headphone/r/v/o/-original-imaghxgnwhjqz4ge.jpeg',
    price: '1,499',
    originalPrice: '2,999',
    discount: '50% off'
  },
  {
    id: 3,
    name: 'HD Projector',
    image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/projector/k/j/k/-original-imagg99fwvqt5rrg.jpeg',
    price: '6,999',
    originalPrice: '12,999',
    discount: '46% off'
  },
  {
    id: 4,
    name: 'Smart TV 43"',
    image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/television/j/2/j/-original-imaghxgnjzgpcgez.jpeg',
    price: '22,999',
    originalPrice: '42,999',
    discount: '46% off'
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    image: 'https://rukminim2.flixcart.com/image/312/312/speaker/mobile-tablet-speaker/f/w/9/jbl-go-original-imaehzh8fvrgv7ew.jpeg',
    price: '1,799',
    originalPrice: '3,599',
    discount: '50% off'
  }
];

const ProductSection = () => {
  return (
    <section className="my-4 bg-white shadow-sm rounded-sm overflow-hidden">
      {/* Section Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-medium">Best of Electronics</h2>
        <button className="flex items-center text-[#2874f0] font-medium">
          VIEW ALL
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Products Grid */}
      <div className="flex overflow-x-auto p-4">
        {products.map((product) => (
          <div key={product.id} className="min-w-[150px] md:min-w-[200px] flex flex-col items-center p-2 cursor-pointer">
            <div className="h-28 md:h-40 w-full flex items-center justify-center mb-2">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="font-medium text-sm text-center truncate w-full">{product.name}</h3>
            <div className="flex items-center mt-1">
              <span className="text-sm font-medium">₹{product.price}</span>
              <span className="text-xs text-gray-500 line-through ml-1">₹{product.originalPrice}</span>
            </div>
            <span className="text-xs text-green-600 mt-0.5">{product.discount}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
