import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthConext";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DataService from "../services/requestApi";
import { BASEURL } from "../services/http-common";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const CheckoutPage = () => {
  const {
    authData,
    setIsPaymentSuccessful,
    login,
    isAuthenticated,
    getOrderHistory,
    useRewards,
    rewardPoint,
    isBonusPoint,
    setBonusPoint
  } = useAuth();
  const { cart, totalPrice,totalMRp, clearCart, totalPricePlusDeliveryCharge } =
    useCart();

  const TotalOrderQeuntity = cart.reduce((total, item) => {
    return total + item.product_qty;
  }, 0);
  const navigate = useNavigate();
  const { id, saasId, storeId, mobileNumber, name } = authData;
  const [billingAddress, setBillingAddress] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showNewAddressForm, setShowNewAddressForm] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState();
  const [selectedMethod, setSelectedMethod] = useState("cod");
  const [deliveryMethod, setDeliveryMethod] = useState('Delivery')

  const [isLoading, setIsLoading] = useState(false);

  const storedData = JSON.parse(localStorage.getItem("store_data"));
  const { deliveryCharges, } = storedData;

  useEffect(() => {
console.log("selectedMethod",selectedMethod)

    if (showNewAddressForm) {
      setSelectedAddress(null);
    }
  }, [showNewAddressForm]);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/customer-registration/organization1/self");
    }
  }, [isAuthenticated]);
  const handlePaymentChange = (type) => {
    setSelectedMethod(type);
    console.log(selectedMethod);
  };

  const {
    register,
    handleSubmit,
    isSubmitting,
    formState: { errors },
  } = useForm();

  const handleAddressSelect = (id) => {
    setSelectedAddress(id);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded successfully.");
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script.");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
// Calculate discounted total
const rewardValue = rewardPoint?.points ?? 0;
const discountedTotal = Math.max(totalPrice - rewardValue, 0);
const TotalBonus = isBonusPoint ? (rewardPoint.bonusPoints - totalMRp === 0 ? rewardPoint.bonusPoints : rewardPoint.bonusPoints - totalMRp) : 0;
  const createRazorpayOrder = async () => {
    try {
      const data = {
        amount: useRewards ? discountedTotal : totalPrice,
        currency: "INR",
      };

      const authHeader = `Basic ${btoa(
        "rzp_test_USk6kNFvt2WXOE:afZsDDDaTvqhZPxMLH1p0b2t"
      )}`;

      const response = await axios.post(
        `${BASEURL.ENDPOINT_URL}/rezar/pay/${useRewards ? discountedTotal : totalPrice}/${storeId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );

      console.log("Razorpay order created:", response.data);
      return response.data.id;
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      throw error;
    }
  };

  const handleRazorpayPayment = async (formData) => {
    try {
      const orderId = await createRazorpayOrder();
      const options = {
        key: "rzp_test_USk6kNFvt2WXOE",
        amount: totalPricePlusDeliveryCharge * 100,
        currency: "INR",
        name: "BRK",
        description: "Test Transaction",
        image: "",
        order_id: orderId,
        handler: async function (response) {
          console.log(response);
          await handlePlaceOrder(formData, response);
          setIsPaymentSuccessful(true);
          clearCart();
        },
        prefill: {
          name: `${formData.first_name} ${formData.last_name}`,
          email: formData.email,
          contact: formData.Mobile_numbers,
        },
        notes: {
          address: formData["Street Address"],
        },
        theme: {
          color: "#003f62",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error handling Razorpay payment:", error);
    }
  };
  const onSubmit = async (data) => {
    // If online selected and reward points are enough to cover the total
    if (
      selectedMethod === "online" &&
      useRewards &&
      rewardPoint?.points >= totalPrice
    ) {
      await handlePlaceOrder(data, {}, "paid"); // Directly place order, no Razorpay
    } else {
      handleRazorpayPayment(data); // Proceed with Razorpay flow
    }
  };
  const deleteAddress = async (id, saasId, storeId) => {
    try {
      const response = await DataService.DeleteAddress(id, saasId, storeId);
    } catch (error) {
      console.error(error);
    }
  };

 
  const onCodSubmit = async (data,paymentResponse) => {
    try {
      console.log("Total Bonuse",TotalBonus , totalMRp,rewardPoint.bonusPoints)
      if(!data.address_id && deliveryMethod == "Delivery"){
        console.log(data.address_id);
         setSnackbar({
          open: true,
          message: "Please select an address",
          severity: "error",
        });
        return;
      }
      const updatedCart = cart.map((item) => ({ ...item ,new_price:item?.price *item?.productQty }));
      if(updatedCart?.length == 0 ){
        setSnackbar({
          open: true,
          message: "Cart is empty",
          severity: "error",
        });
        return;
      }
      setIsLoading(true)
      const orderInformations = {
        address_id: deliveryMethod == "Pickup"?"":data.address_id,
        customer_id: id,
        customer_name: name,
        mobile_number: mobileNumber,
        saas_id: saasId,
        store_id: storeId,
        order_tax: 0,
        order_value: totalPrice,
        order_discount: 0,
        status: "pending",
        redeemRp:useRewards?rewardPoint?.points:"",
        deliveryCharges:deliveryCharges,
        payment_type: selectedMethod,
        order_qty: TotalOrderQeuntity,
        razorpay_order_id: selectedMethod=="online"?paymentResponse.razorpay_order_id:"",
        razorpay_payment_id: selectedMethod=="online"?paymentResponse.razorpay_payment_id:"",
        order_date: new Date(),
        order_type: deliveryMethod,
        item_list: updatedCart,
        bonusPoints: TotalBonus
      };

      localStorage.setItem("orderInformations", JSON.stringify(cart));
      const response = await DataService.CreateOrder(orderInformations);

      localStorage.setItem("orderMaster", JSON.stringify(response?.data));
      console.log("Order placed:", response);

      if (response.status === 200) {
        setBonusPoint(false)
        console.log("Order placed");
        setSnackbar({
          open: true,
          message:response?.data?.message,
          severity: "success",
        });
        await getOrderHistory(storeId,saasId,id);

        clearCart();
        setIsPaymentSuccessful(true);
        navigate("/profile");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setIsLoading(false);
    }finally{
      setIsLoading(false);
      setBonusPoint(false)
    }
  };
  const handleSaveAddress = async (data) => {
    const addressForSave = {
      address: `${data.street},${data.city},${data.state}`,
      address_type: data.address_type,
      street: data.street,
      store_id: storeId,
      saas_id: saasId,
      pincode: data.zipcode,
      city: data.city,
      state: data.state,
      status: "Active",
      customer_type: "Regular",
    };

    await saveAddress(addressForSave);
  };
  console.log("savedaddress", savedAddresses);
  const [customerName, setCustomerName] = useState();
  const handlePlaceOrder = async (data, paymentResponse = {}, paymentTypeOverride = null) => {

    
    try {
      const updatedCart = cart.map((item) => ({ ...item ,new_price:item?.price *item?.productQty }));
      if(updatedCart?.length == 0 ){
        setSnackbar({
          open: true,
          message: "Cart is empty",
          severity: "error",
        });
        return;
      }

      const orderInformations = {
        address_id: data.address_id,
        customer_id: id,
        customer_name: name,
        mobile_number: mobileNumber,
        saas_id: saasId,
        store_id: storeId,
        order_tax: 0,
        order_value: totalPrice,
        order_discount: 0,
        status: "pending",
        payment_type: paymentTypeOverride || selectedMethod,
        order_qty: TotalOrderQeuntity,
        redeemRp: useRewards ? Math.min(rewardPoint?.points, totalPrice) : "",
        deliveryCharges:deliveryCharges,
        razorpay_order_id:
        (paymentTypeOverride || selectedMethod) === "online" ? paymentResponse.razorpay_order_id : "",
      razorpay_payment_id:
        (paymentTypeOverride || selectedMethod) === "online" ? paymentResponse.razorpay_payment_id : "",
      order_date: new Date(),
        order_type: "",
        item_list: updatedCart,
        bonusPoints:TotalBonus
      };

      localStorage.setItem("orderInformations", JSON.stringify(cart));
      const response = await DataService.CreateOrder(orderInformations);

      localStorage.setItem("orderMaster", JSON.stringify(response.data));
      console.log("Order placed:", response);

      if (response.status === 200) {
        setBonusPoint(false)
        console.log("Order placed");
        getOrderHistory();

        clearCart();
        
        setIsPaymentSuccessful(true);
        navigate("/profile");

      }
    } catch (error) {
      console.error("Error placing order:", error);
    }finally{
      setBonusPoint(false)
    }
  };

  const saveAddress = async (data) => {
    try {
      const response = await DataService.SaveAddress(data, id);
      console.log("Address saved:", response);
      setShowNewAddressForm(false);
      getSavedData(); // Refresh the saved addresses list
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const getSavedData = async () => {
    try {
      const response = await DataService.GetSavedAddress(id, saasId, storeId);
      setSavedAddresses(response.data.data);
      if (response.data.data.length > 0) {
        setSelectedAddress(response.data.data[0].id);
      }
    } catch (error) {
      console.error("Error fetching saved addresses:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getSavedData();
    }
  }, [id]);

  const handleClose = () => {
    document.getElementById("my_modal_5").close();
    navigate("/cart/checkout/summary");
  };

  // autenticationPart

  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

 

  //fetching states:---
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              country: "India",
            }),
          }
        );
        const data = await response.json();
        setStates(data.data.states);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);
  console.log(states);

  return (
    <div className="w-full mx-auto p-4">

      {showNewAddressForm && isAuthenticated ? (
        <div className="bg-white border  border-gray-300 p-6 mb-6 rounded-md">
          <h3 className="text-primary uppercase font-medium text-sm">
            <span className="bg-light py-[1px] px-[3px] text-sm rounded-sm mr-1 ">
              1.2
            </span>{" "}
            add Shipping address
          </h3>
          <form className="" onSubmit={handleSubmit(handleSaveAddress)}>
            <div className="grid gap-4 grid-cols-2 max-md:grid-cols-1 w-full">
              <div className="form-group ">
                <label
                  htmlFor="streetAddress"
                  className="text-sm font-semibold"
                >
                  Street Address *
                </label>
                <input
                  {...register("street", { required: true })}
                  type="text"
                  id="streetAddress"
                  placeholder="Street Address"
                  className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full "
                />
                {errors.street && <span>This field is required</span>}
              </div>

              <div className="form-group">
                <label htmlFor="city" className="text-sm font-semibold">
                  Town / City *
                </label>
                <input
                  {...register("city", { required: true })}
                  type="text"
                  id="city"
                  placeholder="Town / City"
                  className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.city && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="state" className="text-sm font-semibold">
                  State
                </label>
                <select
                  {...register("state", { required: true })}
                  id="state"
                  className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="">Select your state</option>
                  {states.map((state, index) => (
                    <option key={index} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="zipCode" className="text-sm font-semibold">
                  Zip Code
                </label>
                <input
                  {...register("zipcode", { required: true })}
                  type="number"
                  id="zipCode"
                  placeholder="Zip Code"
                  className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.zipcode && <span>This field is required</span>}
              </div>
              <div className="form-group ">
                <label className="text-sm font-semibold">Address Type *</label>
                <div className="mt-2 flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      {...register("address_type", { required: true })}
                      type="radio"
                      value="Home"
                      className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="text-gray-700">Home</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      {...register("address_type", { required: true })}
                      type="radio"
                      value="Work"
                      className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="text-gray-700">Work</span>
                  </label>
                </div>
                {errors.address_type && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <span></span>
              <button
                type="submit"
                className="text-primary border-[1px] border-gray-200 py-2 px-6 uppercase font-medium text-sm hover:bg-gray-100"
              >
                Save address
              </button>
              {savedAddresses?.length !== 0 && (
                <button
                  onClick={() => setShowNewAddressForm(false)}
                  className="w-full py-3 bg-primary text-white text-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Use existing address
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <>
          {isAuthenticated && (
            <div className="bg-white border  gap-4 border-gray-300 p-6 mb-6 rounded-md">
              <div className="flex justify-between items-center max-sm:flex-col max-sm:w-full">
                <h3 className="text-primary uppercase font-medium text-sm">
                  <span className="bg-light py-[1px] px-[3px] text-sm rounded-sm mr-1 ">
                    1
                  </span>{" "}
                  Select Address
                </h3>{" "}
                <button
                  className="text-primary border-[1px] border-gray-200 py-2 px-6 uppercase font-medium text-sm hover:bg-gray-100  max-sm:w-full mt-2"
                  onClick={() => setShowNewAddressForm(true)}
                >
                  Add New Address
                </button>
              </div>
              {savedAddresses.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="mx-auto flex flex-col md:flex-row w-full justify-between rounded-xl p-4 my-2 bg-[#E0F4FF] text-primary"
                  >
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row items-start md:items-center mb-2">
                        <input
                          type="radio"
                          id={`address_${index}`}
                          {...register("address_id", { required: true })}
                          value={item.id.toString()}
                          checked={selectedAddress === item.id}
                          onChange={() => handleAddressSelect(item.id)}
                          className="accent-[#09147e] h-5 w-5 mt-1 md:mt-0"
                        />
                        <span className="text-lg font-semibold ml-2">
                          {item.address}
                        </span>
                        <span
                          className={`ml-2 ${
                            item.addressType === "Home"
                              ? "bg-second"
                              : "bg-primary"
                          } text-white text-xs font-semibold rounded px-2 py-1`}
                        >
                          {item.addressType}
                        </span>
                      </div>

                      <p className="text-sm">
                        <span className="font-semibold">
                          PinCode: {item.pincode}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                      <button
                        onClick={() => deleteAddress(item.id, saasId, storeId)}
                        className="text-[#0A66C2]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {!showNewAddressForm && isAuthenticated ? (
        <div className="bg-white p-4 border-[1px] rounded-md">
          <h3 className="text-primary uppercase font-medium text-sm">
            <span className="bg-light py-[1px] px-[3px] text-sm rounded-sm mr-1 ">
              2
            </span>{" "}
            Payment Option
          </h3>
          <div
            onClick={() => handlePaymentChange("online")}
            className={`mt-2 p-4  rounded-md flex gap-2 items-center bg-light `}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked ={selectedMethod === "online"}
              onChange={() => handlePaymentChange("online")}
              className="mr-2 bg-[#00B207] text-[#00B207]"
            />
            <h3 className="font-semibold text-[#4D4D4D]  ">Pay online</h3>
          </div>
          <div
            onClick={() => handlePaymentChange("COD")}
            className={`mt-2 p-4  rounded-md flex gap-2 items-center bg-light `}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="Cash on Delivery"
              checked ={selectedMethod === "COD"}
              onChange={() => handlePaymentChange("COD")}
              className="mr-2 bg-[#00B207] text-[#00B207]"
            />
            <h3 className="font-semibold text-[#4D4D4D]  ">Cash On Delivery</h3>
          </div>
          {selectedMethod == "online"? <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full mt-4 py-2 bg-[#00B207] text-white rounded-full text-lg  hover:bg-[#017f05]transition-colors mx-auto"
          >
            Pay and Place Order
          </button>:
          
          <button
            onClick={handleSubmit(onCodSubmit)}
            disabled={isLoading}
            className="w-full mt-4 py-2 bg-[#00B207] text-white rounded-full text-lg  hover:bg-[#017f05]transition-colors mx-auto"
          >
           {isLoading?"Order Booking..." :"Place Order"}
          </button>}
        </div>
      ) : (
        ""
      )}

      <dialog id="my_modal_5" className=" modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white text-dark shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 flex-shrink-0 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="font-bold text-lg ml-4">Order Successful!</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Your order has been placed successfully. Our team will reach out to
            you shortly with the next steps.
          </p>

          <div className="modal-action">
            <a
              href="tel:+917755821175"
              className="bg-green-500 text-white p-2 rounded-lg font-semibold inline-block"
            >
              Call us!
            </a>

            <button
              className=" bg-white text-dark p-2 rounded-lg font-semibold"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CheckoutPage;
