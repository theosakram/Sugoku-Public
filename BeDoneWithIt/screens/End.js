import React from "react";
import { View, Text, Button } from "react-native";

const End = ({ route, navigation }) => {
  const { name } = route.params;
  return (
    <View>
      <Text>Selamat, anda menang, {name}. Orang tua anda pasti bangga :)</Text>
      <View>
        <Button onPress={() => navigation.navigate("Home")} title="Home" />
      </View>
    </View>
  );
};

export default End;
