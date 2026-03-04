import AppButton from "@/src/components/AppButton";
import BackButton from "@/src/components/BackButton";
import {
  BIG_GOLDEN_BUTTON,
  BLUE_DARKER,
  MAIN_COLOR,
  PATTERN,
  TEXT_INPUT,
} from "@/src/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Animated, Keyboard, Text, TextInput, View } from "react-native";

const emailRegex: RegExp = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
const passwordRegex: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export default function SetAccountCredentials() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    fullName: string;
    preferredName: string;
    selected: "Ruby" | "Rudy";
  }>();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const translateY = useMemo(() => new Animated.Value(0), []);
  const [focused, setFocused] = useState<0 | 1 | 2 | null>(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        // Animated screen up
        Animated.timing(translateY, {
          toValue: -keyboardHeight / 2,
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
        PATTERN.container,
        PATTERN.center,
        { transform: [{ translateY }] },
      ]}
    >
      <Text style={PATTERN.bigText}>Time to sign up!</Text>
      <TextInput
        onFocus={() => setFocused(0)}
        onEndEditing={() => setFocused(null)}
        aria-label="Email"
        autoCapitalize="none"
        inputMode="email"
        value={credentials.email}
        style={[
          TEXT_INPUT.input,
          PATTERN.smallText,
          { borderBottomColor: focused === 0 ? BLUE_DARKER : "white" },
        ]}
        placeholder="Email"
        placeholderTextColor="white"
        onChangeText={(text) => {
          setCredentials({ ...credentials, email: text });
          setErrors({
            ...errors,
            email: emailRegex.test(text)
              ? ""
              : "Please give a valid email address.",
          });
        }}
      />
      <Text style={{ color: MAIN_COLOR }}> {errors.email} </Text>
      <TextInput
        onFocus={() => setFocused(1)}
        onEndEditing={() => setFocused(null)}
        aria-label="Password"
        autoCapitalize="none"
        inputMode="text"
        textContentType="newPassword" // only iOS supports this for autofill purposes
        passwordRules="required: upper; required: lower; required: special; required: digit; minlength: 8; maxlength: 20"
        value={credentials.password}
        style={[
          TEXT_INPUT.input,
          PATTERN.smallText,
          { borderBottomColor: focused === 1 ? BLUE_DARKER : "white" },
        ]}
        placeholder="New Password"
        placeholderTextColor="white"
        onChangeText={(text) => {
          setCredentials({ ...credentials, password: text });
          setErrors({
            ...errors,
            password: passwordRegex.test(text) ? "" : "Invalid Password",
            confirmPassword:
              text === credentials.confirmPassword
                ? ""
                : "Passwords do not match",
          });
        }}
        secureTextEntry={true}
      />
      <Text style={{ color: MAIN_COLOR }}> {errors.password} </Text>
      <TextInput
        onFocus={() => setFocused(2)}
        onEndEditing={() => setFocused(null)}
        aria-label="Confirm Password"
        autoCapitalize="none"
        inputMode="text"
        passwordRules="required: upper; required: lower; required: special; required: digit; minlength: 8; maxlength: 20"
        value={credentials.confirmPassword}
        style={[
          TEXT_INPUT.input,
          PATTERN.smallText,
          { borderBottomColor: focused === 2 ? BLUE_DARKER : "white" },
        ]}
        placeholder="Confirm Password"
        placeholderTextColor="white"
        onChangeText={(text) => {
          setCredentials({ ...credentials, confirmPassword: text });
          setErrors({
            ...errors,
            confirmPassword:
              text === credentials.password ? "" : "Passwords do not match",
          });
        }}
        secureTextEntry={true}
      />
      <Text style={{ color: MAIN_COLOR }}> {errors.confirmPassword} </Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingHorizontal: 20,
        }}
      >
        <BackButton
          bgColor={MAIN_COLOR}
          textColor="black"
          style={[BIG_GOLDEN_BUTTON.pressable, { width: "25%" }]}
          textStyle={BIG_GOLDEN_BUTTON.text}
        />
        <AppButton
          title="Time to work out!"
          bgColor={MAIN_COLOR}
          textColor="black"
          onPress={() => {
            if (
              Object.values(credentials).every((key) => key) &&
              Object.values(errors).every((value) => !value) &&
              credentials.password === credentials.confirmPassword
            ) {
              const data = {
                fullName: params.fullName,
                preferredName: params.preferredName,
                selected: params.selected,
                ...credentials,
              };
              router.navigate({ pathname: "/home", params: data });
            }
          }}
          style={[BIG_GOLDEN_BUTTON.pressable, { width: "60%" }]}
          textStyle={{ fontSize: 20, fontWeight: 700 }}
        />
      </View>
    </Animated.View>
  );
}
