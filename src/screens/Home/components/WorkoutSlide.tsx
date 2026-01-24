import { FlatList, StyleSheet } from "react-native";
import WorkoutCard, { WorkoutCardProps } from "./WorkoutCard";

interface WorkoutCards {
  cardDetails: WorkoutCardProps[];
}

export default function WorkoutSlide({ cardDetails }: WorkoutCards) {
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
