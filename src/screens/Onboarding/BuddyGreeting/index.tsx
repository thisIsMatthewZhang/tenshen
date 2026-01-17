import { ONBOARDING } from "@/src/constants/theme";
import { UnknownOutputParams, useRouter } from "expo-router";
import { Text, View } from "react-native";
import OnboardingButton from "../components/OnboardingButton";


export default function BuddyGreetingScreen({ fullName, preferredName, selected }: UnknownOutputParams) {
    const router = useRouter();
    return (
        <View style={ONBOARDING.container}>
            <Text> Sup {preferredName}!!! Call me {selected}. </Text>
            <OnboardingButton buttonText="Next" router={() => { router.push({ pathname: "/setaccountcredentials", params: { fullName, preferredName, selected } }); }}/>
        </View>
    );
}