// this is currently in src/app/index.tsx, 
// but should likely be placed inside src/screens/Onboarding/GetStarted

import { StyleSheet, Text, View } from "react-native";
import { APP_BACKGROUND_COLOR, FONTS } from "../constants/theme";
import NextButton from "../screens/Onboarding/components/NextButton";

export default function Index() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Tenshen Beta Test! Please select &quot;Get Started&quot; below to proceed with onboarding👇</Text>
      <NextButton buttonText="Get Started"/>
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