import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { payPalConfirm } from "../actions/cartActions";

const PayPalSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(payPalConfirm());
  }, []);
  return <div>Your Payment was successful!</div>;
};

export default PayPalSuccess;
