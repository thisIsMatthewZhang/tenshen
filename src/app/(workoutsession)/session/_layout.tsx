import { APP_BACKGROUND_COLOR } from "@/src/constants/theme";
import { StopwatchContext } from "@/src/contexts/StopwatchContext";
import { usePreciseInterval } from "@/src/hooks/usePreciseTimer";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function SessionLayout() {
  const params = useLocalSearchParams<{
    workoutName: string;
  }>();
  const [stopwatch, setStopwatch] = useState({ hr: 0, min: 0, sec: 0 });

  const callback = () => {
    setStopwatch((prev) => {
      return {
        sec: prev.sec < 59 ? prev.sec + 1 : 0,
        min: prev.sec === 59 ? (prev.min === 59 ? 0 : prev.min + 1) : prev.min,
        hr: prev.min === 59 && prev.sec === 59 ? prev.hr + 1 : prev.hr,
      };
    });
  };

  usePreciseInterval(callback, 1000);
  return (
    <StopwatchContext.Provider value={[stopwatch, setStopwatch]}>
      <Stack
        screenOptions={{
          headerTitle: params.workoutName,
          headerStyle: { backgroundColor: APP_BACKGROUND_COLOR },
          headerTitleStyle: { color: "white" },
          headerBackVisible: false,
        }}
      ></Stack>
    </StopwatchContext.Provider>
  );
}
