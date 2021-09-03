import { pipelineTopicExpression } from "@babel/types";
import React from "react";

const OrderDisplay = (props) => {
  return (
    <div className="ml-40 text-xs">
      <table className="w-4/5">
        <thead className="bg-teal-700 text-white text-xs">
          <tr>
            <td>OrderId</td>
            <td>Date Placed</td>
            <td>Total Discount</td>
            <td>Total Amount</td>
            <td>Shipping Address</td>
            <td>Status</td>
            <td colSpan={2}></td>
          </tr>
         
        </thead>
        <tbody>
          <tr>
            <td>{props.id}</td>
            <td>{props.datePlaced}</td>
            <td>{props.totalDiscount}</td>
            <td>{props.totalAmount}</td>
            <td>{props.shippingAddress}</td>
            <td>{props.status}</td>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td className="h-10" colSpan={8}></td>
          </tr>
          <tr>
            <td className="bg-teal-50 font-bold" colSpan={8}>
              Products
            </td>
          </tr>
          {props.details.map((item) => {
            return (
              <>
                <tr className="font-bold">
                  <td>Photo</td>
                  <td>Sku</td>
                  <td>Name</td>
                  <td>Decription</td>
                  <td>Category</td>
                  <td>Style</td>
                  <td>Quantity</td>
                  <td>Price(Eur)</td>
                </tr>
                <tr>
                  <td>
                    <img
                      className="w-10 h-15"
                      src={item.product.productImagePaths[0]}
                    />
                  </td>
                  <td>{item.product.sku}</td>
                  <td>{item.product.name}</td>
                  <td>{item.product.description}</td>
                  <td>{item.product.category}</td>
                  <td>{item.product.style}</td>
                  <td>{item.quantity}</td>
                  <td>{item.product.price}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDisplay;
