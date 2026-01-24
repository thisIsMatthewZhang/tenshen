import { FONTS, GOLD } from "@/src/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import ExtraOptions from "./ExtraOptions";
export interface WorkoutCardProps {
  //   id: number;
  workoutName: string;
  exercises: string[];
}

export default function WorkoutCard({
  workoutName,
  exercises,
}: WorkoutCardProps) {
  return (
    <Pressable>
      <LinearGradient
        style={styles.card}
        colors={["#FFDF81", "#CC9A06", "#997404"] as const}
        locations={[0.1, 0.5, 0.75] as const}
        dither={false}
      >
        <Text style={styles.workoutName}> {workoutName} </Text>
        <ExtraOptions />
        <FlatList
          scrollEnabled={false}
          data={exercises}
          renderItem={({ item }) => (
            <View>
              <Text> {item} </Text>
            </View>
          )}
        />
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 250,
    height: 175,
    backgroundColor: GOLD,
    borderRadius: 20,
    marginInline: 8,
    padding: 12,
  },
  workoutName: {
    fontSize: 24,
    fontWeight: "bold",
    ...FONTS,
  },
  exercises: {
    fontSize: 12,
    fontWeight: "bold",
    ...FONTS,
  },
});
