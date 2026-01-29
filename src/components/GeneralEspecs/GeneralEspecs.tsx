import { colors } from "@/theme/colors";
import {
  Card,
  Grid,
  Heading,
  Link,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Button from "../Layout/Button/Button";

export interface Spec {
  name: string;
  details: string;
}

interface GeneralEspecsProps {
  specsData?: Spec[];
  heading?: string;
  technicalData?: string;
}

export const GeneralEspecs = ({
  specsData,
  heading,
  technicalData,
}: GeneralEspecsProps) => {
  const isMobile = useBreakpointValue({ base: true, xl: false }) ?? false;

  return (
    <Grid
      templateColumns={{ base: "repeat(2, 1fr)", medium: "repeat(auto, 1fr)" , xl: "repeat(4, 1fr)" }}
      gap={"1.25rem"}
      color={"white"}
    >
      <View
        {...(isMobile
          ? { columnSpan: { base: "2" } }
          : { rowSpan: {  xl: "2" } })}
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
          {heading || "Land Cruiser Prado"}
        </Heading>
        {!isMobile && (
          <Link href={technicalData || "#"} target="_blank">
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
          </Link>
        )}
      </View>
      {specsData?.map((spec, index) => (
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
            gridColumn: "span 2",
            width: "242px",
            height: "40px",
            margin: "0 auto",
          }}
        >
          Ver todas las especificaciones
        </Button>
      )}
    </Grid>
  );
};

export default GeneralEspecs;
