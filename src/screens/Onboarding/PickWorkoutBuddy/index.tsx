import { ONBOARDING } from "@/src/constants/theme";
import { Image } from "expo-image";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import OnboardingButton from "../components/OnboardingButton";
const ruby = require('../../../../assets/avatars/Ruby.png');
const rudy = require('../../../../assets/avatars/Rudy.png');

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);


interface AvatarProps {
    avatar: string // change once I have defined type of Rive
    name: string
}

export default function PickWorkoutBuddyScreen() {

    return (
        <View style={ONBOARDING.container}>
            <Text style={ONBOARDING.bigText}> Please choose which workout partner you want to do this journey with </Text>
            <Text style={ONBOARDING.smallText}> You will be able to swap later. </Text>
            <View style={styles.selectionContainer}>
                <AvatarContainer avatar={ruby} name="Rudy"/>
                <AvatarContainer avatar={rudy} name="Ruby"/>
            </View>
            <OnboardingButton buttonText="Next" nextScreen='/gender'/>
        </View>
    );
}

function AvatarContainer(props: AvatarProps) {
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
            <Image style={styles.avatar} source={props.avatar}/>
            <Text style={[ONBOARDING.bigText, styles.avatarName]}> {props.name} </Text>
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
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
    },
    avatar: {
        width: "100%",
        height: "90%",
        top: 12
    },
    avatarName: {
        top: 28,
    },
});