import { ONBOARDING } from "@/src/constants/theme";
import { StyleSheet, View } from "react-native";
import DateCircle from "./components/DateCircle";
import { dates } from "./dates";

export default function HomeScreen() {
  return (
    <View style={ONBOARDING.container}>
      <View style={styles.circleContainer}>
        {dates.map((day) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <DateCircle
              dateOfWeek={day.dateOfWeek}
              dayOfWeek={day.dayOfWeek}
              isCurrentDay={day.isCurrentDay}
            />
          );
        })}
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
