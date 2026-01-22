import { FONTS, GOLD, ICON_SIZE, ONBOARDING } from "@/src/constants/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import DateCircle from "./components/DateCircle";
import { dates } from "./dates";

export default function HomeScreen() {
  return (
    <View style={[ONBOARDING.container]}>
      <View style={styles.circleContainer}>
        {dates.map((day) => {
          return (
            <DateCircle
              key={day.dayOfWeek}
              dateOfWeek={day.dateOfWeek}
              dayOfWeek={day.dayOfWeek}
              isCurrentDay={day.isCurrentDay}
            />
          );
        })}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome6 name="fire" size={ICON_SIZE} color="orange" />
          <Text
            style={{
              color: GOLD,
              fontWeight: "semibold",
              marginInlineStart: 8,
            }}
          >
            0
          </Text>
        </View>
      </View>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          Hey Matthew! You ready to start this workout journey together!? I know
          I am 💪
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBlock: 16,
  },
  greetingText: {
    ...FONTS,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginInline: 16,
    marginBlock: 16,
  },

  greetingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
