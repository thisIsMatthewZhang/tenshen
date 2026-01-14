import { ONBOARDING } from "@/src/constants/theme";
import { Href, useRouter } from "expo-router";
import { useState } from "react";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import OnboardingButton from "../components/OnboardingButton";

export default function YourNameScreen() {
    const router = useRouter();
    const [text, setText] = useState('');

    return (
        <View style={ONBOARDING.container}>
            <Text style={[ONBOARDING.bigText, ]}> What&apos;s your name? </Text>
            
            <TextInput 
            aria-label="Full Name" 
            autoCapitalize="words" 
            inputMode="text"
            value={text}
            style={[styles.input, ONBOARDING.smallText]} 
            placeholder="Full Name" 
            placeholderTextColor={"white"}
            onChangeText={(text) => setText(text)}
            />
            <TextInput 
            aria-label="Preferred Name" 
            autoCapitalize="words" 
            inputMode="text"
            style={[styles.input, ONBOARDING.smallText]} 
            placeholder="Preferred Name" 
            placeholderTextColor={"white"}
            />
            <OnboardingButton 
            buttonText="Next" 
            router={() => {
                 
                router.push("/pickworkoutbuddy" as Href); 
            }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        color: "white",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 10,
        marginBlock: 10,
        ...Platform.select({
            "web": {
                width: "25%",
                padding: 10
            },
            "default": {
                width: "75%"
            }
        }),
    }
});