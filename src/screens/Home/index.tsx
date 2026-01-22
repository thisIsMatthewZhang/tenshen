import { FONTS, GOLD, ICON_SIZE, ONBOARDING } from "@/src/constants/theme";
import { Image, StyleSheet, Text, View } from "react-native";
import DateCircle from "./components/DateCircle";
import { dates } from "./dates";
const fireIcon = require("../../../assets/fire-icon.png");

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
        <View style={styles.streak}>
          {/* <FontAwesome6 name="fire" size={ICON_SIZE} color="orange" /> */}
          <Image source={fireIcon} width={ICON_SIZE} height={ICON_SIZE} />
          <Text
            style={{
              color: GOLD,
              fontWeight: "semibold",
              marginInlineStart: 4,
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
    margin: 16,
  },
  streak: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginInlineStart: 8,
  },

  greetingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  greetingText: {
    ...FONTS,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
  },
});
