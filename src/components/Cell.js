import React from "react";
import { TouchableOpacity, Text, TouchableHighlight } from "react-native";

const Cell = ({ cell, onPress, style, rowName }) => {
  if (
    !onPress ||
    rowName === "Sum" ||
    rowName === "Bonus" ||
    rowName === "Total"
  ) {
    return (
      <TouchableHighlight underlayColor="transparent" style={style}>
        <Text>{cell}</Text>
      </TouchableHighlight>
    );
  } else {
    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <Text>{cell}</Text>
      </TouchableOpacity>
    );
  }
};

export default Cell;
