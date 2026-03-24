import AppButton from "@/src/components/AppButton";
import PressableText from "@/src/components/PressableText";
import {
  BIG_GOLDEN_BUTTON,
  BLUE_DARKER,
  MAIN_COLOR,
  PATTERN,
  TEXT_INPUT,
} from "@/src/constants/theme";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignIn() {
  const router = useRouter();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const translateY = useMemo(() => new Animated.Value(0), []);
  const [focused, setFocused] = useState<0 | 1 | null>(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
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
      <Text style={PATTERN.bigText}>Welcome back!</Text>
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
            // email:
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
          {
            borderBottomColor: focused === 1 ? BLUE_DARKER : "white",
            marginVertical: 0,
          },
        ]}
        placeholder="Password"
        placeholderTextColor="white"
        onChangeText={(text) => {
          setCredentials({ ...credentials, password: text });
          setErrors({
            ...errors,
            // password:
          });
        }}
        secureTextEntry={true}
      />
      <Text style={{ color: MAIN_COLOR }}> {errors.password} </Text>
      <View style={styles.forgotPasswordContainer}>
        <PressableText
          onPress={() => console.error("not implemented")}
          customStyles={[PATTERN.smallText, styles.pressableText]}
        >
          Forgot password?
        </PressableText>
      </View>
      <AppButton
        title="Login"
        bgColor={MAIN_COLOR}
        textColor="black"
        onPress={() => {}}
        customStyle={[BIG_GOLDEN_BUTTON.pressable, { width: "75%" }]}
        textStyle={{ fontSize: 20, fontWeight: 700 }}
      />
      <View style={styles.notAMemberContainer}>
        <Text style={PATTERN.smallText}> Not a member? </Text>
        <PressableText
          onPress={() => router.navigate("/")}
          customStyles={[PATTERN.smallText, styles.pressableText]}
        >
          Get started!
        </PressableText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pressableText: {
    fontWeight: 600,
    color: BLUE_DARKER,
  },
  forgotPasswordContainer: { width: "75%", marginBottom: 12 },
  notAMemberContainer: {
    flexDirection: "row",
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
});
