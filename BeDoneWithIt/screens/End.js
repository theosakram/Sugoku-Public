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

  useEffect(() => {
    storeData(name, String(recordedTime));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Selamat, anda menang, {name}</Text>
      <Text> Waktu anda {recordedTime} detik</Text>
      <Text>Orang tua anda pasti bangga :)</Text>
      <View style={{ marginTop: 50 }}>
        <Button onPress={() => navigation.navigate("Home")} title="Home" />
      </View>
      <View style={{ marginTop: 50 }}>
        <Button
          onPress={() => navigation.navigate("Leaderboard")}
          title="Leaderboard"
        />
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
