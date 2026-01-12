import { FONTS, GOLD } from "@/src/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NextButton({ buttonText }: { buttonText: string }) {

    return (
        <Pressable 
            hitSlop={5} 
            onPress={() => { // fire off when user transitions to next onboarding screen
                console.log("Onto the next onboarding screen!!!");
            }} 
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