import { ONBOARDING } from "@/src/constants/theme";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import OnboardingButton from "../components/OnboardingButton";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
    const scaleAnim = useRef(new Animated.Value(1)).current;
    
    return (
        <AnimatedPressable
            style={[
                styles.avatarContainer, 
                { transform: [{ scale: scaleAnim }] }, 
            ]}
            hitSlop={5}
            onPressIn={() => {
                Animated.timing(scaleAnim, {
                    toValue: 1.1,
                    duration: 250,
                    useNativeDriver: true,
                }).start();
            }}
            onPressOut={() => {
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true,
                }).start();

            }}
            onPress={() => {
                scaleAnim.setValue(1.1);
            }}
        >
            
        </AnimatedPressable>
    );
}

const styles = StyleSheet.create({

    selectionContainer: {
        flexDirection: "row",
        justifyContent: "center",
        columnGap: 24,
        width: "80%",
        height: "25%",
        marginBlock: 28
    },
    avatarContainer: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 10,
    }
});