"use client";

import {
  Flex,
  View,
  Text,
  Image,
  Heading,
  SelectField,
  CheckboxField,
  Button,
  Divider,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./T10EligibilityComponent.css";

import React, { useEffect, useState } from "react";
import { Option, Select } from "../Layout/Select/Select";
import { CotizadorVehicle, fetchVehicle } from "./queries";
import { ColorOption } from "@/types";
import { EligibleVehicleModal } from "../eligible-vehicle/EligibleVehicleModal";
import { NotEligibleModal } from "../not-eligible-vehicle/NotEligibleModal";
import { CustomDropdownIndicator } from "../Layout/Select/CustomDropdownIndicator ";

export default function T10EligibilityComponent() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [vehicle, setVehicle] = useState<CotizadorVehicle | null>(null);
  const [galleryColor, setGalleryColor] = useState<ColorOption | null>(null);
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedKm, setSelectedKm] = useState<string | null>(null);
  const [selectedAcknowledge, setSelectedAcknowledge] = useState<string | null>(
    null
  );
  const [modelError, setModelError] = useState<string>("");
  const [yearError, setYearError] = useState<string>("");
  const [kmError, setKmError] = useState<string>("");
  const [termsError, setTermsError] = useState<string>("");
  const [showEligibleModal, setShowEligibleModal] = useState(false);
  const [showNotEligibleModal, setShowNotEligibleModal] = useState(false);

  const [model, setModel] = useState<any>(null); // replace `any` with model type if available
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function mapColorItemToColorOption(
    colorItem: {
      color: { name: string };
      gallery: {
        galleryAssets: {
          items: {
            name: string;
            params: any;
            type: any;
            url: string;
          }[];
        };
      };
    },
    colorIndex: number
  ): ColorOption {
    return {
      id: colorItem.color.name,
      iconPath: `/images/vehicle-colors/hd/${colorItem.color.name
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/\s+/g, "-")
        .toLowerCase()}.png`,
      imagePath:
        colorItem.gallery?.galleryAssets?.items.map((asset) => asset.url) || [],
      name: colorItem.color.name,
      priority: colorIndex,
    };
  }

  useEffect(() => {
    if (
      model?.modelsByYear?.items[0]?.colorsByModel?.items &&
      model.modelsByYear.items[0].colorsByModel.items.length > 0
    ) {
      setGalleryColor(
        mapColorItemToColorOption(
          model.modelsByYear.items[0].colorsByModel.items[0],
          0
        )
      );
    } else {
      setGalleryColor(null);
    }
  }, [model]);
  const handleModelSelect = async (option: Option | null) => {
    if (!option?.value) return;

    // Clear model error when user selects a value
    setModelError("");
    setSelectedOption(option);
    let slug = option.value.replace("/cotizador/", "");
    if (slug == "corolla-1") {
      slug = "corolla";
    } else if (slug == "fortuner-1") {
      slug = "fortuner";
    } else if (
      slug == "land-cruiser-300-lc" ||
      slug == "land-cruiser-300-grs" ||
      slug == "land-cruiser-300"
    ) {
      slug = "land-cruiser-300";
    } else if (slug == "corolla-cross-1") {
      slug = "corolla-cross";
    } else if (slug == "hilux-1" || slug == "hilux-2") {
      slug = "hilux";
    }
    try {
      const vehicleData = await fetchVehicle(slug);

      if (!vehicleData) return;

      let inx = 0;
      setVehicle(vehicleData);

      // manage image for Corolla GR-S
      if (option?.label === "Corolla GR-S") {
        inx = 2;
      }
      // manage image for Fortuner GR-S
      if (option?.label === "Fortuner GR-S") {
        inx = 4;
      }
      // manage image for Land Cruiser 300 GR-S
      if (option?.label === "Land Cruiser 300 GR-S") {
        inx = 1;
      }
      // manage image for Hilux Overlander
      if (option?.label === "Hilux Overlander") {
        inx = 4;
      }
      // manage image for Hilux GR-S
      if (option?.label === "Hilux GR-S") {
        inx = 5;
      }

      if (option?.label === "Hilux") {
        inx = 6;
      }
      // manage image for Corolla Cross
      if (slug === "corolla-cross") {
        inx = 1;
      }

      if (option?.label === "Corolla Cross GR-S") {
        inx = 0;
      }

      let selectedModel = vehicleData?.models?.items?.[inx];
      console.log("selectedModel", selectedModel, "inx", inx);
      // Select first model
      setModel(selectedModel);

      let imageUrl: string | null = null;

      // Extract model image
      if (option?.label === "Corolla GR-S") {
        imageUrl =
          selectedModel?.modelsByYear?.items?.[0]?.colorsByModel?.items?.[2]
            ?.gallery?.galleryAssets?.items?.[0]?.url || null;
      } else {
        imageUrl =
          selectedModel?.modelsByYear?.items?.[0]?.colorsByModel?.items?.[0]
            ?.gallery?.galleryAssets?.items?.[0]?.url || null;
      }

      setModelImage(imageUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = () => {
    let valid = true;

    if (!selectedOption?.value) {
      setModelError("Por favor selecciona un modelo.");
      valid = false;
    } else {
      setModelError("");
    }

    if (!selectedYear) {
      setYearError("Por favor selecciona el año de entrega.");
      valid = false;
    } else {
      setYearError("");
    }

    if (!selectedKm) {
      setKmError("Por favor selecciona el kilometraje.");
      valid = false;
    } else {
      setKmError("");
    }

    if (!selectedAcknowledge) {
      setTermsError("Debes aceptar los términos para continuar.");
      valid = false;
    } else {
      setTermsError("");
    }

    if (!valid) return;

    // Eligibility logic
    if (selectedYear === "2020" && selectedKm === "below") {
      setShowEligibleModal(true); // open eligible modal
      setShowNotEligibleModal(false);
    } else {
      setShowEligibleModal(false);
      setShowNotEligibleModal(true); // open not eligible modal
    }
  };

  // Handle reset form
  const handleResetForm = () => {
    setSelectedOption(null);
    setSelectedKm(null);
    setSelectedYear(null);
    setSelectedAcknowledge(null);
  };

  return (
    <>
      <Flex
        direction={isDesktop ? "row" : "column"}
        padding="68px 40px 68px"
        justifyContent={{ base: "start", xl: "center" }}
        alignItems="flex-start"
        width="100%"
        maxWidth="1400px"
        margin="0 auto"
        gap="40px"
        backgroundColor="#F6F6F6;"
        style={{ background: "#F6F6F6" }}
      >
        {/* ---------- LEFT SECTION ---------- */}
        <Flex direction="column" flex="1" maxWidth="600px">
          <Heading
            as="p"
            fontFamily={{
              base: "var(--font-ToyotaType-Regular)",
              xl: "var(--font-toyotaDisplay)",
              xxl: "var(--font-toyotaDisplay)",
            }}
            fontSize={{ base: "22px", xl: "32px" }}
            lineHeight={{ base: "100%", xl: "130%" }}
            letterSpacing="0px"
            fontWeight="400"
            color="#111"
          >
            Verifica si tu vehículo es
            <br />
            elegible para la cobertura
            <br />
            extendida T10
          </Heading>

          {/* Modelo (only on small screen) */}
          <View
            order={{ base: 2, xl: -1 }}
            display={{ base: "block", xl: "none" }}
          >
            <Text
              fontFamily={{
                base: "var(--font-ToyotaType-Regular)",
                xl: "var(--font-ToyotaType-Regular)",
                xxl: "var(--font-ToyotaType-Regular)",
              }}
              fontSize={{ base: "18px", xl: "18px" }}
              lineHeight={{ base: "100%", xl: "100%" }}
              letterSpacing="0px"
              fontWeight="500"
              color="#010202"
              marginBottom={{ base: "10px", xl: "10px" }}
            >
              Modelo
            </Text>

            <Select
              options={[
                { value: "", label: "Selecciona un modelo" },
                { label: "Yaris", value: "/cotizador/yaris" },
                { label: "Corolla", value: "/cotizador/corolla-1" },
                { label: "Corolla GR-S", value: "/cotizador/corolla" },

                // CAMIONETAS Y SUV
                { label: "Fortuner", value: "/cotizador/fortuner" },
                {
                  label: "Land Cruiser 300",
                  value: "/cotizador/land-cruiser-300",
                },
                // {
                //   label: "Land Cruiser",
                //   value: "/cotizador/land-cruiser-300-lc",
                // },
                {
                  label: "Land Cruiser Prado",
                  value: "/cotizador/land-cruiser-prado",
                },
                { label: "Yaris Cross", value: "/cotizador/yaris-cross" },
                { label: "Corolla Cross", value: "/cotizador/corolla-cross" },
                {
                  label: "Corolla Cross GR-S",
                  value: "/cotizador/corolla-cross-1",
                },
                { label: "Fortuner GR-S", value: "/cotizador/fortuner-1" },
                {
                  label: "Land Cruiser 300 GR-S",
                  value: "/cotizador/land-cruiser-300-grs",
                },
                {
                  label: "4 Runner",
                  value: "/cotizador/4-runner-2024",
                },
                {
                  label: "RAV 4",
                  value: "/cotizador/rav4-2024",
                },
                {
                  label: "Rush",
                  value: "/cotizador/rush",
                },
                {
                  label: "FJ Cruiser",
                  value: "/cotizador/fj-cruiser",
                },

                // PICK UPS
                { label: "Hilux", value: "/cotizador/hilux" },
                { label: "Hilux Overlander", value: "/cotizador/hilux-1" },
                {
                  label: "Land Cruiser 79",
                  value: "/cotizador/land-cruiser",
                },
                { label: "Tundra", value: "/cotizador/tundra" },
                { label: "Hilux GR-S", value: "/cotizador/hilux-2" },

                // HÍBRIDOS
                // { label: "Corolla (Híbrido)", value: "/cotizador/corolla" },
                // { label: "Yaris Cross (Híbrido)", value: "/cotizador/yaris-cross" },
                // { label: "Corolla Cross (Híbrido)", value: "/cotizador/corolla-cross" },

                // DEPORTIVOS TGR
                // { label: "Corolla GR-S (TGR)", value: "/cotizador/corolla" },
                // { label: "Corolla Cross GR-S (TGR)", value: "/cotizador/corolla-cross" },
                // { label: "Fortuner GR-S (TGR)", value: "/cotizador/fortuner" },
                // { label: "Hilux GR-S (TGR)", value: "/cotizador/hilux" },
                // { label: "Land Cruiser 300 GR-S (TGR)", value: "/cotizador/land-cruiser-300" },
              ]}
              value={selectedOption}
              selectedOption={selectedOption}
              onSelect={handleModelSelect}
              placeholder={"Selecciona un modelo"}
              customControlStyles={{
                maxWidth: "445px",
                height: "48px",
                opacity: 1,
                gap: "16px",
                borderRadius: "120px",
                border: "1px solid #000000",
              }}
              CustomDropdownIndicator={CustomDropdownIndicator}
            />

            {modelError && (
              <Text
                color="red"
                fontSize="14px"
                padding="4px 8px"
                marginTop="4px"
              >
                {modelError}
              </Text>
            )}
          </View>

          <View
            // border="2px solid #C7D7EA"
            marginTop="40px"
            padding="10px"
            width={{ base: "auto", xl: "fit-content" }}
            maxWidth={{ base: "375px", medium: "auto" }}
          >
            {modelImage ? (
              <View width={{ base: "", xl: "450px" }} height="100%">
                <Image
                  src={modelImage}
                  alt="Vehículo"
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              </View>
            ) : (
              <Text
                fontSize="16px"
                color="#555"
                textAlign="center"
                width={{ base: "300px", xl: "445px" }}
                height="250px"
                display="flex"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Detalles no encontrados */}
              </Text>
            )}
          </View>
          <Text
            fontFamily={{
              base: "var(--font-ToyotaType-Regular)",
              xl: "var(--font-ToyotaType-Regular)",
              xxl: "var(--font-ToyotaType-Regular)",
            }}
            fontSize={{ base: "9px", xl: "12px" }}
            lineHeight={{ base: "100%", xl: "120%" }}
            letterSpacing="0px"
            fontWeight="400"
            color="background: linear-gradient(180deg, #000000 0%, #000000 100%);"
            marginTop="7px"
          >
            *Las imágenes del vehículo pueden variar del modelo actual
          </Text>
        </Flex>

        {/* ---------- RIGHT SECTION ---------- */}
        <View>
          <Flex
            direction="column"
            flex="1"
            maxWidth="500px"
            gap={{ base: "28px", xl: "58px" }}
          >
            {/* Modelo (only on bigger screen) */}
            <View display={{ base: "none", xl: "block" }}>
              <Text
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-ToyotaType-Regular)",
                  xxl: "var(--font-ToyotaType-Regular)",
                }}
                fontSize={{ base: "18px", xl: "18px" }}
                lineHeight={{ base: "100%", xl: "100%" }}
                letterSpacing="0px"
                fontWeight="500"
                color="#010202"
                marginBottom={{ base: "10px", xl: "10px" }}
              >
                1. Selecciona el modelo de tu vehículo
              </Text>

              <Select
                options={[
                  { value: "", label: "Selecciona un modelo" },
                  { label: "Yaris", value: "/cotizador/yaris" },
                  { label: "Corolla", value: "/cotizador/corolla-1" },
                  { label: "Corolla GR-S", value: "/cotizador/corolla" },

                  // CAMIONETAS Y SUV
                  { label: "Fortuner", value: "/cotizador/fortuner" },
                  {
                    label: "Land Cruiser 300",
                    value: "/cotizador/land-cruiser-300",
                  },
                  // {
                  //   label: "Land Cruiser",
                  //   value: "/cotizador/land-cruiser-300-lc",
                  // },
                  {
                    label: "Land Cruiser Prado",
                    value: "/cotizador/land-cruiser-prado",
                  },
                  { label: "Yaris Cross", value: "/cotizador/yaris-cross" },
                  { label: "Corolla Cross", value: "/cotizador/corolla-cross" },
                  {
                    label: "Corolla Cross GR-S",
                    value: "/cotizador/corolla-cross-1",
                  },
                  { label: "Fortuner GR-S", value: "/cotizador/fortuner-1" },
                  {
                    label: "Land Cruiser 300 GR-S",
                    value: "/cotizador/land-cruiser-300-grs",
                  },
                  {
                    label: "4 Runner",
                    value: "/cotizador/4-runner-2024",
                  },
                  {
                    label: "RAV 4",
                    value: "/cotizador/rav4-2024",
                  },
                  {
                    label: "Rush",
                    value: "/cotizador/rush",
                  },
                  {
                    label: "FJ Cruiser",
                    value: "/cotizador/fj-cruiser",
                  },

                  // PICK UPS
                  { label: "Hilux", value: "/cotizador/hilux" },
                  { label: "Hilux Overlander", value: "/cotizador/hilux-1" },
                  {
                    label: "Land Cruiser 79",
                    value: "/cotizador/land-cruiser",
                  },
                  { label: "Tundra", value: "/cotizador/tundra" },
                  { label: "Hilux GR-S", value: "/cotizador/hilux-2" },
                ]}
                value={selectedOption}
                selectedOption={selectedOption}
                onSelect={handleModelSelect}
                placeholder={"Selecciona un modelo"}
                customControlStyles={{
                  maxWidth: "445px",
                  height: "48px",
                  opacity: 1,
                  gap: "16px",
                  borderRadius: "120px",
                  border: "1px solid #000000",
                }}
                CustomDropdownIndicator={CustomDropdownIndicator}
              />
              {modelError && (
                <Text
                  color="red"
                  fontSize="14px"
                  padding="4px 8px"
                  marginTop="4px"
                >
                  {modelError}
                </Text>
              )}
            </View>

            {/* Año */}
            <View>
              <Text
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-ToyotaType-Regular)",
                  xxl: "var(--font-ToyotaType-Regular)",
                }}
                fontSize={{ base: "18px", xl: "18px" }}
                lineHeight={{ base: "100%", xl: "120%" }}
                letterSpacing="0px"
                fontWeight="500"
                marginBottom={{ base: "10px", xl: "12px" }}
              >
                2. Selecciona el año de entrega de su vehículo
              </Text>

              <CheckboxField
                className="custom-checkbox"
                label="2020 en adelante"
                value="2020"
                name="year"
                checked={selectedYear === "2020"}
                onChange={() => {
                  setSelectedYear("2020");
                  setYearError(""); // Clear year error
                }}
                fontFamily={{
                  base: "var(--font-toyotaDisplay)",
                  xl: "var(--font-toyotaDisplay)",
                  xxl: "var(--font-toyotaDisplay)",
                }}
                fontSize="14px"
                lineHeight="140%"
                letterSpacing="0px"
                fontWeight="400"
                color="#161B1E"
              />
              <CheckboxField
                className="custom-checkbox"
                label="Antes del 2020"
                value="before2020"
                name="year"
                checked={selectedYear === "before2020"}
                onChange={() => {
                  setSelectedYear("before2020");
                  setYearError(""); // Clear year error
                }}
                fontFamily={{
                  base: "var(--font-toyotaDisplay)",
                  xl: "var(--font-toyotaDisplay)",
                  xxl: "var(--font-toyotaDisplay)",
                }}
                fontSize="14px"
                lineHeight="140%"
                letterSpacing="0px"
                fontWeight="400"
                color="#161B1E"
              />

              {yearError && (
                <Text color="red" fontSize="14px" padding="4px">
                  {yearError}
                </Text>
              )}
            </View>

            {/* Kilometraje */}
            <View>
              <Text
                fontFamily={{
                  base: "var(--font-ToyotaType-Regular)",
                  xl: "var(--font-ToyotaType-Regular)",
                  xxl: "var(--font-ToyotaType-Regular)",
                }}
                fontSize={{ base: "18px", xl: "18px" }}
                lineHeight={{ base: "100%", xl: "120%" }}
                letterSpacing="0px"
                fontWeight="500"
                marginBottom={{ base: "10px", xl: "12px" }}
              >
                3. Selecciona el Kilometraje de tu vehículo
              </Text>

              <CheckboxField
                className="custom-checkbox"
                label="Inferior o igual a 200.000 km"
                value="below"
                name="km"
                checked={selectedKm === "below"}
                onChange={() => {
                  setSelectedKm("below");
                  setKmError(""); // Clear km error
                }}
                fontFamily={{
                  base: "var(--font-toyotaDisplay)",
                  xl: "var(--font-toyotaDisplay)",
                  xxl: "var(--font-toyotaDisplay)",
                }}
                fontSize="14px"
                lineHeight="140%"
                letterSpacing="0px"
                fontWeight="400"
                color="#161B1E"
              />

              <CheckboxField
                className="custom-checkbox"
                label="Superior a 200.000 km"
                value="above"
                name="km"
                checked={selectedKm === "above"}
                onChange={() => {
                  setSelectedKm("above");
                  setKmError(""); // Clear km error
                }}
                fontFamily={{
                  base: "var(--font-toyotaDisplay)",
                  xl: "var(--font-toyotaDisplay)",
                  xxl: "var(--font-toyotaDisplay)",
                }}
                fontSize="14px"
                lineHeight="140%"
                letterSpacing="0px"
                fontWeight="400"
                color="#161B1E"
              />

              {kmError && (
                <Text color="red" fontSize="14px" padding="4px">
                  {kmError}
                </Text>
              )}

              <Divider
                orientation="horizontal"
                borderColor="#E0E0E0"
                borderWidth="1px"
                marginTop={{ base: "36px", xl: "35px" }}
                marginBottom={{ base: "36px", xl: "17px" }}
              />
            </View>
          </Flex>
          <Flex
            direction="column"
            flex="1"
            maxWidth="500px"
            gap={{ base: "28px", xl: "10px" }}
          >
            {/* Checkbox final */}
            <View>
              <CheckboxField
                className="custom-checkbox"
                label="Acepto que esta consulta es preliminar e informativa y no constituye una oferta de cobertura extendida"
                name="terms"
                checked={selectedAcknowledge === "acknowledged"}
                onChange={() => {
                  setSelectedAcknowledge(
                    !selectedAcknowledge ? "acknowledged" : null
                  );
                  setTermsError(""); // Clear terms error
                }}
                fontFamily={{
                  base: "var(--font-toyotaDisplay)",
                  xl: "var(--font-toyotaDisplay)",
                  xxl: "var(--font-toyotaDisplay)",
                }}
                fontSize="14px"
                lineHeight="140%"
                letterSpacing="0px"
                fontWeight="400"
                color="#161B1E"
                alignItems={{
                  base: "start", // mobile
                  medium: "center", // tablet/desktop
                  xl: "center", // xl screens
                }}
              />
              {termsError && (
                <Text color="red" fontSize="14px" padding="4px">
                  {termsError}
                </Text>
              )}
            </View>

            {/* Button */}
            <Button
              backgroundColor="#D42224"
              borderRadius="40px"
              color="#FFFFFF"
              marginTop="10px"
              alignSelf="flex-start"
              onClick={handleSubmit}
              minWidth="290px"
              maxWidth="290px"
              maxHeight="50px"
              minHeight="50px"
              fontFamily={{
                base: "var(--font-ToyotaType-Regular)",
                xl: "var(--font-toyotaDisplay)",
                xxl: "var(--font-toyotaDisplay)",
              }}
              fontSize="14px"
              lineHeight="140%"
              letterSpacing="0px"
              fontWeight="400"
            >
              Consultar elegibilidad
            </Button>
          </Flex>
        </View>
        {showEligibleModal && (
          <EligibleVehicleModal
            onClose={() => {
              handleResetForm();
              setShowEligibleModal(false);
            }}
            onRedirect={() => console.log("Redirecting...")}
            isInStepper={false}
          />
        )}

        {showNotEligibleModal && (
          <NotEligibleModal
            onClose={() => {
              handleResetForm();
              setShowNotEligibleModal(false);
            }}
            onRedirect={() => console.log("Redirecting...")}
            isInStepper={false}
          />
        )}
      </Flex>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          fontSize="9px"
          fontWeight="400"
          marginTop={{ base: "20px", xl: "14px" }}
          letterSpacing="0px"
          lineHeight="120%"
          maxWidth={{ base: "80%", xl: "100%" }}
          fontFamily="var(--font-ToyotaType-Regular)"
          textAlign={{ base: "left", medium: "center", xl: "left" }}
        >
          <Text display={{ base: "block", medium: "inline" }}>
            Este producto aplica para vehículos
          </Text>

          <Text display={{ base: "block", medium: "inline" }}>
            {" "}
            con fecha de entrega desde enero 01 de 2020.
          </Text>

          <Text display={{ base: "block", medium: "inline" }}>
            {" "}
            Sólo aplica para vehículos importados por Automotores Toyota
            Colombia.
          </Text>

          <Text display={{ base: "block", medium: "inline" }}>
            {" "}
            La cobertura es hasta por 10 años o 200.000 km, lo primero que
            ocurra.
          </Text>
        </Text>
      </View>
    </>
  );
}
