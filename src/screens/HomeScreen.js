import React, { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import ThemeContext from "../contexts/ThemeContext";
import titleStyle from "../styles/titleStyle";
import buttonStyle from "../styles/menuButtonStyle";

const HomeScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.backgroundColor,
    },
    title: titleStyle,
    button: buttonStyle,
    buttonText: {
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yatzy Sheet</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("YatzyBoardScreen")}
      >
        <Text style={styles.buttonText}>Yatzy Board</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("SetupBoardScreen")}
      >
        <Text style={styles.buttonText}>Add Players</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("SettingsScreen")}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
