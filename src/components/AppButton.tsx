import { PATTERN } from "@/src/constants/theme";
import React, { ComponentPropsWithoutRef } from "react";
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
  customStyle?:
    | StyleProp<ViewStyle>
    | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
  textStyle?: StyleProp<TextStyle>;
  pressableProps?: Omit<ComponentPropsWithoutRef<typeof Pressable>, "style">;
}

export default function AppButton({
  title,
  bgColor,
  textColor,
  onPress,
  customStyle,
  textStyle,
  pressableProps,
}: ButtonProps) {
  let clicked = false;

  return (
    <Pressable
      style={({ pressed }) => {
        return [
          {
            opacity: pressed ? 0.5 : 1,
            backgroundColor: bgColor,
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 8,
          },
          typeof customStyle === "function"
            ? customStyle({ pressed })
            : customStyle,
        ];
      }}
      onPress={() => {
        if (clicked) return;
        clicked = true;
        onPress();
        setTimeout(() => (clicked = false), 1000);
      }}
      {...pressableProps}
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
