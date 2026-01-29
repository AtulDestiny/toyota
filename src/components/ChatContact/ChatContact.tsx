import React from "react";
import { View, Image, Text, Flex, Button } from "@aws-amplify/ui-react";

// Define style property types to replace 'any'
type StyleValue = string | number | boolean;
type ResponsiveStyle = StyleValue | Record<string, StyleValue>;
type StyleProps = Record<string, ResponsiveStyle>;

// Define the component props interface
interface ChatContactProps {
  title?: string;
  subtitle?: string;
  description?: string;
  titleStyle?: StyleProps;
  subtitleStyle?: StyleProps;
  descriptionStyle?: StyleProps;
  logoSrc?: string;
  logoStyle?: StyleProps;
  chatButtonText?: string;
  chatButtonStyle?: StyleProps;
  whatsappText?: string;
  whatsappLinkText?: string;
  whatsappStyle?: StyleProps;
  whatsappLinkStyle?: StyleProps;
  containerStyle?: StyleProps;
  contentStyle?: StyleProps;
  onChatClick?: () => void;
  onWhatsappClick?: () => void;
}

export const ChatContact: React.FC<ChatContactProps> = (props) => {
  //   const isMobile = useBreakpointValue({ base: true, large: false }) || false;

  // Default values with fallbacks
  const title = props.title || "Toyota Colombia";
  const subtitle = props.subtitle || "Atención al cliente";
  const description =
    props.description ||
    "Estamos aquí para ayudarte. Contáctanos a través de nuestros canales digitales para una atención personalizada.";
  const logoSrc = props.logoSrc || "/images/toyota-logo.png";
  const chatButtonText = props.chatButtonText || "Ir al chat";
  const whatsappText = props.whatsappText || "¿Aún no tienes WhatsApp?";
  const whatsappLinkText = props.whatsappLinkText || "Descargar";

  // Style defaults
  const titleStyle = props.titleStyle || {
    fontSize: { base: "26px", xl: "32px" },
    fontWeight: "700",
    fontFamily: "var(--font-toyotaDisplay)",
    marginBottom: "0.5rem",
    textAlign: "center",
  };

  const subtitleStyle = props.subtitleStyle || {
    fontSize: { base: "20px", xl: "24px" },
    fontWeight: "400",
    fontFamily: "var(--font-toyotaDisplay)",
    marginBottom: "1.5rem",
    textAlign: "center",
  };

  const descriptionStyle = props.descriptionStyle || {
    fontSize: { base: "16px", xl: "18px" },
    fontWeight: "400",
    lineHeight: "1.5",
    fontFamily: "var(--font-ToyotaType-Regular)",
    marginBottom: "2rem",
    textAlign: "center",
    maxWidth: "600px",
    margin: "0 auto 2rem",
  };

  const logoStyle = props.logoStyle || {
    width: { base: "120px", xl: "180px" },
    height: "auto",
    marginBottom: "3.5rem",
  };

  const chatButtonStyle = props.chatButtonStyle || {
    backgroundColor: "#4D8B76",
    color: "white",
    fontWeight: "500",
    fontSize: { base: "16px", xl: "18px" },
    paddingX: "15px",
    paddingY: "137px",
    borderRadius: "full",
    width: { base: "80%", xl: "auto" },
    maxWidth: "300px",
  };

  const whatsappStyle = props.whatsappStyle || {
    fontSize: { base: "14px", xl: "16px" },
    fontWeight: "400",
    marginTop: "1.5rem",
    color: "#666",
  };

  const whatsappLinkStyle = props.whatsappLinkStyle || {
    fontSize: { base: "14px", xl: "16px" },
    fontWeight: "400",
    color: "#58595B",
    textDecoration: "underline",
    cursor: "pointer",
  };

  const containerStyle = props.containerStyle || {
    padding: { base: "2rem 1rem", xl: "3rem 2rem" },
    backgroundColor: "#f8f8f8",
    borderRadius: "0",
    maxWidth: "800px",
    margin: "0 auto",
  };

  // Handle button clicks
  const handleChatClick = () => {
    if (props.onChatClick) {
      props.onChatClick();
    } else {
      // Default behavior
      console.log("Chat button clicked");
    }
  };

  const handleWhatsappClick = () => {
    if (props.onWhatsappClick) {
      props.onWhatsappClick();
    } else {
      // Default behavior - open WhatsApp download page
      window.open("https://www.whatsapp.com/download", "_blank");
    }
  };

  return (
    <View {...containerStyle}>
      <Flex direction="column" alignItems="center" justifyContent="center">
        {/* Logo */}
        <Image src={logoSrc} alt="Toyota Logo" {...logoStyle} />

        {/* Title */}
        <Text {...titleStyle}>{title}</Text>

        {/* Subtitle */}
        <Text {...subtitleStyle}>{subtitle}</Text>

        {/* Description */}
        <Text {...descriptionStyle}>{description}</Text>

        {/* Chat Button */}
        <Button onClick={handleChatClick} {...chatButtonStyle}>
          {chatButtonText}
        </Button>

        {/* WhatsApp Text */}
        <Flex
          direction="row"
          alignItems="center"
          marginTop="2.5rem"
          gap="0.5rem"
        >
          <Text {...whatsappStyle}>{whatsappText}</Text>
        </Flex>
        <Text onClick={handleWhatsappClick} {...whatsappLinkStyle}>
          {whatsappLinkText}
        </Text>
      </Flex>
    </View>
  );
};
