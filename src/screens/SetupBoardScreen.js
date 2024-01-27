import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import ThemeContext from "../contexts/ThemeContext";
import titleStyle from "../styles/titleStyle";
import menuButtonStyle from "../styles/menuButtonStyle";
import backButtonStyle from "../styles/backButtonStyle";
import BackButton from "../components/backButton";

const SetupBoardScreen = ({ navigation }) => {
  const { theme, toggleTheme, isDarkTheme } = useContext(ThemeContext);
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");

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
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 10,
    },
  });

  const addPlayer = () => {
    setPlayers([...players, newPlayerName]);
    setNewPlayerName("");
  };

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} style={backButtonStyle} />
      <Text style={styles.title}>Setup Yatzy Board</Text>
      {players.map((player, index) => (
        <Text key={index}>{player}</Text>
      ))}
      <TextInput
        style={styles.input}
        onChangeText={setNewPlayerName}
        value={newPlayerName}
        placeholder="Enter player name"
      />
      <Button title="Add Player" onPress={addPlayer} />
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("YatzyBoardScreen", { players })}
      >
        <Text style={styles.buttonText}>Start!</Text>
      </Pressable>
    </View>
  );
};

export default SetupBoardScreen;
