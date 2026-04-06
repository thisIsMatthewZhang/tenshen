import { firebaseConfigWeb } from "@/config/firebaseConfig";
import AppButton from "@/src/components/AppButton";
import BackButton from "@/src/components/BackButton";
import {
  BIG_GOLDEN_BUTTON,
  BLUE_DARKER,
  MAIN_COLOR,
  PATTERN,
  TEXT_INPUT,
} from "@/src/constants/theme";
import { initializeApp } from "firebase/app";
import {
  ActionCodeSettings,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
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

export default function ResetPassword() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const translateY = useMemo(() => new Animated.Value(0), []);
  const [focused, setFocused] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [authMessage, setAuthMessage] = useState<string>("");
  const actionCodeSettings: ActionCodeSettings = {
    android: {
      packageName: "app.tenshen.tenshenfitnessapp",
    },
    handleCodeInApp: false,
    iOS: {
      bundleId: "app.tenshen.tenshenfitnessapp",
    },
    url: `https://tenshen-e1fb4.web.app/`,
  };

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
        PATTERN.center,
        PATTERN.container,
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
      <Text style={[PATTERN.bigText]}>What&apos;s your name?</Text>

      <TextInput
        onFocus={() => setFocused(true)}
        onEndEditing={() => setFocused(false)}
        aria-label="Email"
        autoCapitalize="words"
        inputMode="text"
        value={email}
        style={[
          TEXT_INPUT.input,
          PATTERN.smallText,
          { borderBottomColor: focused ? "#308cfc" : "white" },
        ]}
        placeholder="Email"
        placeholderTextColor={"white"}
        onChangeText={(text) => setEmail(text)}
      />
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
          customStyle={[BIG_GOLDEN_BUTTON.pressable, { width: "25%" }]}
          textStyle={BIG_GOLDEN_BUTTON.text}
        />
        <AppButton
          title="Send Email"
          bgColor={MAIN_COLOR}
          textColor="black"
          onPress={() => {
            setShowSpinner(true);
            sendPasswordResetEmail(auth, email, actionCodeSettings)
              .then((response) => {
                setAuthMessage("");
              })
              .catch((error) => {
                setAuthMessage(
                  "Sorry! There was an issue and we couldn't send the password reset email.",
                );
              })
              .finally(() => setShowSpinner(false));
          }}
          customStyle={[BIG_GOLDEN_BUTTON.pressable, { width: "60%" }]}
          textStyle={{ fontSize: 20, fontWeight: 700 }}
        />
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
