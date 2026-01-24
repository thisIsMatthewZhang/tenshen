import { FlatList, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import WorkoutCard, { WorkoutCardProps } from "./WorkoutCard";

interface WorkoutCards {
  cardDetails: WorkoutCardProps[];
}

export default function WorkoutSlide({ cardDetails }: WorkoutCards) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={{ top: "off" }}>
        <FlatList
          data={cardDetails}
          renderItem={({ item }) => (
            <WorkoutCard
              workoutName={item.workoutName}
              exercises={item.exercises}
            />
          )}
          horizontal={true}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
