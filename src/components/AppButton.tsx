import { PATTERN } from "@/src/constants/theme";
import React from "react";
import {
  ColorValue,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export interface ButtonProps {
  title: string;
  bgColor: ColorValue;
  textColor: ColorValue;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function AppButton({
  title,
  bgColor,
  textColor,
  onPress,
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyles = {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  };
  let clicked = false;

  return (
    <Pressable
      style={({ pressed }) => {
        return [
          buttonStyles,
          {
            opacity: pressed ? 0.5 : 1,
            backgroundColor: bgColor,
          },
          style,
        ];
      }}
      onPress={() => {
        if (clicked) return;
        clicked = true;
        onPress();
        setTimeout(() => (clicked = false), 1000);
      }}
    >
      <View style={PATTERN.center}>
        <Text
          style={[
            PATTERN.smallText,
            { color: textColor, fontWeight: "bold" },
            textStyle,
          ]}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
