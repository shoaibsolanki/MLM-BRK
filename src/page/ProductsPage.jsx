import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DataService from "../services/requestApi.js";
import ProductCard from "../components/ProductCard.jsx";
import { useAuth } from "../contexts/AuthConext.jsx";

const ProductsPage = () => {
  const { categoryId, subcategoryId } = useParams();
  const { saasid, storeid } = useAuth();

  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("All Products");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(categoryId || null);
  const [activeSubcategory, setActiveSubcategory] = useState(subcategoryId || null);
 

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await DataService.GetMasterCategory(saasid, storeid);
      if (response.status) {
        setCategories(response.data.data);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!categoryId) {
      fetchAllProducts();
    } else {
      fetchSubcategories();
    }
  }, [categoryId]);

  useEffect(() => {
    if (subcategoryId) {
      fetchProducts(subcategoryId);
    }
  }, [subcategoryId]);

  const fetchAllProducts = async () => {
    const response = await DataService.GetItemByPage(saasid, storeid, "1");
    if (response.status) {
      setProducts(response.data.data || []);
      setTitle("All Products");
      setExpandedCategory(null);
    } else {
      setProducts([]);
    }
  };

  const fetchSubcategories = async () => {
    const response = await DataService.GetSubCategorybycatgoryid(saasid, storeid, categoryId);
    if (response.data.status) {
      setSubcategories(response.data.data);
    } else {
      setSubcategories([]);
      setProducts([]);
    }
  };

  const fetchProducts = async (subcategoryId) => {
    const subcategory = subcategories.find((sub) => sub.id === subcategoryId);
    if (subcategory) {
      const response = await DataService.GetSubCategoryByItem(saasid, storeid, subcategory.category, "1");
      setActiveSubcategory(subcategoryId);
      setTitle(`Products in ${subcategory.category}`);
      setProducts(response.status ? response.data.data || [] : []);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mobile Menu */}
      <div className="md:hidden mb-6">
        <div className="bg-white rounded-lg shadow">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <span className="font-medium text-gray-700">
              {categoryId ? categories.find((cat) => cat.masterCategoryId === categoryId)?.masterCategoryName || "Categories" : "Categories"}
            </span>
            {isMobileMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {isMobileMenuOpen && (
            <div className="border-t border-gray-200 py-2 max-h-[60vh] overflow-y-auto">
              <Link
                to="/products"
                className={`block px-4 py-2 text-gray-700 rounded-md ${!categoryId ? "bg-blue-500 text-white" : "hover:bg-gray-50"}`}
                onClick={fetchAllProducts}
              >
                All Products
              </Link>

              {categories.map((category) => (
                <div key={category.masterCategoryId} className="border-t border-gray-100">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === category.masterCategoryId ? null : category.masterCategoryId)}
                    className={`w-full text-left px-4 py-2 flex justify-between items-center ${
                      categoryId === category.masterCategoryId ? "bg-blue-500 text-white" : "hover:bg-gray-50"
                    }`}
                  >
                    <Link to={`/products/${category.masterCategoryId}`} className="w-full">
                      {category.masterCategoryName}
                    </Link>
                    {expandedCategory === category.masterCategoryId ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {expandedCategory === category.masterCategoryId &&
                    subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        to={`/products/${subcategory.masterCategoryId}/${subcategory.id}`}
                        className={`block py-2 pl-6 text-sm rounded-md ${
                          activeSubcategory === subcategory.id ? "bg-blue-500 text-white" : "hover:bg-gray-50 text-gray-600"
                        }`}
                        onClick={() => fetchProducts(subcategory.id)}
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
        {/* Sidebar (Desktop) */}
        <div className="hidden md:block md:w-64 flex-shrink-0">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <nav className="space-y-1">
            <Link
              to="/products"
              className={`block px-3 py-2 rounded-md ${!categoryId ? "bg-blue-500 text-white" : "hover:bg-gray-50 text-gray-700"}`}
              onClick={fetchAllProducts}
            >
              All Products
            </Link>

            {categories.map((category) => (
              <div key={category.masterCategoryId} className="border-t border-gray-100">
                <button
                  onClick={() => setExpandedCategory(expandedCategory === category.masterCategoryId ? null : category.masterCategoryId)}
                  className={`w-full text-left px-3 py-2 flex justify-between items-center rounded-md ${
                    categoryId === category.masterCategoryId ? "bg-blue-500 text-white" : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <Link to={`/products/${category.masterCategoryId}`} className="w-full">
                    {category.masterCategoryName}
                  </Link>
                  {expandedCategory === category.masterCategoryId ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
   {expandedCategory === category.masterCategoryId && (
            <div className="subcategory-list ml-4 mt-2 border-l-2 border-gray-300 pl-4">
              {subcategories
                .filter((sub) => sub.masterCategoryId == category.masterCategoryId)
                .map((sub) => (
                  <Link
                      key={sub.id}
                      to={`/products/${sub.masterCategoryId}/${sub.id}`}
                      className={`block px-6 py-2 text-sm rounded-md ${
                        activeSubcategory === sub.id ? "bg-blue-500 text-white" : "hover:bg-gray-50 text-gray-600"
                      }`}
                      onClick={() => fetchProducts(sub.id)}
                    >
                      {sub.category}
                    </Link>
                ))}
            </div>
          )}
              </div>
            ))}
          </nav>
        </div>

        {/* Products Grid */}
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
