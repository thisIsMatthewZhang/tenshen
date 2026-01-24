import { Dimensions, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExercisePhoto() {
  const width = Dimensions.get("window").width;

  return (
    <SafeAreaView
      style={[
        styles.circle,
        {
          width: width * 0.1,
          height: width * 0.1,
          borderRadius: Math.round(width / 2),
        },
      ]}
    >
      <Pressable></Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
    borderWidth: 2,
    // marginInline: 8,
  },
});
