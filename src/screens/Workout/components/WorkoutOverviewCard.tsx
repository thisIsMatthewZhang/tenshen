import { MAIN_COLOR } from "@/src/constants/theme";
import { StyleSheet, View } from "react-native";
import { Exercise } from "../exercises";

export default function WorkoutOverviewCard(exercise: Exercise) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}></View>
      <View style={styles.mainBody}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: MAIN_COLOR,
  },
  header: {
    flexDirection: "row",
  },
  mainBody: {},
});
