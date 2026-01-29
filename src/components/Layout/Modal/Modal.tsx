import { colors } from "@/theme/colors";
import {
  Card,
  Divider,
  Grid,
  Heading,
  Image,
  Link,
  Text,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Button from "../Button/Button";

interface Schedule {
  day: string;
  hours: string;
}

interface ContactInfo {
  phone: string;
  appointmentPhone: string;
  email: string;
  website: string;
}

interface ModalProps {
  title: string;
  subtitle: string;
  description: string;
  locationUrl: string;
  salesSchedules: Schedule[];
  maintenanceSchedules: Schedule[];
  contact: ContactInfo;
  onClose: () => void;
}

export const Modal = ({
  title,
  subtitle,
  description,
  locationUrl,
  salesSchedules,
  maintenanceSchedules,
  contact,
  onClose,
}: ModalProps) => {
  return (
    <Card
      backgroundColor={colors.theme.darkestGray}
      color={colors.theme.white}
      padding={{ base: "1.375rem .9375rem", xl: "5.1875rem 6rem" }}
      width={"100%"}
      maxWidth={"50rem"}
      height={"max-content"}
    >
      <View>
        <Image
          src="/images/icons/close.svg"
          alt="close"
          style={{
            width: "5vw",
            maxWidth: "45px",
            display: "block",
            marginLeft: "auto",
            cursor: "pointer",
            filter:
              "invert(95%) sepia(97%) saturate(14%) hue-rotate(213deg) brightness(104%) contrast(104%)",
          }}
          onClick={onClose}
        />
      </View>

      {/* Sección de información general */}
      <View
        textAlign={{ xl: "center" }}
        maxWidth={"22.5rem"}
        margin={{ xl: "0 auto" }}
      >
        <Heading
          level={6}
          fontSize={{ base: "sm" }}
          fontWeight={"400"}
          color={"inherit"}
          marginBottom={".25rem"}
        >
          {title}
        </Heading>
        <Heading
          level={3}
          fontSize={{ base: "mlg", xl: "lg" }}
          color={"inherit"}
          marginBottom={".25rem"}
        >
          {subtitle}
        </Heading>
        <Text
          fontSize={{ base: "ss", xl: "sm" }}
          color={"inherit"}
          marginBottom={{ base: ".5rem", xl: ".75rem" }}
        >
          {description}
        </Text>

        <Link
          fontSize={{ base: "sm" }}
          fontWeight={"500"}
          color={"inherit"}
          textDecoration={"underline"}
          href={locationUrl}
          target="_blank"
        >
          Ver en Google Maps
        </Link>
      </View>

      <Divider borderColor={"darkGray"} margin={"1.5rem 0"} />

      {/* Sección de horarios */}
      <View>
        <Heading
          level={4}
          fontSize={{ base: "ml" }}
          color={"inherit"}
          marginBottom={".75rem"}
        >
          Horarios de atención
        </Heading>

        {/* Horarios Sala de Ventas */}
        <Heading
          level={5}
          fontSize={{ base: "md", xl: "ml" }}
          fontWeight={"400"}
          color={"inherit"}
          marginBottom={".5rem"}
        >
          Sala de ventas
        </Heading>
        <Grid
          fontSize={{ base: "ss", xl: "sm" }}
          templateColumns={"max-content max-content"}
          justifyContent={"space-between"}
          gap={".5rem"}
          marginBottom={"1.5rem"}
        >
          {salesSchedules.map((schedule, index) => (
            <View key={index}>
              <Text color={"inherit"}>{schedule.day}</Text>
              <Text color={"inherit"}>{schedule.hours}</Text>
            </View>
          ))}
        </Grid>

        {/* Horarios Mantenimiento Planeado */}
        <Heading
          level={5}
          fontSize={{ base: "md", xl: "ml" }}
          fontWeight={"400"}
          color={"inherit"}
          marginBottom={".5rem"}
        >
          Mantenimiento Planeado:
        </Heading>
        <Grid
          fontSize={{ base: "ss", xl: "sm" }}
          templateColumns={"max-content max-content"}
          justifyContent={"space-between"}
          gap={".5rem"}
        >
          {maintenanceSchedules.map((schedule, index) => (
            <View key={index}>
              <Text color={"inherit"}>{schedule.day}</Text>
              <Text color={"inherit"}>{schedule.hours}</Text>
            </View>
          ))}
        </Grid>
      </View>

      <Divider borderColor={"darkGray"} margin={"1.5rem 0"} />

      {/* Sección de contacto */}
      <View>
        <Heading
          level={4}
          fontSize={{ base: "ml" }}
          color={"inherit"}
          marginBottom={".75rem"}
        >
          Contacto
        </Heading>

        <Grid gap={"1.5rem"}>
          <View>
            <Heading
              level={5}
              fontSize={{ base: "md", xl: "ml" }}
              fontWeight={"400"}
              color={"inherit"}
              marginBottom={".5rem"}
            >
              Teléfono:
            </Heading>
            <Text fontSize={{ base: "ss", xl: "sm" }} color={"inherit"}>
              {contact.phone}
            </Text>
          </View>
          <View>
            <Heading
              level={5}
              fontSize={{ base: "md", xl: "ml" }}
              fontWeight={"400"}
              color={"inherit"}
              marginBottom={".5rem"}
            >
              Teléfono agendamiento de citas:
            </Heading>
            <Text fontSize={{ base: "ss", xl: "sm" }} color={"inherit"}>
              {contact.appointmentPhone}
            </Text>
          </View>
          <View>
            <Heading
              level={5}
              fontSize={{ base: "md", xl: "ml" }}
              fontWeight={"400"}
              color={"inherit"}
              marginBottom={".5rem"}
            >
              Correo electrónico:
            </Heading>
            <Text fontSize={{ base: "ss", xl: "sm" }} color={"inherit"}>
              {contact.email}
            </Text>
          </View>
          <View>
            <Heading
              level={5}
              fontSize={{ base: "md", xl: "ml" }}
              fontWeight={"400"}
              color={"inherit"}
              marginBottom={".5rem"}
            >
              Página Web:
            </Heading>
            <Link
              fontSize={{ base: "sm" }}
              fontWeight={"500"}
              color={"inherit"}
              textDecoration={"underline"}
              href={contact.website}
              target="_blank"
            >
              {contact.website}
            </Link>
          </View>
        </Grid>
      </View>

      <Divider borderColor={"darkGray"} margin={"1.5rem 0 2.5rem"} />

      <Button
        type="button"
        color="red"
        style={{
          display: "block",
          fontWeight: "500",
          margin: "0 auto",
        }}
        onClick={onClose}
      >
        ¿Necesitas ayuda? Contáctanos
      </Button>
    </Card>
  );
};

export default Modal;
