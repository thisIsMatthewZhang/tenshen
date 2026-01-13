import { Platform, StyleSheet } from "react-native";


export const GOLD = '#FFC107';
export const BUTTONTEXT = '#000000';
export const APP_BACKGROUND_COLOR = '#2F3036';

export const FONTS = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },

  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const ONBOARDING = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2F3036"
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
    alignSelf: "flex-start",
    marginInlineStart: 28,
    opacity: 0.5
  }

});