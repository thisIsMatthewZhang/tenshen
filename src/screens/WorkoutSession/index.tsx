import { PATTERN } from "@/src/constants/theme";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function WorkoutSessionScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={PATTERN.container}>
        <View style={styles.topContainer}></View>
        <View style={PATTERN.separator} />
        <View style={styles.bottomContainer}>
          <View style={styles.setCountContainer}>
            <Text style={PATTERN.mediumText}>Set 2/3</Text>
          </View>
          <View style={styles.navigator}>
            <View style={styles.backArrow}></View>
            <View style={styles.weightAndRepsContainer}></View>
            <View style={styles.nextArrow}></View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  topContainer: {},
  bottomContainer: {},
  setCountContainer: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "white",
    padding: 8,
  },
  navigator: { flexDirection: "row" },
  backArrow: {},
  weightAndRepsContainer: { flexDirection: "row" },
  nextArrow: {},
});
