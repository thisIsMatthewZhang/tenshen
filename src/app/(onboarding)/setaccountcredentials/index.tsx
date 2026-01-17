import SetAccountCredentialsScreen from "@/src/screens/Onboarding/SetAccountCredentials";
import { useLocalSearchParams } from "expo-router";

export default function SetAccountCredentials() {
    const { fullName, preferredName, selected }  = useLocalSearchParams();
    return <SetAccountCredentialsScreen fullName={fullName} preferredName={preferredName} selected={selected}/>;
}   