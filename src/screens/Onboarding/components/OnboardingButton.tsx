import { FONTS, GOLD } from "@/src/constants/theme";
import { Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type OnboardingRoute = "/pickworkoutbuddy" | "/gender" | "/experience";

interface ButtonProps {
    nextScreen: OnboardingRoute,
    buttonText: string,
}

export default function OnboardingButton(props: ButtonProps) {
    const router = useRouter();

    return (
        <Pressable 
            hitSlop={5} 
            onPress={() => router.push(`${props.nextScreen}` as Href)} 
            style={({pressed}) => {
                return [styles.pressable, {opacity: pressed ? 0.5 : 1}];
            }}
            
        >
            <View style={styles.buttonView}>
                <Text style={styles.text}> {props.buttonText} </Text>

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