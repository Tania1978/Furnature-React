export const CartReducer = (cart = [], action) => {
  switch (action.type) {
    case "GET_CART":
      return action.payload;
    case "LOG_OUT":
      return [];
    case "ADD_PRODUCT_TO_CART":
      return action.payload;
    case "REMOVE_PRODUCT_FROM_CART":
      let reducedCart = JSON.parse(JSON.stringify(cart));
      reducedCart.map((item) => {
        item[8] = item[8] - action.payload.price;
        if (action.payload.id == item[9]) {
          item[6] = item[6] - 1;
        }
      });
      return reducedCart;
    default:
      return cart;
  }
};
