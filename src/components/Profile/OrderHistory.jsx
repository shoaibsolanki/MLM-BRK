import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthConext";
import Item from "./Item";

const Orders = ({ className = "" }) => {

    
    const { allOrders ,getOrderHistory ,authData} = useAuth();
    const { id, saasId, storeId, mobileNumber, name } = authData;
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getOrderHistory(storeId,saasId,id)
  }, [])
  

  const totalPages = Math.ceil(allOrders?.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = allOrders?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Orders History</h1>
      <div className="w-full flex flex-col gap-6">
        {currentOrders?.map((order, index) => (
          <section
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col mb-4">
              <div className="text-lg font-medium">
                Order ID: {order.order_id}
              </div>
              <div className="text-sm text-gray-600">
                Date: {order.order_date}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Status:{" "}
                <span
                  className={`text-sm text-white font-semibold py-[4px] px-[8px] rounded-lg ${
                    order.status === "PENDING" ? "bg-red-400" : "green-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <div className="text-lg font-medium">
                Total Order: {order?.order_value}
              </div>
              <div className="text-sm text-gray-600">
                Point Redeemed: {order?.redeemRp?redeemRp:0}
              </div>
            
            </div>
            </div>
            <div className="flex flex-col">
              {order.Orderdetail?.map((item, idx) => (
                <Item
                  key={idx}
                  index={idx + 1}
                  name={item.name}
                  price={item.orderPrice}
                  quantity={item.billQty}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="flex justify-between mt-4 w-full">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="py-2 px-4 bg-gray-200 rounded disabled:opacity-50"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="py-2 px-4 bg-gray-200 rounded disabled:opacity-50"
        >
          <ArrowRight />
        </button>
      </div>
    </>
  );
};

Orders.propTypes = {
  className: PropTypes.string,
};

export default Orders;
