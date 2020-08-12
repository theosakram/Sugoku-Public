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
        <Text style={{ marginBottom: 15, color: "#009B72", fontSize: 25 }}>
          LEADERBOARD
        </Text>
        <View
          style={{
            flexDirection: "column",
            borderWidth: 1,
            width: 300,
            borderColor: "#009B72",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              borderColor: "#009B72",
            }}
          >
            <Text>Rank</Text>
            <Text>Name</Text>
            <Text>Time</Text>
          </View>
        </View>
        {leaders.map((leader, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              borderWidth: 1,
              width: 300,
              borderColor: "#009B72",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                flex: 1,
                borderRightWidth: 1,
                borderColor: "#009B72",
              }}
            >
              {index + 1}
            </Text>
            <Text
              style={{
                textAlign: "center",
                flex: 1,
                borderRightWidth: 1,
                borderColor: "#009B72",
              }}
            >
              {leader[0]}
            </Text>
            <Text
              style={{ textAlign: "center", flex: 1, borderColor: "#009B72" }}
            >
              {leader[1]}
            </Text>
          </View>
        ))}
        <View style={{ marginTop: 50 }}>
          <Button
            color="#009B72"
            onPress={() => navigation.navigate("Home")}
            title="Home"
          />
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
  },
});
