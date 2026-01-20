import { Platform, StyleSheet } from "react-native";

export const GOLD = "#FFC107";
export const BUTTONTEXT = "#000000";
export const APP_BACKGROUND_COLOR = "#2F3036";
export const TAB_ICON_SIZE = 28;

export const FONTS = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },

  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const ONBOARDING = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2F3036",
    paddingBlock: 28,
  },
  bigText: {
    fontSize: 24,
    fontWeight: 600,
    maxWidth: 350,
    color: "white",
  },
  smallText: {
    fontSize: 16,
    color: "white",
  },
});

export const BIG_GOLDEN_BUTTON = StyleSheet.create({
  pressable: {
    marginBlockStart: 24,
    ...Platform.select({
      web: {
        width: "25%",
      },
      default: {
        width: "75%",
      },
    }),
  },
  buttonView: {
    width: "100%",
    backgroundColor: GOLD,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingBlock: 12,
  },
  text: {
    fontSize: 20,
    fontWeight: 700,
    ...FONTS,
  },
});

export const TEXT_INPUT = StyleSheet.create({
  input: {
    color: "white",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    marginBlock: 10,
    ...Platform.select({
      web: {
        width: "25%",
        padding: 10,
      },
      default: {
        width: "75%",
      },
    }),
  },
});
