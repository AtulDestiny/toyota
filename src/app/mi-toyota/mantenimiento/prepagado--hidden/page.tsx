"use client";

import React from "react";
import {
  Image,
  useBreakpointValue,
  View,
  Button as AmplifyButton,
  Flex,
  Grid,
  Heading,
  Text,
} from "@aws-amplify/ui-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./swiper.css";

type Image = {
  src: {
    mobile: string;
    desktop: string;
  };
  alt: string;
};

type Program = {
  icon: {
    src: string;
    alt: string;
  };
  subtitle: string;
  title: {
    text: string;
    bold: boolean;
  }[];
  mainImage: Image;
  discount: number;
  productImages: Image;
  legal: string;
};

const programs: Program[] = [
  {
    icon: {
      src: "/svgs/exclamation.svg",
      alt: "Icono de advertencia",
    },
    subtitle: "Si no eres parte de nuestro programa",
    title: [
      {
        text: "Adquiere",
        bold: true,
      },
      {
        text: "nuestro programa de mantenimiento y aprovecha",
        bold: false,
      },
    ],
    mainImage: {
      src: {
        mobile: "/images/mantenimiento-prepagado-adquiere--mobile.png",
        desktop: "/images/mantenimiento-prepagado-adquiere--desktop.png",
      },
      alt: "Sigue en movimiento",
    },
    discount: 30,
    productImages: {
      src: {
        mobile: "/images/mantenimiento-prepagado-products--mobile.png",
        desktop: "/images/mantenimiento-prepagado-products--desktop.webp",
      },
      alt: "Productos",
    },
    legal:
      "“*Imágenes de referencia. *Disponible para todos los vehículos comercializados por los concesionarios autorizados por Automotores Toyota Colombia en el territorio nacional. Vigencia del 03 de junio hasta el 31 de diciembre de 2025. Campaña exclusiva para clientes Toyota con Mantenimiento Planeado Toyota vencido o que no cuenten con ningún plan de fidelización ofrecido por la marca. Descuento de *hasta el 30% sobre el valor en lista de los repuestos seleccionados en esta campaña: amortiguadores (30%) de descuento, plumillas (30%) de descuento, bandas de frenos (25%) de descuento, pastillas de frenos traseras (25%) de descuento, pastillas de frenos delanteras (25%) de descuento. El descuento no es acumulable con otras ofertas y referencias, será otorgado por única vez por la compra del “programa Mantenimiento Prepagado Toyota” y, se hace efectivo al momento de la compra durante la vigencia de la campaña y será descontado del valor total de la factura. El valor del descuento es con impuestos incluidos (IVA e IMPOCONSUMO). El plan de Mantenimiento Prepagado Toyota y los descuentos especiales en Repuestos Genuinos Toyota de la campaña podrán adquirirse en los Concesionarios autorizados a nivel nacional por la marca durante la vigencia de esta campaña. Disponibilidad de los repuestos sujeta a existencia de inventario en cada concesionario. *Consulta con tu asesor de servicio en el concesionario de tu preferencia las condiciones del programa Mantenimiento Prepagado Toyota. * El costo adicional de la de la mano de obra puede variar de acuerdo con las condiciones establecidas por cada concesionario”.",
  },
  {
    icon: {
      src: "/svgs/exclamation.svg",
      alt: "Icono de advertencia",
    },
    subtitle: "Si ya eres parte de nuestro programa",
    title: [
      {
        text: "Realiza",
        bold: true,
      },
      {
        text: "tu mantenimiento y aprovecha",
        bold: false,
      },
    ],
    mainImage: {
      src: {
        mobile: "/images/mantenimiento-prepagado-realiza--mobile.png",
        desktop: "/images/mantenimiento-prepagado-realiza--desktop.png",
      },
      alt: "Sigue en movimiento",
    },
    discount: 30,
    productImages: {
      src: {
        mobile: "/images/mantenimiento-prepagado-products--mobile.png",
        desktop: "/images/mantenimiento-prepagado-products--desktop.webp",
      },
      alt: "Productos",
    },
    legal:
      "“*Imágenes de referencia. *Disponible para todos los vehículos comercializados por los concesionarios autorizados por Automotores Toyota Colombia en el territorio nacional. Vigencia del 03 de junio hasta el 31 de diciembre de 2025. Campaña exclusiva para clientes Toyota con Mantenimiento Prepagado Toyota vigente. Descuento de *hasta el 30% sobre el valor en lista de los repuestos seleccionados en esta campaña: amortiguadores (30%) de descuento, plumillas (30%) de descuento, bandas de frenos (25%) de descuento, pastillas de frenos traseras (25%) de descuento, pastillas de frenos delanteras (25%) de descuento. El descuento no es acumulable con otras ofertas y referencias, será otorgado por única vez al hacer efectivo el programa de “Mantenimiento Prepagado Toyota vigente” durante la vigencia de la campaña y será descontado del valor total de la factura. El valor del descuento es con impuestos incluidos (IVA e IMPOCONSUMO). El plan de Mantenimiento Prepagado Toyota y los descuentos especiales en Repuestos Genuinos Toyota de la campaña podrán adquirirse en los Concesionarios autorizados a nivel nacional por la marca durante la vigencia de esta campaña. Disponibilidad de los repuestos sujeta a existencia de inventario en cada concesionario. * Consulta con tu asesor de servicio en el concesionario de tu preferencia las condiciones del programa Mantenimiento Prepagado Toyota. * El costo adicional de la de la mano de obra puede variar de acuerdo con las condiciones establecidas por cada concesionario”.",
  },
];

