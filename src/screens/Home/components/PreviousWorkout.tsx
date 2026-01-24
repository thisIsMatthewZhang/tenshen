// Parent component for a user's completed workout on the Home page
// Will display all DoneExercise components for a given workout, with a max display of 3
import DoneExercise from "@/src/components/DoneExercise";
import ProfilePhoto from "@/src/components/ProfilePhoto";
import { PATTERN } from "@/src/constants/theme";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function PreviousWorkout() {
  return (
    <View>
      <View style={styles.header}>
        <ProfilePhoto />
        <Text
          style={[
            PATTERN.mediumText,
            { fontWeight: "bold", marginInlineStart: 8 },
          ]}
        >
          Matthew Zhang
        </Text>
      </View>

      <View style={styles.workoutTitle}>
        <Text style={[PATTERN.mediumText, { fontWeight: "bold" }]}>
          PULL DAY BABYYY
        </Text>
        <View style={styles.workoutDateAndDuration}>
          <Text
            style={[PATTERN.mediumText, { fontWeight: "bold", opacity: 0.5 }]}
          >
            1/24/2026 • 1hr 12min
          </Text>
        </View>
      </View>

      <FlatList
        data={[{}]}
        renderItem={({ item }) => {
          return <DoneExercise />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  workoutTitle: {
    marginBlock: 12,
  },
  workoutDateAndDuration: {
    flexDirection: "row",
  },
});
