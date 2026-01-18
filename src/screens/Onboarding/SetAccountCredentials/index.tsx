import { GOLD, ONBOARDING, TEXT_INPUT } from "@/src/constants/theme";
import { UnknownOutputParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
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
  const [form, setForm] = useState({
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
    <View style={ONBOARDING.container}>
      <Text style={ONBOARDING.bigText}>Time to sign up!</Text>
      <TextInput
        aria-label="Email"
        autoCapitalize="none"
        inputMode="email"
        value={form.email}
        onEndEditing={() => {
          setErrors({
            ...errors,
            email: emailRegex.test(form.email)
              ? ""
              : "Please give a valid email address.",
          });
        }}
        style={[TEXT_INPUT.input, ONBOARDING.smallText]}
        placeholder="Email"
        placeholderTextColor="white"
        onChangeText={(text) => setForm({ ...form, email: text })}
      />
      <Text style={{ color: GOLD }}> {errors.email} </Text>
      <TextInput
        aria-label="Password"
        autoCapitalize="none"
        inputMode="text"
        textContentType="newPassword" // only iOS supports this for autofill purposes
        passwordRules="required: upper; required: lower; required: special; required: digit; minlength: 8; maxlength: 20"
        value={form.password}
        onEndEditing={() => {
          setErrors({
            ...errors,
            password: passwordRegex.test(form.password)
              ? ""
              : "Invalid Password",
          });
        }}
        style={[TEXT_INPUT.input, ONBOARDING.smallText]}
        placeholder="New Password"
        placeholderTextColor="white"
        onChangeText={(text) => setForm({ ...form, password: text })}
        secureTextEntry={true}
      />
      <Text style={{ color: GOLD }}> {errors.password} </Text>
      <TextInput
        aria-label="Password"
        autoCapitalize="none"
        inputMode="text"
        textContentType="newPassword" // only iOS supports this for autofill purposes
        passwordRules="required: upper; required: lower; required: special; required: digit; minlength: 8; maxlength: 20"
        value={form.confirmPassword}
        onEndEditing={() => {
          setErrors({
            ...errors,
            confirmPassword:
              form.confirmPassword === form.password
                ? ""
                : "Passwords do not match",
          });
        }}
        style={[TEXT_INPUT.input, ONBOARDING.smallText]}
        placeholder="Confirm Password"
        placeholderTextColor="white"
        onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
        secureTextEntry={true}
      />
      <Text style={{ color: GOLD }}> {errors.confirmPassword} </Text>
      <OnboardingButton
        buttonText="Time to work out!"
        router={() => {
          if (Object.values(errors).every((value) => !value)) {
            const data = { fullName, preferredName, selected, ...form };
            router.navigate({ pathname: "/home", params: data });
          }
        }}
      />
    </View>
  );
}
