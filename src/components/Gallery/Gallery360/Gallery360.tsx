import {
  Flex,
  Image,
  Text,
  View,
  useBreakpointValue,
} from "@aws-amplify/ui-react";
import { Option, Select, SelectTheme } from "@/components/Layout/Select/Select";
import RotatingImage from "../RotatingImage/RotatingImage";
import { ColorList } from "@/components/ColorList/ColorList";
import Button from "@/components/Layout/Button/Button";
import { ColorOption } from "@/types";
import { colors } from "@/theme/colors";
import "./Gallery360.css";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface Gallery360Props {
  carImages: string[];
  placesList: Option[];
  colorsList: ColorOption[];
  detailsPage?: boolean;
  simple?: boolean;
  yearList?: Option[];
  onClick?: () => void;
  onColorChange?: (color: ColorOption | null) => void;
  // Add new prop for custom styling
  customImageSize?: boolean;
  customWidth?: { base?: string; medium?: string; xl?: string };
  customHeight?: { base?: string; medium?: string; xl?: string };
  price?: string; // New prop for price
  placeholder?: string;
  slug?: string; // Optional slug for the link
}

const Gallery360 = ({
  carImages,
  placesList,
  colorsList,
  detailsPage,
  onClick,
  simple,
  onColorChange,
  customImageSize = false, // Default to false
  customWidth,
  customHeight,
  yearList,
  price, // Destructure price
  placeholder,
  slug,
}: Gallery360Props) => {
  const yearsList = yearList || [
    { label: "2024", value: "2024" }, // fallback if no yearList passed
  ];

  const [currentColor, setCurrentColor] = useState<ColorOption | null>(
    colorsList[0] || null
  );

  // Use useBreakpointValue to get the correct width and height for current breakpoint
  const currentWidth =
    (useBreakpointValue({
      base: customWidth?.base,
      medium: customWidth?.medium,
      xl: customWidth?.xl,
    }) as string) || "min(1024px, 100%)";

  const currentHeight = useBreakpointValue({
    base: customHeight?.base,
    medium: customHeight?.medium,
    xl: customHeight?.xl,
  }) as string | undefined;

  const handleColorSelect = (selected: { id: string }) => {
    const found = colorsList.find((c) => c.id === selected.id) || null;
    setCurrentColor(found);
    if (onColorChange) onColorChange(found);
    console.log(found);
  };

  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const lastDay = new Date(year, today.getMonth() + 1, 0).getDate();
  const pathname = usePathname();
  const router = useRouter();

  if (!slug) {
    slug = pathname?.split("/").filter(Boolean).pop();
  }

  return (
    <>
      <style jsx global>{`
        .css-1d62fnp-control,
        .css-ftnebb-control {
          padding: 0 10px !important;
          width: 290px;
          height: 40px;
        }
      `}</style>
      {!detailsPage && !simple && (
        <View
          maxWidth={290}
          margin={{ base: "1rem auto", xl: "2rem auto" }}
          paddingBottom={{ base: "0", xl: "1rem" }}
        >
          <Text
            fontSize={{ base: "14px", xl: "md" }}
            lineHeight={{ base: "normal" }}
            textAlign={"center"}
            marginBottom={"0.5rem"}
            fontWeight={"400"}
            fontFamily="var(--font-toyotaDisplay)"
          >
            Versión
          </Text>
          <Select
            options={placesList}
            onSelect={(selected) => {
              console.log(selected);
            }}
            placeholder="Organizar por:"
            theme={SelectTheme.Light}
          />
        </View>
      )}

      {/* Conditional styling for custom image size */}
      {customImageSize ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          <RotatingImage
            images={carImages}
            customWidth={currentWidth}
            customHeight={currentHeight}
          />
        </View>
      ) : (
        <RotatingImage images={carImages} />
      )}

      <Text
        fontSize={{ base: "9px", xl: "14px" }}
        lineHeight={{ base: "normal" }}
        textAlign={"center"}
        marginBottom={"0.5rem"}
        marginTop={"1.3rem"}
        fontFamily="var(--font-ToyotaType-Regular)"
      >
        *Imágenes de referencia
      </Text>

      <Flex
        justifyContent="center"
        alignItems="center"
        marginTop={"1.5rem"}
        marginBottom={"0.5rem"}
        style={{
          display: "none",
        }}
      >
        <Image
          height="20px"
          alt={"left"}
          src={"/images/icons/drag.svg"}
          margin="0 auto"
        />
      </Flex>

      <Flex
        justifyContent="center"
        alignItems="center"
        style={{
          display: "none",
        }}
      >
        <Text
          fontSize={{ base: "14px", xl: "md" }}
          lineHeight={{ base: "140%" }}
          textAlign={"center"}
          letterSpacing={"0"}
          fontWeight={"400"}
          marginBottom={"0.5rem"}
          fontFamily="var(--font-toyotaDisplay)"
        >
          Arrastra para rotar la imagen
        </Text>
      </Flex>

      {!simple && colorsList && colorsList.length > 0 && (
        <>
          <Text
            fontSize={{ base: "14px", xl: "md" }}
            lineHeight={{ base: "normal" }}
            textAlign={{ base: "left", xl: "center" }}
            fontFamily="var(--font-toyotaDisplay)"
            marginTop={{ base: "1rem", xl: "70px" }}
            marginBottom={{ base: "0.5rem", xl: "22px" }}
            margin={{ base: "42px 8px 16px 10%", xl: "70px 0 20px 0" }}
          >
            Selecciona un color:
          </Text>
          <ColorList colorLists={colorsList} onSelect={handleColorSelect} />
        </>
      )}
      <Flex
        className="gallery360__year"
        justifyContent={{ base: "center", xl: "center" }}
        alignItems="center"
        marginTop={{ base: "50px", xl: "70px" }}
      >
        {detailsPage ? (
          <>
            <View textAlign={{ xl: "center" }}>
              <Text fontSize={{ base: "xs", xl: "18px" }}>
                *Precio sugerido al público desde:
              </Text>
              <View
                maxWidth={"max-content"}
                margin={{ xl: "0 auto" }}
                fontWeight={"700"}
                width="auto"
                fontSize={{ base: "sm", xl: "ml" }}
              >
                <Select
                  options={yearsList}
                  onSelect={(selected) => {
                    console.log(selected);
                  }}
                  placeholder={placeholder}
                  theme={SelectTheme.Transparent}
                  customControlStyles={{
                    minHeight: "48px",
                    // border: "1px solid red",
                    padding: "0 20px",
                    fontSize: "15px", // override font size
                  }}
                />
              </View>
              {price && (
                <Text
                  fontSize={{ base: "mlg", xl: "xxxxl" }}
                  fontWeight={{ base: "700", xl: "400" }}
                  marginBottom={"1.75rem"}
                >
                  {price}
                </Text>
              )}

              <View marginBottom={{ base: "1.8125rem", xl: "2.1875rem" }}>
                <Button
                  type="button"
                  color="deepred"
                  isFullWidth={true}
                  style={{
                    fontFamily: "var(--font-roboto)",
                    maxWidth: "490px",
                  }}
                  onClick={() => {
                    router.push(`/cotizador/${slug}`);
                  }}
                >
                  Cotizar
                </Button>
              </View>

              <Text
                color={colors.theme.darkGray}
                fontSize={{ base: "xs", xl: "ss" }}
                maxWidth={"600px"}
              >
                *Precio sugerido al público por Automotores Toyota Colombia
                S.A.S a nivel nacional, vigente desde el 01/{month}/{year} hasta
                el {lastDay}/{month}/{year}. Estos valores incluyen impuestos
                aplicables de acuerdo con el tipo de vehículo y el mantenimiento
                planeado Toyota. Los precios pueden variar según el
                concesionario de la Red Autorizada escogido.
              </Text>
            </View>
          </>
        ) : (
          <>
            {!simple && (
              <Text
                // href="/detalle/prado/galeria"
                style={{
                  marginBottom: window.innerWidth <= 768 ? "48px" : "0",
                }}
              >
                <Button
                  type="button"
                  color="deepred"
                  style={{
                    fontFamily: "var(--font-roboto)",
                    width: window.innerWidth <= 768 ? "164px" : "290px",
                    height: window.innerWidth <= 768 ? "40px" : "50px",
                  }}
                  onClick={onClick}
                >
                  Explora su interior
                </Button>
              </Text>
            )}
          </>
        )}
      </Flex>
    </>
  );
};

export default Gallery360;
