import { firebaseConfigWeb } from "@/src/config/firebaseConfig";
import { APP_BACKGROUND_COLOR } from "@/src/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { StyleSheet, View } from "react-native";

const app = initializeApp(firebaseConfigWeb);
const auth = getAuth(app);

export default function EmailVerification() {
  const router = useRouter();
  const params = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <View style={styles.emailContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: APP_BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  emailContainer: {},
});
