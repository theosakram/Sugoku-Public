import React from "react";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { End, Game, Home, Leaderboard } from "./screens";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store";

enableScreens();
const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="End" component={End} />
          <Stack.Screen name="Leaderboard" component={Leaderboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
