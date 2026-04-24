// Parent component for a user's completed workout on the Home page
// Will display all DoneExercise components for a given workout, with a max display of 3
import FinishedExercise from "@/src/components/FinishedExercise";
import ProfilePhoto from "@/src/components/ProfilePhoto";
import { PATTERN } from "@/src/constants/theme";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { FirebaseFinishedWorkout } from "../types/firebaseFinishedWorkout";
import { FirebaseExercise } from "../types/firebaseexercise";

const MAX_EXERCISES = 3;

export default function PreviousWorkout({
  userName,
  workout,
}: {
  workout: FirebaseFinishedWorkout;
  userName: string;
}) {
  const exercises = workout.exercises;
  const [displayedExercises, setDisplayedExercises] = useState<
    FirebaseExercise[]
  >([]);

  useEffect(() => {
    setDisplayedExercises(exercises.slice(0, MAX_EXERCISES));
  }, [exercises]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <ProfilePhoto />
          <Text
            style={[PATTERN.mediumText, { fontWeight: "bold", marginLeft: 8 }]}
          >
            {userName}
          </Text>
        </View>

        <View style={styles.workoutTitle}>
          <Text style={[PATTERN.mediumText, { fontWeight: "bold" }]}>
            {workout.name}
          </Text>
          <View style={styles.workoutDateAndDuration}>
            <Text
              style={[PATTERN.smallText, { fontWeight: "bold", opacity: 0.5 }]}
            >
              {workout.duration}
            </Text>
          </View>
        </View>
        <FlatList
          scrollEnabled={false}
          data={displayedExercises}
          renderItem={({ item }) => {
            return <FinishedExercise exercise={item} />;
          }}
        />
        {exercises.length > MAX_EXERCISES ? (
          <Text
            style={[
              PATTERN.smallText,
              { fontWeight: "bold", textDecorationLine: "underline", top: 4 },
            ]}
          >
            View {exercises.length - MAX_EXERCISES} more exercise(s)
          </Text>
        ) : (
          <></>
        )}
      </View>
      <View style={PATTERN.separator} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  workoutTitle: {
    marginVertical: 12,
  },
  workoutDateAndDuration: {
    flexDirection: "row",
  },
});
