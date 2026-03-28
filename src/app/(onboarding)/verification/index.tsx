import AppButton from "@/src/components/AppButton";
import { firebaseConfigWeb } from "@/src/config/firebaseConfig";
import { MAIN_COLOR, PATTERN } from "@/src/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { initializeApp } from "firebase/app";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const app = initializeApp(firebaseConfigWeb);
const auth = getAuth(app);

export default function EmailVerification() {
  const router = useRouter();
  const params = useLocalSearchParams<{ user: string }>();
  const [mustVerify, setMustVerify] = useState("");
  (async function () {
    await sendEmailVerification(auth.currentUser!);
  })();
  return (
    <View style={PATTERN.container}>
      <View style={styles.headerContainer}>
        <Text style={PATTERN.bigText}>Email verification sent!</Text>
        <Text style={[PATTERN.mediumText, { marginTop: 12 }]}>
          An email to verify your account has been sent to:
          {auth.currentUser!.email}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          textColor="black"
          bgColor={MAIN_COLOR}
          title="Time to work out!"
          onPress={() => {
            if (!auth.currentUser?.emailVerified) {
              setMustVerify("Please verify your email before continuing.");
            } else {
              router.navigate({ pathname: "/home" });
              setMustVerify("");
            }
          }}
        />
        <AppButton
          textColor="white"
          bgColor="black"
          title="Resend verification email"
          onPress={async () => {
            await sendEmailVerification(auth.currentUser!);
          }}
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
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 12,
  },
});
