const initialState = {
  success: "",
  error: "",
};

const SuccessErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUCCESS_MESSAGE":
      return {
        success: action.payload,
        error: "",
      };
    case "LOG_OUT":
      return initialState;
    case "ERROR_MESSAGE":
      return {
        success: "",
        error: action.payload,
      };
    default:
      return initialState;
  }
};

export default SuccessErrorReducer;
