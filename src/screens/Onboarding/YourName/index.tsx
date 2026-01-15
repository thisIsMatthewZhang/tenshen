import { GOLD, ONBOARDING } from "@/src/constants/theme";
import { Href, useRouter } from "expo-router";
import { useState } from "react";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import OnboardingButton from "../components/OnboardingButton";

export default function YourNameScreen() {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [preferredName, setPreferredName] = useState('');
    const [error, setError] = useState('');

    return (
        <View style={ONBOARDING.container}>
            <Text style={[ONBOARDING.bigText]}> What&apos;s your name? </Text>
            
            <TextInput 
            aria-label="Full Name" 
            autoCapitalize="words" 
            inputMode="text"
            value={fullName}
            style={[styles.input, ONBOARDING.smallText]} 
            placeholder="Full Name" 
            placeholderTextColor={"white"}
            onChangeText={(text) => setFullName(text)}
            />
            <TextInput 
            aria-label="Preferred Name" 
            autoCapitalize="words" 
            inputMode="text"
            value={preferredName}
            style={[styles.input, ONBOARDING.smallText]} 
            placeholder="Preferred Name" 
            placeholderTextColor={"white"}
            onChangeText={(text) => setPreferredName(text)}
            />
            <Text style={{color: GOLD}}> {error} </Text>
            <OnboardingButton 
            buttonText="Next" 
            router={() => { 
                if (!fullName || !preferredName) {
                    setError('Please give your full name and preferred name');
                }
                else {
                    setError('');
                    router.push("/pickworkoutbuddy" as Href); 
                }
            }}
            ></OnboardingButton>
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