import OnboardingButton from "@/src/components/OnboardingButton";
import { PATTERN } from "@/src/constants/theme";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function GetStarted() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[PATTERN.container, PATTERN.center]}>
        <View style={[PATTERN.center, { width: "100%" }]}>
          <Text style={PATTERN.bigText}>
            Welcome to the Tenshen Beta Test! Please select &quot;Get
            Started&quot; below to proceed with onboarding👇
          </Text>
          <OnboardingButton
            buttonText="Get Started"
            router={() => router.push({ pathname: "/yourname" })}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
