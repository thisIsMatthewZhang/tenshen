import { FONTS, GOLD } from "@/src/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NextButton() {

    return (
        <Pressable 
            hitSlop={10} 
            onPress={() => {}} 
            style={{width: "100%"}}
        >
            <View style={styles.buttonView}>
                <Text style={styles.text}> Get Started </Text>

            </View>
        </Pressable>
    );
    
}

const styles = StyleSheet.create({
    buttonView: {
        width: "85%",
        backgroundColor: GOLD,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        paddingBlock: 10
    },
    text: {
        fontSize: 20,
        fontWeight: 600,
        ...FONTS
    }
});