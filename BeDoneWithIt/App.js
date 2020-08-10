import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default function App() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    fetch("https://sugoku.herokuapp.com/board")
      .then((data) => data.json())
      .then(({ board }) => {
        setBoard(board);
      })
      .catch(console.log);
  }, []);

  return (
    <View style={styles.container}>
      {board.map((arr, index1) => (
        <View key={index1} style={{ flexDirection: "row" }}>
          {arr.map((val, index) => (
            <View style={{ borderWidth: 0.5, width: 40, height: 40 }}>
              <TextInput
                keyboardType={"numeric"}
                style={{ textAlign: "center" }}
                key={index}
                maxLength={1}
              >
                {val}
              </TextInput>
            </View>
          ))}
        </View>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
