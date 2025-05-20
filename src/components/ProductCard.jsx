import { Link } from 'react-router-dom';
import { BASEURL } from '../services/http-common';
import AddToCartButton from './MicroComponant/AddToCartButton';
import DOMPurify from 'dompurify'
const ProductCard = ({ product }) => {
  return (
    <div className="group border rounded-lg bg-white shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-105 max-w-xs relative">
      <Link to={`/product/${product.item_id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={`${BASEURL.ENDPOINT_URL}/item/get-image/${product?.item_id}`}
            alt={product?.name}
            className="h-full w-full object-cover"
          />
          {product?.price !== product?.actual_price && product?.actual_price > 0 && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              {product?.discount_type === 'percentage'
                ? ` ${product?.discount.toFixed(0)}% OFF`
                : `Flat ₹${(product?.actual_price - product?.price).toFixed(2)} OFF`}
            </div>
          )}
        </div>
      </Link>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {product?.item_name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          <div
            dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              product.description?.length > 20
                ? product.description.slice(0, 20) + '...'
                : product.description
            )
          }}
            style={{ maxWidth: '200px', overflow: 'hidden' }}
          />
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
                {product?.discount_type === 'percentage'
                  ? ` (${(product.discount).toFixed(0)}% OFF)`
                  : `Flat ₹${(product?.discount).toFixed(2)} OFF`}
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
