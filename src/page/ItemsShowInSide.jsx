import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { Remove } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../contexts/AuthConext";
import { BASEURL } from "../services/http-common";

const ItemsShowInSide = ({ items }) => {
  const {
    totalPrice,
    handleIncrease,
    handleDecrease,
    cart,
    totalPricePlusDeliveryCharge,
    deliveryCharge,
  } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(totalPrice);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleApplyCoupon = () => {};

  const handleRemoveCoupon = () => {
    setDiscount(0);
  };

  if (isLoading) {
    return (
      <div className=" my-4 w-full md:w-[500px] h-full mx-auto border border-gray-300 p-6 rounded-md text-dark">
        <h2 className="text-lg font-semibold mb-4">Order summary</h2>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="flex items-center space-x-4" key={index}>
              <div className="w-12 h-12 bg-gray-300 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-10 mb-2"></div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex my-4 justify-between text-sm">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>

          <div className="flex justify-between text-sm">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>

          <div className="flex justify-between text-lg font-semibold">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white my-4 w-full md:w-[500px] h-full mx-auto border border-gray-300 p-6 rounded-md text-dark">
      <h2 className="text-lg font-semibold mb-4">Order summary</h2>
      <div className="space-y-4">
        {items?.map((item, index) => {
          return (
            <div className="flex items-center space-x-4" key={index}>
              <img
                 src={`${BASEURL.ENDPOINT_URL}/item/get-image/${item?.item_id}`}
                alt="Badge Reel"
                width={50}
                height={50}
              />
              <div className="flex-1">
                <h3 className="font-semibold">
                  {item.itemName
                    ? item.itemName?.slice(0, 30)
                    : item.item_name?.slice(0, 30)}
                  {item.itemName?.length > 30 ? "..." : ""}
                </h3>
                <p>Color: {item.image_name}</p>
              </div>
              <div>
                <p className="font-semibold">₹ {item.price}.00</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button className="p-1 " onClick={() => handleDecrease(item)}>
                    <Remove />
                  </button>
                  <span>{item.product_qty}</span>
                  <button className="p-1 " onClick={() => handleIncrease(item)}>
                    <AddIcon />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex my-4 justify-between text-sm">
          <p>Shipping </p>
          {totalPrice < 1999 ? <p>₹{deliveryCharge}</p> : <p>Free</p>}
        </div>
        <p className="text-[12px] underline font-semibold italic">
          {"'"}FREE delivery on orders over ₹1999/-{"'"}
        </p>

        <div className="flex justify-between text-sm">
          <p>Subtotal</p>
          <p>₹ {totalPrice}</p>
        </div>

        <div className="flex justify-between text-lg font-semibold">
          <p>Total</p>
          <p>₹ {totalPricePlusDeliveryCharge}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemsShowInSide;
