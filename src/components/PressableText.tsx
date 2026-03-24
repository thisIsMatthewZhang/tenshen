import React, { PropsWithChildren, useState } from "react";
import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
} from "react-native";
interface PressableTextProps {
  onPress: () => void;
  customStyles?: StyleProp<TextStyle>;
}
export default function PressableText({
  children,
  onPress,
  customStyles,
}: PropsWithChildren<PressableTextProps>) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
    >
      <Text style={[customStyles, isPressed && styles.underline]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  underline: {
    textDecorationLine: "underline",
  },
});
