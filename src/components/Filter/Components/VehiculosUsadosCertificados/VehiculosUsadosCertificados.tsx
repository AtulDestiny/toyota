import {
  View,
  Text,
  Image,
  Flex,
  useTheme,
  useBreakpointValue,
} from "@aws-amplify/ui-react";

export function VehiculosUsadosCertificados() {
  const isDesktop = useBreakpointValue({ base: false, large: true });

  return (
    <View
      backgroundColor="#000"
      color="#fff"
      padding={isDesktop ? "3rem" : "1.5rem"}
      maxWidth={isDesktop ? "900px" : "100%"}
      margin="0 auto"
    >
      {/* Close Button */}
      <View position="absolute" top="1rem" right="1rem" fontSize="1.5rem">
        ✕
      </View>

      {/* Title and Logo */}
      <Flex direction="column" alignItems="center" gap="1rem">
        <Text
          fontSize={isDesktop ? "2rem" : "1.5rem"}
          fontWeight="bold"
          textAlign="center"
        >
          Vehículos Usados Certificados
        </Text>
        <Image
          src="/path-to-icon.png"
          alt="Usados Certificados Toyota"
          width="50px"
        />
      </Flex>

      {/* Description */}
      <Text
        marginTop="1rem"
        textAlign="center"
        fontSize={isDesktop ? "1rem" : "0.9rem"}
        lineHeight="1.5"
      >
        Puedes optar por un Usado Certificado Toyota que te garantiza que el
        vehículo de tu interés ha sido revisado en 155 puntos por técnicos
        expertos, por lo que cuenta con garantía de hasta 2 años o 20.000 Km.*,
        todas las campañas de seguridad realizadas y tranquilidad para ti en
        todo el proceso de compra.
      </Text>
      <Text fontSize="0.7rem" textAlign="center" marginTop="0.5rem">
        *Lo que primero ocurra.
      </Text>

      {/* Características Grid */}
      <View marginTop="2rem">
        <Text fontSize="1.2rem" fontWeight="bold" marginBottom="1rem">
          Características
        </Text>
        <Flex direction={isDesktop ? "row" : "column"} wrap="wrap" gap="1rem">
          {[
            {
              icon: "🚗",
              text: "Garantía limitada de 2 años o 20.000 Km.",
            },
            {
              icon: "🔧",
              text: "155 puntos inspeccionados por Técnicos Maestros Toyota.",
            },
            {
              icon: "🛡️",
              text: "Tranquilidad en la compra. Eliminando los riesgos del mercado de usados en Colombia.",
            },
            {
              icon: "📋",
              text: "Todas las campañas de seguridad realizadas.",
            },
          ].map(({ icon, text }, i) => (
            <Flex
              key={i}
              direction="column"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              flex="1 1 45%"
              backgroundColor="#111"
              padding="1rem"
              borderRadius="8px"
            >
              <Text fontSize="1.5rem">{icon}</Text>
              <Text fontSize="0.9rem" marginTop="0.5rem">
                {text}
              </Text>
            </Flex>
          ))}
        </Flex>
      </View>

      {/* Disclaimer */}
      <Text fontSize="0.6rem" textAlign="center" marginTop="2rem" opacity={0.6}>
        *Consulta a un asesor y revisa en los documentos del vehículo los
        términos y condiciones aplicables.
      </Text>
    </View>
  );
}
