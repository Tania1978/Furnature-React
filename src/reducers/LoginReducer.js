const LoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOG_OUT":
      return {};
    case "UPDATE_USER":
      const updatedUser = { ...state };
      updatedUser.firstName = action.payload.firstName;
      updatedUser.lastName = action.payload.lastName;
      updatedUser.username = action.payload.username;
      updatedUser.email = action.payload.email;
      updatedUser.phoneNumber = action.payload.phoneNumber;
      return updatedUser;
    default:
      return state;
  }
};

export default LoginReducer;
