import { View } from "react-native";
import WorkoutCard, { WorkoutCardProps } from "./WorkoutCard";

interface WorkoutCards {
  cardDetails: WorkoutCardProps[];
}

export default function WorkoutSlide({ cardDetails }: WorkoutCards) {
  // nesting FlatList (VirtualizedList) inside ScrollView is not recommended
  return (
    <View>
      {cardDetails.map((card) => (
        <WorkoutCard
          key={card.id}
          id={card.id}
          workoutName={card.workoutName}
          exercises={card.exercises}
        />
      ))}
    </View>
    // <FlatList
    //   data={cardDetails}
    //   renderItem={({ item }) => (
    //     <WorkoutCard
    //       workoutName={item.workoutName}
    //       exercises={item.exercises}
    //     />
    //   )}
    //   showsVerticalScrollIndicator={false}
    // />
  );
}
