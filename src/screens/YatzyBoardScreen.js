import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  Image,
} from "react-native";
import backButtonStyle from "../styles/backButtonStyle";
import BackButton from "../components/backButton";
import Cell from "../components/Cell";
import {
  updateSum,
  updateBonus,
  updateTotal,
  updateCell,
  skipOrClearCell,
  getDieValue,
} from "../utils/yatzyBoardHelpers";

// Images
import diceOne from "../assets/images/dice_1.png";
import diceTwo from "../assets/images/dice_2.png";
import diceThree from "../assets/images/dice_3.png";
import diceFour from "../assets/images/dice_4.png";
import diceFive from "../assets/images/dice_5.png";
import diceSix from "../assets/images/dice_6.png";

const YatzyBoardScreen = ({ navigation }) => {
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

  const diceImages = {
    Ones: diceOne,
    Twos: diceTwo,
    Threes: diceThree,
    Fours: diceFour,
    Fives: diceFive,
    Sixes: diceSix,
  };

  const [startColumn, setStartColumn] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [countOnes, setCountOnes] = useState(0);
  const [countTwos, setCountTwos] = useState(0);
  const [countThrees, setCountThrees] = useState(0);
  const [countFours, setCountFours] = useState(0);
  const [countFives, setCountFives] = useState(0);
  const [countSixes, setCountSixes] = useState(0);

  const screenHeight = Dimensions.get("window").height;

  const updateDiceCounts = (diceName, diceCount) => {
    if (diceName === "Ones") {
      setCountOnes(diceCount);
    } else if (diceName === "Twos") {
      setCountTwos(diceCount);
    } else if (diceName === "Threes") {
      setCountThrees(diceCount);
    } else if (diceName === "Fours") {
      setCountFours(diceCount);
    } else if (diceName === "Fives") {
      setCountFives(diceCount);
    } else if (diceName === "Sixes") {
      setCountSixes(diceCount);
    }
  };

  const resetCounts = () => {
    setCountOnes(0);
    setCountTwos(0);
    setCountThrees(0);
    setCountFours(0);
    setCountFives(0);
    setCountSixes(0);
  };

  const addColumn = () => {
    const newBoard = board.map((row, rowIndex) => {
      const newColumnIndex = row.length;
      let cell = "";

      if (rowIndex === 0) {
        cell = `Player ${newColumnIndex}`;
      } else if (rowIndex === 7 || rowIndex === 18) {
        cell = 0;
      } else if (rowIndex === 8) {
        cell = "-";
      }

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

  const handleCellPress = (rowIndex, cellIndex) => {
    console.log("Cell press");
    const rowName = board[rowIndex + 1][0];
    if (rowName !== "Sum" && rowName !== "Bonus" && rowName !== "Total") {
      setModalContent(getModalContent(rowName, rowIndex, cellIndex));
      setModalVisible(true);
    }
  };

  const handleLongCellPress = (rowIndex, cellIndex) => {
    const rowName = board[rowIndex + 1][0];
    if (rowName !== "Sum" && rowName !== "Bonus" && rowName !== "Total") {
      setModalContent(getLongPressModalContent(rowName, rowIndex, cellIndex));
      setModalVisible(true);
    }
  };

  const handleSkipClear = (option, rowIndex, cellIndex) => {
    let newBoard = [...board];

    // Skip or Clear cell
    newBoard = skipOrClearCell(
      newBoard,
      option,
      startColumn,
      rowIndex,
      cellIndex
    );

    // Update Sum
    newBoard = updateSum(newBoard, startColumn, cellIndex);

    // Update Bonus
    newBoard = updateBonus(newBoard, startColumn, cellIndex);

    // Update Total
    newBoard = updateTotal(newBoard, startColumn, cellIndex);

    setBoard(newBoard);
    setModalVisible(false);
  };

  const handleDiceCountChange = (rowName, rowIndex, cellIndex, text) => {
    let diceCount = parseInt(text);
    if (isNaN(diceCount)) {
      diceCount = 0; // Value will not matter in updateCell
    }
    let newBoard = [...board];

    // Update Cell
    newBoard = updateCell(
      newBoard,
      rowName,
      diceCount,
      startColumn,
      rowIndex,
      cellIndex
    );

    // Update Sum
    newBoard = updateSum(newBoard, startColumn, cellIndex);

    // Update Bonus
    newBoard = updateBonus(newBoard, startColumn, cellIndex);

    // Update Total
    newBoard = updateTotal(newBoard, startColumn, cellIndex);

    setBoard(newBoard);
    Keyboard.dismiss();

    setTimeout(() => {
      setModalVisible(false);
    }, 200);
  };

  const handleDiceCountChange2 = (rowName, rowIndex, cellIndex) => {
    let newBoard = [...board];
    const diceCount = [
      countOnes,
      countTwos,
      countThrees,
      countFours,
      countFives,
      countSixes,
    ];
    // Update Cell
    newBoard = updateCell(
      newBoard,
      rowName,
      diceCount,
      startColumn,
      rowIndex,
      cellIndex
    );

    // Update Sum
    newBoard = updateSum(newBoard, startColumn, cellIndex);

    // Update Bonus
    newBoard = updateBonus(newBoard, startColumn, cellIndex);

    // Update Total
    newBoard = updateTotal(newBoard, startColumn, cellIndex);

    setBoard(newBoard);
    Keyboard.dismiss();
    setModalVisible(false);
  };

  const getLongPressModalContent = (rowName, rowIndex, cellIndex) => {
    return (
      <View>
        <Text>Do you want to skip or clear this cell?</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "green",
              borderRadius: 5,
            }}
            onPress={() => {
              handleSkipClear("skip", rowIndex, cellIndex);
            }}
          >
            <Text style={{ color: "white" }}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: "red", borderRadius: 5 }}
            onPress={() => {
              handleSkipClear("clear", rowIndex, cellIndex);
            }}
          >
            <Text style={{ color: "white" }}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getModalContent = (rowName, rowIndex, cellIndex) => {
    switch (rowName) {
      case "Ones":
      case "Twos":
      case "Threes":
      case "Fours":
      case "Fives":
      case "Sixes":
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={diceImages[rowName]}
              style={{ width: 30, height: 30 }}
            />
            <TextInput
              style={{
                padding: 5,
                borderColor: "gray",
                borderWidth: 1,
                marginLeft: 10,
              }}
              keyboardType="numeric"
              onChangeText={(text) =>
                handleDiceCountChange(rowName, rowIndex, cellIndex, text)
              }
            />
          </View>
        );
      case "1 pair":
      case "3 of a kind":
      case "4 of a kind":
        return (
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {["Ones", "Twos", "Threes"].map((diceName) => (
                <TouchableOpacity
                  key={diceName}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 5,
                  }}
                  onPress={() =>
                    handleDiceCountChange(
                      rowName,
                      rowIndex,
                      cellIndex,
                      getDieValue(diceName).toString()
                    )
                  }
                >
                  <Image
                    source={diceImages[diceName]}
                    style={{ width: 30, height: 30 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {["Fours", "Fives", "Sixes"].map((diceName) => (
                <TouchableOpacity
                  key={diceName}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 5,
                  }}
                  onPress={() =>
                    handleDiceCountChange(
                      rowName,
                      rowIndex,
                      cellIndex,
                      getDieValue(diceName).toString()
                    )
                  }
                >
                  <Image
                    source={diceImages[diceName]}
                    style={{ width: 30, height: 30 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case "Small straight":
      case "Large straight":
      case "Yatzy":
        return (
          <View>
            <Text>I got a {rowName}!</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "green",
                  borderRadius: 5,
                }}
                onPress={() =>
                  handleDiceCountChange(rowName, rowIndex, cellIndex)
                }
              >
                <Text style={{ color: "white" }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 10, backgroundColor: "red", borderRadius: 5 }}
                onPress={() => {
                  handleSkipClear("clear", rowIndex, cellIndex);
                }}
              >
                <Text style={{ color: "white" }}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "2 pair":
      case "Full house":
      case "Chance":
        return (
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {["Ones", "Twos", "Threes"].map((diceName) => (
                <View
                  key={diceName}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 5,
                  }}
                >
                  <Image
                    source={diceImages[diceName]}
                    style={{ width: 30, height: 30 }}
                  />
                  <TextInput
                    style={{
                      padding: 5,
                      borderColor: "gray",
                      borderWidth: 1,
                    }}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      updateDiceCounts(diceName, parseInt(text))
                    }
                  />
                </View>
              ))}
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {["Fours", "Fives", "Sixes"].map((diceName) => (
                <View
                  key={diceName}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 5,
                  }}
                >
                  <Image
                    source={diceImages[diceName]}
                    style={{ width: 30, height: 30 }}
                  />
                  <TextInput
                    style={{
                      padding: 5,
                      borderColor: "gray",
                      borderWidth: 1,
                    }}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      updateDiceCounts(diceName, parseInt(text))
                    }
                  />
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "blue",
                borderRadius: 5,
                width: 80,
                alignItems: "center",
              }}
              onPress={() => {
                handleDiceCountChange2(rowName, rowIndex, cellIndex);
              }}
            >
              <Text style={{ color: "white" }}>OK</Text>
            </TouchableOpacity>
          </View>
        );
      // Add more cases as needed
      default:
        return "";
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        <TouchableOpacity
          style={{ position: "absolute", top: 30, left: 300, borderWidth: 1 }}
          onPress={resetCounts}
        >
          <Text>RESET</Text>
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
            <Cell cell={board[0][0]} style={styles.firstCell} />
            {board[0]
              .slice(startColumn + 1, startColumn + 4)
              .map((cell, cellIndex) => (
                <Cell key={cellIndex} cell={cell} style={styles.cell} />
              ))}
          </View>
          <ScrollView style={{ maxHeight: screenHeight * 0.8 }} bounces={false}>
            {board.slice(1).map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                <Cell
                  cell={row[0]}
                  onPress={() => alert(`Popup for ${row[0]}`)}
                  style={styles.firstCell}
                />
                {row.slice(startColumn + 1).map((cell, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    cell={cell.toString()}
                    onPress={() => handleCellPress(rowIndex, cellIndex)}
                    style={styles.cell}
                    rowName={board[rowIndex + 1][0]}
                    onLongPress={() => handleLongCellPress(rowIndex, cellIndex)}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.centeredView}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  {modalContent}
                  {/* <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight> */}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default YatzyBoardScreen;
