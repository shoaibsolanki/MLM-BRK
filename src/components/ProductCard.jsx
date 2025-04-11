import { Link } from 'react-router-dom';
import { BASEURL } from '../services/http-common';
import AddToCartButton from './MicroComponant/AddToCartButton';

const ProductCard = ({ product }) => {
  return (
    <div className="group">
      <div className="overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md">
        <div className="relative h-64 overflow-hidden">
          <Link to={`/product/${product.item_id}`} className="group">
            <img
              src={`${BASEURL.ENDPOINT_URL}/item/get-image/${product?.item_id}`}
              alt={product?.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>
        <div className="flex justify-between p-4">
          <div className="">
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 truncate">
              {product?.item_name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {product?.description?.substring(0, 100)}...
            </p>
            {product?.price !== product?.actual_price && (
              <>
                <p className="mt-2 text-lg font-semibold text-gray-500">
                  MRP :₹ <span className="text-gray-500 line-through">{product?.actual_price?.toFixed(2)}</span>
                </p>
                <p className="mt-2 text-lg font-semibold text-red-700">
                  OFF : ₹ {product?.actual_price - product?.price }
                </p>
              </>
            )}
            <p className="mt-2 text-lg font-semibold text-green-500">
              DP : ₹{product?.price?.toFixed(2)}
            </p>
            <p className="mt-2 text-md font-semibold text-gray-900">
              RP : {product?.rp}
            </p>
          </div>

          <AddToCartButton item={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
