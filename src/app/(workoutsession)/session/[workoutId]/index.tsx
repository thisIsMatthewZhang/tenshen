import AppButton from "@/src/components/AppButton";
import ReusableModal from "@/src/components/ReusableModal";
import Stopwatch from "@/src/components/Stopwatch";
import {
  APP_BACKGROUND_COLOR,
  BLUE_LIGHTER,
  ICON_SIZE,
  MAIN_COLOR,
  PATTERN,
} from "@/src/constants/theme";
import { StopwatchContext } from "@/src/contexts/StopwatchContext";
import { WorkoutsContext } from "@/src/contexts/WorkoutsContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// workout.exercises -> 0-based index
// currentExercise.sets -> 1-based index
export default function WorkoutSession() {
  const [workouts, setWorkouts] = useContext(WorkoutsContext);
  const [stopwatch, setStopwatch] = useContext(StopwatchContext);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const router = useRouter();
  const params = useLocalSearchParams<{
    workoutId: string;
    workoutName: string;
    exerciseIndex: string;
    maxVisitedIndex: string;
    setIndex: string;
  }>();
  const currentWorkout = workouts.find(
    (workout) => workout.id === params.workoutId, // can't pass to WorkoutCard - local search params only accept string | string[] :/
  )!;
  const currentWorkoutExercises = currentWorkout.exercises;
  const currentExerciseIndex = parseInt(params.exerciseIndex);
  const currentExercise = currentWorkoutExercises[currentExerciseIndex];
  const currentExerciseSetNumber = parseInt(params.setIndex);
  const exerciseIsEmpty = currentExercise.sets.length === 0 ? true : false;
  const isFirstSetAndFirstExercise =
    currentExerciseIndex === 0 && currentExerciseSetNumber === 1;
  const isLastExerciseSet =
    currentExerciseSetNumber === currentExercise.sets.length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={PATTERN.container}>
        <ReusableModal
          showModal={showPopup}
          setShowModal={setShowPopup}
          modalProps={{
            animationType: "fade",
            allowSwipeDismissal: false,
            transparent: true,
          }}
        >
          <View style={styles.modalBgView}>
            <View style={styles.modalInnerView}>
              <Text style={PATTERN.smallText}>
                Do you want to end your workout?
              </Text>
              <View style={styles.btnOptions}>
                <AppButton
                  title="Cancel"
                  bgColor="red"
                  textColor="black"
                  onPress={() => {
                    setShowPopup(false);
                  }}
                  textStyle={{ fontWeight: "bold" }}
                  customStyle={{
                    width: "50%",
                    borderRadius: 0,
                    borderBottomStartRadius: 20,
                  }}
                />
                <AppButton
                  title="Confirm"
                  bgColor={BLUE_LIGHTER}
                  textColor="white"
                  onPress={() => {
                    // record completed data to pass to completion screen
                    setShowPopup(false);
                    const time: `${number}hr ${number}m ${number}s` = `${stopwatch.hr}hr ${stopwatch.min}m ${stopwatch.sec}s`;
                    const setsCompleted = currentWorkoutExercises.reduce(
                      (acc, ex) => acc + ex.sets.length,
                      0,
                    );
                    const completed = {
                      workoutId: params.workoutId,
                      workoutName: params.workoutName,
                      exercisesCompleted: currentWorkoutExercises.length,
                      setsCompleted: setsCompleted,
                      time: time,
                      streak: 17,
                    };
                    router.navigate({
                      pathname: "/session/[workoutId]/workoutComplete",
                      params: completed,
                    });
                  }}
                  textStyle={{ fontWeight: "bold" }}
                  customStyle={{
                    width: "50%",
                    borderRadius: 0,
                    borderBottomEndRadius: 20,
                  }}
                />
              </View>
            </View>
          </View>
        </ReusableModal>
        <View style={styles.topContainer}>
          <View style={styles.stopwatchAndEnd}>
            <Stopwatch />
            <AppButton
              title="Finish Workout"
              bgColor={MAIN_COLOR}
              textColor="black"
              onPress={() => {
                setShowPopup(true);
              }}
            />
          </View>
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
                Set {currentExerciseSetNumber}/{currentExercise.sets.length}
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
                    exerciseIndex: !isLastExerciseSet
                      ? currentExerciseIndex.toString()
                      : (currentExerciseIndex + 1).toString(),
                    setIndex: isLastExerciseSet
                      ? "1"
                      : (currentExerciseSetNumber + 1).toString(),
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
  topContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  stopwatchAndEnd: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  modalBgView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: APP_BACKGROUND_COLOR,
    opacity: 0.95,
  },
  modalInnerView: {
    width: "75%",
    height: 125,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
    borderRadius: 20,
    paddingTop: 20,
  },
  btnOptions: { width: "100%", flexDirection: "row" },
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
