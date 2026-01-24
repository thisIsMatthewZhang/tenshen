import { FlatList } from "react-native";
import PreviousWorkout from "../screens/Home/components/PreviousWorkout";

export default function WorkoutHistory() {
  return (
    <FlatList
      scrollEnabled={false}
      data={[{}]}
      renderItem={({ item }) => <PreviousWorkout />}
      style={{ alignSelf: "flex-start", marginHorizontal: 16 }}
    />
  );
}
