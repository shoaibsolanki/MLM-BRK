"use client";
import React, { useState } from "react";
import ItemsShowInSide from "./ItemsShowInSide";

import { useNavigate } from "react-router-dom";
import CheckoutPage from "./CheckoutPage";
import HorizontalLinearAlternativeLabelStepper from "../components/MicroComponant/HorizontalLinearAlternativeLabelStepper";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthConext";

const Checkout = () => {
  const { cart, totalPirce } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // if (!isAuthenticated) {
  //   return navigate("/login");
  // }
  if (cart?.lenght === 0) {
    return navigate("/");
  } else
    return (
      <div className="my-4  px-1">
        <HorizontalLinearAlternativeLabelStepper activeStep={1} />
        <div className="flex  justify-center max-md:flex-col-reverse ">
          <CheckoutPage />
          <ItemsShowInSide items={cart} />
        </div>
      </div>
    );
};

export default Checkout;
