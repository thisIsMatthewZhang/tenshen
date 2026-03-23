import AppButton from "@/src/components/AppButton";
import { BIG_GOLDEN_BUTTON, MAIN_COLOR, PATTERN } from "@/src/constants/theme";
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
          <AppButton
            title="Get Started"
            bgColor={MAIN_COLOR}
            textColor="black"
            onPress={() =>
              router.push({
                pathname: "/yourname",
                params: { screenName: "What's your name?" },
              })
            }
            customStyle={BIG_GOLDEN_BUTTON.pressable}
            textStyle={{ fontSize: 20, fontWeight: 700 }}
          />
          <AppButton
            title="Already Have an Account?"
            bgColor={MAIN_COLOR}
            textColor="black"
            onPress={() =>
              router.push({
                pathname: "/(auth)/signin",
                params: { screenName: "Welcome back" },
              })
            }
            customStyle={BIG_GOLDEN_BUTTON.pressable}
            textStyle={{ fontSize: 20, fontWeight: 700 }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
