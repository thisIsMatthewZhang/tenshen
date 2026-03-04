import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Stopwatch() {
  const padToTwo = (number: number) => (number <= 9 ? `0${number}` : number);
  const [stopwatch, setStopwatch] = useState({ hr: 0, min: 0, sec: 0 });

  return (
    <View style={styles.container}>
      <View style={styles.parent}>
        <Text style={styles.child}>{padToTwo(stopwatch.hr) + " : "}</Text>
        <Text style={styles.child}>{padToTwo(stopwatch.min) + " : "}</Text>
        <Text style={styles.child}>{padToTwo(stopwatch.sec)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  parent: {},
  child: {},
});
