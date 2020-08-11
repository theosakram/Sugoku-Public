const encodeBoard = (board) =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? "" : "%2C"}`,
    ""
  );

const encodeParams = (params) =>
  Object.keys(params)
    .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
    .join("&");

const setBoard = (data) => {
  return { type: "SET_BOARD", payload: data };
};

export const setBoard2 = (data) => {
  return { type: "SET_BOARD2", payload: data };
};

export const setStatus = (data) => {
  return { type: "SET_STATUS", payload: data };
};

export const validateBoard = (data) => {
  const newData = { board: data };
  return (dispatch) => {
    dispatch(setStatus(""));
    fetch("https://sugoku.herokuapp.com/validate", {
      method: "POST",
      body: encodeParams(newData),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((response) => dispatch(setStatus(response.status)))
      .catch(console.warn);
  };
};

export const setBoardAsync = (difficulty) => {
  return (dispatch) => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      .then((data) => data.json())
      .then((data) => {
        dispatch(setBoard(data.board));
      })
      .catch(console.log);
  };
};

export const autoSolve = (data) => {
  const newData = { board: data };
  return async (dispatch) => {
    try {
      fetch("https://sugoku.herokuapp.com/solve", {
        method: "POST",
        body: encodeParams(newData),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then((response) => response.json())
        .then((response) => dispatch(setBoard2(response.solution)))
        .catch(console.warn);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Fetching done");
    }
  };
};
