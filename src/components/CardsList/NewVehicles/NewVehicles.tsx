import { colors } from "@/theme/colors";
import { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  Flex,
  Grid,
  Card,
  Collection,
  Divider,
  Heading,
  Image,
  Link,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Option, Select } from "@/components/Layout/Select/Select";
import Button from "../../Layout/Button/Button";
import "./NewVehicles.css";
import { useModelStore } from "@/providers/model-store-provider";
import { useRouter } from "next/navigation";

type vehicleAttribs = {
  items: {
    key?: string;
    id?: string;
    name?: string;
    value?: string;
  }[];
};

export interface Vehicle {
  id?: string;
  slug?: string;
  name: string;
  modelName?: string;
  description: string;
  image: string;
  link?: string;
  cotizarLink?: string;

  year?: string;
  type?: string;
  price?: string;
  vehicle?: string;
  asientos?: string;
  category: { type: string[] };
  vehicleAttribs: {
    items: {
      id?: string;
      key?: string;
      name?: string;
      value?: string;
    }[];
  };
  objectFit?: string;
  models?: {
    items: {
      id: string;
      name: string;
      value: string;
      modelsByYear?: {
        items: {
          name: string; // year
          priceListsByFeature?: {
            items: {
              name?: string;
              slug?: string;
              priceList?: {
                name?: string; // price
              };
              warrantiesByFeature?: {
                items: {
                  name?: string;
                }[];
              };
            }[];
          };
        }[];
      };
      documentsByModel?: {
        items: {
          document: {
            name: string;
            description?: string;
          };
        }[];
      };
    }[];
  };

  products?: {
    items: {
      id: string;
      slug: string;
      name: string;
      serialNumber?: string;
      customerName?: string;
      description?: string;
      category?: {
        id: string;
        shipmentDate?: string;
        type?: string;
      };
      productsAttribs?: {
        items: {
          id: string;
          name?: string;
          value?: string;
        }[];
      };
    }[];
  };
}

export enum SelectTheme {
  Dark = "dark",
  Light = "light",
}

const vehiclesData: Vehicle[] = [];

interface VehiclesGridProps {
  filters: Record<string, string[]>;
  toggleFilterPanel: () => void;
  destailsButton?: boolean;
  data?: Vehicle[];
}

