import { View, Image } from "@aws-amplify/ui-react";
import "./mericicologo.css";

interface LogoItem {
  url: string;
  altText: string;
}

interface MericicoLogoProps {
  logos: LogoItem[];
}

export function MericicoLogo({ logos }: MericicoLogoProps) {
  return (
    <View className="mericico-logo-wrapper">
      <View className="mericico-logo-container">
        {logos[0] && (
          <Image
            src={logos[0].url}
            alt={logos[0].altText}
            className="logo-first"
          />
        )}
        {logos[1] && (
          <Image
            src={logos[1].url}
            alt={logos[1].altText}
            className="logo-second"
          />
        )}
      </View>
    </View>
  );
}
