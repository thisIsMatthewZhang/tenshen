import WorkoutHistory from "@/src/components/WorkoutHistory";
import { FONTS, ICON_SIZE, MAIN_COLOR, PATTERN } from "@/src/constants/theme";
import { useWeeklyDates } from "@/src/hooks/useWeeklyDates";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DateCircle from "./components/DateCircle";
const fireIcon = require("../../../assets/fire-icon.png");

export default function HomeScreen() {
  const dates = useWeeklyDates();

  return (
    <SafeAreaProvider style={PATTERN.container}>
      <SafeAreaView>
        <ScrollView>
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
              <Image source={fireIcon} width={ICON_SIZE} height={ICON_SIZE} />
              <Text
                style={{
                  color: MAIN_COLOR,
                  fontWeight: "semibold",
                  marginLeft: 4,
                }}
              >
                0
              </Text>
            </View>
          </View>
          <View style={styles.greetingContainer}>
            <Text style={[styles.greetingText, { color: MAIN_COLOR }]}>
              Hey Matthew!{" "}
              <Text style={[styles.greetingText, { color: "white" }]}>
                You ready to start this workout journey together!? I know I am
                💪
              </Text>
            </Text>
          </View>
          <WorkoutHistory />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
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
    marginLeft: 8,
  },

  greetingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  greetingText: {
    ...FONTS,
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
  },
});
