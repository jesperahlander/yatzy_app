import React, { useContext } from "react";
import { StyleSheet, View, Text, Button, Switch } from "react-native";
import ThemeContext from "../contexts/ThemeContext";
import titleStyle from "../styles/titleStyle";
import menuButtonStyle from "../styles/menuButtonStyle";
import backButtonStyle from "../styles/backButtonStyle";
import BackButton from "../components/backButton";

const SettingsScreen = ({ navigation }) => {
  const { theme, toggleTheme, isDarkTheme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.backgroundColor,
    },
    title: titleStyle,
    button: menuButtonStyle,
    buttonText: {
      fontSize: 16,
    },
    backButton: backButtonStyle,
  });

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} style={backButtonStyle} />
      <Text style={styles.title}>Settings</Text>
      <Text>Toggle Dark Mode</Text>
      <Switch
        style={{ marginTop: 10 }}
        trackColor={{ false: "#767577", true: "#c9c9c9" }}
        thumbColor={isDarkTheme ? "#2d2d30" : "#b9b9b9"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleTheme}
        value={isDarkTheme}
      />
    </View>
  );
};

export default SettingsScreen;
