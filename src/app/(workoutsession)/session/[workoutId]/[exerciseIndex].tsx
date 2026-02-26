import { ICON_SIZE, MAIN_COLOR, PATTERN } from "@/src/constants/theme";
import { WorkoutsContext } from "@/src/contexts/WorkoutsContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function WorkoutSession() {
  const [workouts, setWorkouts] = useContext(WorkoutsContext);
  const router = useRouter();
  const params = useLocalSearchParams<{
    workoutId: string;
    workoutName: string;
    exerciseIndex: string;
  }>();
  const currentWorkout = workouts.find(
    (workout) => workout.id === params.workoutId,
  )!;
  const currentWorkoutExercises = currentWorkout.exercises;
  const currentExerciseIndex = parseInt(params.exerciseIndex);
  const currentExercise = currentWorkoutExercises[currentExerciseIndex];
  return (
    <SafeAreaProvider>
      <SafeAreaView style={PATTERN.container}>
        <View style={styles.topContainer}>
          <View style={styles.workoutDuration}>
            <Text
              style={[
                PATTERN.smallText,
                { color: MAIN_COLOR, fontWeight: "bold" },
              ]}
            >
              12:21
            </Text>
          </View>
          <View style={styles.partnerContainer}></View>
        </View>
        <View style={PATTERN.separator} />
        <View style={styles.bottomContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={[PATTERN.mediumText, { fontWeight: "bold" }]}>
              {currentExercise.name}
            </Text>

            <View style={styles.setCountContainer}>
              <Text style={PATTERN.mediumText}>
                Set 1/{currentExercise.sets.length}
              </Text>
            </View>
          </View>
          <View style={styles.navigator}>
            <Pressable
              id="previous-button"
              style={[
                styles.navBtn,
                { opacity: currentExerciseIndex === 0 ? 0.5 : 1 },
              ]}
              disabled={currentExerciseIndex === 0}
              onPress={() => {
                router.push({
                  pathname: "./[exerciseIndex]",
                  params: {
                    workoutId: params.workoutId,
                    workoutName: params.workoutName,
                    exerciseIndex: currentExerciseIndex - 1,
                  },
                });
              }}
            >
              <Ionicons
                name="play-sharp"
                size={ICON_SIZE + 8}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </Pressable>
            <View style={styles.weightAndRepsContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  editable={false}
                  maxLength={4}
                  keyboardType="decimal-pad"
                  aria-label="Weight"
                  style={[PATTERN.bigText, { color: "black" }]}
                  placeholder="0"
                  placeholderTextColor="white"
                  value={""}
                  onChangeText={(text) => {}}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  editable={false}
                  maxLength={4}
                  keyboardType="decimal-pad"
                  aria-label="Reps"
                  style={[PATTERN.bigText, { color: "black" }]}
                  placeholder="0"
                  placeholderTextColor="white"
                  value={""}
                  onChangeText={(text) => {}}
                />
              </View>
            </View>
            <Pressable
              id="next-button"
              style={styles.navBtn}
              onPress={() => {
                router.push({
                  pathname: "./[exerciseIndex]",
                  params: {
                    workoutId: params.workoutId,
                    workoutName: params.workoutName,
                    exerciseIndex: currentExerciseIndex + 1,
                  },
                });
              }}
            >
              <Ionicons name="play-sharp" size={ICON_SIZE + 8} />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  topContainer: { alignItems: "center" },
  workoutDuration: { alignSelf: "flex-start" },
  partnerContainer: {},
  bottomContainer: { alignItems: "center" },
  setCountContainer: {
    width: "25%",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "white",
    alignItems: "center",
    padding: 8,
    marginTop: 12,
  },
  navigator: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  navBtn: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  weightAndRepsContainer: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  inputContainer: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});
