import { Card, Grid, Heading, Text, Button, View } from "@aws-amplify/ui-react";

type CoverageItem = {
  title: string;
  description: string;
};

type CoverageGridProps = {
  data?: CoverageItem[];
};

const defaultData: CoverageItem[] = [
  { title: "Cobertura 100%", description: "Realiza todos los mantenimientos" },
  { title: "Cobertura 50%", description: "Falta 1 mantenimiento" },
  { title: "Cobertura 20%", description: "Falta 2 o 3 mantenimientos" },
  { title: "Cobertura 0%", description: "No asiste a mantenimiento" },
];

function TextCard({ data = defaultData }: CoverageGridProps) {
  return (
    <View padding="2rem" textAlign="center">
      <Grid
        templateColumns={{ base: "1fr", large: "1fr 1fr 1fr 1fr" }}
        gap="1.5rem"
        justifyContent="center"
        alignItems="center"
      >
        {data.map((item, index) => (
          <Card
            key={index}
            textAlign={{ base: "left", xl: "center" }}
            padding="1.5rem"
            borderRadius="medium"
          >
            <Heading level={4} marginBottom="0.5rem">
              {item.title}
            </Heading>
            <Text fontSize="small">{item.description}</Text>
          </Card>
        ))}
      </Grid>

      <Button marginTop="2rem">Conocer términos y condiciones</Button>
    </View>
  );
}

export default TextCard;
