import { MAIN_COLOR, PATTERN } from "@/src/constants/theme";
import { StyleSheet, Text, View } from "react-native";
import { Exercise } from "../utils/exercises";

export default function WorkoutOverviewCard({
  id,
  name,
  muscleGroup,
  isSelected,
  sets,
}: Exercise) {
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
            Sets: {sets.length > 0 ? sets.length : "?"}
          </Text>
        </View>
        <View style={styles.cardBodyText}>
          <Text
            style={[PATTERN.smallText, { color: "black", fontWeight: "bold" }]}
          >
            Lbs:{" "}
            {sets.length > 0
              ? sets
                  .map((item) => (item.weight ? item.weight : "?"))
                  .join(" -> ")
              : "?"}
          </Text>
        </View>
        <View style={styles.cardBodyText}>
          <Text
            style={[PATTERN.smallText, { color: "black", fontWeight: "bold" }]}
          >
            Reps:{" "}
            {sets.length > 0
              ? sets.map((item) => (item.reps ? item.reps : "?")).join(" -> ")
              : "?"}
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
