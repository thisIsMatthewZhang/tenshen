import { APP_BACKGROUND_COLOR } from "@/src/constants/theme";
import { Stack, useLocalSearchParams } from "expo-router";

export default function SessionLayout() {
  const params = useLocalSearchParams<{
    workoutName: string;
  }>();
  return (
    <Stack
      screenOptions={{
        headerTitle: params.workoutName,
        headerStyle: { backgroundColor: APP_BACKGROUND_COLOR },
        headerTitleStyle: { color: "white" },
        headerBackVisible: false,
      }}
    ></Stack>
  );
}
