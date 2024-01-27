import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import YatzyBoardScreen from "../screens/YatzyBoardScreen";
import SetupBoardScreen from "../screens/SetupBoardScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="YatzyBoardScreen" component={YatzyBoardScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="SetupBoardScreen" component={SetupBoardScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
