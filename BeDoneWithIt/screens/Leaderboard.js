import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const Leaderboard = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  let keys = [];
  let valueDummy = [];

  const readItemFromStorage = async () => {
    keys = await AsyncStorage.getAllKeys();
    valueDummy = await AsyncStorage.multiGet(keys);
    setValue(valueDummy);
  };

  useEffect(() => {
    readItemFromStorage();
    setLoading(false);
  }, []);

  let leaders = value.length ? value.sort((x, y) => +x[1] - +y[1]) : [];

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading.............</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 15, color: "#2b9348", fontSize: 25 }}>
          LEADERBOARD
        </Text>
        <View
          style={{
            flexDirection: "column",
            borderWidth: 1,
            width: 300,
            borderColor: "#2b9348",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              borderColor: "#2b9348",
            }}
          >
            <Text style={{ color: "#2b9348" }}>Rank</Text>
            <Text style={{ color: "#2b9348" }}>Name</Text>
            <Text style={{ color: "#2b9348" }}>Time</Text>
          </View>
        </View>
        {leaders.map((leader, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              borderWidth: 1,
              width: 300,
              borderColor: "#2b9348",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                flex: 1,
                borderRightWidth: 1,
                borderColor: "#2b9348",
                color: "#2b9348",
              }}
            >
              {index + 1}
            </Text>
            <Text
              style={{
                textAlign: "center",
                flex: 1,
                borderRightWidth: 1,
                borderColor: "#2b9348",
                color: "#2b9348",
              }}
            >
              {leader[0]}
            </Text>
            <Text
              style={{
                textAlign: "center",
                flex: 1,
                borderColor: "#2b9348",
                color: "#2b9348",
              }}
            >
              {leader[1]}
            </Text>
          </View>
        ))}
        <View
          style={{
            borderWidth: 1,
            borderColor: "#2b9348",
            justifyContent: "center",
            alignItems: "center",
            width: 125,
            marginTop: 50,
          }}
        >
          <Text
            style={{ color: "#2b9348" }}
            onPress={() => navigation.navigate("Home")}
          >
            Home
          </Text>
        </View>
      </View>
    );
  }
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -100,
    backgroundColor: "black",
  },
});
