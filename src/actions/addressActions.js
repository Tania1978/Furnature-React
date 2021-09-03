import back from "../apis/back";

export const getAddresses = () => {
  try {
    return async (dispatch, getState) => {
      const token = getState().user.jwtToken;
      const response = await back.get("/users/addresses", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (!response.data.message) {
        dispatch({
          type: "GET_ADDRESSES",
          payload: response.data,
        });
      } else {
        dispatch({
          type: "SUCCESS_MESSAGE",
          payload: response.data.message,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const addAddress = (formData, shipping, billing) => {
  const ship = shipping == "shipping" ? true : false;
  const bill = billing == "billing" ? true : false;

  return async (dispatch, getState) => {
    const token = getState().user.jwtToken;
    const data = {
      streetName: formData.streetName,
      houseNumber: formData.houseNumber,
      postalCode: formData.postalCode,
      city: formData.city,
      country: formData.country,
      shipping: ship,
      billing: bill,
      myuser_id: getState().user.id,
    };

    const jsonData = JSON.stringify(data);
    try {
      const response = await back.post("/users/createaddress", jsonData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: "ADD_ADDRESS",
        payload: {
          streetName: formData.streetName,
          houseNumber: formData.houseNumber,
          postalCode: formData.postalCode,
          city: formData.city,
          country: formData.country,
          shipping: formData.shipping,
          billing: formData.billing,
        },
      });

      dispatch({
        type: "SUCCESS_MESSAGE",
        payload: response.data.message,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "ERROR_MESSAGE",
          payload: error.response.data.message,
        });
      }
    }
  };
};

export const deleteAddress = (id) => {
  console.log(id);
  return async (dispatch, getState) => {
    const token = getState().user.jwtToken;

    try {
      const response = await back.delete(`/users/deleteaddress/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: "DELETE_ADDRESS",
        payload: id,
      });

      dispatch({
        type: "SUCCESS_MESSAGE",
        payload: response.data.message,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "ERROR_MESSAGE",
          payload: error.response.data.message,
        });
      }
    }
  };
};
