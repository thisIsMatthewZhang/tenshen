import { ONBOARDING } from "@/src/constants/theme";
import { StyleSheet, View } from "react-native";
import DateCircle from "./components/DateCircle";

export default function HomeScreen() {
  return (
    <View style={ONBOARDING.container}>
      <View style={styles.circleContainer}>
        <DateCircle />
        <DateCircle />
        <DateCircle />
        <DateCircle />
        <DateCircle />
        <DateCircle />
        <DateCircle />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    flexDirection: "row",
    width: "100%",
    height: "auto",
  },
});
