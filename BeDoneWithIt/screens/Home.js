import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";

const Home = ({ navigation }) => {
  const difficulties = ["easy", "medium", "hard"];
  const [name, setName] = useState("");

  function nameChange(text) {
    setName(text);
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 35, color: "#009B72" }}>SEPPUKU</Text>
      <TextInput
        onChangeText={(text) => nameChange(text)}
        placeholder="You got a name?"
        style={{ height: 100, color: "black", borderColor: "black" }}
        value={name}
      />
      <View style={{ flexDirection: "row" }}>
        {difficulties.map((difficulty, index) => (
          <View style={{ marginRight: 10 }} key={index}>
            <Button
              color={
                index === 0 ? "#3EFF8B" : index === 1 ? "#FFBA08" : "#D00000"
              }
              title={difficulty}
              onPress={() => {
                name.length
                  ? navigation.navigate("Game", {
                      difficulty,
                      name,
                    })
                  : alert("Name cannot be empty");
                setName("");
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
