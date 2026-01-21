import { GOLD, ONBOARDING } from "@/src/constants/theme";
import { getDaysInMonth } from "@/src/scripts/getDaysInMonth";
import { Pressable, StyleSheet, Text, View } from "react-native";
export interface DateCircleProps {
  dateOfWeek: number;
  dayOfWeek: "Sun" | "M" | "Tu" | "W" | "Th" | "F" | "Sat";
  isCurrentDay: boolean;
}

export default function DateCircle({
  dateOfWeek,
  dayOfWeek,
  isCurrentDay,
}: DateCircleProps) {
  return (
    <Pressable
      style={[styles.circle, { borderColor: isCurrentDay ? GOLD : "#494A50" }]}
    >
      <View style={styles.textContainer}>
        <Text style={[ONBOARDING.smallText, { fontWeight: "semibold" }]}>
          {dateOfWeek > getDaysInMonth()
            ? dateOfWeek - getDaysInMonth()
            : dateOfWeek}
        </Text>
        <Text
          style={[
            ONBOARDING.smallText,
            { fontWeight: "semibold", marginBlockStart: 4 },
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
    borderWidth: 2,
    borderRadius: 20,
    marginInline: 12,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 12,
  },
});
