import { ONBOARDING } from "@/src/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";
import OnboardingButton from "../components/OnboardingButton";

export default function PickWorkoutBuddy() {

    return (
        <View style={ONBOARDING.container}>
            <Text style={ONBOARDING.bigText}> Please choose which workout partner you want to do this journey with </Text>
            <Text style={ONBOARDING.smallText}> You will be able to swap later. </Text>
            <View style={styles.selectionContainer}>
                <AvatarContainer />
                <AvatarContainer />
            </View>
            <OnboardingButton buttonText="Next" nextScreen='/gender'/>
        </View>
    );
}

function AvatarContainer() {
    return (
        <Pressable 
            style={({pressed}) => {
                return [
                    styles.avatarContainer, 
                ];
            }}
            onPress={() => {
                
            }}
        >
            
        </Pressable>
    );
}

const styles = StyleSheet.create({
    selectionContainer: {
        flexDirection: "row",
        columnGap: 20,
        width: "85%",
        height: "25%",
        marginBlock: 28
    },
    avatarContainer: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 10,
    }
});