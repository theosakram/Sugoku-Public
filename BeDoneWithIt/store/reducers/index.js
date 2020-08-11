const initialState = {
  board: [],
  board2: [],
  status: "",
};

function boardReduce(state = initialState, action) {
  switch (action.type) {
    case "SET_BOARD":
      return {
        ...state,
        board: action.payload,
      };

    case "SET_BOARD2":
      return {
        ...state,
        board2: action.payload,
      };

    case "SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
}

export default boardReduce;
