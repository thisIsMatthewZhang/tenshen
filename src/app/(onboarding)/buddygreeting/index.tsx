import { BIG_GOLDEN_BUTTON, MAIN_COLOR, PATTERN } from "@/src/constants/theme";
// import {
//     Fit,
//     RiveView,
//     useRive,
//     useRiveFile
// } from "@rive-app/react-native";
// import { requireNativeModule } from "expo";
import AppButton from "@/src/components/AppButton";
import BackButton from "@/src/components/BackButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function BuddyGreeting() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    fullName: string;
    preferredName: string;
    selected: "Ruby" | "Rudy";
  }>();
  // const { riveFile } = useRiveFile(requireNativeModule(""));
  // const { riveViewRef, setHybridRef } = useRive();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[PATTERN.container, PATTERN.center]}>
        <View style={[PATTERN.center, { width: "100%" }]}>
          <Text style={PATTERN.bigText}>
            Sup {params.preferredName}!!! Call me {params.selected}.
          </Text>
          {/* {riveFile && (
        <RiveView
          hybridRef={setHybridRef}
          file={riveFile}
          style={styles.rive}
          fit={Fit.Layout}
        />
      )} */}
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
              title="Next"
              bgColor={MAIN_COLOR}
              textColor="black"
              onPress={() =>
                router.push({
                  pathname: "/setaccountcredentials",
                  params: {
                    fullName: params.fullName,
                    preferredName: params.preferredName,
                    selected: params.selected,
                  },
                })
              }
              customStyle={[BIG_GOLDEN_BUTTON.pressable, { width: "60%" }]}
              textStyle={{ fontSize: 20, fontWeight: 700 }}
            />
          </View>
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
