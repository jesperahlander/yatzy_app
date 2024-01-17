import React, { useContext } from "react";
import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ThemeContext from "../contexts/ThemeContext";

const BackButton = ({ navigation, style }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Pressable style={style} onPress={() => navigation.goBack()}>
      <AntDesign name="arrowleft" size={24} color={theme.textColor} />
    </Pressable>
  );
};

export default BackButton;
