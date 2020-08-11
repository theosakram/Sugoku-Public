import React, { useEffect } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import {
  setBoardAsync,
  autoSolve,
  setBoard2,
  validateBoard,
} from "../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import CountDown from "react-native-countdown-component";

export default function App({ route, navigation }) {
  const dispatch = useDispatch();
  const { difficulty, name } = route.params;
  const { board, board2, status } = useSelector((state) => state);
  const toBeMapped = board2.length ? board2 : board;

  useEffect(() => {
    dispatch(setBoardAsync(difficulty));
  }, []);

  useEffect(() => {
    dispatch(setBoard2(board));
  }, [board]);

  useEffect(() => {
    if (status === "unsolved" || status === "broken") {
      alert("Board not solved");
    }
  }, [status]);

  function numChange(text, data) {
    const anotherBoard = JSON.parse(JSON.stringify(board2));
    anotherBoard[data.index][data.index1] = +text;
    dispatch(setBoard2(anotherBoard));
  }

  function solve(data) {
    dispatch(autoSolve(data));
  }

  function validation(data) {
    dispatch(validateBoard(data));
  }

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 50, fontSize: 35, color: "#20bf55" }}>
        SEPPUKU
      </Text>
      <CountDown
        until={60}
        size={30}
        onFinish={() => {
          alert("You lose");
          navigation.navigate("Home");
        }}
        digitStyle={{ backgroundColor: "#FFF" }}
        digitTxtStyle={{ color: "#1CC625" }}
        timeToShow={["M", "S"]}
        timeLabels={{ m: "MM", s: "SS" }}
      />
      {toBeMapped.map((arr, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            marginBottom: (index + 1) % 3 === 0 ? 10 : 3,
          }}
        >
          {arr.map((val, index1) => (
            <View
              key={index1}
              style={{
                borderWidth: 0.5,
                borderRadius: 5,
                width: 30,
                height: 30,
                marginRight: (index1 + 1) % 3 === 0 ? 10 : 3,
                borderColor: "#20bf55",
                backgroundColor:
                  board[index][index1] == 0 ? "black" : "#20bf55",
              }}
            >
              <TextInput
                onChangeText={(text) =>
                  numChange(isNaN(+text) ? "" : text, { index, index1 })
                }
                keyboardType={"numeric"}
                editable={board[index][index1] == 0 ? true : false}
                style={{
                  textAlign: "center",
                  color: board[index][index1] == 0 ? "#20bf55" : "black",
                }}
                maxLength={1}
                value={val == 0 ? "" : val.toString()}
              />
            </View>
          ))}
        </View>
      ))}
      <View style={{ flexDirection: "row", marginTop: 25 }}>
        <View
          style={{
            marginRight: 25,
          }}
        >
          {status === "solved" ? (
            <Button
              title="Finish"
              onPress={() => {
                navigation.navigate("End", { name });
              }}
            />
          ) : (
            <Button
              color="#20bf55"
              title="Validate"
              onPress={() => validation(board2)}
            />
          )}
        </View>
        <View style={{ marginLeft: 25 }}>
          <Button color="#20bf55" title="Solve" onPress={() => solve(board)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    color: "#20bf55",
  },
});
