import WorkoutBuilder from "@/src/components/WorkoutBuilder";
import WorkoutCard from "@/src/components/WorkoutCard";
import { BLUE_LIGHTER, ICON_SIZE, PATTERN } from "@/src/constants/theme";
import { WorkoutsContext } from "@/src/contexts/WorkoutsContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Workout() {
  // Parent toggles Modal visibility and passes these as props to WorkoutBuilder modal
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [workouts, setWorkouts] = useContext(WorkoutsContext);

  return (
    // <WorkoutsContext.Provider value={[workouts, setWorkouts]}>
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
                name={item.name}
                exercises={item.exercises}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
    // </WorkoutsContext.Provider>
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
