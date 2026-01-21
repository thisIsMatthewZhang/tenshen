import { ONBOARDING } from "@/src/constants/theme";
import { Pressable, StyleSheet, Text } from "react-native";

export default function DateCircle() {
  // TODO: Add props that will tell the date number and day of the week
  return (
    <Pressable style={styles.circle}>
      <Text style={[ONBOARDING.smallText, { fontWeight: "bold" }]}> Hi </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    flex: 1,
    width: 12,
    height: 36,
    justifyContent: "center",
    backgroundColor: "#494A50",
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: "black",
    paddingInlineStart: 5,
    marginInline: 12,
  },
  currentDay: {
    // outline with GOLD if Circle is current day of the week
  },
});
