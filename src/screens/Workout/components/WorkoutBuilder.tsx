import {
  APP_BACKGROUND_COLOR,
  BLUE_LIGHTER,
  PATTERN,
} from "@/src/constants/theme";
import ExerciseCard, {
  ExerciseCardProps,
} from "@/src/screens/Workout/components/ExerciseCard";
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
import uuid from "react-native-uuid";
import Button from "./Button";
const ruby = require("../../../../assets/avatars/Ruby.png");

const fakeExerciseCards: ExerciseCardProps[] = [
  { exerciseName: "Squats" },
  { exerciseName: "Push-Ups" },
  { exerciseName: "Bench Press (Barbell)" },
  { exerciseName: "Pull-Ups" },
  { exerciseName: "Sit-Ups" },
  { exerciseName: "Bicep Curls (Dumbbell)" },
];
interface WorkoutBuilderProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WorkoutBuilder({
  state,
  setState,
}: WorkoutBuilderProps) {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [workoutName, setWorkoutName] = useState<string>("");

  return (
    <Modal
      animationType="slide"
      visible={state}
      onRequestClose={() => setState(!state)}
      allowSwipeDismissal={true}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <View style={styles.topButtons}>
            <Button
              title="Cancel"
              bgColor="red"
              textColor="black"
              onPress={() => setState(false)}
            />
            <Button
              title="Done 👍"
              bgColor={BLUE_LIGHTER}
              textColor="white"
              onPress={() => console.error("non implemented")}
            />
          </View>
          <TextInput
            style={styles.workoutNameInput}
            placeholder="Workout Name"
            placeholderTextColor={"white"}
            maxLength={40}
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
            fakeExerciseCards.map((card) => {
              return (
                <ExerciseCard
                  key={uuid.v4()}
                  exerciseName={card.exerciseName}
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
            onPress={() => console.error("not implemented")}
            width={"90%"}
          />
        </View>
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
  workoutNameInput: {
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
    marginTop: 16,
  },
  innerView: {
    width: "100%",
  },
  emptyState: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },

  cardsContainer: { width: "100%", alignItems: "center" },
});
