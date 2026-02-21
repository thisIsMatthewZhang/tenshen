import { MAIN_COLOR, PATTERN } from "@/src/constants/theme";
import { StyleSheet, Text, View } from "react-native";
import { Exercise } from "../exercises";

export default function WorkoutOverviewCard({
  id,
  name,
  muscleGroup,
  isSelected,
  sets,
}: Exercise) {
  // Question mark placeholders are not appearing in the case that a user adds sets but DOES NOT ever type into the text fields. # of sets is displayed as 0 in this case.
  // If a user adds sets, enters a value but then deletes it (all fields are blank then), question marks DO appear.
  console.log("Sets: " + sets);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text
          style={[
            PATTERN.smallText,
            {
              color: "black",
              fontWeight: "bold",
              maxWidth: 175,
              lineHeight: 20,
            },
          ]}
        >
          {name}
        </Text>
        {/* <Text style={[PATTERN.smallText, styles.timer]}>
          Rest Timer: 3m 20s
        </Text> */}
      </View>
      <View
        style={[
          PATTERN.separator,
          { backgroundColor: "black", marginVertical: 4 },
        ]}
      />
      <View style={styles.cardBody}>
        <View style={styles.cardBodyText}>
          <Text
            style={[PATTERN.smallText, { color: "black", fontWeight: "bold" }]}
          >
            Sets: {sets.length}
          </Text>
        </View>
        <View style={styles.cardBodyText}>
          <Text
            style={[PATTERN.smallText, { color: "black", fontWeight: "bold" }]}
          >
            Lbs:{" "}
            {sets.map((item) => (item.weight ? item.weight : "?")).join(" -> ")}
          </Text>
        </View>
        <View style={styles.cardBodyText}>
          <Text
            style={[PATTERN.smallText, { color: "black", fontWeight: "bold" }]}
          >
            Reps:{" "}
            {sets.map((item) => (item.reps ? item.reps : "?")).join(" -> ")}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: MAIN_COLOR,
    borderRadius: 20,
    margin: 8,
    paddingVertical: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  // timer: {
  //   color: BLUE_DARKER,
  //   fontWeight: 800,
  //   textDecorationLine: "underline",
  // },
  cardBody: {
    paddingHorizontal: 12,
  },
  cardBodyText: {
    maxWidth: "100%",
    marginVertical: 8,
  },
});
