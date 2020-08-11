import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const Home = ({ navigation }) => {
  const difficulties = ["easy", "medium", "hard"];
  const [name, setName] = useState("");

  function nameChange(text) {
    setName(text);
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => nameChange(text)}
        placeholder="Username"
        style={{ height: 100 }}
        value={name}
      />
      <View>
        {difficulties.map((difficulty, index) => (
          <Button
            key={index}
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
        ))}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
  },
});
