import { BIG_GOLDEN_BUTTON } from "@/src/constants/theme";
import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";


interface ButtonProps {
    buttonText: string,
    router: () => void,
    animationStyle?: StyleProp<ViewStyle>
}


export default function OnboardingButton(props: ButtonProps) {
    return (
        <Pressable
            hitSlop={5} 
            onPress={props.router} 
            style={({pressed}) => {
                return [BIG_GOLDEN_BUTTON.pressable, {opacity: pressed ? 0.5 : 1}, props.animationStyle];
            }}
            
        >
            <View style={BIG_GOLDEN_BUTTON.buttonView}>
                <Text style={BIG_GOLDEN_BUTTON.text}> {props.buttonText} </Text>

            </View>
        </Pressable>
    );
    
}
