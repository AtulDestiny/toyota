import { colors } from "@/theme/colors";
import {
  Card,
  Grid,
  Heading,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Button from "../Layout/Button/Button";

const specsData = [
  {
    name: "Motor",
    details:
      "MOTOR: 3.4L Gasolina Twin Turbo \n POTENCIA: 389 HP \n TORQUE: 650 NM",
  },
  {
    name: "Rendimiento",
    details:
      "RADIO:   JBL + 14&#34; con Android Auto y Apple Carplay \n CÁMARA: 360° + Cámara en el platón \n SUSPENSIÓN: Variable adaptativa",
  },
  {
    name: "Transmisión",
    details: " Automática secuencial (10 velocidades + reversa)",
  },
  {
    name: "Suspensión",
    details: "DELANTERA: Independiente doble horquilla \n TRASERA: Multi-Link",
  },
  {
    name: "Drivetrain",
    details: "4WD PART TIME",
  },
];

export const GeneralEspecs = () => {
  const isMobile = useBreakpointValue({ base: true, xl: false }) ?? false;

  return (
    <Grid
      templateColumns={{ base: "repeat(2, 1fr)", medium: "repeat(4, 1fr)" }}
      gap={"1.25rem"}
      color={"white"}
    >
      <View
        {...(isMobile
          ? { columnSpan: { base: "2" } }
          : { rowSpan: { xl: "2" } })}
      >
        <Heading
          level={5}
          color={"inherit"}
          fontSize={{ base: "sm", xl: "md" }}
          fontWeight={"400"}
          marginBottom={"10px"}
        >
          Especificaciones Generales
        </Heading>
        <Heading
          level={2}
          color={"inherit"}
          fontSize={{ base: "lg", xl: "xxxxl" }}
          fontWeight={"400"}
          marginBottom={"2.5rem"}
        >
          Tundra
        </Heading>
        {!isMobile && (
          <Button
            type="button"
            color="white"
            textColor="black"
            padding=".625rem 1.5rem"
            style={{
              width: "290px",
              height: "50px",
            }}
          >
            Ver todas las especificaciones
          </Button>
        )}
      </View>
      {specsData.map((spec, index) => (
        <Card
          key={index}
          backgroundColor={"inherit"}
          color={"inherit"}
          style={{
            borderTop: "1px solid",
            borderTopColor: colors.theme.darkGray,
          }}
        >
          <Heading
            level={6}
            color={"inherit"}
            fontSize={"sm"}
            fontWeight={"400"}
            marginBottom={"15px"}
          >
            {spec.name}
          </Heading>
          <View>
            {spec.details.split("\n").map((line, i) => (
              <Text
                key={i}
                color={"inherit"}
                fontSize={{ base: "normal", xxl: "md" }}
              >
                {line}
              </Text>
            ))}
          </View>
        </Card>
      ))}
      {isMobile && (
        <Button
          type="button"
          color="white"
          textColor="black"
          style={{
            padding: ".625rem 1.5rem",
            gridColumn: "span 2",
          }}
        >
          Ver todas las especificaciones
        </Button>
      )}
    </Grid>
  );
};

export default GeneralEspecs;
