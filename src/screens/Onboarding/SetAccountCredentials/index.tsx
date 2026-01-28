import { GOLD, PATTERN, TEXT_INPUT } from "@/src/constants/theme";
import { UnknownOutputParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import OnboardingButton from "../components/OnboardingButton";

const emailRegex: RegExp = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
const passwordRegex: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export default function SetAccountCredentialsScreen({
  fullName,
  preferredName,
  selected,
}: UnknownOutputParams) {
  const router = useRouter();
  const [focused, setFocused] = useState<0 | 1 | 2 | null>(null);
  const [credential, setCredential] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[PATTERN.container, PATTERN.center]}>
        <Text style={PATTERN.bigText}>Time to sign up!</Text>
        <TextInput
          onFocus={() => setFocused(0)}
          onEndEditing={() => setFocused(null)}
          aria-label="Email"
          autoCapitalize="none"
          inputMode="email"
          value={credential.email}
          style={[
            TEXT_INPUT.input,
            PATTERN.smallText,
            { borderColor: focused === 0 ? "#002d9f" : "white" },
          ]}
          placeholder="Email"
          placeholderTextColor="white"
          onChangeText={(text) => {
            setCredential({ ...credential, email: text });
            setErrors({
              ...errors,
              email: emailRegex.test(text)
                ? ""
                : "Please give a valid email address.",
            });
          }}
        />
        <Text style={{ color: GOLD }}> {errors.email} </Text>
        <TextInput
          onFocus={() => setFocused(1)}
          onEndEditing={() => setFocused(null)}
          aria-label="Password"
          autoCapitalize="none"
          inputMode="text"
          textContentType="newPassword" // only iOS supports this for autofill purposes
          passwordRules="required: upper; required: lower; required: special; required: digit; minlength: 8; maxlength: 20"
          value={credential.password}
          style={[
            TEXT_INPUT.input,
            PATTERN.smallText,
            { borderColor: focused === 1 ? "#002d9f" : "white" },
          ]}
          placeholder="New Password"
          placeholderTextColor="white"
          onChangeText={(text) => {
            setCredential({ ...credential, password: text });
            setErrors({
              ...errors,
              password: passwordRegex.test(text) ? "" : "Invalid Password",
              confirmPassword:
                text === credential.confirmPassword
                  ? ""
                  : "Passwords do not match",
            });
          }}
          secureTextEntry={true}
        />
        <Text style={{ color: GOLD }}> {errors.password} </Text>
        <TextInput
          onFocus={() => setFocused(2)}
          onEndEditing={() => setFocused(null)}
          aria-label="Confirm Password"
          autoCapitalize="none"
          inputMode="text"
          passwordRules="required: upper; required: lower; required: special; required: digit; minlength: 8; maxlength: 20"
          value={credential.confirmPassword}
          style={[
            TEXT_INPUT.input,
            PATTERN.smallText,
            { borderColor: focused === 2 ? "#002d9f" : "white" },
          ]}
          placeholder="Confirm Password"
          placeholderTextColor="white"
          onChangeText={(text) => {
            setCredential({ ...credential, confirmPassword: text });
            setErrors({
              ...errors,
              confirmPassword:
                text === credential.password ? "" : "Passwords do not match",
            });
          }}
          secureTextEntry={true}
        />
        <Text style={{ color: GOLD }}> {errors.confirmPassword} </Text>
        <OnboardingButton
          buttonText="Time to work out!"
          router={() => {
            if (
              Object.values(credential).every((key) => key) &&
              Object.values(errors).every((value) => !value) &&
              credential.password === credential.confirmPassword
            ) {
              const data = { fullName, preferredName, selected, ...credential };
              router.navigate({ pathname: "/home", params: data });
            }
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
