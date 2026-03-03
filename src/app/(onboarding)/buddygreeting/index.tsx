import { BIG_GOLDEN_BUTTON, MAIN_COLOR, PATTERN } from "@/src/constants/theme";
// import {
//     Fit,
//     RiveView,
//     useRive,
//     useRiveFile
// } from "@rive-app/react-native";
// import { requireNativeModule } from "expo";
import AppButton from "@/src/components/AppButton";
import { UnknownOutputParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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
          <AppButton
            title="Next"
            bgColor={MAIN_COLOR}
            textColor="black"
            onPress={() => router.push({ pathname: "/setaccountcredentials" })}
            style={BIG_GOLDEN_BUTTON.pressable}
            textStyle={{ fontSize: 20, fontWeight: 700 }}
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