export const NewVehiclesCardList: React.FC<VehiclesGridProps> = ({
  filters,
  toggleFilterPanel,
  destailsButton,
  data = vehiclesData,
}) => {
  const router = useRouter();
  const { setCurrentModelState } = useModelStore((state) => state);
  const [sortOption, setSortOption] = useState<string>("menor");
  const filteredVehicles = data.filter((vehicle) => {
    return Object.entries(filters).every(([category, values]) => {
      if (!values.length) return true;

      switch (category) {
        case "Vehículos": {
          const types = vehicle?.category?.type ?? [];
          return types.length > 0
            ? types.some((t) =>
                values.map((v) => v.toLowerCase()).includes(t.toLowerCase())
              )
            : false;
        }

        case "Modelo": {
          return vehicle.models?.items?.some((model) =>
            model.modelsByYear?.items?.some((year) =>
              values.includes(year.name)
            )
          );
        }

        case "Asientos Disponibles": {
          const seatAttrib = vehicle?.vehicleAttribs?.items?.find(
            (attr) => attr.name === "Asientos Disponibles"
          );
          const seatValue = seatAttrib?.value?.toString();
          return seatValue ? values.includes(seatValue) : false;
        }

        case "Precio": {
          const [minPriceStr, maxPriceStr] = values;
          const minPrice = parseFloat(minPriceStr);
          const maxPrice = parseFloat(maxPriceStr);

          return (
            vehicle.models?.items?.some((model) =>
              model.modelsByYear?.items?.some((year) =>
                year.priceListsByFeature?.items?.some((priceItem) => {
                  const priceStr = priceItem?.priceList?.name;
                  const price = priceStr
                    ? parseInt(priceStr.replace(/[^\d]/g, ""), 10)
                    : NaN;
                  return (
                    !isNaN(price) && price >= minPrice && price <= maxPrice
                  );
                })
              )
            ) ?? false
          );
        }

        default:
          return true;
      }
    });
  });
  console.log("filteredVehicles", filteredVehicles);

  const getVehiclePrice = (vehicle: any) => {
    const priceStr =
      vehicle?.models?.items?.[0]?.modelsByYear?.items?.[0]?.priceListsByFeature
        ?.items?.[0]?.priceList?.name || "";
    return parseFloat(priceStr.replace(/[^\d.]/g, "")) || 0;
  };

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortOption) {
      case "a-z":
        return a.name.localeCompare(b.name);
      case "z-a":
        return b.name.localeCompare(a.name);
      case "mayor":
        return getVehiclePrice(b) - getVehiclePrice(a);
      case "menor":
        return getVehiclePrice(a) - getVehiclePrice(b);
      default:
        return 0;
    }
  });

  const placesList: Option[] = [
    { label: "Recientes", value: "recientes" },
    { label: "Vehículos: A-Z", value: "a-z" },
    { label: "Vehículos: Z-A", value: "z-a" },
    { label: "Precio: Mayor a Menor", value: "mayor" },
    { label: "Precio: Menor a Mayor", value: "menor" },
  ];

  const customSelectStyles = {
    width: "162px",
    height: "40px",
    minHeight: "40px",
    paddingTop: "0px",
    paddingRight: "0px", // Reduced right padding since dropdown will have 0 left padding
    paddingBottom: "0px",
    paddingLeft: "0px",
    gap: "0px",
    fontSize: "14px", // Smaller font to fit text
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const getAttribMap = (attribs?: vehicleAttribs): Record<string, string> => {
    if (!attribs || !attribs.items) return {};
    return attribs.items.reduce(
      (acc, item) => {
        if (item?.key && item?.value) {
          acc[item.key.toLowerCase()] = item.value;
        }
        return acc;
      },
      {} as Record<string, string>
    );
  };

  const getVehiclePricecard = (vehicle: any): string => {
    const prices = vehicle?.models?.items
      ?.flatMap((model: any) => model?.modelsByYear?.items || [])
      ?.flatMap((year: any) => year?.priceListsByFeature?.items || [])
      ?.map((item: any) => {
        const raw = item?.priceList?.name || "";
        const cleaned = raw.replace(/[^\d]/g, "");
        return parseFloat(cleaned);
      })
      ?.filter((num: number) => !isNaN(num));

    if (!prices?.length) return "NA";

    return new Intl.NumberFormat("es-CO").format(prices[0]);
  };

  return (
    <View>
      <Grid
        justifyContent={{
          base: "flex-start",
          medium: "center",
          large: "",
          xl: "flex-start",
          xxl: "flex-start",
        }}
        templateColumns={{ base: "auto auto", xl: "1fr 1fr" }}
        alignItems={"center"}
        gap={"0.88rem"}
        marginBottom={{ base: "0rem", xl: "2rem" }}
        backgroundColor={{ base: "#F6F6F6", xl: "" }}
        padding={{ base: "34px 15px 12px", xl: "2.19rem 2.5rem 0px 2.5rem " }}
      >
        <View display={{ base: "block", xl: "none" }} maxWidth="100px">
          <Button
            color="transparentBlack"
            textColor="black"
            onClick={toggleFilterPanel}
            padding="0.62rem 1.5rem 0.62rem 1rem"
          >
            <Flex alignItems={"center"} gap={"0.5rem"} maxHeight={"2.5rem"}>
              <Image src="/svgs/filter.svg" alt="Filter" height={".6987rem"} />
              <View as="span" lineHeight={"1.137rem"}>
                Filtros
              </View>
            </Flex>
          </Button>
        </View>

        <View
          className="all-vehicles-cars-grid__sort"
          minWidth={{
            base: "230px",
            medium: "230px",
            large: "230px",
            xl: "230px",
          }}
          maxWidth={{
            base: "max-content",
            medium: "max-content",
            large: "max-content",
            xl: "max-content",
            xxl: "max-content",
          }}
          marginLeft={"auto"}
          maxHeight={{ xl: "2.5rem" }}
          minHeight={"40px"}
          height={40}
        >
          <Select
            options={placesList}
            selectedOption={placesList.find(
              (option) => option.value === sortOption
            )}
            onSelect={(selected) => {
              if (selected?.value) {
                setSortOption(selected.value);
              }
            }}
            placeholder="Organizar por"
            theme={SelectTheme.Light}
            customControlStyles={customSelectStyles}
            fixedPlaceholder
          />
        </View>

        <Heading
          level={4}
          lineHeight={{ xl: "100%" }}
          columnStart={{ base: "1", xl: "1" }}
          columnEnd={{ base: "3", xl: "2" }}
          rowStart={{ base: "2", xl: "1" }}
          fontFamily={{
            base: "var(--font-toyotaDisplay)",
            xl: "var(--font-ToyotaType-Regular)",
          }}
          fontSize={{ base: "14px", xl: "22px" }}
          fontWeight={{ base: "400", xl: "600" }}
          marginTop={{ base: "15px", xl: "0" }}
          order={{ base: "3", xl: "0" }}
        >
          {sortedVehicles.length} Resultados
        </Heading>
      </Grid>

      <View
        className="all-vehicles-cars-grid"
        backgroundColor={{ base: "#f6f6f6", xl: "#f6f6f6" }}
        padding={{
          base: "0 15px 17px 15px",
          xl: "2.19rem 2.5rem 104px 2.5rem ",
        }}
      >
        <Collection
          items={sortedVehicles}
          type="grid"
          gap="20px"
          templateColumns={{
            base: "min(100%, 375px)",
            medium: "repeat(auto-fill, minmax(min(100%, 22rem), 1fr))",
            large: "repeat(3, 1fr)",
          }}
          justifyContent={{ base: "center" }}
          templateRows={"auto"}
        >
          {(vehicle, index) => {
            const attribs = getAttribMap(vehicle.vehicleAttribs);
            return (
              <Card
                key={index}
                aria-details={vehicle.vehicle}
                width={{ base: "100%" }}
                maxWidth={{ base: "528px" }}
                minHeight={{ xl: "528px" }}
                borderRadius=".5rem"
                padding={{
                  base: "1.25rem 2.2813rem",
                  xxl: "1.875rem 67.5px",
                }}
                margin={{ base: "0 auto", large: "" }}
                backgroundColor={{ base: "white", xl: "white" }}
              >
                <View
                  position="relative"
                  width={{ base: "auto" }}
                  height={{ base: "12.5rem", xl: "239px" }}
                  borderRadius="8px"
                  overflow={"hidden"}
                  marginBottom={".9375rem"}
                >
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "scale-down" }}
                  />
                  <Text
                    backgroundColor="#161B1E"
                    color="white"
                    fontSize={{ base: "9px", xl: "9px" }}
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    textAlign="center"
                    margin="0 auto"
                    fontWeight="400"
                    lineHeight={"100%"}
                    letterSpacing={"0%"}
                    fontFamily="var(--font-ToyotaType-Regular)"
                    height={"17px"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    *Imágenes de referencia.
                  </Text>
                </View>
                <Flex
                  width="100%"
                  direction="column"
                  padding={{ base: "0", xl: "0 " }}
                  gap={".9375rem"}
                >
                  <Flex
                    height="100%"
                    direction="column"
                    justifyContent="space-between"
                    gap={"10px"}
                  >
                    <View>
                      <Text
                        fontSize={{ base: "22px", xl: "24px" }}
                        fontWeight={{ base: "700", xl: "700" }}
                        lineHeight={{ base: "109.09%", xl: "28px" }}
                        color="#000000"
                        fontFamily="var(--font-ToyotaType-Regular)"
                      >
                        {vehicle?.name}
                      </Text>
                      <Text
                        fontSize={{ base: "14px", xl: "18px" }}
                        fontWeight="400"
                        color="#000000"
                        fontStyle={"normal"}
                        fontFamily={{
                          base: "var(--font-toyotaDisplay)",
                          xl: "var(--font-ToyotaType-Regular)",
                        }}
                        marginTop={{ base: "8px", xl: "0px" }}
                        lineHeight={{ base: "140%", xl: "normal" }}
                      >
                        {vehicle.type || "Gasolina"}
                      </Text>
                    </View>
                    <View>
                      <Text
                        fontSize={{ base: "12px", xl: "14px" }}
                        fontStyle={"normal"}
                        fontWeight="400"
                        color="#000000"
                        lineHeight={{ base: "normal", xl: "19.6px" }}
                        fontFamily={{
                          base: "var(--font-ToyotaType-Regular)",
                          xl: "var(--font-toyotaDisplay)",
                        }}
                      >
                        {attribs["cotizar"] ||
                          "Un ícono de resistencia y durabilidad"}
                      </Text>
                    </View>
                    <View>
                      <Text
                        fontSize={{ base: "9px", xl: "12px" }}
                        fontStyle={"normal"}
                        lineHeight={"100%"}
                        color="#58595B"
                        letterSpacing={"0%"}
                        fontFamily="var(--font-ToyotaType-Regular)"
                      >
                        Desde
                      </Text>
                      <Text
                        fontSize={{ base: "18px", xl: "22px" }}
                        fontWeight="500"
                        fontStyle={"normal"}
                        lineHeight={"normal"}
                        color="black"
                        fontFamily="var(--font-ToyotaType-Regular)"
                      >
                        $ {getVehiclePricecard(vehicle)}
                      </Text>
                      <Text
                        fontSize={{ base: "9px", xl: "12px" }}
                        marginBottom="15px"
                        fontStyle={"normal"}
                        lineHeight={"normal"}
                        color="#58595B"
                        fontWeight="400"
                        fontFamily="var(--font-ToyotaType-Regular)"
                      >
                        *Precio sugerido al público
                      </Text>
                      <Divider
                        orientation="horizontal"
                        borderColor={"#58595B"}
                        size="small"
                      />
                    </View>
                  </Flex>
                  <Flex
                    fontSize="sm"
                    justifyContent={"center"}
                    alignItems="center"
                  >
                    {destailsButton ? (
                      <>
                        <Button
                          color="transparentBlack"
                          textColor="black"
                          padding=".625rem 1.4375rem"
                          minWidth={{ base: "125px", xl: "", xxl: "" }}
                          maxWidth={{ base: "125px", xl: "125px" }}
                          maxHeight={{ base: "40px", xl: "40px" }}
                          onClick={() => {
                            setCurrentModelState(
                              vehicle.modelName || vehicle.name
                            );
                            router.push(vehicle?.cotizarLink || "#");
                          }}
                        >
                          <View
                            as="span"
                            width={{ large: "77px" }}
                            fontSize={"14px"}
                            fontStyle={"normal"}
                            fontWeight={"500"}
                            fontFamily={"var(--font-roboto)"}
                            lineHeight={"20px"}
                            letterSpacing={"0.1px"}
                            whiteSpace={"nowrap"}
                            maxWidth={{ base: "125px", xl: "125px" }}
                            textAlign={"center"}
                            maxHeight={{ base: "40px", xl: "40px" }}
                          >
                            Cotizar
                          </View>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          color="transparentBlack"
                          textColor="black"
                          padding=".563rem 1.370rem"
                          onClick={() => {
                            setCurrentModelState(
                              vehicle.modelName || vehicle.name
                            );
                            router.push(vehicle?.cotizarLink || "#");
                          }}
                        >
                          <View
                            as="span"
                            fontSize="0.875rem"
                            fontWeight="500"
                            lineHeight="1.25rem"
                            whiteSpace="nowrap"
                          >
                            Cotizar
                          </View>
                        </Button>
                      </>
                    )}
                  </Flex>
                </Flex>
              </Card>
            );
          }}
        </Collection>
      </View>
    </View>
  );
};
