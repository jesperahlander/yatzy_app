import React from "react";
import { TouchableOpacity, Text } from "react-native";
// import styles from "../styles/cellStyles";

const Cell = ({ cell, onPress, style }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Text>{cell}</Text>
  </TouchableOpacity>
);

export default Cell;
