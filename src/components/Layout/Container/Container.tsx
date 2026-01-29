import { colors } from "@/theme/colors";
import { View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

interface ContainerProps {
  children: React.ReactNode;
  padding: string | object;
  backgroundColor?: string;
}

export const Container = ({
  children,
  padding,
  backgroundColor = colors.theme.white,
}: ContainerProps) => {
  const containerSize = {
    base: "90%",
    md: "80%",
    xl: "1200px",
    xxl: "1530px",
  };

  return (
    <View backgroundColor={backgroundColor} padding={padding}>
      <View width={"100%"} maxWidth={containerSize} margin="0 auto">
        {children}
      </View>
    </View>
  );
};

export default Container;
