import { GOLD, PATTERN } from "@/src/constants/theme";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import WorkoutSlide from "./components/WorkoutSlide";
import { cardDetails } from "./workouts";

export default function WorkoutScreen() {
  return (
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
          >
            <Text
              style={[
                PATTERN.smallText,
                { fontWeight: "bold", color: "black" },
              ]}
            >
              Create New Workout
            </Text>
          </Pressable>
          <WorkoutSlide cardDetails={cardDetails} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  createWorkoutBtn: {
    width: "90%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: GOLD,
  },
});
