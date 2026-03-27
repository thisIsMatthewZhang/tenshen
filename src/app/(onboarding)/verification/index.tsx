import { firebaseConfigWeb } from "@/src/config/firebaseConfig";
import { APP_BACKGROUND_COLOR, PATTERN } from "@/src/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { initializeApp } from "firebase/app";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { StyleSheet, Text, View } from "react-native";

const app = initializeApp(firebaseConfigWeb);
const auth = getAuth(app);

export default function EmailVerification() {
  const router = useRouter();
  const params = useLocalSearchParams<{ user: string }>();
  //   const user: User = JSON.parse(params.user);
  (async function () {
    await sendEmailVerification(auth.currentUser!);
  })();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={PATTERN.bigText}>Email verification sent!</Text>
        <Text style={PATTERN.mediumText}>
          An email to verify your account has been sent to:{" "}
          {auth.currentUser!.email}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: APP_BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {},
});
