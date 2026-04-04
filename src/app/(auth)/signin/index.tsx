import { firebaseConfigWeb } from "@/config/firebaseConfig";
import AppButton from "@/src/components/AppButton";
import PressableText from "@/src/components/PressableText";
import { LOCAL_AUTH_ERROR_CODES } from "@/src/constants/localAuthErrorCodes";
import {
  BIG_GOLDEN_BUTTON,
  BLUE_DARKER,
  MAIN_COLOR,
  PATTERN,
  TEXT_INPUT,
} from "@/src/constants/theme";
import { useRouter } from "expo-router";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const app = initializeApp(firebaseConfigWeb);
const auth = getAuth(app);

export default function SignIn() {
  const router = useRouter();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const translateY = useMemo(() => new Animated.Value(0), []);
  const [focused, setFocused] = useState<0 | 1 | null>(null);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [authMessage, setAuthMessage] = useState<string>("");

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
      {authMessage ? (
        <View style={styles.authErrorContainer}>
          <Text style={PATTERN.smallText}>{authMessage}</Text>
        </View>
      ) : (
        <></>
      )}
      {showSpinner ? (
        <ActivityIndicator
          style={styles.spinner}
          size={"large"}
          color={MAIN_COLOR}
        />
      ) : (
        <></>
      )}
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
        }}
      />
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
        }}
        secureTextEntry={true}
      />
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
        onPress={async () => {
          if (Object.values(credentials).every((value) => value)) {
            Keyboard.dismiss();
            setShowSpinner(true);
            await signInWithEmailAndPassword(
              auth,
              credentials.email,
              credentials.password,
            )
              .then((userCredential) => {
                setShowSpinner(false);
                router.navigate("/home");
                setAuthMessage("");
              })
              .catch((error) => {
                setShowSpinner(false);
                const errorCode = error.code;
                let errorDisplayText;
                switch (errorCode) {
                  case LOCAL_AUTH_ERROR_CODES.INVALID_CREDENTIALS:
                    errorDisplayText =
                      "Invalid email or password provided. Please try again.";
                    break;
                  case LOCAL_AUTH_ERROR_CODES.INTERNAL_ERROR:
                    errorDisplayText =
                      "Sorry! There was an internal error. Please try again soon.";
                    break;
                  case LOCAL_AUTH_ERROR_CODES.UNVERIFIED_EMAIL:
                    errorDisplayText =
                      "Please verify your email before continuing.";
                    break;
                  default:
                    errorDisplayText = "An issue occurred. Please try again";
                }
                setAuthMessage(errorDisplayText);
              });
          }
        }}
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
  spinner: {
    position: "absolute",
  },
  authErrorContainer: {
    position: "absolute",
    top: 40,
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    padding: 12,
    marginTop: 20,
  },
});
