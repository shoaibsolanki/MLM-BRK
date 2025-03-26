import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCategories,
  getCategory,
  getProductsByCategory,
  getProductsBySubcategory,
  getProducts,
} from "../components/data/mockData.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import DataService from "../services/requestApi.js";

const ProductsPage = () => {
  const { categoryId, subcategoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("All Products");
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(categoryId);
  const saasid = "22";
  const storeid = "22001";
  useEffect(() => {
    const fetchCategories = async () => {
      const response =  await DataService.GetMasterCategory(saasid,storeid);
      if (response.status) {
        setCategories(response.data.data);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      if (categoryId) {
        const response = await DataService.GetSubCategory(saasid, storeid, categoryId);
        if (response.data.status) {
          setCurrentCategory(response.data.data || []);
          console.log("currentCategory",response.data.data)
        } else {
          setCurrentCategory([]);
        }
      } else {
        setCurrentCategory([]);
      }
    };
    fetchCategory();
  }, [categoryId]);
  

  useEffect(() => {
    const fetchProducts = async () => {
      let response;
      if (categoryId && subcategoryId) {
        response = await getProductsBySubcategory(categoryId, subcategoryId);
        setTitle(`Products in ${currentCategory?.category || "Subcategory"}`);
      } else if (categoryId) {
        response = await getProductsByCategory(categoryId);
        setTitle(currentCategory?.category || "Products");
      } else {
        response =   await DataService.GetItemByPage(saasid,storeid,"1");
        setTitle("All Products");
        
      }
      
      if (response.status) {
        setProducts(response.data.data || []);
        console.log("products",products)

      } else {
        setProducts([]);
      }
    };
    fetchProducts();
  }, [categoryId, subcategoryId, currentCategory]);
  

  const toggleCategory = (catId) => {
    setExpandedCategory(expandedCategory === catId ? null : catId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:hidden mb-6">
        <div className="bg-white rounded-lg shadow">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <span className="font-medium text-gray-700">
              {categoryId ? currentCategory?.category || "Categories" : "Categories"}
            </span>
            {isMobileMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {isMobileMenuOpen && (
            <div className="border-t border-gray-200 py-2 max-h-[60vh] overflow-y-auto">
              <Link
                to="/products"
                className={`block px-4 py-2 ${!categoryId ? "bg-blue-50 text-blue-700" : "text-gray-700"}`}
              >
                All Products
              </Link>
              {categories.map((category) => (
                <div key={category.masterCategoryId} className="border-t border-gray-100">
                  <div className="flex items-center justify-between px-4 py-2">
                    <Link
                      to={`/products/${category.masterCategoryId}`}
                      className={`${categoryId == category.masterCategoryId ? "text-blue-700 font-medium" : "text-gray-700"}`}
                    >
                      {category.masterCategoryName}
                    </Link>
                    <button onClick={() => toggleCategory(category.masterCategoryId)} className="p-1 rounded-full hover:bg-gray-100">
                      {expandedCategory == category.masterCategoryId ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>

                  {expandedCategory == categoryId&&
  currentCategory.length > 0 &&
  currentCategory.map((subcategory) => (
    <Link
      key={subcategory.id}
      to={`/products/${subcategory.masterCategoryId}/${subcategory.id}`}
      className={`block py-2 text-sm ${
        subcategoryId == subcategory.id ? "text-blue-700 font-medium" : "text-gray-600"
      }`}
    >
      {subcategory.category}
    </Link>
  ))}

                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="hidden md:block md:w-64 flex-shrink-0">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <nav className="space-y-1">
            <Link
              to="/products"
              className={`block px-3 py-2 rounded-md ${!categoryId ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
            >
              All Products
            </Link>

            {categories.map((category) => (
              <div key={category.masterCategoryId}>
                <Link
                  to={`/products/${category.masterCategoryId}`}
                  className={`block px-3 py-2 rounded-md ${categoryId == category.masterCategoryId ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
                >
                  {category.masterCategoryName}
                </Link>

                {categoryId == category.masterCategoryId && (
                  <div className="ml-4 space-y-1 mt-1">
                    {categories
                      .filter((c) => c.masterCategoryId === category.masterCategoryId)
                      .map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          to={`/products/${subcategory.masterCategoryId}/${subcategory.id}`}
                          className={`block px-3 py-2 rounded-md text-sm ${subcategoryId == subcategory.id ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}
                        >
                          {subcategory.category}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
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
