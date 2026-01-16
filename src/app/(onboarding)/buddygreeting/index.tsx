import BuddyGreetingScreen from "@/src/screens/Onboarding/BuddyGreeting";
import { useLocalSearchParams } from "expo-router";

export default function RouteFour() {
    const { fullName, preferredName, selected } = useLocalSearchParams();
    return <BuddyGreetingScreen fullName={fullName} preferredName={preferredName} selected={selected}/>;
}