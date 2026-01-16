import PickWorkoutBuddyScreen from "@/src/screens/Onboarding/PickWorkoutBuddy";
import { useLocalSearchParams } from "expo-router";

export default function RouteThree() {
    const { fullName, preferredName } = useLocalSearchParams();
    return <PickWorkoutBuddyScreen fullName={fullName} preferredName={preferredName}/>;
}