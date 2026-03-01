import { MAIN_COLOR, PATTERN } from "@/src/constants/theme";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface BlockProps {
  value: number | string;
  category: "Exercises" | "Sets" | "Workout Time";
}

const Block = ({ value, category }: BlockProps) => {
  return (
    <View style={styles.block}>
      <Text style={PATTERN.mediumText}>{value}</Text>
      <Text style={[PATTERN.smallText, { color: MAIN_COLOR }]}>{category}</Text>
    </View>
  );
};

export default function WorkoutComplete() {
  return (
    <ScrollView contentContainerStyle={PATTERN.container}>
      <View style={styles.textHeaderContainer}>
        <Text style={[PATTERN.bigText, { fontWeight: "bold" }]}>
          Good stuff, <Text style={{ color: MAIN_COLOR }}>Matthew!</Text>🔥
        </Text>
      </View>
      <View style={styles.summaryContainer}>
        <View style={styles.partnerContainer}></View>
        <View style={styles.blocksContainer}>
          <Block value={5} category="Exercises" />
          <Block value={12} category="Sets" />
          <Block value={"1hr"} category="Workout Time" />
        </View>
      </View>
      <View style={styles.bottomContainer}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textHeaderContainer: { width: "100%", alignItems: "center" },
  summaryContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  partnerContainer: { flex: 1 },
  blocksContainer: { flex: 1 },
  block: { flex: 1, backgroundColor: "grey", borderRadius: 20, padding: 12 },
  bottomContainer: { width: "100%" },
});
