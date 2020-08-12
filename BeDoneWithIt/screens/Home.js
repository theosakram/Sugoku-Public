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
      <Text style={{ fontSize: 35, color: "#2b9348" }}>SEPPUKU</Text>
      <TextInput
        onChangeText={(text) => nameChange(text)}
        placeholder="You got a name?"
        style={{ height: 100, color: "#2b9348", borderColor: "black" }}
        value={name}
      />
      <View style={{ flexDirection: "row" }}>
        {difficulties.map((difficulty, index) => (
          <View
            style={{
              borderRadius: 5,
              borderColor: "#2b9348",
              borderWidth: 1,
              width: 100,
              height: 35,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginRight: index < 2 ? 15 : -5,
            }}
            key={index}
          >
            <Text
              style={{ color: "#2b9348", fontSize: 15 }}
              onPress={() => {
                name.length
                  ? navigation.navigate("Game", {
                      difficulty,
                      name,
                    })
                  : alert("Name cannot be empty");
                setName("");
              }}
            >
              {difficulty}
            </Text>
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
    backgroundColor: "black",
  },
});
