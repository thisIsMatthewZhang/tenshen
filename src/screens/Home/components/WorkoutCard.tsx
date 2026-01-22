import { GOLD } from "@/src/constants/theme";
import { StyleSheet, Text, View } from "react-native";

export interface WorkoutCardProps {
  //   id: number;
  workoutName: string;
}

export default function WorkoutCard({ workoutName }: WorkoutCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: GOLD }]}>
      <Text> {workoutName} </Text>
    </View>
    // <LinearGradient
    //   style={styles.card}
    //   colors={["#FFDF81", "#CC9A06", "#997404"] as const}
    //   locations={[0.25, 0.5, 0.75] as const}
    //   dither={false}
    // ></LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 250,
    height: 175,
    borderRadius: 20,
    marginInline: 8,
  },
});
