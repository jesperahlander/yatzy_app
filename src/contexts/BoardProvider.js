import React, { useState } from "react";
import BoardContext from "./BoardContext";

const BoardProvider = ({ children }) => {
  const initialBoard = [
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
  ];

  const [board, setBoard] = useState(initialBoard);

  const addColumn = (playerName) => {
    const newBoard = board.map((row, rowIndex) => {
      let cell = "";

      if (rowIndex === 0) {
        cell = playerName;
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

  return (
    <BoardContext.Provider
      value={{ initialBoard, board, setBoard, addColumn, removeColumn }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
