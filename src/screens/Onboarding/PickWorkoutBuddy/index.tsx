import { AnimatedPressable } from "@/src/components/AnimatedPressable";
import { ONBOARDING } from "@/src/constants/theme";
import { UnknownOutputParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, ImageProps, Platform, StyleSheet, Text, View } from "react-native";
import OnboardingButton from "../components/OnboardingButton";
const ruby = require('../../../../assets/avatars/Ruby.png');
const rudy = require('../../../../assets/avatars/Rudy.png');


interface AvatarProps {
    avatar: ImageProps 
    name: string
    isSelected: boolean
    onSelected: () => void
}

export default function PickWorkoutBuddyScreen({ fullName, preferredName }: UnknownOutputParams) {
    const router = useRouter();
    const [selected, setSelected] = useState<"Ruby" | "Rudy" | null>(null);

    return (
        <View style={ONBOARDING.container}>
            <View style={styles.textContainer}>
                <Text style={ONBOARDING.bigText}> Hey {preferredName}! Please choose which workout partner you want to do this journey with </Text>
                <Text style={[ONBOARDING.smallText, { opacity: 0.5, top: 12 }]}> You will be able to swap later. </Text>
            </View>

            <View style={styles.selectionContainer}>
                <AvatarContainer avatar={ruby} name="Ruby" isSelected={selected === "Ruby"} onSelected={() => setSelected("Ruby")}/>
                <AvatarContainer avatar={rudy} name="Rudy" isSelected={selected === "Rudy"} onSelected={() => setSelected("Rudy")}/>
            </View>
            <OnboardingButton buttonText="Next" router={() => router.push({pathname: "/buddygreeting", params: { fullName, preferredName, selected }})}/>

        </View>
    );
}

function AvatarContainer(props: AvatarProps) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(scaleAnim, {
            toValue: props.isSelected ? 1.1 : 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    }, [props.isSelected, scaleAnim]);
    
    return (
        <AnimatedPressable
            style={[
                styles.avatarContainer, 
                { transform: [{ scale: scaleAnim }] }, 
            ]}
            hitSlop={5}
            onPressIn={() => {
                Animated.timing(scaleAnim, {
                    toValue: props.isSelected ? 1.15 : 1.05,
                    duration: 100,
                    useNativeDriver: true,
                }).start();
            }}
            onPressOut={() => {
                Animated.timing(scaleAnim, {
                    toValue: props.isSelected ? 1.1 : 1,
                    duration: 100,
                    useNativeDriver: true,
                }).start();

            }}
            onPress={props.onSelected}
        >
            <Image style={styles.avatar} source={props.avatar}/>
            <Text style={[ONBOARDING.bigText, styles.avatarName]}> {props.name} </Text>
        </AnimatedPressable>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        marginBlock: 12
    },
    selectionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...Platform.select({
            "web": {
                flex: 4,
                columnGap: 48
            },
            "default": {
                flex: 4,
                marginBlock: 28,
                columnGap: 24,
            }
        })
    },
    avatarContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
        ...Platform.select({
            "web": {
                width: 300,
                height: 300
            },
            "default": {
                width: "40%",
                height: "40%"
            }
        })
    },
    avatar: {
        top: 12,
        ...Platform.select({
            "web": {
                width: "100%",
                height: "100%"
            },
            "default": {
                width: "100%",
                height: "100%"
            }
        })
    },
    avatarName: {
        top: 28,
    },
});