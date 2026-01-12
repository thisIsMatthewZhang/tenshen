import { NextScreen } from "@/src/constants/nextScreenEnums";
import { APP_BACKGROUND_COLOR, FONTS } from "@/src/constants/theme";
import OnboardingButton from "@/src/screens/Onboarding/components/OnboardingButton";
import { StyleSheet, Text, View } from "react-native";


export default function GetStartedScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Tenshen Beta Test! Please select &quot;Get Started&quot; below to proceed with onboarding👇</Text>
      <OnboardingButton buttonText="Get Started" nextScreen={NextScreen.PickWorkoutBuddy}/>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 600,
    maxWidth: 350,
    color: "white",
    // textAlign: "center",
    ...FONTS
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_BACKGROUND_COLOR
  },
});
