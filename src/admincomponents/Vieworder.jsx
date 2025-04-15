import React, { useEffect, useState } from 'react';
import DataService from '../services/requestApi';
import { useParams } from 'react-router-dom';
import printJS from 'print-js';
import logo from '../assets/sarvLogo.png';
import { Print } from '@mui/icons-material';

const Vieworder = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    customerAddress = 'Address not available',
    storeAddress = 'Store address not available',
    storePhone = 'Phone not available',
    orderDate = new Date(),
    total = 0,
    orderDetails = [],
    invoiceNo = 'Not available',
  } = orderData || {};

  const GetOrderDate = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await DataService.ViewOrderDetail(id);
      if (response?.status === 200 && response?.data?.data) {
        setOrderData(response.data.data);
      } else {
        setError('Unable to fetch order details');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      setError('Error loading order details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      GetOrderDate();
    }
  }, [id]);

  const handlePrint = () => {
    printJS({
      printable: 'printable-order',
      type: 'html',
      targetStyles: ['*'],
      style: `
        @page { margin: 10mm; }
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
      `,
    });
  };
  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!orderData || Object.keys(orderData).length === 0) {
    return <div className="text-center p-4">No order data found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4 text-right print:hidden">
        <button
          onClick={handlePrint}
          className="bg-red-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <Print/> Print 
        </button>
      </div>

      <div id="printable-order" className="bg-white p-4 print:p-0">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <img src={logo} alt="Company Logo" className="h-12 w-[120px]" />
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold">
              Address: <span className="font-normal">{storeAddress}</span>
            </p>
            <p className="font-semibold mt-5">
              Phone: <span className="font-normal">{storePhone}</span>
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <p className="font-semibold mb-1">ORDER TO:</p>
            <p className="text-sm whitespace-pre-wrap">{customerAddress}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">Invoice No.</p>
            <p>{invoiceNo}</p>
            <p className="font-semibold mt-2 text-nowrap">Date of Order</p>
            <p>{new Date(orderDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Order Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Sr no.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Particulars</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Category</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Qty</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Unit</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(orderDetails) && orderDetails.length > 0 ? (
                orderDetails.map((item, index) => (
                  <tr key={item?.id || index}>
                    <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{item?.name || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{item?.category || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{item?.billQty || 1}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {item?.gram ? `${item.gram}g` : 'N/A'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">₹{item?.orderPrice || 0}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">₹{item?.orderPrice || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="border border-gray-300 px-4 py-2 text-center">
                    No items found
                  </td>
                </tr>
              )}
              <tr className="bg-gray-50">
                <td colSpan={6} className="border border-gray-300 px-4 py-2 font-semibold text-right">
                  GRAND TOTAL
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right font-semibold">₹{total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Store Details */}
        <div className="mt-6">
          <div className="border border-gray-300 rounded">
            <div className="bg-gray-50 p-2 text-center font-semibold border-b border-gray-300">
              Store Details
            </div>
            <div className="p-2 border-b border-gray-300 text-center">{storeAddress}</div>
            <div className="p-2 text-center">Mobile Number: {storePhone}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vieworder;
