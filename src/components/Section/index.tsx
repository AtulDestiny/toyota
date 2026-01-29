import React from "react";
import { View } from "@aws-amplify/ui-react";

interface SectionProps {
  title: string;
  children?: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <View padding="20px">
      <View as="h2">{title}</View>
      {children}
    </View>
  );
}
