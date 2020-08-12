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
      <Text style={{ color: "#2b9348" }}>Congratulations, you win,</Text>
      <Text style={{ fontSize: 30, color: "#2b9348" }}>{name}</Text>
      <Text style={{ color: "#2b9348" }}>
        {" "}
        Your record is {recordedTime} second(s)
      </Text>
      <Text style={{ color: "#2b9348" }}>Your parents must be proud :)</Text>
      <View
        style={{
          marginTop: 50,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            marginRight: 15,
            borderWidth: 1,
            borderColor: "#2b9348",
            justifyContent: "center",
            alignItems: "center",
            width: 75,
            height: 30,
          }}
        >
          <Text
            onPress={() => navigation.navigate("Home")}
            style={{ color: "#2b9348" }}
          >
            {" "}
            Home{" "}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#2b9348",
            justifyContent: "center",
            alignItems: "center",
            width: 125,
          }}
        >
          <Text
            style={{ color: "#2b9348" }}
            onPress={() => navigation.navigate("Leaderboard")}
          >
            Leaderboard
          </Text>
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
    backgroundColor: "black",
  },
});
