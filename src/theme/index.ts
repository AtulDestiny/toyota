import { text } from "@/theme/text";
import { button } from "@/theme/button";
import { colors } from "@/theme/colors";
import { Theme } from "@aws-amplify/ui-react";
import { fontsDefault } from "@/theme/fontsDefault";
import { fontSize } from "@/theme/fontSize";
import { tabs } from "@/theme/tabs";

export const ToyotaTotemTheme: Theme = {
  name: "toyota-totem-theme",
  breakpoints: {
    values: {
      xl: 1250,
      xxl: 1650,
    },
  },
  tokens: {
    colors: colors,
    fonts: fontsDefault,
    fontSizes: fontSize,
    components: {
      text: text,
      button: button,
      tabs: tabs,
    },
  },
};

export default ToyotaTotemTheme;
