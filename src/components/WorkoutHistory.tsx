import { FlatList } from "react-native";
import { FirebaseFinishedWorkout } from "../types/firebaseFinishedWorkout";
import PreviousWorkout from "./PreviousWorkout";

export default function WorkoutHistory({
  userName,
  data,
}: {
  userName: string;
  data: FirebaseFinishedWorkout[];
}) {
  return (
    <FlatList
      scrollEnabled={false}
      data={data}
      renderItem={({ item }) => {
        return <PreviousWorkout userName={userName} workout={item} />;
      }}
      style={{
        marginTop: 16,
      }}
    />
  );
}
