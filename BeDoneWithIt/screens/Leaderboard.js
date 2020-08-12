import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const Leaderboard = ({ navigation }) => {
  const [value, setValue] = useState("");
  let keys = [];
  let valueDummy = [];

  const readItemFromStorage = async () => {
    keys = await AsyncStorage.getAllKeys();
    valueDummy = await AsyncStorage.multiGet(keys);
    setValue(valueDummy);
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  let leaders = value.sort((x, y) => +x[1] - +y[1]);

  return (
    <View>
      <Text>INI LEADERBOARD</Text>
      {leaders.map((leader) => (
        <Text>
          Name: {leader[0]}, Time: {leader[1]}{" "}
        </Text>
      ))}
      <View style={{ marginTop: 50 }}>
        <Button onPress={() => navigation.navigate("Home")} title="Home" />
      </View>
    </View>
  );
};

export default Leaderboard;
