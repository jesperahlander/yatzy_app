import React from "react";
import { TouchableOpacity, Text, TouchableHighlight } from "react-native";

const Cell = ({ cell, onPress, style, rowName, onLongPress }) => {
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
      <TouchableOpacity
        style={style}
        onPress={onPress}
        onLongPress={onLongPress}
        // onLongPress={() => console.log("onLongPress")}
        delayLongPress={500}
      >
        <Text>{cell}</Text>
      </TouchableOpacity>
    );
  }
};

export default Cell;
