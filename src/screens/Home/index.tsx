import { ONBOARDING } from "@/src/constants/theme";
import { getStartDateOfCurrentWeek } from "@/src/scripts/getStartDateOfCurrentWeek";
import { StyleSheet, View } from "react-native";
import DateCircle, { DateCircleProps } from "./components/DateCircle";

const startDate = getStartDateOfCurrentWeek();

export default function HomeScreen() {
  const dates: Array<DateCircleProps> = [
    {
      dateOfWeek: startDate.getDate() - 1,
      dayOfWeek: "Sun",
    },
    {
      dateOfWeek: startDate.getDate(),
      dayOfWeek: "M",
    },
    {
      dateOfWeek: startDate.getDate() + 1,
      dayOfWeek: "Tu",
    },
    {
      dateOfWeek: startDate.getDate() + 2,
      dayOfWeek: "W",
    },
    {
      dateOfWeek: startDate.getDate() + 3,
      dayOfWeek: "Th",
    },
    {
      dateOfWeek: startDate.getDate() + 4,
      dayOfWeek: "F",
    },
    {
      dateOfWeek: startDate.getDate() + 5,
      dayOfWeek: "Sat",
    },
  ];

  return (
    <View style={ONBOARDING.container}>
      <View style={styles.circleContainer}>
        {dates.map((day) => {
          return (
            <DateCircle dateOfWeek={day.dateOfWeek} dayOfWeek={day.dayOfWeek} />
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
