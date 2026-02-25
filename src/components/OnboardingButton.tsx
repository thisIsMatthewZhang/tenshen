import { BIG_GOLDEN_BUTTON } from "@/src/constants/theme";
import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";

interface ButtonProps {
  buttonText: string;
  router: () => void;
  animationStyle?: StyleProp<ViewStyle>;
}

export default function OnboardingButton({
  buttonText,
  router,
  animationStyle,
}: ButtonProps) {
  return (
    <Pressable
      hitSlop={5}
      onPress={router}
      style={({ pressed }) => {
        return [
          BIG_GOLDEN_BUTTON.pressable,
          { opacity: pressed ? 0.5 : 1 },
          animationStyle,
        ];
      }}
    >
      <View style={BIG_GOLDEN_BUTTON.buttonView}>
        <Text style={BIG_GOLDEN_BUTTON.text}> {buttonText} </Text>
      </View>
    </Pressable>
  );
}
