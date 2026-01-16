import { ONBOARDING } from "@/src/constants/theme";
import { UnknownOutputParams } from "expo-router";
import { Text, View } from "react-native";


export default function BuddyGreetingScreen({ fullName, preferredName, selected }: UnknownOutputParams) {
    return (
        <View style={ONBOARDING.container}>
            <Text> Sup {preferredName}!!! Call me {selected}. </Text>
        </View>
    );
}