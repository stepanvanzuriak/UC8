const initState = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default rootReducer;
