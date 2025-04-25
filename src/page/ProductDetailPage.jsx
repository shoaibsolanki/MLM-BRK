import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DataService from "../services/requestApi.js";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthConext.jsx';
import { ReviewCard } from '../components/RattingReview/ReviewCard.jsx';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { storeid } = useAuth();

  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]); // State for images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    fetchImages();
    fetchreview();
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await DataService.getProductbyitemId(productId,storeid);
      if (response.status) {
        setProduct(response.data.data);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    }
    setLoading(false);
  };

  const fetchImages = async () => {
    try {
      const response = await DataService.getImgbyItemId(productId);
      if (response.status) {
        setProductImages(response.data.data.map(img => img.image)); // Store images
      } else {
        setProductImages([]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setProductImages([]);
    }
  };
  const [review, setreview] = useState([]); // State for images

  const fetchreview = async () => {
    try {
      const response = await DataService.Getreview(productId);
      if (response.status) {
        setreview(response.data.data); // Store images
      } else {
        setreview([]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setProductImages([]);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800">Loading...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-500 mb-8">The product you're looking for does not exist.</p>
        <Link 
          to="/products" 
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };
 const { addToCart, cart } = useCart();
  const AddedItem = cart?.find((el) => el.item_id == productId);
  console.log("AddedItem",AddedItem)
  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6">
        <ol className="flex text-sm">
          <li className="flex items-center">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
          </li>
          <li className="flex items-center">
            <Link to={`/products`} className="text-gray-500 hover:text-gray-700">
              Products
            </Link>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
          </li>
          <li className="text-gray-900 font-medium truncate">{product.item_name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          {productImages?.length > 0 ? (
            <div className="relative rounded-lg overflow-hidden bg-gray-100 mb-4">
              <img 
                src={productImages[currentImageIndex]} 
                alt={product?.item_name} 
                className="w-full h-96 object-contain"
              />
              
              {productImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow-md"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow-md"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
          
          {/* Thumbnail Navigation */}
          {productImages?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto py-2">
              {productImages?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`relative w-16 h-16 rounded border-2 overflow-hidden flex-shrink-0 ${
                    index === currentImageIndex 
                      ? 'border-blue-500' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product?.item_name}</h1>
          <p className="text-2xl font-semibold text-gray-900 mb-6">
          ₹{product?.price?.toFixed(2)}
          
          </p>
          
          <div className="prose prose-sm text-gray-700 mb-6">
            <p>{product?.description}</p>
            <p className="mt-2 text-md font-semibold text-green-500">
            {product?.rp} RP
          </p>
          </div>

          <button
  onClick={() => addToCart(product)}
  className="bg-primary relative flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-md text-white font-medium hover:bg-blue-700 focus:outline-none transition-all duration-300"
>
  Add to Cart

  {AddedItem?.product_qty > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md">
      {AddedItem.product_qty}
    </span>
  )}
</button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
   {review.map((review) => (
                 <ReviewCard
                     key={review.reviewId}
                     review={{
                         id: review.reviewId.toString(),
                         name: review.name,
                         rating: review.rating,
                         comment: review.review,
                         date: new Date(review.createdAt).toISOString(),
                         helpful: 0 // Assuming helpful count is not provided in the data
                     }}
                     onMarkHelpful={0}
                 />
             ))}
             </div>
    </>
  );
};

export default ProductDetailPage;
