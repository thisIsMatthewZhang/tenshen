import { BLUE_LIGHTER, ICON_SIZE, PATTERN } from "@/src/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
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
          <View
            style={{
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
              <WorkoutBuilder
                showModal={modalVisible}
                setShowModal={setModalVisible}
              />
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
            <FlatList
              data={workouts}
              renderItem={({ item }) => (
                <WorkoutCard
                  key={item.id}
                  id={item.id}
                  workoutName={item.workoutName}
                  exercises={item.exercises}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
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
    backgroundColor: BLUE_LIGHTER,
    marginBottom: 8,
    borderRadius: 10,
  },
});
