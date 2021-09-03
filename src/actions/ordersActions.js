import back from "../apis/back";

export const getUserOrders = () => {
  try {
    return async (dispatch, getState) => {
      const token = getState().user.jwtToken;
      const response = await back.get("/users/orders", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      console.log(response);

      dispatch({
        type: "GET_ORDERS",
        payload: response.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
