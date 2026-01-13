import { ONBOARDING } from "@/src/constants/theme";
import OnboardingButton from "@/src/screens/Onboarding/components/OnboardingButton";
import { Text, View } from "react-native";


export default function GetStartedScreen() {

  return (
    <View style={ONBOARDING.container}>
      <Text style={ONBOARDING.bigText}>Welcome to the Tenshen Beta Test! Please select &quot;Get Started&quot; below to proceed with onboarding👇</Text>
      <OnboardingButton buttonText="Get Started" nextScreen='/pickworkoutbuddy'/>
    </View>
  );
}
 