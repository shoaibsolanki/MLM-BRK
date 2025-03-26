import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataService from '../services/requestApi';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthConext';
import { getCategories } from './data/mockData';


const CategoryBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response?.data?.data);
    };

    fetchCategories();
  }, []);

        // const categories = getCategories();
  
  return (
    <div className="bg-white shadow-sm mb-2 mt-2">
      <div className="max-w-screen-2xl mx-auto overflow-x-auto">
        <div className="flex whitespace-nowrap py-2 px-4 md:justify-between">
          {categories.map((category, index) => (
             <Link 
             key={category.id} 
             to={`/products/${category.masterCategoryId}`}
             className="group block"
           >
            <div key={index} className="flex flex-col items-center px-3 md:px-4 cursor-pointer text-sm">
              <span className="text-base md:text-xl mb-1">  <img
                src={category.image}
                alt={category.name}
                className="w-10 h-10 object-cover transition-transform duration-300 group-hover:scale-105"
              /></span>
              <div className="flex items-center">
                <span>{category.masterCategoryName}</span>
                {category.dropdown && <ChevronDown size={14} className="ml-1" />}
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
