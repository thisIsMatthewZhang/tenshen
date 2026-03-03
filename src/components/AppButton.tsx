import { PATTERN } from "@/src/constants/theme";
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
      onPress={onPress}
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
