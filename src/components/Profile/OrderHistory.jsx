import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthConext";
import Item from "./Item";
import { OrderProgressBar } from "./OrderProgressBar";
import { Link } from "react-router-dom";
import { ReviewFormModal } from "../RattingReview/ReviewForm";

const Orders = ({ className = "" }) => {
  const { allOrders, getOrderHistory, authData } = useAuth();
  const { id, saasId, storeId } = authData;
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getOrderHistory(storeId, saasId, id);
  }, []);

  const totalPages = Math.ceil(allOrders?.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = allOrders?.slice(startIndex, startIndex + itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`py-2 px-4 mx-1 rounded ${
            currentPage === i ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleOpenModal = (itemId) => {
    setSelectedItemId(itemId);
    setIsModalOpen(true);
    console.log("first", itemId);
    console.log("second", selectedItemId);
  };

  useEffect(() => {
    if (selectedItemId !== null) {
      console.log("second", selectedItemId);
    }
  }, [selectedItemId]);
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  const handleSubmitModal = (data) => {
    console.log("Review submitted:", data, "for itemId:", selectedItemId);
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

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
                      order.status === "DELIVERED"
                        ? "bg-green-500"
                        : order.status === "SHIPPED"
                        ? "bg-blue-500"
                        : order.status === "PROCESSING"
                        ? "bg-yellow-500"
                        : "bg-red-400"
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
                  Point Redeemed: {order?.redeemRp ? order.redeemRp : 0}
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <div className="text-lg font-medium">
                Total Order: {order?.order_value}
              </div>
              <div className="text-sm text-gray-600">
                Point Redeemed: {order?.redeemRp?order.redeemRp:0}
              </div>
              <div className="text-sm text-gray-600">
                Bonus Point: {order?.bonusPoints? order.bonusPoints:0}
              </div>
            
            </div>
            {/* </div> */}
            <OrderProgressBar status={order.status} />
            <div className="flex flex-col">
              {order.Orderdetail?.map((item, idx) => (
                <>
                  {order.status === "DELIVERED" && (
                    <button
                      onClick={() => handleOpenModal(item.itemid)}
                      className="mt-2 inline-block py-2 px-4 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Write a Review
                    </button>
                  )}
                  <Item
                    key={idx}
                    index={idx + 1}
                    name={item.name}
                    price={item.orderPrice}
                    quantity={item.billQty}
                  />
                </>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4 w-full">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="py-2 px-4 bg-gray-200 rounded disabled:opacity-50"
        >
          <ArrowLeft />
        </button>
        <div className="flex">{renderPageNumbers()}</div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="py-2 px-4 bg-gray-200 rounded disabled:opacity-50"
        >
          <ArrowRight />
        </button>
      </div>

      <ReviewFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        itemId={selectedItemId} // Pass the selected itemId to the modal
      />
    </>
  );
};

Orders.propTypes = {
  className: PropTypes.string,
};

export default Orders;
