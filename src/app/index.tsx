// this is currently in src/app/index.tsx, 
// but should likely be placed inside src/screens/Onboarding/GetStarted

import { StyleSheet, Text, View } from "react-native";
import { FONTS } from "../constants/theme";
import NextButton from "../screens/Onboarding/components/NextButton";

export default function Index() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Tenshen Beta Test! Please select &quot;Get Started&quot; below to proceed with onboarding👇</Text>
      <NextButton />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 700,
    maxWidth: 300,
    ...FONTS
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});