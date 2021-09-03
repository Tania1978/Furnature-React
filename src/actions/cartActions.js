import back from "../apis/back";
import history from "../history";

export const getCart = () => {
  return async (dispatch, getState) => {
  
      const token = getState().user.jwtToken;
      const response = await back.get("/users/getCart", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data);
      dispatch({
        type: "GET_CART",
        payload: response.data,
      });

  };
};

export const addProductToCart = (id, price) => {
  try {
    return async (dispatch, getState) => {
      const token = getState().user.jwtToken;
      const res = await back.post(
        "/users/addProductToCart/" + id,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const response = await back.get("/users/getCart", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      dispatch({
        type: "ADD_PRODUCT_TO_CART",
        payload: response.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const removeProductFromCart = (id, price) => {
  try {
    return async (dispatch, getState) => {
      const token = getState().user.jwtToken;
      const response = await back.delete("/users/removeProductFromCart/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      dispatch({
        type: "REMOVE_PRODUCT_FROM_CART",
        payload: {
          id: id,
          price: price,
        },
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const pay = (price) => {
  try {
    return async (dispatch, getState) => {
      const token = getState().user.jwtToken;

      let data = {
        price: price,
        currency: "EUR",
        method: "PayPal",
        intent: "sale",
        description: "Furnature",
      };

      const datajson = JSON.stringify(data);

      const response = await back.post("/paypal/pay", datajson, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      window.open(response.data.message);
    };
  } catch (error) {
    console.log(error);
  }
};

export const payPalConfirm = () => {
  try {
    return async (dispatch, getState) => {
      const token = getState().user.jwtToken;
      const response = await back.post(
        "/users/orders",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
    };
  } catch (error) {
    console.log(error);
  }
};
