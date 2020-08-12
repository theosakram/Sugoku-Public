import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import {
  setBoardAsync,
  autoSolve,
  setBoard2,
  validateBoard,
  setStatus,
} from "../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import CountDown from "react-native-countdown-component";

export default function App({ route, navigation }) {
  const dispatch = useDispatch();
  const { difficulty, name } = route.params;
  const { board, board2, status } = useSelector((state) => state);
  const toBeMapped = board2.length ? board2 : board;
  const countdownTime =
    difficulty === "easy" ? 180 : difficulty === "medium" ? 120 : 60;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(setBoardAsync(difficulty));
    setLoading(false);
    dispatch(setStatus(""));
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

  let isRunning = status === "solved" ? false : true;
  const [recordedTime, setRecordedTime] = useState(0);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading.............</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <CountDown
            running={isRunning}
            until={countdownTime}
            size={30}
            onFinish={() => {
              if (
                status === "unsolved" ||
                status === "broken" ||
                status === ""
              ) {
                alert("You lose");
                navigation.navigate("Home");
              }
            }}
            onChange={(test) => {
              setRecordedTime(countdownTime - test);
            }}
            digitStyle={{ backgroundColor: "black" }}
            digitTxtStyle={{ color: "#2b9348" }}
            timeToShow={["M", "S"]}
            timeLabels={{ m: "", s: "" }}
            separatorStyle={{ color: "#2b9348" }}
            showSeparator
          />
          {toBeMapped.map((arr, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                marginBottom: (index + 1) % 3 === 0 ? 10 : 2.5,
                borderColor: "#2b9348",
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
                    borderColor: "#2b9348",
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
                      color: board[index][index1] == 0 ? "white" : "#2b9348",
                      elevation: board[index][index1] == 0 ? 0 : 100,
                    }}
                    maxLength={1}
                    value={val == 0 ? "" : val.toString()}
                  />
                </View>
              ))}
            </View>
          ))}
        </KeyboardAvoidingView>
        <View
          style={{
            flexDirection: "row",
            marginTop: 25,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              borderRadius: 5,
              borderColor: "#2b9348",
              borderWidth: 1,
              width: 150,
              height: 35,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {status === "solved" ? (
              <Text
                style={{ color: "#2b9348" }}
                onPress={() => {
                  navigation.navigate("End", { name, recordedTime });
                }}
              >
                Finish
              </Text>
            ) : (
              <Text
                style={{ color: "#2b9348" }}
                onPress={() => validation(board2)}
              >
                Validate
              </Text>
            )}
          </View>
          <View
            style={{
              marginLeft: 25,
              borderRadius: 5,
              borderColor: "#2b9348",
              borderWidth: 1,
              width: 150,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text onPress={() => solve(board)} style={{ color: "#2b9348" }}>
              {" "}
              Solve
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -50,
    backgroundColor: "black",
  },
});
