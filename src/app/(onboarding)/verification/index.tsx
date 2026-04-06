import { firebaseConfigWeb } from "@/config/firebaseConfig";
import AppButton from "@/src/components/AppButton";
import { MAIN_COLOR, PATTERN } from "@/src/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { initializeApp } from "firebase/app";
import {
  ActionCodeSettings,
  getAuth,
  sendEmailVerification,
  updateProfile,
  User,
} from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const app = initializeApp(firebaseConfigWeb);
const auth = getAuth(app);

export default function EmailVerification() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    fullName: string;
    preferredName: string;
    selected: string;
    emailVerified: string;
    oobCode: string;
  }>();
  const user: User = auth.currentUser!;
  const [userReloaded, setUserReloaded] = useState(false); // needed as 'user.emailVerfied' update does not seem to reflect in the render
  const actionCodeSettings: ActionCodeSettings = {
    android: {
      packageName: "app.tenshen.tenshenfitnessapp",
    },
    handleCodeInApp: false,
    iOS: {
      bundleId: "app.tenshen.tenshenfitnessapp",
    },
    url: `https://tenshen-e1fb4.web.app/?email=${user.email}&fullName=${params.fullName}&preferredName=${params.preferredName}&selected=${params.selected}`,
  };
  if (!params.oobCode && !params.emailVerified) {
    (async function () {
      await sendEmailVerification(user, actionCodeSettings);
    })();
  }
  if (params.oobCode && params.emailVerified) {
    user
      .reload()
      .then(async () => {
        if (user.emailVerified) setUserReloaded(true);
        await updateProfile(user, {
          displayName: params.preferredName,
          photoURL: null,
        });
      })
      .catch((error) => setUserReloaded(false));
  }

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
            if (!userReloaded) {
            } else {
              router.navigate({ pathname: "/home" });
            }
          }}
          customStyle={[styles.button, { opacity: !userReloaded ? 0.5 : 1 }]}
          pressableProps={{ disabled: !userReloaded }}
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
