const AddressReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ADDRESSES":
      return action.payload;
    case "ADD_ADDRESS":
      return [...state, action.payload];
    case "DELETE_ADDRESS":
      return state.filter((element) => element.id != action.payload);
    default:
      return state;
  }
};

export default AddressReducer;
