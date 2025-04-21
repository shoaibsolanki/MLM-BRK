import { Link } from 'react-router-dom';
import { BASEURL } from '../services/http-common';
import AddToCartButton from './MicroComponant/AddToCartButton';

const ProductCard = ({ product }) => {
  return (
    <div className="group border rounded-lg bg-white shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-105 max-w-xs">
      <Link to={`/product/${product.item_id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={`${BASEURL.ENDPOINT_URL}/item/get-image/${product?.item_id}`}
            alt={product?.name}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {product?.item_name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {product?.description?.substring(0, 100)}...
        </p>
        <div className="mt-2 flex items-center space-x-2">
          <p className="text-sm font-bold text-green-600">
            DP: ₹{product?.price?.toFixed(2)}
          </p>
          {product?.price !== product?.actual_price && product?.actual_price > 0 && (
            <>
              <p className="text-xs text-gray-500 line-through">
                MRP: ₹{product?.actual_price?.toFixed(2)}
              </p>
              <p className="text-xs text-red-600">

                Flat: 
                {/* ₹{(product?.actual_price - product?.price).toFixed(2)} */}
                 (
                {((product?.actual_price - product?.price) / product?.actual_price * 100).toFixed(0)}% OFF)
              </p>
            </>
          )}
        </div>
        <p className="text-xs font-medium text-gray-700 mt-1">
          RP: {product?.rp}
        </p>
        <div className="mt-3">
          <AddToCartButton item={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
