import AppButton from "@/src/components/AppButton";
import Stopwatch from "@/src/components/Stopwatch";
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
    setIndex: string;
  }>();
  const currentWorkout = workouts.find(
    (workout) => workout.id === params.workoutId,
  )!;
  const currentWorkoutExercises = currentWorkout.exercises;
  const currentExerciseIndex = parseInt(params.exerciseIndex);
  const currentExercise = currentWorkoutExercises[currentExerciseIndex];
  const currentExerciseSetNumber = parseInt(params.setIndex);
  const exerciseIsEmpty = currentExercise.sets.length === 0 ? true : false;
  const isFirstSetAndFirstExercise =
    currentExerciseIndex === 0 && currentExerciseSetNumber === 1;
  const onLastSet = currentExerciseSetNumber === currentExercise.sets.length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={PATTERN.container}>
        <View style={styles.topContainer}>
          <Stopwatch />
          <View style={styles.partnerContainer}></View>
        </View>
        <View style={PATTERN.separator} />
        <View style={styles.bottomContainer}>
          <View style={styles.bottomContainerHeader}>
            <Text style={[PATTERN.mediumText, { fontWeight: "bold" }]}>
              {currentExercise.name}
            </Text>

            <View style={styles.setCountContainer}>
              <Text style={PATTERN.mediumText}>
                Set {currentExerciseSetNumber}/
                {currentExercise.sets.length
                  ? currentExercise.sets.length
                  : "?"}
              </Text>
            </View>
          </View>
          <View style={styles.navigator}>
            <Pressable
              id="previous-button"
              style={[
                styles.navBtn,
                {
                  opacity:
                    currentExerciseIndex === 0 && currentExerciseSetNumber === 1
                      ? 0.5
                      : 1,
                },
              ]}
              disabled={isFirstSetAndFirstExercise}
              onPress={() => {
                if (!isFirstSetAndFirstExercise) router.back();
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
                  style={PATTERN.bigText}
                  value={
                    exerciseIsEmpty
                      ? "-"
                      : currentExercise.sets[currentExerciseSetNumber - 1]
                            .weight
                        ? currentExercise.sets[currentExerciseSetNumber - 1]
                            .weight
                        : "-"
                  }
                  onChangeText={(text) => {}}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  editable={false}
                  maxLength={4}
                  keyboardType="decimal-pad"
                  aria-label="Reps"
                  style={PATTERN.bigText}
                  value={
                    exerciseIsEmpty
                      ? "-"
                      : currentExercise.sets[currentExerciseSetNumber - 1].reps
                        ? currentExercise.sets[currentExerciseSetNumber - 1]
                            .reps
                        : "-"
                  }
                  onChangeText={(text) => {}}
                />
              </View>
            </View>
            <Pressable
              id="next-button"
              style={[
                styles.navBtn,
                {
                  opacity:
                    currentExerciseIndex ===
                      currentWorkoutExercises.length - 1 &&
                    currentExerciseSetNumber ===
                      currentWorkoutExercises[
                        currentWorkoutExercises.length - 1
                      ].sets.length
                      ? 0.5
                      : 1,
                },
              ]}
              disabled={
                currentExerciseIndex === currentWorkoutExercises.length - 1 &&
                currentExerciseSetNumber ===
                  currentWorkoutExercises[currentWorkoutExercises.length - 1]
                    .sets.length
              }
              onPress={() => {
                router.push({
                  pathname: "/session/[workoutId]",
                  params: {
                    workoutId: params.workoutId,
                    workoutName: params.workoutName,
                    exerciseIndex: !onLastSet
                      ? currentExerciseIndex.toString()
                      : (currentExerciseIndex + 1).toString(),
                    setIndex: onLastSet
                      ? "1"
                      : (currentExerciseSetNumber + 1).toString(),
                  },
                });
              }}
            >
              <Ionicons name="play-sharp" size={ICON_SIZE + 8} />
            </Pressable>
          </View>
          {!currentExercise.sets.length ? (
            <AppButton
              title="Next Exercise"
              bgColor={MAIN_COLOR}
              textColor="black"
              onPress={() => {
                router.push({
                  pathname: "/session/[workoutId]",
                  params: {
                    workoutId: params.workoutId,
                    workoutName: params.workoutName,
                    exerciseIndex: (currentExerciseIndex + 1).toString(),
                    setIndex: "1",
                  },
                });
              }}
              style={{ marginTop: 16 }}
            />
          ) : (
            <></>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  partnerContainer: {},
  bottomContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 12,
  },
  bottomContainerHeader: { alignItems: "center", marginBottom: 12 },
  setCountContainer: {
    width: "25%",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "white",
    alignItems: "center",
    padding: 12,
    marginTop: 12,
  },
  navigator: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-evenly",
    marginTop: 24,
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
