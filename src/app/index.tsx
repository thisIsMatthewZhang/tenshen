import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [buttonText, setButtonText] = useState("Get Started");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title={buttonText} onPress={() => setButtonText("You Clicked Me!!!")}></Button>
    </View>
  );
}
