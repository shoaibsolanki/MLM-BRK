import React, { useEffect, useState } from "react";
import DataService from '../services/requestApi'
// import Image from "next/image";
import { useParams } from "react-router-dom";
export default function InvoiceView() {
       const { id } = useParams();
        const [orderData, setOrderData] = useState({});
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const {storeName,storeLogo ,state} = JSON.parse(localStorage.getItem("store_data"));
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

      const {
        customerAddress = 'Address not available',
        storeAddress = 'Store address not available',
        storePhone = 'Phone not available',
        orderDate = "",
        total = 0,
        orderDetails = [],
        invoiceNo = 'Not available',
        invoiceDate,
        paymentMode,
        reedemPoint
      } = orderData || {};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start border-b-2 border-yellow-400 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 relative">
            <img
              src={storeLogo}
              width={48}
              height={48}
              alt="Company logo"
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-yellow-600">
              BRK SOLUTIONS PVT. LTD.
            </h1>
            <p className="text-xs">
              640, SHRI LAL NAGAR, GANDHI CHOWK JABALPUR-482001, RAJASTHAN INDIA
            </p>
            <p className="text-xs">
              Mob# & No. : (+91-90642 31555 / E-mail ID: BRK@gmail.com)
            </p>
            <div className="grid grid-cols-2 gap-x-4 text-xs mt-1">
              <p>GST NO. : 09AABCS7947R1Z2</p>
              <p>CIN NO. :</p>
              <p>DT#09AABCS7947R1Z2</p>
              <p>FSSAI NO. : 12323030000706</p>
              <p>PAN NO. : AABCS7947R</p>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="border border-gray-300 p-2 text-sm">
            <p className="font-bold">Original Copy</p>
          </div>
          <h2 className="text-lg font-bold mt-2">TAX INVOICE</h2>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Left */}
        <div className="grid grid-cols-1 gap-2">
            <div className="border border-gray-300 p-2" >
              <div className="grid grid-cols-2">
                <p className="text-sm font-semibold text-nowrap">Invoice no: {invoiceNo}</p>
                <p className="text-sm"></p>
              </div>
            </div>
            <div className="border border-gray-300 p-2" >
              <div className="grid grid-cols-2">
                <p className="text-sm font-semibold text-nowrap">Invoice Date:{invoiceDate}</p>
                <p className="text-sm"></p>
              </div>
            </div>
            <div className="border border-gray-300 p-2">
              <div className="grid grid-cols-2">
                <p className="text-sm font-semibold text-nowrap">Payment Mode:{paymentMode}</p>
                <p className="text-sm"></p>
              </div>
            </div>
            <div className="border border-gray-300 p-2" >
              <div className="grid grid-cols-2">
              <p className="text-sm font-semibold">Place of Supply : {customerAddress}</p>
                <p className="text-sm"></p>
              </div>
            </div>
        </div>

        {/* Right */}
        <div className="grid grid-cols-1 gap-2">
            <div className="border border-gray-300 p-2" >
              <div className="grid grid-cols-2">
                <p className="text-sm font-semibold">System Ref : 57</p>
                <p className="text-sm"></p>
              </div>
            </div>
            <div className="border border-gray-300 p-2" >
              <div className="grid grid-cols-2">
                <p className="text-sm font-semibold">Supply Date : {orderDate} </p>
                <p className="text-sm"></p>
              </div>
            </div>
            <div className="border border-gray-300 p-2" >
              <div className="grid grid-cols-2">
                <p className="text-sm font-semibold text-nowrap">Payment Mode:{paymentMode}</p>
                <p className="text-sm"></p>
              </div>
            </div>
            <div className="border border-gray-300 p-2" >
              <div className="grid grid-cols-2">
                <p className="text-sm font-semibold text-nowrap">Transport Mode : Courier</p>
                <p className="text-sm"></p>
              </div>
            </div>

        </div>
      </div>

      {/* Bill & Ship to */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {["Bill to Party", "Ship to Party"].map((title, i) => (
          <div className="border border-gray-300" key={i}>
            <div className="bg-gray-100 p-2 border-b border-gray-300">
              <h3 className="font-bold">{title}</h3>
            </div>
            <div className="p-2 grid gap-2">
              {/* {[
                "Name",
                "Address (as per GST)",
                "Supplier State",
                "GSTIN",
                "Contact No. 09876 543",
              ].map((field, idx) => ( */}
                <div className="grid grid-cols-1" >
                  <p className="text-sm font-semibold">Name: {title =="Bill to Party" ?storeName:""}</p>
                  <div className={`border-b border-gray-300 h-6`}></div>
                </div>
                <div className="grid grid-cols-1" >
                  <p className="text-sm font-semibold">Address:{title =="Bill to Party" ?storeAddress:customerAddress}</p>
                  <div className={`border-b border-gray-300 h-6`}></div>
                </div>
                <div className="grid grid-cols-1" >
                  <p className="text-sm font-semibold">Supplier State:{title =="Bill to Party" ?state:""}</p>
                  <div className={`border-b border-gray-300 h-6`}></div>
                </div>
                <div className="grid grid-cols-1" >
                  <p className="text-sm font-semibold">GSTIN:</p>
                  <div className={`border-b border-gray-300 h-6`}></div>
                </div>
                <div className="grid grid-cols-1" >
                  <p className="text-sm font-semibold">State: {title =="Bill to Party" ?state:""}</p>
                  <div className={`border-b border-gray-300 h-6`}></div>
                </div>
                <div className="grid grid-cols-1" >
                  <p className="text-sm font-semibold">Mobile No: {title =="Bill to Party" ?storePhone:""}</p>
                  <div className={`border-b border-gray-300 h-6`}></div>
                </div>
                <div className="grid grid-cols-1" >
                  <p className="text-sm font-semibold">Email :</p>
                  <div className={`border-b border-gray-300 h-6`}></div>
                </div>
              
            </div>
          </div>
        ))}
      </div>

      {/* Item Table */}
      <div className="mt-6">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {["S.No.", "Particulars", "Qty", "Unit", "Rate", "Amount"].map((th, i) => (
                <th key={i} className="border border-gray-300 p-2 text-sm text-left">
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
{orderDetails.map((el,ixd)=>{  return( <tr key={ixd}>
              <td className="border border-gray-300 p-2 text-sm">{ixd}</td>
              <td className="border border-gray-300 p-2 text-sm">{el.name}</td>
              <td className="border border-gray-300 p-2 text-sm">{el.billQty}</td>
              <td className="border border-gray-300 p-2 text-sm">{el.gram}</td>
              <td className="border border-gray-300 p-2 text-sm">{el.orderPrice}</td>
              <td className="border border-gray-300 p-2 text-sm">{el.orderPrice}</td>
              
            </tr>)})}
            {/* {[...Array(5)].map((_, i) => (
              <tr key={i}>
                {[...Array(7)].map((_, j) => (
                  <td key={j} className="border border-gray-300 p-2 text-sm">{j === 0 ? i + 2 : ""}</td>
                ))}
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-2 mt-4">
        <div className="text-sm">
          <p className="font-semibold">Amount (in words):</p>
          <p>Rupees ___________________________</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {/* {["GRAND TOTAL", "TAX", "TOTAL Rs.","RP"].map((label, i) => ( */}
            <React.Fragment >
              <div className="text-right font-semibold">RP</div>
              <div className="border border-gray-300 p-1 text-right">
                {reedemPoint}
              </div>
            </React.Fragment>
        {/* //   ))} */}
        </div>
      </div>

      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm border-t border-gray-300 pt-4">
  {/* Left - Box with E.& O.E. and note */}
  <div className="border border-gray-300">
    <div className="bg-gray-100 p-2 font-semibold border-b border-gray-300">Terms & Conditions</div>
    <div className="p-2">
      <p className="font-semibold">E.& O.E.</p>
      <p className="mt-1 text-sm">
        1. This is computer generated invoice signature not required.
      </p>
    </div>
  </div>

  {/* Right - Website and jurisdiction */}
  <div className="flex flex-col justify-between">
    <div>
      <p>
        For terms & condition refer our website :-{" "}
        <a
          href="https://www.sarvswapn.com"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.BRK.com
        </a>
      </p>
    </div>
    <div className="mt-2">
      <p>Subject to "Jaisalmer" Jurisdiction only</p>
    </div>
  </div>
</div>
    </div>
  );
}
