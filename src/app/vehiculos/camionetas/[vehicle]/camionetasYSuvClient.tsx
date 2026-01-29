"use client";

import "@aws-amplify/ui-react/styles.css";
import SectionTitle from "@/components/Layout/SectionTitle/SectionTitle";
import Guarantees from "@/components/Guarantees/Guarantees";
import MaterialCards, {
  MaterialCard,
} from "@/components/MaterialCards/MaterialCards";
import Container from "@/components/Layout/Container/Container";
import { colors } from "@/theme/colors";
import VehicleCardList from "@/components/CardsList/VehiclesCardList/VehiclesCardList";
import BannerWithVideo, {
  BannerFeature,
} from "@/components/Banner/BannerWithVideo";
import {
  SliderSection,
  SliderSectionProps,
  SliderSectionTheme,
} from "@/components/SliderSection/SliderSection";
import {
  ImageGalleryPreview,
  ImageGalleryPreviewProps,
} from "@/components/Gallery/ImageGalleryPreview/ImageGalleryPreview";
import { ColorOption } from "@/types";
import {
  Flex,
  Heading,
  Link,
  Text,
  useBreakpointValue,
  View,
} from "@aws-amplify/ui-react";
import { colors as globalsColors } from "@/theme/colors";
import "./page.css";
import Button from "@/components/Layout/Button/Button";
import { VehicleNavigation } from "@/components/VehicleNavigation/VehicleNavigation";
import Gallery360 from "@/components/Gallery/Gallery360/Gallery360";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicle } from "./queries";
import { BannerFeatures } from "@/components/BannerFeatures/BannerFeatures";

export interface VehicleData {
  id: string;
  name: string;
  slug: string;
  speeds?: string;
  traction?: string;
  technology?: string;
  engine?: string;
  yearModel?: string;
  passengers?: number;
  doors?: number;
  orderDate?: string;
  concessionaire?: {
    name: string;
    office: {
      name: string;
      location: string;
      address: string;
      hours: {
        items: {
          name: string;
          start_hour: string;
          end_hour: string;
        }[];
      };
      galleriesByOffice: {
        items: {
          id: string;
          name: string;
          gallery: {
            name: string;
            colorsByModel: {
              items: {
                color: {
                  name: string;
                };
                name: string;
              }[];
            };
          };
        }[];
      };
    };
  };
  category?: {
    shipmentDate: string;
  };
  customer?: {
    id: string;
    customer: boolean;
    vendor: boolean;
    distributor: boolean;
    postulant: boolean;
    phone: string;
    email: string;
    externalId: string;
    firstName: string;
    lastName: string;
    priceList: {
      name: string;
    };
  };
  models?: {
    items: {
      name: string;
      modelsByYear: {
        items: {
          name: string;
          technology: string;
        }[];
      };
      documentsByModel: {
        items: {
          document: {
            name: string;
            description: string;
          };
        }[];
      };
      warrantiesByModel: {
        items: {
          warranty: {
            name: string;
          };
        }[];
      };
    }[];
  };
}

const bannerFeatures: BannerFeature[] = [
  {
    icon: "/images/abs.svg",
    label: "SISTEMA ANTIBLOQUEO DE FRENOS",
    available: true,
  },
  {
    icon: "/images/estability.svg",
    label: "CONTROL ELECTRÓNICO DE ESTABILIDAD",
    available: true,
  },
  {
    icon: "/images/front-alert.svg",
    label: "ALERTA DE COLISIÓN FRONTAL",
    available: false,
  },
  {
    icon: "/images/basy-seat.svg",
    label: "ISOFIX\nSISTEMA DE SUJECIÓN INFANTIL",
    available: true,
  },
  {
    icon: "/images/air-bags.svg",
    label: "BOLSAS DE AIRE (7)",
    available: true,
  },
];

