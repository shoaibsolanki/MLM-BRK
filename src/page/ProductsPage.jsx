import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { 
    getCategories, 
    getCategory, 
    getProductsByCategory, 
    getProductsBySubcategory, 
    getProducts 
  } from '../components/data/mockData.jsx';
  import ProductCard from '../components/ProductCard.jsx';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ProductsPage = () => {
  const { categoryId, subcategoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('All Products');
  const categories = getCategories();
  const currentCategory = categoryId ? getCategory(categoryId) : null;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(categoryId);

  useEffect(() => {
    if (categoryId && subcategoryId) {
      // Get products by subcategory
      const filteredProducts = getProductsBySubcategory(categoryId, subcategoryId);
      setProducts(filteredProducts);
      
      // Set title with subcategory name
      const subcategory = currentCategory?.subcategories.find(s => s.id === subcategoryId);
      setTitle(`${subcategory?.name || ''} in ${currentCategory?.name || ''}`);
    } else if (categoryId) {
      // Get products by category only
      const filteredProducts = getProductsByCategory(categoryId);
      setProducts(filteredProducts);
      setTitle(currentCategory?.name || 'Products');
    } else {
      // Get all products
      const allProducts = getProducts();
      setProducts(allProducts);
      setTitle('All Products');
    }
  }, [categoryId, subcategoryId]);

  // Update expanded category when route changes
  useEffect(() => {
    setExpandedCategory(categoryId);
  }, [categoryId]);

  const toggleCategory = (catId) => {
    setExpandedCategory(expandedCategory === catId ? null : catId);
  };

  const handleCategorySelect = () => {
    // Close mobile menu after selection on mobile
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mobile category selection */}
      <div className="md:hidden mb-6">
        <div className="bg-white rounded-lg shadow">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <span className="font-medium text-gray-700">
              {subcategoryId && currentCategory 
                ? `${currentCategory.name} > ${currentCategory.subcategories.find(s => s.id === subcategoryId)?.name}`
                : categoryId ? currentCategory?.name : 'Categories'}
            </span>
            {isMobileMenuOpen ? 
              <ChevronUp size={20} className="text-gray-500" /> : 
              <ChevronDown size={20} className="text-gray-500" />
            }
          </button>
          
          {isMobileMenuOpen && (
            <div className="border-t border-gray-200 py-2 max-h-[60vh] overflow-y-auto">
              <Link 
                to="/products" 
                className={`block px-4 py-2 ${!categoryId ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                onClick={handleCategorySelect}
              >
                All Products
              </Link>
              
              {categories.map(category => (
                <div key={category.id} className="border-t border-gray-100">
                  <div className="flex items-center justify-between px-4 py-2">
                    <Link 
                      to={`/products/${category.id}`}
                      className={`${categoryId === category.id && !subcategoryId ? 'font-medium text-blue-700' : 'text-gray-700'}`}
                      onClick={handleCategorySelect}
                    >
                      {category.name}
                    </Link>
                    <button 
                      onClick={() => toggleCategory(category.id)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      {expandedCategory === category.id ? 
                        <ChevronUp size={16} className="text-gray-500" /> : 
                        <ChevronDown size={16} className="text-gray-500" />
                      }
                    </button>
                  </div>
                  
                  {expandedCategory === category.id && (
                    <div className="bg-gray-50 pl-6 pr-4 py-1">
                      {category.subcategories.map(subcategory => (
                        <Link 
                          key={subcategory.id}
                          to={`/products/${category.id}/${subcategory.id}`}
                          className={`block py-2 text-sm ${
                            categoryId === category.id && subcategoryId === subcategory.id 
                              ? 'text-blue-700 font-medium' 
                              : 'text-gray-600'
                          }`}
                          onClick={handleCategorySelect}
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop sidebar with categories - hidden on mobile */}
        <div className="hidden md:block md:w-64 flex-shrink-0">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <nav className="space-y-1">
            <Link 
              to="/products" 
              className={`block px-3 py-2 rounded-md ${!categoryId ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              All Products
            </Link>
            
            {categories.map(category => (
              <div key={category.id}>
                <Link 
                  to={`/products/${category.id}`}
                  className={`block px-3 py-2 rounded-md ${categoryId === category.id && !subcategoryId ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  {category.name}
                </Link>
                
                {categoryId === category.id && (
                  <div className="ml-4 space-y-1 mt-1">
                    {category.subcategories.map(subcategory => (
                      <Link 
                        key={subcategory.id}
                        to={`/products/${category.id}/${subcategory.id}`}
                        className={`block px-3 py-2 rounded-md text-sm ${subcategoryId === subcategory.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        
        {/* Product grid */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
