import { PATTERN } from "@/src/constants/theme";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PreviousWorkout() {
  return (
    <SafeAreaView style={PATTERN.container}>
      <View style={styles.lineSep} />
      <View></View>
      <View style={styles.lineSep} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lineSep: {
    width: "100%",
    height: 2.5,
    backgroundColor: "white",
    opacity: 0,
  },
});
