import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders } from "../actions/ordersActions";
import OrderDisplay from "./OrderDisplay";

const Orders = () => {
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.userOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const renderedList = orders.map((order) => {
    return (
      <div className="">
        <OrderDisplay
          id={order.id}
          datePlaced={order.datePlaced.substring(0, 10)}
          totalAmount={order.totalAmount}
          totalDiscount={order.totalDiscount}
          shippingAddress={`${order.shipAddressDto.streetName},${order.shipAddressDto.houseNumber},${order.shipAddressDto.city},${order.shipAddressDto.postalCode},${order.shipAddressDto.country}`}
          status={order.status.name}
          details={order.ordersDetailsDtoList}
        />
      </div>
    );
  });

  return (
    <div className="min-h-screen">
      {orders ? (
        <div>
          {orders.length > 0 ? (
            <div>{renderedList}</div>
          ) : (
            <div>No orders yet!</div>
          )}
        </div>
      ) : (
        <div>Loading..</div>
      )}
    </div>
  );
};

export default Orders;
