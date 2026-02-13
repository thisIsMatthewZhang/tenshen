import { BG_CONTRAST, MAIN_COLOR, PATTERN } from "@/src/constants/theme";
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
          borderColor: isCurrentDay ? MAIN_COLOR : "#494A50",
          width: width * 0.075,
          height: width * 0.075,
          borderRadius: Math.round(width / 2),
        },
      ]}
      hitSlop={5}
    >
      <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
        <Text style={[PATTERN.smallText, { fontSize: 12, fontWeight: "bold" }]}>
          {dateOfWeek > getDaysInMonth()
            ? dateOfWeek - getDaysInMonth()
            : dateOfWeek}
        </Text>
        <Text
          style={[
            PATTERN.smallText,
            { fontSize: 12, fontWeight: "bold", marginBlockStart: 4 },
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BG_CONTRAST,
    borderWidth: 2,
    marginInline: 8,
  },
});
