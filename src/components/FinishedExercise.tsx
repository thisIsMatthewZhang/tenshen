import { StyleSheet, Text, View } from "react-native";
import { PATTERN } from "../constants/theme";
import { FirebaseExercise } from "../types/firebaseexercise";
import ExercisePhoto from "./ExercisePhoto";

export default function FinishedExercise({
  exercise,
}: {
  exercise: FirebaseExercise;
}) {
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
          {exercise.name}
        </Text>
        <Text style={[PATTERN.smallText, { opacity: 0.75 }]}>
          {exercise.sets.length} sets
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseName: {
    marginLeft: 12,
  },
});
