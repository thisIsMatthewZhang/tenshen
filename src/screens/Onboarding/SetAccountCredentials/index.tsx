import { ONBOARDING, TEXT_INPUT } from "@/src/constants/theme";
import { UnknownOutputParams } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";

export default function SetAccountCredentialsScreen({
  fullName,
  preferredName,
  selected,
}: UnknownOutputParams) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={ONBOARDING.container}>
      <TextInput
        aria-label="Email"
        autoCapitalize="none"
        inputMode="email" // TODO: validate email format
        value={email}
        style={[TEXT_INPUT.input, ONBOARDING.smallText]}
        placeholder="Email"
        placeholderTextColor={"white"}
        onChangeText={(email) => setEmail(email)}
      />
    </View>
  );
}
