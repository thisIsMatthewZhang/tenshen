import ExerciseCard from "@/src/components/ExerciseCard";
import ReusableModal, {
  ReusableModalProps,
} from "@/src/components/ReusableModal";
import { BLUE_LIGHTER, MAX_INPUT_LENGTH, PATTERN } from "@/src/constants/theme";
import { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import uuid from "react-native-uuid";
import { ExerciseContext } from "../contexts/ExerciseContext";
import { WorkoutsContext } from "../contexts/WorkoutsContext";
import { data } from "../utils/exercises";
import AppButton from "./AppButton";
import SearchFilterModal from "./SearchFilterModal";
// const ruby = require("../../../../assets/avatars/Ruby.png");

export default function WorkoutBuilder({
  showModal,
  setShowModal,
}: ReusableModalProps) {
  const [workoutName, setWorkoutName] = useState<string>("");
  const [exercises, setExercises] = useContext(ExerciseContext);
  const [showSearchExerciseModal, setShowSearchExerciseModal] =
    useState<boolean>(false);
  const [workouts, setWorkouts] = useContext(WorkoutsContext);
  return (
    <ReusableModal
      showModal={showModal}
      setShowModal={() => setShowModal(!showModal)}
    >
      <View style={styles.headerContainer}>
        <View style={styles.topButtons}>
          <AppButton
            title="Cancel"
            bgColor="red"
            textColor="black"
            onPress={() => {
              setExercises([]);
              setShowModal(!showModal);
              setWorkoutName("");
            }}
            style={{ margin: 8 }}
          />
          <AppButton
            title="Done 👍"
            bgColor={BLUE_LIGHTER}
            textColor="white"
            onPress={() => {
              setExercises([]);
              setShowModal(!showModal);
              setWorkoutName("");
              setWorkouts([
                {
                  id: uuid.v4(),
                  workoutName: workoutName,
                  exercises: exercises,
                },
                ...workouts,
              ]);
            }}
            style={{ margin: 8 }}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Workout Name"
          placeholderTextColor={"white"}
          maxLength={MAX_INPUT_LENGTH}
          value={workoutName}
          onChangeText={(text) => setWorkoutName(text)}
        />
      </View>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {!exercises.length ? (
          <View style={styles.emptyState}>
            {/* <Image source={ruby} style={{ width: 25, height: 25 }} /> */}
            <Text style={PATTERN.bigText}>
              Ready to build a workout routine? Let&apos;s get started!
            </Text>
          </View>
        ) : (
          exercises.map((item) => {
            return (
              <ExerciseCard
                key={item.id}
                id={item.id}
                name={item.name}
                muscleGroup={item.muscleGroup}
                isSelected
                sets={item.sets}
              />
            );
          })
        )}
      </ScrollView>
      <View style={styles.footerContainer}>
        <AppButton
          title="Add Exercise +"
          bgColor={BLUE_LIGHTER}
          textColor="white"
          onPress={() => {
            setShowSearchExerciseModal(!showSearchExerciseModal);
          }}
          style={{ width: "90%", margin: 8 }}
        />
      </View>
      {showSearchExerciseModal ? (
        <SearchFilterModal
          data={data}
          showModal={showSearchExerciseModal}
          setShowModal={setShowSearchExerciseModal}
        />
      ) : (
        <></>
      )}
    </ReusableModal>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 60,
  },
  input: {
    width: "85%",
    fontSize: 24,
    color: "white",
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 12,
    marginVertical: 12,
  },
  topButtons: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  footerContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 28,
  },
  emptyState: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },

  cardsContainer: { width: "100%", alignItems: "center" },
});
