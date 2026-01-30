import { PATTERN } from "@/src/constants/theme";
import { DimensionValue, Pressable, Text, View } from "react-native";

interface ButtonProps {
  title: "Cancel" | "Done 👍" | "Add Exercise +" | "Confirm 👍" | "Add Set +";
  bgColor: string;
  textColor: string;
  onPress?: () => void;
  width?: DimensionValue;
}

export default function Button({
  title,
  bgColor,
  textColor,
  onPress,
  width,
}: ButtonProps) {
  const buttonStyles = {
    width: width,
    backgroundColor: bgColor,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 8,
  };
  return (
    <Pressable
      style={({ pressed }) => {
        return [
          buttonStyles,
          {
            opacity: pressed ? 0.5 : 1,
          },
        ];
      }}
      onPress={onPress}
    >
      <View style={PATTERN.center}>
        <Text
          style={[PATTERN.smallText, { color: textColor, fontWeight: "bold" }]}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
