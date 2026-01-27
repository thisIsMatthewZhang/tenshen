import { StyleSheet, Text, View } from "react-native";
import { PATTERN } from "../constants/theme";
import ExercisePhoto from "./ExercisePhoto";

export default function DoneExercise() {
  return (
    <View
      style={[
        PATTERN.container,
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: 12,
        },
      ]}
    >
      <ExercisePhoto />
      <View style={styles.exerciseName}>
        <Text style={[PATTERN.smallText, { fontWeight: "bold" }]}>
          Incline Bench Press (Barbell)
        </Text>
        <Text style={[PATTERN.smallText, { opacity: 0.75 }]}>3 sets</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseName: {
    marginLeft: 12,
  },
});
