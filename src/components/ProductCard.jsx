import { Link } from 'react-router-dom';
import { BASEURL } from '../services/http-common';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product?.item_id}`} className="group">
      <div className="overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md">
        <div className="relative h-64 overflow-hidden">
          <img
            src={`${BASEURL.ENDPOINT_URL}/item/get-image/${product?.item_id}`}
            alt={product?.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 truncate">
            {product?.item_name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {product?.description?.substring(0, 100)}...
          </p>
          <p className="mt-2 text-lg font-semibold text-gray-900">
            ${product?.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
