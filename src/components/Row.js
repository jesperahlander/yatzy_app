import React from "react";
import { View } from "react-native";
import Cell from "./Cell";
import styles from "../styles/rowStyles";

const Row = ({ row, onPress }) => (
  <View style={styles.row}>
    {row.map((cell, cellIndex) => (
      <Cell key={cellIndex} cell={cell} onPress={() => onPress(cell)} />
    ))}
  </View>
);

export default Row;
