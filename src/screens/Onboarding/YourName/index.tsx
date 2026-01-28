import { GOLD, PATTERN, TEXT_INPUT } from "@/src/constants/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import OnboardingButton from "../components/OnboardingButton";

export default function YourNameScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [selected, setSelected] = useState<0 | 1 | null>(null);
  const [error, setError] = useState("");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[PATTERN.container, PATTERN.center]}>
        <View style={[PATTERN.center, { width: "100%" }]}>
          <Text style={[PATTERN.bigText]}>What&apos;s your name?</Text>

          <TextInput
            onFocus={() => setSelected(0)}
            onEndEditing={() => setSelected(null)}
            aria-label="Full Name"
            autoCapitalize="words"
            inputMode="text"
            value={fullName}
            style={[
              TEXT_INPUT.input,
              PATTERN.smallText,
              { borderColor: selected === 0 ? "#002d9f" : "white" },
            ]}
            placeholder="Full Name"
            placeholderTextColor={"white"}
            onChangeText={(text) => setFullName(text)}
          />
          <TextInput
            onFocus={() => setSelected(1)}
            onEndEditing={() => setSelected(null)}
            aria-label="Preferred Name"
            autoCapitalize="words"
            inputMode="text"
            value={preferredName}
            style={[
              TEXT_INPUT.input,
              PATTERN.smallText,
              {
                borderColor: selected === 1 ? "#002d9f" : "white",
              },
            ]}
            placeholder="Preferred Name"
            placeholderTextColor={"white"}
            onChangeText={(text) => setPreferredName(text)}
          />
          <Text style={{ color: GOLD }}> {error} </Text>
          <OnboardingButton
            buttonText="Next"
            router={() => {
              if (!fullName || !preferredName) {
                setError("Please give your full name and preferred name");
              } else {
                setError("");
                router.push({
                  pathname: "/pickworkoutbuddy",
                  params: { fullName, preferredName },
                });
              }
            }}
          ></OnboardingButton>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
