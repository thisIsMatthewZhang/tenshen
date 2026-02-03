import { BLUE_LIGHTER, ICON_SIZE, PATTERN } from "@/src/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { cardDetails } from "./cardDetails";
import WorkoutBuilder from "./components/WorkoutBuilder";
import WorkoutCard, { WorkoutCardProps } from "./components/WorkoutCard";
import { WorkoutsContext } from "./WorkoutsContext";

export default function WorkoutScreen() {
  // Parent toggles Modal visibility and passes these as props to WorkoutBuilder modal
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [workouts, setWorkouts] = useState<WorkoutCardProps[]>(cardDetails);

  return (
    <WorkoutsContext.Provider value={[workouts, setWorkouts]}>
      <SafeAreaProvider>
        <SafeAreaView style={PATTERN.container}>
          <ScrollView
            contentContainerStyle={{
              minWidth: "100%",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 12,
            }}
          >
            <Pressable
              style={({ pressed }) => [
                styles.createWorkoutBtn,
                { opacity: pressed ? 0.5 : 1 },
              ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <WorkoutBuilder state={modalVisible} setState={setModalVisible} />
              <Text
                style={[
                  PATTERN.smallText,
                  { fontWeight: "bold", color: "black", marginHorizontal: 4 },
                ]}
              >
                Create New Workout
              </Text>
              <Ionicons
                name="add-circle-outline"
                size={ICON_SIZE - 4}
                color="black"
              />
            </Pressable>
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                id={workout.id}
                workoutName={workout.workoutName}
                exercises={workout.exercises}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </WorkoutsContext.Provider>
  );
}

const styles = StyleSheet.create({
  createWorkoutBtn: {
    width: "90%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: BLUE_LIGHTER,
  },
});
