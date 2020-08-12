import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const End = ({ route, navigation }) => {
  const { name, recordedTime } = route.params;

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }

    console.log("Done.");
  };

  useEffect(() => {
    // clearAll();
    storeData(name, String(recordedTime));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Congratulations, you win,</Text>
      <Text style={{ fontSize: 30 }}>{name}</Text>
      <Text> Your record is {recordedTime} second(s)</Text>
      <Text>Your parents must be proud :)</Text>
      <View style={{ marginTop: 50, flexDirection: "row" }}>
        <View style={{ marginRight: 15 }}>
          <Button
            color="#009B72"
            onPress={() => navigation.navigate("Home")}
            title="Home"
          />
        </View>
        <View style={{ marginRight: 15 }}>
          <Button
            color="#009B72"
            onPress={() => navigation.navigate("Leaderboard")}
            title="Leaderboard"
          />
        </View>
      </View>
    </View>
  );
};

export default End;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
