import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pay } from "../actions/cartActions";

const OrderReview = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("rendered first time");
    console.log(user);
    console.log(cart);
  }, []);

  const renderedList = cart.map((item, index) => {
    return (
      <tr key={index}>
        <td className="border px-8 py-4">
          <img src={item[2]} className="w-10 h-10"></img>
        </td>
        <td className="border text-left px-8 py-4">{item[1]}</td>
        <td className="border text-left px-8 py-4">{item[3]}</td>
        <td className="border text-left px-8 py-4">{item[4]}</td>
        <td className="border text-left px-8 py-4">{item[6]}</td>
        <td className="border text-left px-8 py-4">{item[5]}</td>
      </tr>
    );
  });

  return (
    <div className="ml-40">
      <table className="shadow-lg bg-white">
        <thead>
          <tr>
            <th className="bg-teal-700 border text-left text-white px-8 py-4">
              Image
            </th>
            <th className="bg-teal-700 border text-left text-white px-8 py-4">
              Product Code
            </th>
            <th className="bg-teal-700 border text-left text-white px-8 py-4">
              Product Name
            </th>
            <th className="bg-teal-700 border text-left text-white px-8 py-4">
              Description
            </th>
            <th className="bg-teal-700 border text-left text-white px-8 py-4">
              Quantity
            </th>
            <th className="bg-teal-700 border text-left text-white px-8 py-4">
              Price (Euros)
            </th>
          </tr>
        </thead>
        <tbody>
          {renderedList}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="border text-left px-8 ">Price</td>
            <td className="border text-left px-8 ">{cart[0][8]}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="border text-left px-8 ">VAT (24%)</td>
            <td className="border text-left px-8 ">
              {Math.round(cart[0][8] * 0.24)}
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="border text-left px-8 bg-teal-700 text-white ">
              Total
            </td>
            <td className="border text-left px-8 bg-teal-700 text-white">
              {cart[0][8] + cart[0][8] * 0.24}
            </td>
          </tr>
        </tbody>
      </table>
      <div className=" w-2/5 ml-80">
        <button
          onClick={() => dispatch(pay(cart[0][8]))}
          className="border-1 rounded-sm py-2 bg-pink-700 w-40 text-white m-5"
        >
          Check me Out!
        </button>
        <button className="border-1 rounded-sm py-2 bg-teal-700 w-24 text-white">
          Back
        </button>
      </div>
    </div>
  );
};

export default OrderReview;
