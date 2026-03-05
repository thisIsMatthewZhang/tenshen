import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MAIN_COLOR } from "../constants/theme";

export default function Stopwatch() {
  const padToTwo = (time: number): `0${number}` | number =>
    time <= 9 ? `0${time}` : time;
  const [stopwatch, setStopwatch] = useState({ hr: 9, min: 59, sec: 50 });
  const callback = () => {
    setStopwatch((prev) => {
      return {
        sec: prev.sec < 59 ? prev.sec + 1 : 0,
        min: prev.sec === 59 ? (prev.min === 59 ? 0 : prev.min + 1) : prev.min,
        hr: prev.min === 59 && prev.sec === 59 ? prev.hr + 1 : prev.hr,
      };
    });
  };

  // IIFE that invokes on every render due to setStopwatch;
  // setTimeout caused erratic behavior with the time changes (uses an internal clock to schedule callbacks);
  // workaround: use 'performance.now()' to explicitly calculate elapsed time
  (function (callback: () => void, delay: number) {
    const start = performance.now();
    function checkElapsed() {
      const elapsed = performance.now() - start;
      const remaining = delay - elapsed;
      if (remaining <= 0) {
        callback();
      } else {
        setTimeout(checkElapsed, Math.max(1, remaining)); // prevent negative values for time delays
      }
    }
    setTimeout(checkElapsed, 1); // yes, schedules callback for every 1 ms (0.001 s)
  })(callback, 1000);

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
