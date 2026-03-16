import AppButton from "@/src/components/AppButton";
import ExperienceBar, {
  calculateExpPointsEarned,
} from "@/src/components/ExperienceBar";
import { BLUE_DARKER, MAIN_COLOR, PATTERN } from "@/src/constants/theme";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

interface BlockProps {
  value: number | string;
  category: "Exercises" | "Sets" | "Workout Time" | "Streak🔥";
}

const Block = ({ value, category }: BlockProps) => {
  return (
    <View style={styles.block}>
      <Text style={[PATTERN.mediumText, { fontWeight: "bold" }]}>{value}</Text>
      <Text
        style={[PATTERN.smallText, { color: MAIN_COLOR, fontWeight: "bold" }]}
      >
        {category}
      </Text>
    </View>
  );
};

export default function WorkoutComplete() {
  const radioButtons: RadioButtonProps[] = useMemo(() => {
    const containerStyle: StyleProp<ViewStyle> = {
      width: "100%",
      justifyContent: "space-between",
    };
    const descriptionStyle: StyleProp<TextStyle> = {
      ...PATTERN.smallText,
      fontSize: 14,
      color: "white",
      opacity: 0.5,
      alignSelf: "flex-end",
      paddingRight: 12,
    };
    return [
      {
        id: "1",
        label: "Public",
        description: "Everyone can see this workout",
        descriptionStyle: descriptionStyle,
        value: "public",
        containerStyle: containerStyle,
        color: BLUE_DARKER,
      },
      {
        id: "2",
        label: "Private",
        description: "Only you can see this workout",
        descriptionStyle: descriptionStyle,
        value: "private",
        containerStyle: containerStyle,
        color: BLUE_DARKER,
      },
    ];
  }, []);
  const [selectedId, setSelectedId] = useState<undefined | string>(undefined);
  const params = useLocalSearchParams<{
    workoutId: string;
    workoutName: string;
    exercisesCompleted: string;
    setsCompleted: string;
    time: string;
    streak: string;
  }>();

  const expGainedFactors = {
    time: params.time,
    exercises: params.exercisesCompleted,
    sets: params.setsCompleted,
    streak: params.streak,
  };

  return (
    <View style={[PATTERN.container, { justifyContent: "space-around" }]}>
      <View style={styles.topContainer}>
        <ExperienceBar
          expGained={calculateExpPointsEarned(expGainedFactors, 1.75)}
        >
          <Text
            style={[
              PATTERN.smallText,
              { color: MAIN_COLOR, fontWeight: "bold" },
            ]}
          >
            LV. 11
          </Text>
          <View style={styles.expBar}></View>
        </ExperienceBar>
        <View style={styles.textHeaderContainer}>
          <Text style={[PATTERN.bigText, { fontWeight: "bold" }]}>
            Good stuff, <Text style={{ color: MAIN_COLOR }}>Matthew!</Text>🤩
          </Text>
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.partnerContainer}></View>
          <View style={styles.blocksContainer}>
            <Block value={params.exercisesCompleted} category="Exercises" />
            <Block value={params.setsCompleted} category="Sets" />
            <Block value={params.time} category="Workout Time" />
            <Block value={params.streak} category="Streak🔥" />
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {/* <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Notes"
          placeholderTextColor="white"
        /> */}
        {/* Add Post-Workout Selfie later */}
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
          containerStyle={{ marginBottom: 32 }}
          labelStyle={[PATTERN.mediumText, { fontWeight: "bold" }]}
        />
        <View style={styles.buttonsContainer}>
          <AppButton
            title="Discard Activity"
            bgColor="red"
            textColor="black"
            onPress={() => {}}
            customStyle={{ flex: 1 }}
          />
          <AppButton
            title="Save Activity"
            bgColor={MAIN_COLOR}
            textColor="black"
            onPress={() => {}}
            customStyle={{ flex: 1, marginLeft: 12 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: { alignItems: "center", paddingHorizontal: 16 },
  expBar: {
    width: "75%",
    height: 10,
    backgroundColor: "grey",
    borderRadius: 5,
  },
  textHeaderContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 12,
  },
  partnerContainer: { flex: 1 },
  blocksContainer: { flex: 1 },
  block: {
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    padding: 16,
  },
  //   input: {
  //     width: "100%",
  //     color: "white",
  //     textAlignVertical: "top",
  //     // justifyContent: "flex-start",
  //     borderWidth: 2,
  //     borderRadius: 10,
  //     borderColor: "white",
  //     padding: 12,
  //     marginBottom: 12,
  //   },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
