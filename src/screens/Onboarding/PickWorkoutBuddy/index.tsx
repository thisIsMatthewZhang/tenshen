import { Text, View } from "react-native";
import OnboardingButton from "../components/OnboardingButton";

export default function PickWorkoutBuddy() {
    return (
        <View>
            <Text> Please choose which workout partner you want to do this journey with </Text>
            <OnboardingButton buttonText="Next" nextScreen='/gender'/>
        </View>
    );
}