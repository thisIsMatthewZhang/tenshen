import AppButton from "@/src/components/AppButton";
import { BLUE_DARKER, MAIN_COLOR, PATTERN } from "@/src/constants/theme";
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

  return (
    <View style={PATTERN.container}>
      <View style={styles.topContainer}>
        <View style={styles.expBarContainer}>
          <Text
            style={[
              PATTERN.smallText,
              { color: MAIN_COLOR, fontWeight: "bold" },
            ]}
          >
            LV. 11
          </Text>
          <View style={styles.expBar}></View>
        </View>
        <View style={styles.textHeaderContainer}>
          <Text style={[PATTERN.bigText, { fontWeight: "bold" }]}>
            Good stuff, <Text style={{ color: MAIN_COLOR }}>Matthew!</Text>🤩
          </Text>
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.partnerContainer}></View>
          <View style={styles.blocksContainer}>
            <Block value={5} category="Exercises" />
            <Block value={12} category="Sets" />
            <Block value={"1hr 29m"} category="Workout Time" />
            <Block value={"3"} category="Streak🔥" />
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
          containerStyle={{ marginVertical: 16 }}
          labelStyle={[PATTERN.mediumText, { fontWeight: "bold" }]}
        />
        <View style={styles.buttonsContainer}>
          <AppButton
            title="Discard Activity"
            bgColor="red"
            textColor="black"
            onPress={() => {}}
            style={{ flex: 1 }}
          />
          <AppButton
            title="Save Activity"
            bgColor={MAIN_COLOR}
            textColor="black"
            onPress={() => {}}
            style={{ flex: 1, marginLeft: 12 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: { alignItems: "center", padding: 12 },
  expBarContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 12,
  },
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
    paddingHorizontal: 12,
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
});
