import { MAIN_COLOR, PATTERN } from "@/src/constants/theme";
import { StyleSheet, Text, View } from "react-native";
import { Exercise } from "../exercises";

export default function WorkoutOverviewCard({
  id,
  name,
  muscleGroup,
  isSelected,
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
            Sets: 5
          </Text>
        </View>
        <View style={styles.cardBodyText}>
          <Text
            style={[PATTERN.smallText, { color: "black", fontWeight: "bold" }]}
          >
            Lbs: 135 - 135 - 135 - 100 - 100
          </Text>
        </View>
        <View style={styles.cardBodyText}>
          <Text
            style={[PATTERN.smallText, { color: "black", fontWeight: "bold" }]}
          >
            Reps: 10, 10, 10, 8, 8
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
    marginVertical: 8,
  },
});
