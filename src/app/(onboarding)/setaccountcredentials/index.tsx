import { firebaseConfigWeb } from "@/config/firebaseConfig";
import AppButton from "@/src/components/AppButton";
import BackButton from "@/src/components/BackButton";
import { LOCAL_AUTH_ERROR_CODES } from "@/src/constants/localAuthErrorCodes";
import {
  BIG_GOLDEN_BUTTON,
  BLUE_DARKER,
  MAIN_COLOR,
  PATTERN,
  TEXT_INPUT,
} from "@/src/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  validatePassword,
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
  const [authMessage, setAuthMessage] = useState<string>(""); // separated to its own state to prevent affecting 'errors' check
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

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
        passwordRules="required: upper; required: lower; required: special; required: digit; minlength: 8; maxlength: 4096"
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
        passwordRules="required: upper; required: lower; required: special; required: digit; minlength: 8; maxlength: 4096"
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
      <View style={styles.passwordRulesContainer}>
        <Text style={[PATTERN.smallText]}>Password must:</Text>
        <Text style={[PATTERN.smallText]}>
          • Include at least one uppercase letter
        </Text>
        <Text style={[PATTERN.smallText]}>
          • Include at least one lowercase letter
        </Text>
        <Text style={[PATTERN.smallText]}>
          • Include at least one special character
        </Text>
        <Text style={[PATTERN.smallText]}>• Include at least one number</Text>
        <Text style={[PATTERN.smallText]}>
          • Be at least eight characters long
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <BackButton
          bgColor={MAIN_COLOR}
          textColor="black"
          customStyle={[BIG_GOLDEN_BUTTON.pressable, { width: "25%" }]}
          textStyle={BIG_GOLDEN_BUTTON.text}
        />
        <AppButton
          title="Next"
          bgColor={MAIN_COLOR}
          textColor="black"
          onPress={async () => {
            const passwordStatus = await validatePassword(
              auth,
              credentials.password,
            );
            if (
              Object.values(credentials).every((value) => value) &&
              Object.values(errors).every((value) => !value) &&
              credentials.password === credentials.confirmPassword &&
              passwordStatus.isValid
            ) {
              Keyboard.dismiss();
              setShowSpinner(true);
              await createUserWithEmailAndPassword(
                auth,
                credentials.email,
                credentials.password,
              )
                .then((userCredentials) => {
                  setShowSpinner(false);
                  const data = {
                    fullName: params.fullName,
                    preferredName: params.preferredName,
                    selected: params.selected,
                  };
                  // user is automatically signed in when their account is successfully created.
                  // The observer subscribes to the Auth object and executes the callback with the signed in User
                  onAuthStateChanged(auth, (user) => {
                    if (user) {
                      router.navigate({
                        pathname: "/verification",
                        params: data,
                      });
                    }
                  });
                  setAuthMessage("");
                })
                .catch((error) => {
                  // TODO: ADD PROPER ERROR DISPLAYS FOR CHECKING ON PROVIDERS
                  setShowSpinner(false);
                  const errorCode = error.code;
                  let errorDisplayText;
                  switch (errorCode) {
                    case LOCAL_AUTH_ERROR_CODES.EMAIL_EXISTS:
                      errorDisplayText =
                        "An account with this email already exists. Please sign in.";
                      break;
                    case LOCAL_AUTH_ERROR_CODES.INTERNAL_ERROR:
                      errorDisplayText =
                        "Sorry! There was an internal issue. Please try again soon.";
                      break;
                    default:
                      errorDisplayText = "An issue occurred. Please try again";
                  }
                  setAuthMessage(errorDisplayText);
                });
            }
          }}
          customStyle={[BIG_GOLDEN_BUTTON.pressable, { width: "60%" }]}
          textStyle={{ fontSize: 20, fontWeight: 700 }}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
  },
  spinner: {
    position: "absolute",
  },
  passwordRulesContainer: {
    alignItems: "flex-start",
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
