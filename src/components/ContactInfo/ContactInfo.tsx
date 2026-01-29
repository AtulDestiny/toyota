// Add this to your components directory as ContactInfo.tsx
import React from "react";
import { View, Text, Flex } from "@aws-amplify/ui-react";

interface ContactInfoProps {
  containerStyle?: React.CSSProperties;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  containerStyle = {},
}) => {
  return (
    <Flex
      direction={{ base: "column", medium: "row" }}
      justifyContent="center"
      alignItems="center"
      padding={{ base: "0 16px 40px", medium: "0 30px 60px" }}
      gap={{ base: "30px", medium: "80px" }}
      maxWidth="1200px"
      margin="0 auto"
      style={containerStyle}
    >
      {/* National Line */}
      <View textAlign="center">
        <Text fontSize="16px" color="#666" marginBottom="8px">
          Línea gratuita nacional
        </Text>
        <Text fontSize="18px" fontWeight="500" color="#000">
          01 8000 123 691
        </Text>
      </View>

      {/* Bogota Line */}
      <View textAlign="center">
        <Text fontSize="16px" color="#666" marginBottom="8px">
          Línea Bogotá
        </Text>
        <Text fontSize="18px" fontWeight="500" color="#000">
          3103157486
        </Text>
      </View>

      {/* Email */}
      <View textAlign="center">
        <Text fontSize="16px" color="#666" marginBottom="8px">
          Correo
        </Text>
        <Text
          as="a"
          href="mailto:clientes@toyota.com.co"
          fontSize="18px"
          fontWeight="500"
          color="#EB0A1E"
          style={{ textDecoration: "none" }}
        >
          clientes@toyota.com.co
        </Text>
      </View>
    </Flex>
  );
};

export default ContactInfo;
