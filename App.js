import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import ThemeProvider from "./src/contexts/ThemeProvider";
import BoardProvider from "./src/contexts/BoardProvider";

export default function App() {
  return (
    <>
      <ThemeProvider>
        <BoardProvider>
          <StatusBar style="auto" />
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </BoardProvider>
      </ThemeProvider>
    </>
  );
}
