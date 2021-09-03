import axios from "axios";

export const signIn = () => {
  return {
    type: "SIGN_IN",
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    const data = { username: username, password: password };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/authenticate",
        data
      );
      console.log(response);

      dispatch({
        type: "LOGIN",
        payload: response.data,
      });
     
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "ERROR_MESSAGE",
          payload: error.response.data.message,
        });
        console.log(error.response.data.message);
      }
    }
  };
};

export const register = (formData) => {
  try {
    return async (dispatch) => {
      const data = {
        title: formData.title,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      };
      const response = await axios.post(
        "http://localhost:8080/api/register",
        data
      );
      if (response.data.message) {
        dispatch({
          type: "SUCCESS_MESSAGE",
          payload: response.data.message,
        });
      } else {
        dispatch({
          type: "ERROR_MESSAGE",
          payload: response.data.message,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};
