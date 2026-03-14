import { useRouter } from "expo-router";
import AppButton, { ButtonProps } from "./AppButton";

export default function BackButton(
  props: Omit<ButtonProps, "title" | "onPress">,
) {
  const router = useRouter();
  return (
    <AppButton
      title="Back"
      bgColor={props.bgColor}
      textColor={props.textColor}
      onPress={() => router.back()}
      customStyle={props.customStyle}
      textStyle={props.textStyle}
    />
  );
}
