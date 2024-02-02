import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import ThemeContext from "../contexts/ThemeContext";
import BoardContext from "../contexts/BoardContext";
import titleStyle from "../styles/titleStyle";
import menuButtonStyle from "../styles/menuButtonStyle";
import backButtonStyle from "../styles/backButtonStyle";
import BackButton from "../components/backButton";

const SetupBoardScreen = ({ navigation }) => {
  const { theme, toggleTheme, isDarkTheme } = useContext(ThemeContext);
  const { initialBoard, board, setBoard, addColumn } = useContext(BoardContext);
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
    addColumn(newPlayerName);
    setNewPlayerName("");
  };

  const resetBoard = () => {
    setPlayers([]); // Reset the players array
    setBoard(initialBoard); // Reset the board to its initial state
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
      <Pressable style={styles.button} onPress={() => console.log(board)}>
        <Text style={styles.buttonText}>Print board!</Text>
      </Pressable>
      <TouchableOpacity style={styles.button} onPress={resetBoard}>
        <Text style={styles.buttonText}>Reset board!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetupBoardScreen;
