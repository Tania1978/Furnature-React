import back from "../apis/back";

export const updateUser = (formValues) => {
  return async (dispatch, getState) => {
    const token = getState().user.jwtToken;
    const response = await back
      .put("/users/update", formValues, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        dispatch({
          type: "UPDATE_USER",
          payload: formValues,
        });
        dispatch({
          type: "SUCCESS_MESSAGE",
          payload: response.data.message,
        });
      })
      .catch(function (error) {
        if (error.response) {
          dispatch({
            type: "ERROR_MESSAGE",
            payload: error.response.data.details,
          });
          console.log(error.response.data.details);
        }
      });
  };
};
