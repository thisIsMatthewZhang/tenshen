import {
  APP_BACKGROUND_COLOR,
  BLUE_LIGHTER,
  MAX_INPUT_LENGTH,
  PATTERN,
} from "@/src/constants/theme";
import ExerciseCard from "@/src/screens/Workout/components/ExerciseCard";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { fakeExerciseCards } from "../exerciseCards";
import Button from "./Button";
import SearchFilterModal from "./SearchFilterModal";
const ruby = require("../../../../assets/avatars/Ruby.png");

export interface WorkoutBuilderProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WorkoutBuilder({
  showModal,
  setShowModal,
}: WorkoutBuilderProps) {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [workoutName, setWorkoutName] = useState<string>("");
  const [exercises, setExercises] =
    useState<{ id: string; exerciseName: string }[]>(fakeExerciseCards);
  const [showSearchExerciseModal, setShowSearchExerciseModal] =
    useState<boolean>(false);
  return (
    <Modal
      animationType="slide"
      visible={showModal}
      onRequestClose={() => setShowModal(!showModal)}
      allowSwipeDismissal={true}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <View style={styles.topButtons}>
            <Button
              title="Cancel"
              bgColor="red"
              textColor="black"
              onPress={() => setShowModal(false)}
            />
            <Button
              title="Done 👍"
              bgColor={BLUE_LIGHTER}
              textColor="white"
              onPress={() => console.error("non implemented")}
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
        <View style={styles.cardsContainer}>
          {isEmpty ? (
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
                  exerciseName={card.exerciseName}
                  exercises={exercises}
                  exercisesSetter={setExercises}
                />
              );
            })
          )}
        </View>
        <View style={styles.footerContainer}>
          <Button
            title="Add Exercise +"
            bgColor={BLUE_LIGHTER}
            textColor="white"
            onPress={() => {
              setShowSearchExerciseModal(!showSearchExerciseModal);
            }}
            width={"90%"}
          />
        </View>
        {showSearchExerciseModal ? (
          <SearchFilterModal
            showModal={showSearchExerciseModal}
            setShowModal={setShowSearchExerciseModal}
          />
        ) : (
          <></>
        )}
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 60,
    marginBottom: 20,
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
