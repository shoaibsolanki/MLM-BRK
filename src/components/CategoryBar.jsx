import { ChevronDown } from 'lucide-react';

const categories = [
  { name: 'Kilos', icon: '🏡' },
  { name: 'Mobiles', icon: '📱' },
  { name: 'Fashion', icon: '👕', dropdown: true },
  { name: 'Electronics', icon: '💻', dropdown: true },
  { name: 'Home & Furniture', icon: '🪑', dropdown: true },
  { name: 'Appliances', icon: '🧮' },
  { name: 'Flight Bookings', icon: '✈️' },
  { name: 'Beauty, Toys & More', icon: '🧸', dropdown: true },
  { name: 'Two Wheelers', icon: '🏍️', dropdown: true },
];

const CategoryBar = () => {
  return (
    <div className="bg-white shadow-sm mb-2 mt-2">
      <div className="max-w-screen-2xl mx-auto overflow-x-auto">
        <div className="flex whitespace-nowrap py-2 px-4 md:justify-between">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center px-3 md:px-4 cursor-pointer text-sm">
              <span className="text-base md:text-xl mb-1">{category.icon}</span>
              <div className="flex items-center">
                <span>{category.name}</span>
                {category.dropdown && <ChevronDown size={14} className="ml-1" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
