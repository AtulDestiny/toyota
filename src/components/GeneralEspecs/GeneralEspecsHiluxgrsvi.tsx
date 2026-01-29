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
    details: "2.8L Turbo Diésel",
  },
  {
    name: "Rendimiento",
    details: "201 HP / 500 Nm",
  },
  {
    name: "Transmisión",
    details: "Automática secuencial (6 velocidades + reversa)",
  },
  {
    name: "Suspensión",
    details:
      "Resortes helicoidales y amortiguadores telescópicos.\nDelantera: Doble horquilla con resortes helicoidales.\nTrasera: Eje rígido con ballestas.",
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
          Hilux GR-S
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
