import { BUTTONTEXT, GOLD } from "@/src/constants/theme";
import { useState } from "react";
import { Button, View } from "react-native";

export default function NextButton() {
    const [buttonClicked, setButtonClicked] = useState(false);

    return (
        <View 
            style={{
            backgroundColor: GOLD, 
            borderRadius: '25px 25px 25px 25px',
            
            }}
        >
            <Button title={buttonClicked ? "Onto the next page" : "Next"} color={BUTTONTEXT} onPress={() => setButtonClicked(!buttonClicked)}></Button>
        </View>
    );
    
}