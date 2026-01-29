import { Image, Text } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

export const Guarantees = ({
  imageSrc = "/images/anos.svg",
  imageAlt = "Garantías",
  title = "5 Años de Garantía<br/>o 120.000KM",
  description = `La garantía TOYOTA aplica únicamente para vehículos nuevos importados
  por Automotores Toyota Colombia S.A.S. (“ATC”), comercializados y
  facturados por los concesionarios de la red de ATC. La garantía tiene
  una cobertura de 5 años contados a partir de la fecha de entrega del
  vehículo al cliente o 120.000 km., lo primero que ocurra. Los primeros 3
  años y/o los 100.000 km. iniciales corresponden a la garantía de
  fábrica, los siguientes 2 años y/o los 20.000 km. adicionales,
  corresponden a la garantía suplementaria ofrecida por ATC.`,
}) => {
  return (
    <>
      <Image
        src={imageSrc}
        alt={imageAlt}
        display={"block"}
        width={{ base: "76%" }}
        maxWidth={{ base: "24.875rem" }}
        margin={{ base: "0 auto 1.75rem", xl: "0 auto 1.9375rem" }}
      />

      <Text
        fontSize={{ base: "ml" }}
        textAlign={{ base: "center" }}
        marginBottom={{ base: "2.5rem", xl: "3.6875rem" }}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      <Text
        maxWidth={"76.25rem"}
        fontSize={{ base: "xs", xl: "ml" }}
        lineHeight={"normal"}
        textAlign={{ xl: "center" }}
        margin={"0 auto"}
        fontFamily="var(--font-tootaType)" 
      >
        {description}
      </Text>
    </>
  );
};

export default Guarantees;
