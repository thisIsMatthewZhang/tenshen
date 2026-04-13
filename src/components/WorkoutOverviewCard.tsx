import { MAIN_COLOR, PATTERN } from "@/src/constants/theme";
import { ExerciseCard } from "@/src/types/exercisecard";
import { StyleSheet, Text, View } from "react-native";

export default function WorkoutOverviewCard(props: ExerciseCard) {
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
          {props.name}
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
            Sets: {props.sets.length > 0 ? props.sets.length : "?"}
          </Text>
        </View>
        <View style={styles.cardBodyText}>
          <Text
            style={[PATTERN.smallText, { color: "black", fontWeight: "bold" }]}
          >
            Lbs:{" "}
            {props.sets.length > 0
              ? props.sets
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
            {props.sets.length > 0
              ? props.sets
                  .map((item) => (item.reps ? item.reps : "?"))
                  .join(" -> ")
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
