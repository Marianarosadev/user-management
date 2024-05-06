const initialState = {
  usersList: null,
}

const usersReducer = (state = initialState, action) => {
  return {
    ...state,
    usersList: action.payload
  };
};

export default usersReducer;