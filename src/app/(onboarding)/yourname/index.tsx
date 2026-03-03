import AppButton from "@/src/components/AppButton";
import {
  BIG_GOLDEN_BUTTON,
  MAIN_COLOR,
  PATTERN,
  TEXT_INPUT,
} from "@/src/constants/theme";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Animated, Keyboard, Text, TextInput } from "react-native";

export default function YourName() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [selected, setSelected] = useState<0 | 1 | 2 | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const translateY = useMemo(() => new Animated.Value(0), []);
  const [error, setError] = useState("");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        Animated.timing(translateY, {
          toValue: -keyboardHeight / 3,
          duration: 200,
          useNativeDriver: true,
        }).start();
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
        // Animate screen down
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [translateY, keyboardHeight]);

  return (
    <Animated.View
      style={[
        PATTERN.center,
        PATTERN.container,
        { transform: [{ translateY }] },
      ]}
    >
      <Text style={[PATTERN.bigText]}>What&apos;s your name?</Text>

      <TextInput
        onFocus={() => setSelected(0)}
        onEndEditing={() => setSelected(null)}
        aria-label="First Name"
        autoCapitalize="words"
        inputMode="text"
        value={firstName}
        style={[
          TEXT_INPUT.input,
          PATTERN.smallText,
          { borderBottomColor: selected === 0 ? "#308cfc" : "white" },
        ]}
        placeholder="First Name"
        placeholderTextColor={"white"}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        onFocus={() => setSelected(1)}
        onEndEditing={() => setSelected(null)}
        aria-label="Last Name"
        autoCapitalize="words"
        inputMode="text"
        value={lastName}
        style={[
          TEXT_INPUT.input,
          PATTERN.smallText,
          { borderBottomColor: selected === 1 ? "#308cfc" : "white" },
        ]}
        placeholder="Last Name"
        placeholderTextColor={"white"}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        onFocus={() => setSelected(2)}
        onEndEditing={() => setSelected(null)}
        aria-label="Preferred Name"
        autoCapitalize="words"
        inputMode="text"
        value={preferredName}
        style={[
          TEXT_INPUT.input,
          PATTERN.smallText,
          {
            borderBottomColor: selected === 2 ? "#308cfc" : "white",
          },
        ]}
        placeholder="Preferred Name"
        placeholderTextColor={"white"}
        onChangeText={(text) => setPreferredName(text)}
      />
      <Text style={{ color: MAIN_COLOR }}> {error} </Text>
      <AppButton
        title="Next"
        bgColor={MAIN_COLOR}
        textColor="black"
        onPress={() => {
          if (!firstName || !lastName || !preferredName) {
            setError("Please give your full name and preferred name");
          } else {
            setError("");
            router.push({
              pathname: "/pickworkoutbuddy",
              params: { firstName, lastName, preferredName },
            });
          }
        }}
        style={BIG_GOLDEN_BUTTON.pressable}
        textStyle={{ fontSize: 20, fontWeight: 700 }}
      />
    </Animated.View>
  );
}
