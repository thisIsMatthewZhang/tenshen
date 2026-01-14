import { FONTS, GOLD } from "@/src/constants/theme";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

interface ButtonProps {
    buttonText: string,
    router: () => void
}


export default function OnboardingButton(props: ButtonProps) {
    return (
        <Pressable 
            hitSlop={5} 
            onPress={props.router} 
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
        marginBlockStart: 24,
        ...Platform.select({
            "web": {
                width: "25%"
            },
            "default": {
                width: "75%"
            }
        }),
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