const benefits: { src: string; alt: string }[] = [
  {
    src: "/svgs/precio-preferencial.svg",
    alt: "Precio Preferencial",
  },
  {
    src: "/svgs/garantia-en-mano-de-obra.svg",
    alt: "Garantía en mano de obra",
  },
  {
    src: "/svgs/tecnicos-certificados.svg",
    alt: "Técnicos Certificados",
  },
  {
    src: "/svgs/repuestos-genuinos-toyota.svg",
    alt: "Repuestos Genuinos Toyota",
  },
];

function Banner() {
  const isMobile = useBreakpointValue({ base: true, large: false });
  return (
    <Image
      width={"100%"}
      src={
        isMobile
          ? "/images/mantenimiento-prepagado-banner--mobile.png"
          : "/images/mantenimiento-prepagado-banner--desktop.png"
      }
      alt="Mantenimiento Prepagado Banner"
      className="mantenimiento-prepagado__banner"
    />
  );
}

function Programs() {
  return (
    <Flex
      className="mantenimiento-prepagado__programs-container"
      direction={{ base: "column" }}
      padding={{
        base: "40px 15px 30px",
        large: "4.875rem 2rem 4.1563rem",
        xxl: "4.875rem 12.1875rem 4.1563rem",
      }}
      alignItems={{ base: "center" }}
    >
      <Flex
        direction={{ base: "column" }}
        gap={{ base: "5.0744rem", xxl: "8rem" }}
        className="mantenimiento-prepagado__programs"
      >
        {programs.map((program) => (
          <Program key={program.subtitle} {...program} />
        ))}
      </Flex>
    </Flex>
  );
}

