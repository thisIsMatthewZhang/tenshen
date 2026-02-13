import { AnimatedPressable } from "@/src/components/AnimatedPressable";
import { MAIN_COLOR, PATTERN } from "@/src/constants/theme";
import { UnknownOutputParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    ImageProps,
    Platform,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import OnboardingButton from "../components/OnboardingButton";
const ruby = require("../../../../assets/avatars/Ruby.png");
const rudy = require("../../../../assets/avatars/Rudy.png");

interface AvatarProps {
  avatar: ImageProps;
  name: string;
  isSelected: boolean;
  onSelected: () => void;
}

export default function PickWorkoutBuddyScreen({
  fullName,
  preferredName,
}: UnknownOutputParams) {
  const router = useRouter();
  const [selected, setSelected] = useState<"Ruby" | "Rudy" | null>(null);
  const [error, setError] = useState("");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[PATTERN.container, PATTERN.center]}>
        <View style={styles.textContainer}>
          <Text style={PATTERN.bigText}>
            Hey {preferredName}! Please choose which workout partner you want to
            do this journey with👇
          </Text>
          <Text style={[PATTERN.smallText, { opacity: 0.5, top: 12 }]}>
            You will be able to swap later.
          </Text>
        </View>
        {/* NOTE: Change to be Rive sprites instead of using difficult images*/}
        <View style={styles.selectionContainer}>
          <AvatarContainer
            avatar={ruby}
            name="Ruby"
            isSelected={selected === "Ruby"}
            onSelected={() => {
              setSelected("Ruby");
              setError("");
            }}
          />
          <AvatarContainer
            avatar={rudy}
            name="Rudy"
            isSelected={selected === "Rudy"}
            onSelected={() => {
              setSelected("Rudy");
              setError("");
            }}
          />
        </View>
        <Text style={[PATTERN.smallText, { color: MAIN_COLOR }]}>{error}</Text>
        <OnboardingButton
          buttonText="Next"
          router={() => {
            if (!selected) {
              setError("Please pick a workout partner.");
            } else {
              setSelected(null);
              setError("");
              router.push({
                pathname: "/buddygreeting",
                params: { fullName, preferredName, selected },
              });
            }
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function AvatarContainer(props: AvatarProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: props.isSelected ? 1.1 : 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [props.isSelected, scaleAnim]);

  return (
    <AnimatedPressable
      style={[styles.avatarContainer, { transform: [{ scale: scaleAnim }] }]}
      hitSlop={5}
      onPressIn={() => {
        Animated.timing(scaleAnim, {
          toValue: props.isSelected ? 1.15 : 1.05,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }}
      onPressOut={() => {
        Animated.timing(scaleAnim, {
          toValue: props.isSelected ? 1.1 : 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }}
      onPress={props.onSelected}
    >
      <Image style={styles.avatar} source={props.avatar} />
      <Text style={[PATTERN.bigText, styles.avatarName]}> {props.name} </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    marginBlock: 12,
  },
  selectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: {
        flex: 4,
        columnGap: 48,
      },
      default: {
        flex: 4,
        marginBlock: 28,
        columnGap: 24,
      },
    }),
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    ...Platform.select({
      web: {
        width: 300,
        height: 300,
      },
      default: {
        width: "40%",
        height: "40%",
      },
    }),
  },
  avatar: {
    top: 12,
    ...Platform.select({
      web: {
        width: "100%",
        height: "100%",
      },
      default: {
        width: "100%",
        height: "100%",
      },
    }),
  },
  avatarName: {
    top: 28,
  },
});
