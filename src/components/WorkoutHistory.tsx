import { FlatList } from "react-native";
import PreviousWorkout from "./PreviousWorkout";

export default function WorkoutHistory() {
  return (
    <FlatList
      scrollEnabled={false}
      data={[{}, {}, {}, {}, {}, {}]}
      renderItem={({ item }) => {
        return <PreviousWorkout />;
      }}
      style={{
        marginTop: 16,
      }}
    />
  );
}
