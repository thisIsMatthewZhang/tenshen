import { NextScreen } from "@/src/constants/nextScreenEnums";
import { FONTS, GOLD } from "@/src/constants/theme";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function OnboardingButton
(
    { buttonText, nextScreen }: { buttonText: string, nextScreen: NextScreen }, 
) {
    const router = useRouter();

    return (
        <Pressable 
            hitSlop={5} 
            onPress={() => router.push(`/(onboarding)/${nextScreen}`)} 
            style={({pressed}) => {
                return [styles.pressable, {opacity: pressed ? 0.5 : 1}];
            }}
            
        >
            <View style={styles.buttonView}>
                <Text style={styles.text}> {buttonText} </Text>

            </View>
        </Pressable>
    );
    
}

const styles = StyleSheet.create({
    pressable: {
        width: "85%",
        marginBlockStart: 24,
    },
    buttonView: {
        width: "100%",
        backgroundColor: GOLD,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        paddingBlock: 12
    },
    text: {
        fontSize: 20,
        fontWeight: 700,
        ...FONTS
    }
});