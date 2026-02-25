import { PATTERN } from "@/src/constants/theme";
// import {
//     Fit,
//     RiveView,
//     useRive,
//     useRiveFile
// } from "@rive-app/react-native";
// import { requireNativeModule } from "expo";
import { UnknownOutputParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import OnboardingButton from "../../../components/OnboardingButton";

export default function BuddyGreeting({
  fullName,
  preferredName,
  selected,
}: UnknownOutputParams) {
  const router = useRouter();
  // const { riveFile } = useRiveFile(requireNativeModule(""));
  // const { riveViewRef, setHybridRef } = useRive();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[PATTERN.container, PATTERN.center]}>
        <View style={[PATTERN.center, { width: "100%" }]}>
          <Text style={PATTERN.bigText}>
            Sup {preferredName}!!! Call me {selected}.
          </Text>
          {/* {riveFile && (
        <RiveView
          hybridRef={setHybridRef}
          file={riveFile}
          style={styles.rive}
          fit={Fit.Layout}
        />
      )} */}
          <OnboardingButton
            buttonText="Next"
            router={() => {
              router.push({
                pathname: "/setaccountcredentials",
                params: { fullName, preferredName, selected },
              });
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rive: {
    width: "100%",
    height: 400,
  },
});
