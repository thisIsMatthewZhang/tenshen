import { GOLD, ONBOARDING } from "@/src/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface DateCircleProps {
  dateOfWeek: number;
  dayOfWeek: "Sun" | "M" | "Tu" | "W" | "Th" | "F" | "Sat";
}

export default function DateCircle({ dateOfWeek, dayOfWeek }: DateCircleProps) {
  // TODO: Add props that will tell the date number and day of the week
  return (
    <Pressable style={styles.circle}>
      <View style={styles.textContainer}>
        <Text style={[ONBOARDING.smallText, { fontWeight: "semibold" }]}>
          {dateOfWeek}
        </Text>
        <Text
          style={[
            ONBOARDING.smallText,
            { fontWeight: "bold", marginBlockStart: 4 },
          ]}
        >
          {dayOfWeek}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    flex: 1,
    width: 12,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#494A50",
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: "black",
    // paddingInlineStart: 5,
    marginInline: 12,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 12,
  },
  currentDay: {
    // outline with GOLD if Circle is current day of the week
    borderColor: GOLD,
  },
});
