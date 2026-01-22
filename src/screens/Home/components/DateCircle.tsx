import { GOLD, ONBOARDING } from "@/src/constants/theme";
import { getDaysInMonth } from "@/src/scripts/getDaysInMonth";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
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
  const width = Dimensions.get("window").width;
  return (
    <Pressable
      style={[
        styles.circle,
        {
          borderColor: isCurrentDay ? GOLD : "#494A50",
          width: width * 0.1,
          height: width * 0.1,
          borderRadius: Math.round(width / 2),
        },
      ]}
    >
      <View style={{ alignItems: "center", justifyContent: "center", top: 12 }}>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#494A50",
    borderWidth: 2,
    marginInline: 8,
  },
});