function Program({
  icon,
  subtitle,
  title,
  mainImage,
  discount,
  productImages: images,
  legal,
}: Program) {
  const isMobile = useBreakpointValue({ base: true, large: false });
  return (
    <Flex
      className="mantenimiento-prepagado__program"
      direction={{ base: "column" }}
      gap={{ base: "4rem", xxl: "6.25rem" }}
    >
      <Flex
        direction={{ base: "column" }}
        gap={{ base: ".625rem", xxl: ".75rem" }}
        alignItems={{ base: "center" }}
      >
        <Image
          className="mantenimiento-prepagado__program-icon"
          src={icon.src}
          alt={icon.alt}
          width={{ base: "40px", large: "2.8125rem" }}
          height={{ base: "40px", large: "2.8125rem" }}
        />

        <Heading
          level={3}
          fontSize={{ base: ".875rem", xxl: "1.375rem" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "140%", xxl: "100%" }}
        >
          {subtitle}
        </Heading>

        <Heading level={2} textAlign={{ large: "center" }}>
          {title.map((part, index) => (
            <Text
              key={index}
              display={{ base: "block", medium: "inline" }}
              textAlign={{ base: "center", medium: "left" }}
              fontSize={{ base: "2rem", xxl: "3.5rem" }}
              lineHeight={{ base: "130%", xxl: "110.00000000000001%" }}
              fontWeight={part.bold ? 700 : 400}
              paddingRight={{ medium: index === 0 ? "0.5ch" : "0" }}
              letterSpacing={{ xxl: "-2%" }}
            >
              {part.text}
            </Text>
          ))}
        </Heading>
      </Flex>

      <Flex
        direction={{ base: "column" }}
        alignItems={{ large: "center" }}
        gap={{ base: "2rem", xxl: "3.5rem" }}
      >
        <Grid
          width={{ large: "calc(100% - 7.5rem)" }}
          templateColumns={{ base: "1fr", xl: "40.32786885245902% 1fr" }}
          padding={{
            base: "1.875rem",
            xxl: "4.25rem 5.8125rem 4.3125rem 6.0625rem",
          }}
          paddingBottom={{ base: "1.9375rem", xxl: "4.3125rem" }}
          backgroundColor={{ base: "#161B1E" }}
        >
          <Image
            width={"100%"}
            src={isMobile ? mainImage.src.mobile : mainImage.src.desktop}
            alt={mainImage.alt}
            className="mantenimiento-prepagado__program-main-image"
          />

          <Flex
            direction={{ base: "column" }}
            gap={{ base: ".75rem", xxl: "1.5rem" }}
            justifyContent={{ large: "center" }}
            alignItems={{ base: "center" }}
            backgroundColor={{ base: "#FFFFFF" }}
            padding={{ base: "1.125rem 1.0625rem 1.25rem" }}
          >
            <Text
              fontSize={{ base: "1.375rem", xxl: "2rem" }}
              fontWeight={{ base: "700", xxl: "400" }}
              lineHeight={{ base: "1.75rem", xxl: "130%" }}
              textAlign={{ large: "center" }}
            >
              *Hasta un {discount}% de descuento en
            </Text>

            <Image
              width={"min(100%, 36.125rem)"}
              src={isMobile ? images.src.mobile : images.src.desktop}
              alt={images.alt}
              className="mantenimiento-prepagado__program-products-image"
            />
          </Flex>
        </Grid>

        <Text
          width={{ base: "min(100%, 95.625rem)" }}
          fontSize={{ base: ".5625rem" }}
          fontWeight={{ base: "400" }}
          lineHeight={{ base: "100%" }}
        >
          {legal}
        </Text>
      </Flex>
    </Flex>
  );
}

function About() {
  const isMobile = useBreakpointValue({ base: true, large: false });
  return (
    <Flex
      direction={{ base: "column" }}
      gap={{ base: "1.5rem", xxl: "2.1875rem" }}
      alignItems={{ base: "center" }}
      padding={{
        base: "2.5rem 1.3125rem 5.375rem",
        xxl: "4.1563rem 2rem 7.6875rem",
      }}
      className="mantenimiento-prepagado__about"
    >
      <Heading
        level={2}
        fontSize={{ base: "2rem", xxl: "3.5rem" }}
        fontWeight={{ base: "400" }}
        lineHeight={{ base: "130%", xxl: "110.00000000000001%" }}
        textAlign={{ base: "center" }}
      >
        Mantenimiento Prepagado Toyota
      </Heading>
      <Text
        color={{ base: "#58595B" }}
        fontSize={{ base: "1.125rem", xxl: "2rem" }}
        fontWeight={{ base: "400" }}
        lineHeight={{ base: "100%", xxl: "130%" }}
        textAlign={{ base: "center" }}
        maxWidth={"68ch"}
      >
        {isMobile
          ? "Es un programa que Toyota ha desarrollado para quienes tienen su MPT vencido o no cuentan con un plan de fidelización, este programa brinda la posibilidad de aprovechar los beneficios de un mantenimiento respaldado, sin importar el kilometraje del vehículo Toyota."
          : "Es un programa que Toyota ha desarrollado para quienes tienen su Mantenimiento Planeado Toyota (MPT) vencido o no cuentan con un plan de fidelización, este programa brinda la posibilidad de aprovechar los beneficios de un mantenimiento respaldado, sin importar el kilometraje del vehículo Toyota."}
      </Text>
    </Flex>
  );
}