const items: MaterialCard[] = [
  {
    title: "Ficha Técnica",
    imageSrc: "/images/icons/paper.svg",
    alt: "paper",
    bgColor: colors.theme.red,
    txtColor: colors.theme.white,
  },
  {
    title: "Manual del buen conductor",
    imageSrc: "/images/icons/car.svg",
    alt: "car",
    bgColor: colors.theme.white,
    txtColor: colors.theme.black,
  },
  {
    title: "Cobertura extendida T10",
    imageSrc: "/images/icons/volante.svg",
    alt: "Cobertura extendida T10",
    bgColor: colors.theme.black,
    txtColor: colors.theme.white,
    downloadUrl: "/images/pdf/cobertura-extendida-t10.pdf",
  },
];
export default function CamionetasYSuvClient({ slug }: { slug: string }) {
  const {
    data: vehicle,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["vehicle"],
    queryFn: slug ? () => fetchVehicle(slug) : undefined,
    enabled: !!slug,
  });

  const dummyPlacesList = [
    { label: "Sedán", value: "sedan" },
    { label: "SUV", value: "suv" },
    { label: "Pickup", value: "pickup" },
  ];

  const dummyColorsList: ColorOption[] = [
    {
      id: "1",
      iconPath: "/images/vehicle-colors/hd/black-mc.png",
      imagePath: [
        "/images/fortuner/versiones/srv-2-8-diesel-4-x-4-at/attitude-black.png",
      ],
      name: "Attitude Black",
      priority: 1,
    },
    {
      id: "2",
      iconPath: "/images/vehicle-colors/hd/gray-me.png",
      imagePath: [
        "/images/fortuner/versiones/srv-2-8-diesel-4-x-4-at/gris-met.png",
      ],
      name: "Grey ME",
      priority: 2,
    },
    {
      id: "3",
      iconPath: "/images/vehicle-colors/hd/platinum-white-pearl.png",
      imagePath: [
        "/images/fortuner/versiones/srv-2-8-diesel-4-x-4-at/blanco-perla.png",
      ],
      name: "Platinum White Pearl",
      priority: 3,
    },
    {
      id: "4",
      iconPath: "/images/vehicle-colors/hd/silver-mm.png",
      imagePath: [
        "/images/fortuner/versiones/srv-2-8-diesel-4-x-4-at/plata.png",
      ],
      name: "Silver ME",
      priority: 4,
    },
  ];

  const handleExploreClick = () => {
    console.log("Explorar el interior del automóvil");
  };

  const vehicles = vehicle?.models
    ? vehicle?.models
    : [
        {
          imageSrc:
            "/images/fortuner/versiones/srv-2-8-diesel-4-x-2-at/super-blanco.png",
          title: "Fortuner SR 2.8 Diesél 4x2 AT",
          modelName: "",
          price: "$299.000.000",
          description:
            "La Fortuner Diésel combina un rendimiento robusto con una estructura duradera, perfecta para aventuras exigentes.",
          buttonText: "Explorar esta versión",
          link: "/vehiculos/camionetas/fortuner/version/sr-2-8-diesel-4-x-2-at",
        },
        {
          imageSrc:
            "/images/fortuner/versiones/srv-2-8-diesel-4-x-2-at/attitude-black.png",
          title: "Fortuner SRV 2.8 Diésel 4x2 AT",
          modelName: "",
          price: "$299.000.000",
          description:
            "La Fortuner Diésel combina un rendimiento robusto con una estructura duradera, perfecta para aventuras exigentes.",
          buttonText: "Explorar esta versión",
          link: "/vehiculos/camionetas/fortuner/version/srv-2-8-diesel-4-x-2-at",
        },
        {
          imageSrc:
            "/images/fortuner/versiones/srv-2-7-gasolina-4-x-2-at/plata.png",
          title: "Fortuner SRV 2.7 Gasolina 4x2 AT",
          modelName: "",
          price: "$299.000.000",
          description:
            "Con la Fortuner Gasolina, disfruta de una conducción segura y versátil, equipada con tecnología avanzada y sistemas de seguridad.",
          buttonText: "Explorar esta versión",
          link: "/vehiculos/camionetas/fortuner/version/srv-2-7-gasolina-4-x-2-at",
        },
        {
          imageSrc:
            "/images/fortuner/versiones/srv-2-8-diesel-4-x-4-at/blanco-perla.png",
          title: "Fortuner SR 2.8 Diésel 4x4 AT",
          modelName: "",
          price: "$299.000.000",
          description:
            "La Fortuner Diésel combina un rendimiento robusto con una estructura duradera, perfecta para aventuras exigentes.",
          buttonText: "Explorar esta versión",
          link: "/vehiculos/camionetas/fortuner/version/sr-2-8-diesel-4-x-4-at",
        },
        {
          imageSrc:
            "/images/fortuner/versiones/srv-2-8-diesel-4-x-4-at/gris-met.png",
          title: "Fortuner SRV 2.8 Diésel 4x4 AT",
          modelName: "",
          price: "$299.000.000",
          description:
            "La Fortuner Diésel combina un rendimiento robusto con una estructura duradera, perfecta para aventuras exigentes.",
          buttonText: "Explorar esta versión",
          link: "/vehiculos/camionetas/fortuner/version/srv-2-8-diesel-4-x-4-at",
        },
      ];
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const [galleryCurrentColor, setGalleryCurrentColor] =
    useState<ColorOption | null>(dummyColorsList[0] || null);

  const galleryData: ImageGalleryPreviewProps = {
    title: isMobile ? "Galería de Imágenes" : "Siente la pasión en cada curva",
    description: isMobile
      ? "Siente la pasión en cada curva"
      : "Galería de Imágenes",
    selectStyles: {
      padding: "9px 24px",
      width: "230px", // or whatever size you need
      fontSize: "1rem",
      height: "48px",
    },
    galleryLink: vehicle?.name
      ? `/camionetas/${vehicle?.name}/galeria`
      : "/vehiculos/camionetas/fortuner/galeria",
    tabs: vehicle?.gallery?.tabs
      ? vehicle.gallery.tabs
      : [
          {
            title: "Exterior",
            items: [
              {
                src: "/images/fortuner/exteriores/FORTUNER8.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER10.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER11.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER14.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER-1.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER-3.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER_7R37054.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER_7R37066.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER_7R37074.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER_7R37078.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER_7R37080.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER_7R37086.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER_7R37090.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER_7R37229.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER_7R37246.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER_7R37255.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER_7R37260.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER_7R37274.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/exteriores/FORTUNER_7R37276.jpg",
                alt: "Título de la imagen",
              },
            ],
          },
          {
            title: "Interior",
            items: [
              {
                src: "/images/fortuner/interiores/FORTUNER5.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/interiores/FORTUNER6.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/interiores/FORTUNER7.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/interiores/FORTUNER-4.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/interiores/FORTUNER_7R37104.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/interiores/FORTUNER_7R37126.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/interiores/FORTUNER_7R37130.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/interiores/FORTUNER_7R37141.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/interiores/FORTUNER_7R37146.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/interiores/FORTUNER_7R37149.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/interiores/FORTUNER_7R37163.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/interiores/FORTUNER_7R37176.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/interiores/FORTUNER_7R37223.jpg",
                alt: "Título de la imagen",
              },
              {
                src: "/images/fortuner/interiores/FORTUNER_7R37226.jpg",
                alt: "Título de la imagen",
              },
            ],
          },
        ],
  };

  const sliderData: SliderSectionProps = {
    theme: SliderSectionTheme.Dark,
    title: isMobile
      ? "Diferenciales"
      : vehicle?.name
        ? `Razones para tener una ${vehicle.name}`
        : "Razones para tener una Fortuner",
    description: isMobile ? "Razones para tener una Fortuner" : "Diferenciales",
    showImageReference: true, // Enable the reference text
    showButton: true, // Add this line to show the CTA buttons
    items: [
      {
        image: {
          src: "/images/fortuner/servicios-conectados.png",
          alt: "Ejemplo 1",
        },
        title: "Servicios conectados",
        description:
          "Accede a toda la información de tu vehículo en la app de Toyota. Control, seguridad y conectividad en un solo lugar. *",
      },
      {
        image: {
          src: "/images/fortuner/FORTUNER-3.jpg",
          alt: "Ejemplo 2",
        },
        title: "Capacidad de pasajeros",
        description:
          "Capacidad para 7 pasajeros, ideal para familias grandes o grupos, con amplio espacio interior.",
      },
      {
        image: {
          src: "/images/fortuner/FORTUNER5.jpg",
          alt: "Ejemplo 3",
        },
        title: "Conectividad",
        description:
          "Incluye conectividad para Apple CarPlay y Android Auto, mejorando la experiencia de manejo.",
      },
    ],
  };

  useEffect(() => {
    if (
      vehicle?.concessionaire?.office.galleriesByOffice?.items[0]?.gallery
        ?.colorsByModel?.items[0]
    ) {
      const colorItem =
        vehicle.concessionaire.office.galleriesByOffice.items[0].gallery
          .colorsByModel.items[0];
      setGalleryCurrentColor({
        id: colorItem.color.name,
        iconPath: `/images/vehicle-colors/hd/${colorItem.color.name
          .replace(/([a-z])([A-Z])/g, "$1-$2")
          .replace(/\s+/g, "-")
          .toLowerCase()}.png`,
        imagePath: [colorItem.name],
        name: colorItem.color.name,
        priority: 1,
      });
    }
  }, [vehicle]);

  return (
    <View position={isMobile ? "relative" : "static"}>
      {isMobile ? <VehicleNavigation /> : null}
      <View position="relative">
        <BannerWithVideo
          slides={[
            {
              imageMobile: "/images/fortuner/FORTUNER10.jpg",
              imageDesktop: "/images/fortuner/FORTUNER10.jpg",
              alt: "Fortuner",
            },
          ]}
          features={bannerFeatures}
          title={vehicle?.name || "Fortuner"}
          price={vehicle?.price || "Desde $299.000.000*"}
        />
      </View>
      <Flex
        className="shortcuts"
        width="100%"
        style={{ zIndex: 10 }}
        backgroundColor={globalsColors.theme.black}
        justifyContent={"space-between"}
        position={"sticky"}
        top={{ base: "54.83px", xl: "60px" }}
        left="0px"
      >
        <View width={{ base: "100%", xl: "500px" }} fontSize={"sm"}>
          <Link href="/cotiza-tu-toyota/vehiculos-nuevos">
            <Button
              color="deepred"
              padding=".75rem 4.375rem"
              style={{
                width: "188px",
                borderRadius: "0",
                lineHeight: "1.225rem",
                border: "none",
                height: "45px",
                fontFamily: "var(--font-toyotaDisplay)",
              }}
            >
              Cotizar
            </Button>
          </Link>

          <Link href="/vehiculos/camionetas/fortuner/galeria">
            <Button
              color="black"
              padding=".75rem 2.75rem"
              style={{
                width: "25%",
                borderRadius: "0",
                lineHeight: "1.225rem",
                border: "none",
                fontFamily: "var(--font-ToyotaType-Regular)",
              }}
            >
              Galería
            </Button>
          </Link>
        </View>
        {!isMobile && (
          <Link display={"flex"}>
            <Button
              color="black"
              padding={"0 2.5rem"}
              style={{
                borderRadius: "0",
                fontSize: "1.125rem",
                lineHeight: "1.225rem",
                border: "none",
              }}
            >
              Información Ficha Técnica
            </Button>
          </Link>
        )}
      </Flex>
      <Container padding={{ base: "3rem 0", xl: "5.125rem 0" }}>
        {useBreakpointValue({ base: true, medium: false }) ? (
          <BannerFeatures features={bannerFeatures} />
        ) : (
          <></>
        )}

        {isMobile ? (
          <Text
            fontSize={{ base: "ml", medium: "ml" }}
            lineHeight={{ base: "normal" }}
            textAlign={"center"}
            width={"87%"}
            margin={"0 auto"}
            marginTop={{ base: "40px", xl: "" }}
            marginBottom={"4.125rem"}
            style={{
              textWrap: "pretty",
            }}
          >
            Su diseño auténtico, delineado por finas formas y detalles, logra un
            balance perfecto entre lo elegante y funcional. Además, ofrece
            suficiente espacio para adaptarse a tus necesidades
          </Text>
        ) : (
          <Text
            fontSize={{ xl: "lg" }}
            lineHeight={{ xl: "130%" }}
            textAlign={"center"}
            marginBottom={"5.063rem"}
          >
            Su diseño auténtico, delineado por finas formas y detalles, logra un
            balance perfecto entre lo elegante y funcional. Además, ofrece
            suficiente espacio para adaptarse a tus necesidades
          </Text>
        )}
        <SectionTitle
          title={vehicle?.name || "Fortuner"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"La leyenda, de regreso al origen"}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
        <Gallery360
          carImages={
            dummyColorsList.find(
              (color) => color.id === galleryCurrentColor?.id
            )?.imagePath || []
          }
          placesList={dummyPlacesList}
          colorsList={dummyColorsList}
          detailsPage={true}
          onClick={handleExploreClick}
          onColorChange={setGalleryCurrentColor}
        />
      </Container>
      <Container padding={{ base: "0", xl: "0" }}>
        <ImageGalleryPreview {...galleryData} />
      </Container>
      <SliderSection {...sliderData} />;
      <Container
        padding={{ base: "2.3125rem 0 3.5rem", xl: "5.0625rem 0 7rem" }}
      >
        <SectionTitle
          title={
            "Su diseño auténtico, delineado por finas formas y detalles, logra un balance perfecto entre lo elegante y funcional. Además, ofrece suficiente espacio para adaptarse a tus necesidades"
          }
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Encuentra tu versión"}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
        <VehicleCardList vehicles={vehicles} slug="slug" />
      </Container>
      <Container
        backgroundColor={colors.theme.blueSecondary}
        padding={{ base: "2.375rem 0 4.125rem", xl: "3.625rem 0 5rem" }}
      >
        <SectionTitle
          title={vehicle?.name || "Fortuner"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Materiales Descargables"}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
        <MaterialCards items={items} />
      </Container>
      <Container
        padding={{ base: "3rem 0 5.25rem", xl: "3.06rem 0 7.3125rem" }}
      >
        <SectionTitle
          title={"Garantía"}
          titleFontSize={{ base: "sm", xl: "md" }}
          subtitle={"Beneficios de tener un Toyota"}
          subtitleFontSize={{ base: "lg", xl: "xxxxl" }}
        />
        <Guarantees />

        <View paddingTop={{ base: "40px", xl: "107px" }}>
          <View
            style={{ borderTop: "1px solid #E0E0E0" }}
            paddingTop={{ base: "40px", xl: "107px" }}
            paddingRight={{ base: "0", xl: "155px" }}
            paddingLeft={{ base: "0", xl: "155px" }}
          >
            <Flex direction={"column"} gap={{ base: "24px", xl: "24px" }}>
              <Heading
                level={2}
                fontFamily={"var(--font-toyotaDisplay)"}
                fontSize={{ base: "14px", xl: "22px" }}
                fontStyle={"normal"}
                fontWeight={{ base: "400", xl: "700" }}
                lineHeight={{ base: "140%", xl: "127.271%" }}
              >
                Legales
              </Heading>
              <Flex direction={"column"} gap={{ base: "14.4px", xl: "30.4px" }}>
                <Text
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  fontSize={{ base: "12px", xl: "16px" }}
                  fontStyle={"normal"}
                  fontWeight={"400"}
                  lineHeight={{ base: "normal", xl: "30.4px" }}
                >
                  *Imágenes de referencia. Precio sugerido al público por
                  Automotores Toyota Colombia S.A.S a nivel nacional. Para mayor
                  información dirija su consulta al concesionario autorizado de
                  su preferencia. Estos valores incluyen IVA, Imp. Consumo e
                  impuestos internos vigentes, aplicables de acuerdo con el tipo
                  de vehículo. Los precios pueden variar según el concesionario
                  de la Red Autorizada escogido. Automotores Toyota Colombia
                  S.A.S no vende sus productos al público de manera directa y
                  por ello, los precios indicados resultan sugeridos al público
                  en los Concesionarios Oficiales.
                </Text>

                <Text
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  fontSize={{ base: "12px", xl: "16px" }}
                  fontStyle={"normal"}
                  fontWeight={"400"}
                  lineHeight={{ base: "normal", xl: "30.4px" }}
                >
                  *La Garantía Toyota aplica únicamente para vehículos nuevos
                  importados por Automotores Toyota Colombia S.A.S. (“ATC”),
                  comercializados y facturados por los concesionarios de la red
                  de ATC. La garantía tiene una cobertura de 5 años contados a
                  partir de la fecha de entrega del vehículo al cliente o
                  120.000 km., lo primero que ocurra. Los primeros 3 años y/o
                  los 100.000 km. iniciales corresponden a la garantía de
                  fábrica, los siguientes 2 años y/o los 20.000 km. adicionales,
                  corresponden a la garantía suplementaria ofrecida por ATC.
                </Text>

                <Text
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  fontSize={{ base: "12px", xl: "16px" }}
                  fontStyle={"normal"}
                  fontWeight={"400"}
                  lineHeight={{ base: "normal", xl: "30.4px" }}
                >
                  ** Verificá la compatibilidad de tu modelo con el fabricante.
                </Text>
              </Flex>
            </Flex>
          </View>
        </View>
      </Container>
    </View>
  );
}
