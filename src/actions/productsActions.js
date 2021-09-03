import back from "../apis/back";

export const getProducts = () => {
  return async (dispatch) => {
    const response = await back.get("/products");
    console.log(response.data);
    dispatch({
      type: "GET_PRODUCTS",
      payload: response.data,
    });
  };
};
