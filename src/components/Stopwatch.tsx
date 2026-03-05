import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MAIN_COLOR } from "../constants/theme";
import { StopwatchContext } from "../contexts/StopwatchContext";

export default function Stopwatch() {
  const padToTwo = (time: number): `0${number}` | number =>
    time <= 9 ? `0${time}` : time;
  const [stopwatch, setStopwatch] = useContext(StopwatchContext);

  return (
    <View style={styles.container}>
      <Text style={styles.child}>{padToTwo(stopwatch.hr) + ":"}</Text>
      <Text style={styles.child}>{padToTwo(stopwatch.min) + ":"}</Text>
      <Text style={styles.child}>{padToTwo(stopwatch.sec)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignSelf: "flex-start" },
  child: { color: MAIN_COLOR, fontWeight: "bold" },
});
