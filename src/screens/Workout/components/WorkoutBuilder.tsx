import ReusableModal, {
  ReusableModalProps,
} from "@/src/components/ReusableModal";
import { BLUE_LIGHTER, MAX_INPUT_LENGTH, PATTERN } from "@/src/constants/theme";
import ExerciseCard from "@/src/screens/Workout/components/ExerciseCard";
import { useContext, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import Button from "../../../components/Button";
import { ExerciseContext } from "../ExerciseContext";
import { Exercise, data } from "../exercises";
import { WorkoutsContext } from "../WorkoutsContext";
import SearchFilterModal from "./SearchFilterModal";
const ruby = require("../../../../assets/avatars/Ruby.png");

export default function WorkoutBuilder({
  showModal,
  setShowModal,
}: ReusableModalProps) {
  const [workoutName, setWorkoutName] = useState<string>("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showSearchExerciseModal, setShowSearchExerciseModal] =
    useState<boolean>(false);
  const [workouts, setWorkouts] = useContext(WorkoutsContext);
  return (
    <ExerciseContext.Provider value={[exercises, setExercises]}>
      <ReusableModal
        showModal={showModal}
        setShowModal={() => setShowModal(!showModal)}
      >
        <View style={styles.headerContainer}>
          <View style={styles.topButtons}>
            <Button
              title="Cancel"
              bgColor="red"
              textColor="black"
              onPress={() => {
                setExercises([]);
                setShowModal(!showModal);
                setWorkoutName("");
              }}
            />
            <Button
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
              <Image source={ruby} style={{ width: 25, height: 25 }} />
              <Text style={PATTERN.bigText}>
                Ready to build a workout routine? Let&apos;s get started!
              </Text>
            </View>
          ) : (
            exercises.map((card) => {
              return (
                <ExerciseCard
                  key={card.id}
                  id={card.id}
                  exerciseName={card.name}
                />
              );
            })
          )}
        </ScrollView>
        <View style={styles.footerContainer}>
          <Button
            title="Add Exercise +"
            bgColor={BLUE_LIGHTER}
            textColor="white"
            onPress={() => {
              setShowSearchExerciseModal(!showSearchExerciseModal);
            }}
            style={{ width: "90%" }}
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
    </ExerciseContext.Provider>
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
