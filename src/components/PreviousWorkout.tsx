// Parent component for a user's completed workout on the Home page
// Will display all DoneExercise components for a given workout, with a max display of 3
import DoneExercise from "@/src/components/DoneExercise";
import ProfilePhoto from "@/src/components/ProfilePhoto";
import { PATTERN } from "@/src/constants/theme";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function PreviousWorkout() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <ProfilePhoto />
          <Text
            style={[PATTERN.mediumText, { fontWeight: "bold", marginLeft: 8 }]}
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
              style={[PATTERN.smallText, { fontWeight: "bold", opacity: 0.5 }]}
            >
              1/24/2026 • 1hr 12min
            </Text>
          </View>
        </View>
        <FlatList
          scrollEnabled={false}
          data={[{}, {}, {}]}
          renderItem={({ item }) => {
            return <DoneExercise />;
          }}
        />
      </View>
      <View style={PATTERN.separator} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  workoutTitle: {
    marginVertical: 12,
  },
  workoutDateAndDuration: {
    flexDirection: "row",
  },
});
