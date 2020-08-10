const initialState = {
  board: [],
};

function boardReduce(state = initialState, action) {
  switch (action.type) {
    case "SET_BOARD":
      return {
        ...state,
        board: action.payload,
      };

    default:
      return state;
  }
}

export default boardReduce;
