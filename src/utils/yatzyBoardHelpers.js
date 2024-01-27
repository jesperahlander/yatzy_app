export const getDieValue = (dieName) => {
  switch (dieName) {
    case "Ones":
      return 1;
    case "Twos":
      return 2;
    case "Threes":
      return 3;
    case "Fours":
      return 4;
    case "Fives":
      return 5;
    case "Sixes":
      return 6;
    default:
      return 0;
  }
};

export const calculateCellValue = (rowName, diceCount) => {
  switch (rowName) {
    case "Ones":
      return diceCount;
    case "Twos":
    case "1 pair":
      return diceCount * 2;
    case "Threes":
    case "3 of a kind":
      return diceCount * 3;
    case "Fours":
    case "4 of a kind":
      return diceCount * 4;
    case "Fives":
      return diceCount * 5;
    case "Sixes":
      return diceCount * 6;
    case "Small straight":
      return 15;
    case "Large straight":
      return 20;
    case "2 pair":
    case "Full house":
    case "Chance":
      return (
        1 * diceCount[0] +
        2 * diceCount[1] +
        3 * diceCount[2] +
        4 * diceCount[3] +
        5 * diceCount[4] +
        6 * diceCount[5]
      );
    case "Yatzy":
      return 50;
    default:
      return diceCount;
  }
};

export const calculateSum = (board, startColumn, cellIndex) => {
  let sum = 0;
  for (let i = 1; i <= 6; i++) {
    const value = parseInt(board[i][cellIndex + startColumn + 1]);
    if (!isNaN(value)) {
      sum += value;
    }
  }
  return sum;
};

export const calculateBonus = (board, startColumn, cellIndex) => {
  let bonus = "-";
  let sum = 0;
  for (let i = 1; i <= 6; i++) {
    const value = parseInt(board[i][cellIndex + startColumn + 1]);
    if (!isNaN(value)) {
      sum += value;
    }
  }
  if (sum >= 63) {
    bonus = 50;
  }
  return bonus;
};

export const calculateTotal = (board, startColumn, cellIndex) => {
  let sum = 0;
  for (let i = 7; i <= 17; i++) {
    const value = parseInt(board[i][cellIndex + startColumn + 1]);
    if (!isNaN(value)) {
      sum += value;
    }
  }
  return sum;
};

export const updateCell = (
  board,
  rowName,
  diceCount,
  startColumn,
  rowIndex,
  cellIndex
) => {
  const newBoard = [...board];
  const score = calculateCellValue(rowName, diceCount);
  newBoard[rowIndex + 1][cellIndex + startColumn + 1] = score;

  return newBoard;
};

export const updateSum = (board, startColumn, cellIndex) => {
  const newBoard = [...board];
  const sum = calculateSum(newBoard, startColumn, cellIndex);
  newBoard[7][cellIndex + startColumn + 1] = sum;

  return newBoard;
};

export const updateBonus = (board, startColumn, cellIndex) => {
  const newBoard = [...board];
  const bonus = calculateBonus(newBoard, startColumn, cellIndex);
  newBoard[8][cellIndex + startColumn + 1] = bonus;

  return newBoard;
};

export const updateTotal = (board, startColumn, cellIndex) => {
  const newBoard = [...board];
  const total = calculateTotal(newBoard, startColumn, cellIndex);
  newBoard[18][cellIndex + startColumn + 1] = total;

  return newBoard;
};

export const skipOrClearCell = (
  board,
  option,
  startColumn,
  rowIndex,
  cellIndex
) => {
  const newBoard = [...board];
  const cellContent = option === "skip" ? "-" : "";
  newBoard[rowIndex + 1][cellIndex + startColumn + 1] = cellContent;

  return newBoard;
};
