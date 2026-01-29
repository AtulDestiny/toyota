import Button from "@/components/Layout/Button/Button";
import {
  Button as AmplifyButton,
  Flex,
  Heading,
  Image,
  Text,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";
import { CSSProperties, useState } from "react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./FlotasYVentasDisponibles.css";
import { ModalStepperCopy } from "@/components/ModalStepper";

type VehicleCategory =
  | "Camionetas"
  | "Autos"
  | "Pick Ups"
  | "Híbridos"
  | "Deportivos TGR";

export enum VehicleCardTheme {
  "dark" = "dark",
  "light" = "light",
}

export interface VehicleCardProps {
  id: number;
  index?: number;
  theme?: VehicleCardTheme;
  name: string;
  year: string;
  type: string;
  price: string;
  description: string;
  image: string;
  style?: CSSProperties;
  className?: string;
}

const vehiclesData = {
  Camionetas: [
    {
      id: 1,
      theme: VehicleCardTheme.dark,
      name: "Corolla Cross",
      year: "2026",
      type: "Híbrido",
      price: "$198.500.000 COP",
      description: "Carga tu próxima aventura",
      image: "/images/flotasyventas_CorollaCross.png",
      onMoreInfo: () => console.log("More info about", "Corolla Cross"),
    },
    {
      id: 2,
      theme: VehicleCardTheme.dark,
      name: "Fortuner",
      year: "2026",
      type: "Diésel",
      price: "$230.500.000 COP",
      description: "Tu mejor inversión marcha sobre ruedas",
      image: "/images/flotasyventas_fortuner.png",
      onMoreInfo: () => console.log("More info about", "Rav 4"),
    },
    {
      id: 3,
      theme: VehicleCardTheme.dark,
      name: "Hilux",
      year: "2026",
      type: "Gasolina / Diésel",
      price: "$300.500.000 COP",
      description: "Diseñada para cualquier terreno",
      image: "/images/flotasyventas_hilux.png",
      onMoreInfo: () => console.log("More info about", "Rav 4"),
    },
    {
      id: 4,
      theme: VehicleCardTheme.dark,
      name: "Land cruiser 79",
      year: "2025",
      type: "Gasolina",
      price: "$180.500.000 COP",
      description: "Eficiencia y elegancia en cada trayecto",
      image: "/images/flotasyventas_LC79.png",
      onMoreInfo: () => console.log("More info about", "Rav 4"),
    },
    {
      id: 5,
      theme: VehicleCardTheme.dark,
      name: "Yaris Cross",
      year: "2025",
      type: "Híbrido",
      price: "$300.500.000 COP",
      description: "Diseñada para cualquier terreno",
      image: "/images/flotasyventas_yaris-cross.png",
      onMoreInfo: () => console.log("More info about", "Rav 4"),
    },
    {
      id: 6,
      theme: VehicleCardTheme.dark,
      name: "Yaris",
      year: "2026",
      type: "Gasolina",
      price: "$180.500.000 COP",
      description: "Eficiencia y elegancia en cada trayecto",
      image: "/images/seleccion-toyota-jun-Yaris.png",
      onMoreInfo: () => console.log("More info about", "Rav 4"),
    },
  ],
  Autos: [],
  "Pick Ups": [],
  Híbridos: [],
  "Deportivos TGR": [],
};

export const FlotasYVentasDisponibles = () => {
  const [tab] = useState<VehicleCategory>("Camionetas");
  const [vehicles] = useState<VehicleCardProps[]>(
    vehiclesData[tab].map((vehicle) => ({
      ...vehicle,
      onMoreInfo: () => setIsOpen(true), // ✅
    }))
  );
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRedirect = () => {
    console.log("Redirecting...");
    setIsOpen(false);
  };

  const totalPages = vehicles.length;

  return (
    <View
      className="vehicles-tabs"
      padding={{ base: "2rem 1rem", xl: "65.8px 0 68px 0" }}
    >
      {isOpen && (
        <ModalStepperCopy
          isOpen={isOpen}
          onClose={handleClose}
          onRedirect={handleRedirect}
          model="Corolla Cross"
          version="1.8 XEi CVT"
          amplifyConfig={
            {
              // Aquí iría la configuración de Amplify si la necesitas
            }
          }
        />
      )}
      <Flex
        direction={{ base: "column" }}
        gap={{ base: "0.63rem" }}
        alignItems={{ xl: "center" }}
        paddingBottom={{ base: "2rem", xl: "3.56rem" }}
      >
        <Text
          fontFamily="var(--font-ToyotaType-Regular)"
          fontSize={{ base: "0.875rem", xl: "18px" }}
          lineHeight={{ base: "1.225rem", xl: "100%" }}
          textAlign={{ base: "left", xl: "center" }}
          fontWeight={{ base: "400", xl: "400" }}
          color={{ base: "black", xl: "black" }}
        >
          Flotas y Ventas Corporativas
        </Text>

        <Heading
          level={2}
          fontFamily="var(--font-ToyotaType-Regular)"
          fontSize={{ base: "2rem", xl: "56px" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "130%", xl: "110%" }}
          color={{ base: "black", xl: "black" }}
          textAlign={{ base: "left", xl: "center" }}
          letterSpacing={{ base: "normal", xl: "-2px" }}
        >
          Vehículos Disponibles
        </Heading>
      </Flex>

      <Swiper
        style={{ maxWidth: "85.9375rem", margin: "0 auto", gap: "20px" }}
        loop={true}
        slidesPerView={"auto"}
        spaceBetween={20}
        breakpoints={{
          1250: {
            slidesPerView: "auto",
            spaceBetween: 20,
          },
          1331: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        navigation={{
          nextEl: ".vehicles-tabs-next",
          prevEl: ".vehicles-tabs-prev",
        }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
        modules={[Navigation]}
      >
        {vehicles.map((vehicle, i) => (
          <SwiperSlide key={vehicle.id} className="vehicles-slide">
            <VehicleCard {...vehicle} index={i} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Text
        fontFamily={{
          base: "var(--font-ToyotaType-Regular)",
        }}
        fontSize={{ base: "0.5625rem", xl: "0.75rem" }}
        fontStyle={{ base: "normal", xl: "normal" }}
        fontWeight={{ base: "400", xl: "400" }}
        lineHeight={{ base: "normal", xl: "100%" }}
        marginTop={{ base: "1.5rem", xl: "2rem" }}
        textAlign={{ base: "left", xl: "center" }}
        height={"17px"}
      >
        *Aplica Términos y condiciones *Las imágenes del vehículo en referencia
        pueden variar del modelo actual.
      </Text>

      {vehicles.length > 0 && (
        <View>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
            maxWidth={{ base: "21.625rem", xl: "max-content" }}
            gap={{ xl: "8.75rem" }}
            margin={{ base: "2rem auto 0", xl: "2rem auto 0" }}
          >
            <AmplifyButton
              className="vehicles-tabs-prev arrowCustom arrowCustom--prev"
              color={"transparent"}
              padding={"0"}
              width={"3.4375rem"}
              height={"1.875rem"}
            >
              <Image
                src="/images/arrow-simple-prev.svg"
                alt="Arrow prev"
                width={"1.3125rem"}
                height={".8125rem"}
              />
            </AmplifyButton>
            <Text
              fontSize={"18px"}
              fontWeight={400}
              fontFamily="var(--font-ToyotaType-Regular)"
              lineHeight={"100%"}
              letterSpacing={"0"}
              width={"auto"}
              minWidth={"80px"}
              textAlign={"center"}
              whiteSpace={"nowrap"}
            >
              {currentSlide} de {totalPages}
            </Text>
            <AmplifyButton
              className="vehicles-tabs-next arrowCustom arrowCustom--next"
              color={"transparent"}
              padding={"0"}
              width={"3.4375rem"}
              height={"1.875rem"}
            >
              <Image
                src="/images/arrow-simple-next.svg"
                alt="Arrow next"
                width={"1.3125rem"}
                height={".8125rem"}
              />
            </AmplifyButton>
          </Flex>
        </View>
      )}
    </View>
  );
};

export default FlotasYVentasDisponibles;

export interface VehicleCardProps {
  image: string;
  name: string;
  year: string;
  type: string;
  onMoreInfo: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  image,
  name,
  year,
  type,
  onMoreInfo,
}) => {
  return (
    <Flex
      direction={{ base: "column" }}
      padding={{ base: "1.25rem .9375rem ", xl: "1.875rem 4.2188rem" }}
      borderRadius={{ base: "0.5rem" }}
      backgroundColor={{ base: "var(--Gris-claro, #F6F6F6)" }}
      width={{ base: "15.875rem", xl: "27.8125rem" }}
    >
      <Image
        src={image}
        alt={name}
        height={{ base: "130px", xl: "239px" }}
        marginBottom={{ base: "5.4px" }}
        aspectRatio={{ base: "310 / 239" }}
        objectFit="cover"
      />

      <Flex
        direction={{ base: "column" }}
        paddingBottom={{ base: ".9375rem", xl: "32px" }}
        marginBottom={{ base: "0rem" }}
        gap={{ base: ".5rem" }}
        // style={{ borderBottom: "1px solid rgba(88, 89, 91, 0.4)" }} // temporary hide this
      >
        <Heading
          level={3}
          fontFamily={{ base: "var(--font-ToyotaType-Regular)" }}
          fontSize={{ base: "1.375rem" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "normal" }}
          color={"#000000"}
        >
          {name}
        </Heading>
        <Text
          fontFamily={{ base: "var(--font-toyotaDisplay)" }}
          fontSize={{ base: "0.875rem" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "140%" }}
        >{`${year} | ${type}`}</Text>
      </Flex>
      {/* <View marginTop={{ base: "auto" }} alignSelf={"center"}> temporary hide this 
        <AmplifyButton
          fontSize={{ base: "0.875rem" }}
          fontWeight={{ base: "500" }}
          lineHeight={{ base: "1.25rem" }}
          letterSpacing={{ base: "0.00625rem" }}
          height={{ base: "40px", xl: "100%" }}
          padding={{ base: "0.625rem 1.5rem" }}
          backgroundColor={{ base: "var(--Gris-claro, #F6F6F6)" }}
          borderRadius={{ base: "6.25rem" }}
          border={{ base: "1px solid var(--Negro-principal, #000)" }}
          marginTop={{ xl: "12px" }}
          // onClick={onMoreInfo}
          onClick={onMoreInfo}
        >
          Obtener más información
        </AmplifyButton>
      </View> */}
    </Flex>
  );
};
