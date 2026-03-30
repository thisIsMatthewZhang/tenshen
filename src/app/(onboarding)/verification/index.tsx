import { firebaseConfigWeb } from "@/config/firebaseConfig";
import AppButton from "@/src/components/AppButton";
import { MAIN_COLOR, PATTERN } from "@/src/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { initializeApp } from "firebase/app";
import {
  ActionCodeSettings,
  getAuth,
  sendEmailVerification,
  User,
} from "firebase/auth";
import { StyleSheet, Text, View } from "react-native";

const app = initializeApp(firebaseConfigWeb);
const auth = getAuth(app);
const actionCodeSettings: ActionCodeSettings = {
  android: {
    packageName: "app.tenshen.tenshenfitnessapp",
  },
  handleCodeInApp: false,
  iOS: {
    bundleId: "app.tenshen.tenshenfitnessapp",
  },
  url: "https://tenshen-e1fb4.firebaseapp.com/?emailVerified=true", // maybe include user email too
};

export default function EmailVerification() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    fullName: string;
    preferredName: string;
    selected: string;
  }>();
  const user: User = auth.currentUser!;
  (async function () {
    await sendEmailVerification(user, actionCodeSettings);
  })();

  return (
    <View style={PATTERN.container}>
      <View style={styles.headerContainer}>
        <Text style={PATTERN.bigText}>Email verification sent!</Text>
        <Text style={[PATTERN.mediumText, { marginTop: 12 }]}>
          An email to verify your account has been sent to:{" "}
          <Text style={[PATTERN.mediumText, { fontWeight: "bold" }]}>
            {user.email}{" "}
          </Text>
          <Text style={PATTERN.mediumText}>
            (please check your inbox and spam).
          </Text>
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          textColor="black"
          bgColor={MAIN_COLOR}
          title="Time to work out!"
          onPress={() => {
            if (!user.emailVerified) {
            } else {
              router.navigate({ pathname: "/home" });
            }
          }}
          customStyle={[
            styles.button,
            { opacity: !user.emailVerified ? 0.5 : 1 },
          ]}
          pressableProps={{ disabled: !user.emailVerified }}
        />
        <AppButton
          textColor="white"
          bgColor="black"
          title="Resend verification email"
          onPress={async () => {
            await sendEmailVerification(user, actionCodeSettings);
          }}
          customStyle={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 12,
  },
  buttonsContainer: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 12,
  },
  button: {
    width: "100%",
  },
});
