import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import backButtonStyle from "../styles/backButtonStyle";
import BackButton from "../components/backButton";
import Cell from "../components/Cell";

const YatzyBoardScreen = ({ navigation }) => {
  // const [board, setBoard] = useState([
  //   ["", "Player 1", "Player 2"],
  //   ["Ones", "Cell 2", "Cell 3"],
  //   ["Twos", "Cell 5", "Cell 6"],
  //   ["Threes", "Cell 8", "Cell 9"],
  //   ["Fours", "Cell 2", "Cell 3"],
  //   ["Fives", "Cell 5", "Cell 6"],
  //   ["Sixes", "Cell 8", "Cell 9"],
  //   ["Sum", "Cell 2", "Cell 3"],
  //   ["Bonus", "Cell 5", "Cell 6"],
  //   ["1 pair", "Cell 8", "Cell 9"],
  //   ["2 pair", "Cell 2", "Cell 3"],
  //   ["3 of a kind", "Cell 5", "Cell 6"],
  //   ["4 of a kind", "Cell 8", "Cell 9"],
  //   ["Small straight", "Cell 2", "Cell 3"],
  //   ["Large straight", "Cell 5", "Cell 6"],
  //   ["Full house", "Cell 8", "Cell 9"],
  //   ["Chance", "Cell 2", "Cell 3"],
  //   ["Yatzy", "Cell 5", "Cell 6"],
  //   ["Total", "Cell 8", "Cell 9"],
  // ]);

  const [board, setBoard] = useState([
    [""],
    ["Ones"],
    ["Twos"],
    ["Threes"],
    ["Fours"],
    ["Fives"],
    ["Sixes"],
    ["Sum"],
    ["Bonus"],
    ["1 pair"],
    ["2 pair"],
    ["3 of a kind"],
    ["4 of a kind"],
    ["Small straight"],
    ["Large straight"],
    ["Full house"],
    ["Chance"],
    ["Yatzy"],
    ["Total"],
  ]);

  const [startColumn, setStartColumn] = useState(0);

  const addColumn = () => {
    const newBoard = board.map((row, rowIndex) => {
      const newColumnIndex = row.length;
      const cell =
        rowIndex === 0
          ? `Player ${newColumnIndex}`
          : `Cell ${rowIndex}, ${newColumnIndex}`;
      return [...row, cell];
    });
    setBoard(newBoard);
  };

  const removeColumn = () => {
    if (board[0].length > 2) {
      const newBoard = board.map((row) => row.slice(0, -1));
      setBoard(newBoard);
    }
  };

  const shiftLeft = () => {
    if (startColumn > 0) {
      setStartColumn(startColumn - 1);
    }
  };

  const shiftRight = () => {
    if (startColumn < board[0].length - 3) {
      setStartColumn(startColumn + 1);
    }
  };

  const screenHeight = Dimensions.get("window").height;

  return (
    <View style={styles.outerContainer}>
      <BackButton navigation={navigation} style={backButtonStyle} />
      <TouchableOpacity
        style={{ position: "absolute", top: 30, left: 100 }}
        onPress={addColumn}
      >
        <Text>Add Column</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: "absolute", top: 30, left: 180 }}
        onPress={removeColumn}
      >
        <Text>Remove Column</Text>
      </TouchableOpacity>
      {startColumn > 0 && (
        <TouchableOpacity
          style={{ position: "absolute", top: 60, left: 100 }}
          onPress={shiftLeft}
        >
          <Text>Shift Left</Text>
        </TouchableOpacity>
      )}
      {startColumn < board[0].length - 4 && (
        <TouchableOpacity
          style={{ position: "absolute", top: 60, left: 180 }}
          onPress={shiftRight}
        >
          <Text>Shift Right</Text>
        </TouchableOpacity>
      )}
      <View style={styles.scrollViewContainer}>
        <View style={styles.row}>
          {/* <TouchableOpacity
            style={styles.firstCell}
            onPress={() => {
              alert(`Popup for ${board[0][0]}`);
            }}
          >
            <Text>{board[0][0]}</Text>
          </TouchableOpacity> */}
          <Cell
            cell={board[0][0]}
            onPress={() => alert(`Popup for ${board[0][0]}`)}
            style={styles.firstCell}
          />
          {board[0]
            .slice(startColumn + 1, startColumn + 4)
            .map((cell, cellIndex) => (
              // <TouchableOpacity
              //   key={cellIndex}
              //   style={styles.cell}
              //   onPress={() => {
              //     console.log(`Pressed ${cell}`);
              //   }}
              // >
              //   <Text>{cell}</Text>
              // </TouchableOpacity>
              <Cell
                key={cellIndex}
                cell={cell}
                onPress={() => console.log(`Pressed ${cell}`)}
                style={styles.cell}
              />
            ))}
        </View>
        <ScrollView style={{ maxHeight: screenHeight * 0.8 }} bounces={false}>
          {board.slice(1).map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {/* <TouchableOpacity
                style={styles.firstCell}
                onPress={() => {
                  alert(`Popup for ${row[0]}`);
                }}
              >
                <Text>{row[0]}</Text>
              </TouchableOpacity> */}
              <Cell
                cell={row[0]}
                onPress={() => alert(`Popup for ${row[0]}`)}
                style={styles.firstCell}
              />
              {row.slice(startColumn + 1).map((cell, cellIndex) => (
                // <TouchableOpacity
                //   key={cellIndex}
                //   style={styles.cell}
                //   onPress={() => {
                //     console.log(`Pressed ${cell}`);
                //   }}
                // >
                //   <Text>{cell}</Text>
                // </TouchableOpacity>
                <Cell
                  key={cellIndex}
                  cell={cell}
                  onPress={() => console.log(`Pressed ${cell}`)}
                  style={styles.cell}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "blue",
  },
  scrollViewContainer: {
    width: "80%",
    alignSelf: "center",
    // backgroundColor: "green",
    marginTop: 80,
    borderColor: "black",
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignSelf: "stretch", // Make the row take up the full width of the container
  },
  cell: {
    flex: 1, // Make the cells take up an equal amount of space in the row
    minWidth: 66.7,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
  },
  firstCell: {
    width: 100, // Set a fixed width for the first cell
    borderWidth: 1,
    borderColor: "black",
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default YatzyBoardScreen;
