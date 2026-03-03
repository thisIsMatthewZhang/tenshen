import { APP_BACKGROUND_COLOR } from "@/src/constants/theme";
import { Stack, useLocalSearchParams } from "expo-router";

export default function OnboardingLayout() {
  const params = useLocalSearchParams<{ screenName: string }>();
  return (
    <Stack
      screenOptions={{
        headerTitle: params.screenName,
        headerStyle: { backgroundColor: APP_BACKGROUND_COLOR },
        headerTitleStyle: { color: "white" },
        headerBackVisible: false,
      }}
    ></Stack>
  );
}
