import { MAIN_COLOR } from "@/src/constants/theme";
import { BarChart as GiftedBarChart } from "react-native-gifted-charts";

const hours = [
  { value: 2 },
  { value: 5 },
  { value: 5 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 3 },
];

export default function BarChart() {
  return (
    <GiftedBarChart
      data={hours}
      maxValue={Math.max(...hours.map((hour) => hour.value))}
      frontColor={MAIN_COLOR}
      stepValue={1}
      rulesType="solid"
      xAxisColor={"white"}
      yAxisColor={"white"}
      yAxisTextStyle={{ color: "white" }}
      yAxisLabelSuffix=" hr"
      barWidth={25}
    />
  );
}
