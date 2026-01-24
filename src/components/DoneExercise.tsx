import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PATTERN } from "../constants/theme";
import ExercisePhoto from "./ExercisePhoto";

export default function DoneExercise() {
  return (
    <SafeAreaView
      style={[
        PATTERN.container,
        {
          flexDirection: "row",
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  exerciseName: {
    marginInlineStart: 12,
  },
});
