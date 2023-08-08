import { ADD_RECORD } from './actions';

const initState = {
  records: [],
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_RECORD:
      return { ...state, records: [...state.records, action.payload] };
    default:
      return state;
  }
};

export default rootReducer;
