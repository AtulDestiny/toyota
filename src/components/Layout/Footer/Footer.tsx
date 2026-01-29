import { colors } from "@/theme/colors";
import {
  View,
  Flex,
  Text,
  Image,
  Collection,
  Accordion,
  useBreakpointValue,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./Footer.css";
import { useState } from "react";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch";

export const Footer = () => {
  // Accessibility
  const heading = [
    {
      name: "Accesibilidad",
      href: "/accesibilidad",
    },
    {
      name: "Opciones de Privacidad",
      href: "/opciones-de-privacidad",
    },
    {
      name: "Consentimiento de Cookies",
      href: "/consentimiento-de-cookies",
    },
  ];
  // Social Media
  /*
  https://www.facebook.com/ToyotaColombia
  https://www.youtube.com/user/ToyotaenColombia
  https://www.instagram.com/toyotacolombia/
  https://www.tiktok.com/@toyotacolombiaoficial
  https://x.com/ToyotaCol
  */
  const socialMedias = [
    {
      name: "Facebook",
      logo: "/images/socialMedias/facebook.png",
      href: "https://www.facebook.com/ToyotaColombia",
      dimensions: {
        base: {
          width: "20px",
          height: "35px",
        },
        xl: {
          width: "18.265px",
          height: "31.964px",
        },
      },
    },
    {
      name: "YouTube",
      logo: "/images/socialMedias/youtube.png",
      href: "https://www.youtube.com/user/ToyotaenColombia",
      dimensions: {
        base: {
          width: "47.66px",
          height: "35px",
        },
        xl: {
          width: "43.525px",
          height: "31.964px",
        },
      },
    },
    {
      name: "Twitter",
      logo: "/images/socialMedias/twitter.png",
      href: "https://x.com/ToyotaCol",
      dimensions: {
        base: {
          width: "34.352px",
          height: "35px",
        },
        xl: {
          width: "31.372px",
          height: "31.964px",
        },
      },
    },
    {
      name: "Instagram",
      logo: "/images/socialMedias/instagram.png",
      href: "https://www.instagram.com/toyotacolombia/",
      dimensions: {
        base: {
          width: "35px",
          height: "35px",
        },
        xl: {
          width: "31.964px",
          height: "31.964px",
        },
      },
    },
    {
      name: "TikTok",
      logo: "/images/socialMedias/tiktok.png",
      href: "https://www.tiktok.com/@toyotacolombiaoficial",
      dimensions: {
        base: {
          width: "34.239px",
          height: "35px",
        },
        xl: {
          width: "31.269px",
          height: "31.964px",
        },
      },
    },
  ];

  // Information
  const vehicles = {
    title: "Vehículos",
    items: [
      {
        name: "Automóviles",
        href: "/cotiza-tu-toyota/vehiculos-nuevos?tipo=autos",
      },
      {
        name: "Camionetas y SUV",
        href: "/cotiza-tu-toyota/vehiculos-nuevos?tipo=camionetas",
      },
      {
        name: "Pick-ups",
        href: "/cotiza-tu-toyota/vehiculos-nuevos/?tipo=Pick-Ups",
      },
      {
        name: "Híbridos",
        href: "/cotiza-tu-toyota/vehiculos-nuevos?tipo=hibridos",
      },
      {
        name: "Deportivos TGR",
        href: "/cotiza-tu-toyota/vehiculos-nuevos?tipo=deportivos",
      },
    ],
  };
  const aboutToyota = {
    title: "Acerca de Toyota",
    items: [
      {
        name: "Campañas de seguridad",
        href: "/mi-toyota/campanas-de-seguridad-y-servicios",
      },
      {
        name: "Mantenimiento Toyota",
        href: "/mi-toyota/mantenimiento",
      },
      {
        name: "Alquila tu Toyota",
        href: "https://www.kinto-mobility.com.co/kinto-share#no-back",
      },
      {
        name: "Noticias",
        href: "/noticias",
      },
      {
        name: "Toyota Gazoo Racing",
        href: "/vehiculos/deportivos-tgr",
      },
    ],
  };
  const usefulLinks = {
    title: "Enlaces Útiles",
    items: [
      {
        name: "Canal de Integridad",
        href: "https://www.canaldeintegridadtoyotacolombia.com",
      },
      // {
      //   name: "Preguntas Frecuentes",
      //   href: "/mi-toyota/servicios-conectados",
      // },
      {
        name: "PQR",
        href: "/pqrs",
      },
      {
        name: "Financia tu Toyota",
        href: "/cotiza-tu-toyota/financiacion-toyota",
      },
      {
        name: "Denuncias sobre soborno transnacional",
        href: "https://www.supersociedades.gov.co/es/web/asuntos-economicos-societarios/denuncias-soborno-transnacional",
      },
      {
        name: "Denuncias sobre Actos de corrupción",
        href: "https://www.secretariatransparencia.gov.co/observatorio-anticorrupcion/portal-anticorrupcion",
      },
    ],
  };
  const contactUs = [
    {
      name: "Cotizador",
      href: "/toyota-cotizador",
    },
    {
      name: "Contacto",
      href: "/contacto",
    },
    // {
    //   name: "WhatsApp",
    //   href: "https://wa.me/",
    // },
  ];

  // Credits
  const legalInformation = [
    {
      name: "Política de seguridad SGCS",
      href: "/legales/politica_de_seguridad_sgcs",
    },
    {
      name: "Términos y Condiciones",
      href: "/legales/terminos_y_condiciones",
    },
    {
      name: "Políticas y Privacidad",
      href: "/legales/politica_de_privacidad",
    },
    // {
    //   name: "Políticas de Seguridad",
    //   href: "/politicas-de-seguridad",
    // },
    {
      name: "PQR",
      href: "/pqrs",
    },

    // temporarily hide
    // {
    //   name: "Trabaja con Nosotros",
    //   href: "/trabaja-con-nosotros",
    // },
  ];

  // Check if in mobile view
  const isMobile = useBreakpointValue({ base: true, xl: false });

  const [accessibilityChecked, setAccessibilityChecked] = useState(true);

  return (
    <>
      <View
        backgroundColor={colors.theme.lightGray}
        padding={{ base: "2.5rem 1rem", xl: "4.5625rem 0 3.9375rem" }}
        overflow={"hidden"}
        lineHeight={"1.225rem"}
      >
        <View maxWidth="1220px" margin="0 auto" fontSize="sm">
          <Flex
            justifyContent="space-between"
            alignItems={{ base: "start", xl: "center" }}
            marginBottom="3.875rem"
            direction={{ base: "column", xl: "row" }}
          >
            {/* Heading */}
            <Collection
              type="list"
              items={heading}
              direction={{ base: "column", xl: "row" }}
              gap={{ base: "1.25rem", xl: "2rem" }}
              marginBottom={{ base: "2.5rem", xl: "0" }}
            >
              {(
                item,
                index // Added index to use as key
              ) => (
                <Flex key={item.name} gap={".5rem"} alignItems="center">
                  {" "}
                  {/* Using item.name as key */}
                  <a href={item.href} rel="noopener noreferrer">
                    <Text
                      color="#000000!important"
                      fontFamily="var(--font-toyotaDisplay)"
                      fontWeight={400}
                      fontSize={{ base: "14px", xl: "14px" }}
                      lineHeight={{ base: "19.6px", xl: "19.6px" }}
                    >
                      {item.name}
                    </Text>
                  </a>
                  {item.name === "Opciones de Privacidad" && (
                    <ToggleSwitch
                      checked={accessibilityChecked}
                      onCheckedChange={setAccessibilityChecked}
                      aria-label="Toggle accessibility"
                    />
                  )}
                </Flex>
              )}
            </Collection>
            {/* Social Medias */}
            <Collection
              type="list"
              items={socialMedias}
              direction="row"
              gap="2rem"
              marginRight={{ base: "0", xl: "25px" }}
            >
              {(social) => (
                <a
                  key={social.name}
                  href={social.href}
                  rel="noopener noreferrer"
                >
                  {" "}
                  {/* Using social.name as key */}
                  <Image
                    src={social.logo}
                    alt={social.name}
                    width={{
                      base: social.dimensions.base.width,
                      xl: social.dimensions.xl.width,
                    }}
                    height={{
                      base: social.dimensions.base.height,
                      xl: social.dimensions.xl.height,
                    }}
                  />
                </a>
              )}
            </Collection>
          </Flex>
          <Flex
            maxWidth={{ base: "100%", xl: "80%" }}
            direction={{ base: "column", xl: "row" }}
            justifyContent="space-between"
            marginBottom={{ base: "40px", xl: "6.875rem" }}
          >
            {isMobile ? (
              <Accordion.Container
                className="my-accordion"
                allowMultiple
                preventCollapse
                style={{ background: "transparent" }}
              >
                <Accordion.Item
                  borderRadius={{ base: "0" }}
                  style={{
                    borderLeft: 0,
                    borderRight: 0,
                    borderBottom: 0,
                    borderTop: "1px solid #D9D9D9",
                  }}
                >
                  <Accordion.Trigger
                    padding={"15px 0"}
                    textTransform={"UPPERCASE"}
                    fontFamily="var(--font-ToyotaType-Regular)"
                    lineHeight={{ xl: "19.6px" }}
                  >
                    {vehicles.title}
                    <Accordion.Icon />
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <Collection type="list" items={vehicles.items}>
                      {(item, index) => (
                        <Flex
                          key={item.name}
                          alignItems="center"
                          style={{ cursor: "pointer" }}
                        >
                          {" "}
                          {/* Using item.name as key */}
                          <a href={item.href} rel="noopener noreferrer">
                            <Text
                              padding={"5px 0"}
                              fontSize={"14px"}
                              lineHeight={"19.6px"}
                              fontFamily="var(--font-ToyotaType-Regular)"
                              fontWeight={400}
                              color={"#000000!important"}
                            >
                              {item.name}
                            </Text>
                          </a>
                        </Flex>
                      )}
                    </Collection>
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item
                  borderRadius={{ base: "0" }}
                  style={{
                    borderLeft: 0,
                    borderRight: 0,
                    borderBottom: 0,
                    borderTop: "1px solid #D9D9D9",
                  }}
                >
                  <Accordion.Trigger
                    padding={"15px 0"}
                    textTransform={"UPPERCASE"}
                    fontFamily="var(--font-ToyotaType-Regular)"
                    lineHeight={{ xl: "19.6px" }}
                  >
                    {aboutToyota.title}
                    <Accordion.Icon />
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <Collection type="list" items={aboutToyota.items}>
                      {(item) => (
                        <Flex
                          key={item.name}
                          alignItems="center"
                          style={{ cursor: "pointer" }}
                        >
                          {" "}
                          {/* Using item.name as key */}
                          <a href={item.href} rel="noopener noreferrer">
                            <Text
                              padding={"5px 0"}
                              fontSize={"14px"}
                              lineHeight={"19.6px"}
                              fontFamily="var(--font-ToyotaType-Regular)"
                              fontWeight={400}
                              color={"#000000!important"}
                            >
                              {item.name}
                            </Text>
                          </a>
                        </Flex>
                      )}
                    </Collection>
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item
                  borderRadius={{ base: "0" }}
                  style={{
                    borderLeft: 0,
                    borderRight: 0,
                    borderBottom: 0,
                    borderTop: "1px solid #D9D9D9",
                  }}
                >
                  <Accordion.Trigger
                    padding={"15px 0"}
                    textTransform={"UPPERCASE"}
                    fontFamily="var(--font-ToyotaType-Regular)"
                    lineHeight={{ xl: "19.6px" }}
                  >
                    {usefulLinks.title}
                    <Accordion.Icon />
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <Collection type="list" items={usefulLinks.items}>
                      {(item) => (
                        <Flex
                          key={item.name}
                          alignItems="center"
                          style={{ cursor: "pointer" }}
                        >
                          {" "}
                          {/* Using item.name as key */}
                          <a href={item.href} rel="noopener noreferrer">
                            <Text
                              padding={"5px 0"}
                              fontSize={"14px"}
                              lineHeight={"19.6px"}
                              fontFamily="var(--font-ToyotaType-Regular)"
                              fontWeight={400}
                              color={"#000000!important"}
                            >
                              {item.name}
                            </Text>
                          </a>
                        </Flex>
                      )}
                    </Collection>
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item
                  borderRadius={{ base: "0" }}
                  style={{
                    borderLeft: 0,
                    borderRight: 0,
                    borderBottom: 0,
                    borderTop: "1px solid #D9D9D9",
                  }}
                >
                  <Accordion.Trigger
                    padding={"15px 0"}
                    textTransform={"UPPERCASE"}
                    fontFamily="var(--font-ToyotaType-Regular)"
                    lineHeight={{ xl: "19.6px" }}
                  >
                    Contáctanos
                    <Accordion.Icon />
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <Collection type="list" items={contactUs}>
                      {(item) => (
                        <Flex
                          key={item.name}
                          alignItems="center"
                          style={{ cursor: "pointer" }}
                        >
                          {" "}
                          {/* Using item.name as key */}
                          <a href={item.href} rel="noopener noreferrer">
                            <Text
                              padding={"5px 0"}
                              fontSize={"14px"}
                              lineHeight={"19.6px"}
                              fontFamily="var(--font-ToyotaType-Regular)"
                              fontWeight={400}
                              color={"#000000!important"}
                            >
                              {item.name}
                            </Text>
                          </a>
                        </Flex>
                      )}
                    </Collection>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Container>
            ) : (
              // Desktop View
              <>
                <Flex direction="column" gap="xs">
                  <Text
                    fontSize="sm"
                    lineHeight="1.225rem"
                    fontFamily="var(--font-toyotaDisplay)"
                    fontWeight={400}
                    marginBottom="1rem"
                    textTransform={"uppercase"}
                    color={"#000000!important"}
                  >
                    {vehicles.title}
                  </Text>
                  <Collection type="list" items={vehicles.items}>
                    {(item) => (
                      <Flex
                        key={item.name}
                        alignItems="center"
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        {/* Using item.name as key */}
                        <a href={item.href} rel="noopener noreferrer">
                          <Text
                            padding={"5px 0"}
                            fontSize={"14px"}
                            lineHeight={"19.6px"}
                            fontFamily="var(--font-ToyotaType-Regular)"
                            fontWeight={400}
                            color={"#000000!important"}
                          >
                            {item.name}
                          </Text>
                        </a>
                      </Flex>
                    )}
                  </Collection>
                </Flex>

                <Flex direction="column" gap="xs">
                  <Text
                    fontSize="sm"
                    lineHeight="1.225rem"
                    fontFamily="var(--font-toyotaDisplay)"
                    fontWeight={400}
                    marginBottom="1rem"
                    textTransform={"uppercase"}
                    color={"#000000!important"}
                  >
                    {aboutToyota.title}
                  </Text>
                  <Collection type="list" items={aboutToyota.items}>
                    {(item) => (
                      <Flex
                        key={item.name}
                        alignItems="center"
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        {/* Using item.name as key */}
                        <a href={item.href} rel="noopener noreferrer">
                          <Text
                            padding={"5px 0"}
                            fontSize={"14px"}
                            lineHeight={"19.6px"}
                            fontFamily="var(--font-ToyotaType-Regular)"
                            fontWeight={400}
                            color={"#000000!important"}
                          >
                            {item.name}
                          </Text>
                        </a>
                      </Flex>
                    )}
                  </Collection>
                </Flex>

                <Flex direction="column" gap="xs">
                  <Text
                    fontSize="sm"
                    lineHeight="1.225rem"
                    fontFamily="var(--font-toyotaDisplay)"
                    fontWeight={400}
                    marginBottom="1rem"
                    textTransform={"uppercase"}
                    color={"#000000!important"}
                  >
                    {usefulLinks.title}
                  </Text>
                  <Collection type="list" items={usefulLinks.items}>
                    {(item) => (
                      <Flex
                        key={item.name}
                        alignItems="center"
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        {/* Using item.name as key */}
                        <a href={item.href} rel="noopener noreferrer">
                          <Text
                            padding={"5px 0"}
                            fontSize={"14px"}
                            lineHeight={"19.6px"}
                            fontFamily="var(--font-ToyotaType-Regular)"
                            fontWeight={400}
                            color={"#000000!important"}
                          >
                            {item.name}
                          </Text>
                        </a>
                      </Flex>
                    )}
                  </Collection>
                </Flex>

                <Flex direction="column" gap="xs">
                  <Text
                    fontSize="sm"
                    lineHeight="1.225rem"
                    fontFamily="var(--font-toyotaDisplay)"
                    fontWeight={400}
                    marginBottom="1rem"
                    textTransform={"uppercase"}
                    color={"#000000!important"}
                  >
                    Contáctanos
                  </Text>
                  <Collection type="list" items={contactUs}>
                    {(item) => (
                      <Flex
                        key={item.name}
                        alignItems="center"
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        {/* Using item.name as key */}
                        <a href={item.href} rel="noopener noreferrer">
                          <Text
                            padding={"5px 0"}
                            fontSize={"14px"}
                            lineHeight={"19.6px"}
                            fontFamily="var(--font-ToyotaType-Regular)"
                            fontWeight={400}
                            color={"#000000!important"}
                          >
                            {item.name}
                          </Text>
                        </a>
                      </Flex>
                    )}
                  </Collection>
                </Flex>
              </>
            )}
          </Flex>

          <Flex
            width={"100%"}
            paddingTop="2.5rem"
            direction={{ base: "column", xl: "row" }}
            justifyContent={{ base: "space-between", xl: "center" }}
            alignItems={{ base: "center" }}
            gap={{ base: "2rem", xl: "0" }}
          >
            <Flex
              alignItems={{ base: "center", xl: "center" }}
              direction={{ base: "column" }}
              gap=".9375rem"
            >
              <Image
                src="/images/Logo.png"
                alt="Toyota"
                width="135px"
                height="auto"
              />
              <Flex
                display={{ xl: "flex" }}
                gap={{ xl: "1rem" }}
                fontSize={{ base: "xs", xl: "ss" }}
                lineHeight={"1.225rem"}
                fontFamily="var(--font-ToyotaType-Regular)"
                fontWeight={400}
                color={"#000000!important"}
                textAlign={{ base: "center", xl: "start" }}
              >
                <span>© 2025 Automotores Toyota Colombia S.A.S.</span>
                <span>Todos los derechos reservados.</span>
                <span>
                  La información aquí presente se aplica solo a vehículos en
                  Colombia.
                </span>
              </Flex>
              <Collection
                type="list"
                items={legalInformation}
                direction="row"
                justifyContent={{ base: "center" }}
                fontSize={{ base: "xs", xl: "ss" }}
                wrap="wrap"
                gap={{ base: "10px", xl: ".8125rem" }}
              >
                {(legal, index) => (
                  <Flex key={legal.name} alignItems="center">
                    {" "}
                    {/* Wrapped in View with key */}
                    <a href={legal.href} rel="noopener noreferrer">
                      <Text
                        color="#000000!important"
                        fontFamily="var(--font-ToyotaType-Regular)"
                        fontWeight={400}
                      >
                        {legal.name}
                      </Text>
                    </a>
                    {index < legalInformation.length - 1 && (
                      <Text
                        width="0.5px"
                        color="#000000!important"
                        fontFamily="var(--font-ToyotaType-Regular)"
                        fontWeight={400}
                      >
                        |
                      </Text>
                    )}
                  </Flex>
                )}
              </Collection>
            </Flex>
          </Flex>
        </View>
      </View>
    </>
  );
};

export default Footer;