function Benefits() {
  // Fix: Swiper pagination element must be set after mount
  const paginationRef = React.useRef<HTMLDivElement | null>(null);
  const [paginationEl, setPaginationEl] = React.useState<HTMLDivElement | null>(
    null
  );

  React.useEffect(() => {
    if (paginationRef.current) {
      setPaginationEl(paginationRef.current);
    }
  }, []);

  const pagination = {
    clickable: true,
    el: paginationEl,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className}"></span>`;
    },
  };

  return (
    <View
      className="mantenimiento-prepagado__benefits"
      marginBottom={{ base: "4.25rem", xxl: "10.125rem" }}
    >
      <Flex
        backgroundColor={{ base: "#161B1E" }}
        padding={{
          base: "2.9388rem .9375rem 1.6887rem",
          xxl: "4rem 2rem 7.1875rem",
        }}
        maxWidth={{ base: "min(1530px, 100%)", large: "min(1530px, 79.68%)" }}
        margin={"0 auto"}
        direction={{ base: "column" }}
        gap={{ base: "3.75rem", xxl: "5rem" }}
        alignContent={{ base: "center" }}
      >
        <Heading
          level={2}
          color={{ base: "#FFFFFF" }}
          fontSize={{ base: "1.375rem", xxl: "3.5rem" }}
          fontWeight={{ base: "700", xxl: "400" }}
          lineHeight={{ base: "28px", xxl: "110.00000000000001%" }}
          letterSpacing={{ xxl: "-2%" }}
          textAlign={{ base: "center" }}
        >
          Beneficios principales
        </Heading>

        <Swiper
          style={{ maxWidth: "100%" }}
          pagination={pagination}
          navigation={{
            nextEl: ".slider-section-next",
            prevEl: ".slider-section-prev",
            enabled: true,
            disabledClass: "swiper-button-disabled",
            lockClass: "swiper-button-lock",
          }}
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          breakpoints={{
            435: { slidesPerView: 2 },
            600: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
          }}
          spaceBetween={0}
          loop={true}
          speed={800}
        >
          {/* Explicitly map over each item */}
          {benefits &&
            benefits.length > 0 &&
            benefits.map((item, index) => (
              <SwiperSlide key={`slide-${index}-${item.alt}`}>
                <Flex
                  direction={{
                    base: "column",
                  }}
                  alignItems={{ base: "center" }}
                  gap={{ base: "1.3188rem" }}
                  maxWidth={{ xxl: "12.4118rem" }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={{ base: "7.35rem" }}
                  />
                  <Heading
                    level={3}
                    fontSize={{ base: "22px" }}
                    fontWeight={{ base: "400" }}
                    lineHeight={{ base: "1.75rem" }}
                    textAlign={{ base: "center" }}
                    color={{ base: "#FFFFFF" }}
                    maxWidth={{ base: "14ch" }}
                  >
                    {item.alt}
                  </Heading>
                </Flex>
              </SwiperSlide>
            ))}

          <div
            ref={paginationRef}
            className={`custom-pagination custom-pagination--mantenimiento-prepagado-benefits`}
          ></div>
        </Swiper>
      </Flex>
    </View>
  );
}

export default function MantenimientoPrepagadoPage() {
  return (
    <Flex direction={{ base: "column" }} gap={{ base: "0" }}>
      <Banner />
      <Programs />
      <About />
      <Benefits />
    </Flex>
  );
}
