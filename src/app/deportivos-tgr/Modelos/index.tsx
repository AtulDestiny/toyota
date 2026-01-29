// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { NewVehiclesFilter as Filter } from "@/components/Filter";
import { NewVehiclesCardList } from "@/components/CardsList";
import renderComponent from "@/utils/renderComponent";
import {
  Button,
  Grid,
  Flex,
  useBreakpointValue,
  View,
  Image,
  Text,
  CheckboxField,
  TextField,
  Divider,
} from "@aws-amplify/ui-react";
import { useModelStore } from "@/providers/model-store-provider";
import { useRouter } from "next/navigation";
import { fetchVehicle } from "@/providers/getVehicleList";
import { useQuery } from "@tanstack/react-query";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

const pageData: ComponentData[] = [
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Modelos </br> Toyota Gazoo Racing Colombia",
        fontSize: { base: "32px", xl: "32px" },
        fontFamily: "var(--font-decimaMonoPro)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "41.6px",
        textAlign: { base: "center", xl: "center" },
        padding: { base: "73px 35px 58px 35px", xl: "80px 0 78px" },
        margin: { base: "0 auto", xl: "" },
        color: "#fff",
      },
      viewstyle: {
        backgroundColor: "#000",
      },
    },
  },
];
export function ModelosComponent() {
  const isMobile = useBreakpointValue({ base: true, xl: false });

  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [filterPanel, setFilterPanel] = useState<boolean>(false);


  const { data, isLoading, isError } = useQuery({
    queryKey: ["vehicle"],
    queryFn: () => fetchVehicle(),
  });

  // Map URL parameter to filter values
  const getFilterValueForTipo = (tipo: string | null): string | null => {
    switch (tipo?.toLowerCase()) {
      case "autos":
        return "Automoviles";
      case "camionetas":
        return "Camionetas";
      case "pick-ups":
        return "Pick-Ups";
      case "hibridos":
        return "Hibridos";
      case "deportivos":
        return "Deportivos";
      default:
        return null;
    }
  };

  function toggleFilterPanel(): void {
    setFilterPanel(!filterPanel);
  }

  const vehiclesData: Vehicle[] = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data
      .filter(
        (model: any) =>
          model?.isActive === true && model?.isVehicleShownOnHomePage === true
      )
      .map((model: any) => {
        const vehicleAttribs = model?.vehicle?.vehicleAttribs?.items || [];

        // Fallback or first available price
        const price =
          model?.modelsByYear?.items?.[0]?.priceListsByFeature?.items?.[0]
            ?.priceListLines?.items?.[0]?.value || null;

        const image = model?.quotesMainImage || model?.posterImageDesktop;

        return {
          id: model?.id,
          name: model?.modelName ?? "Sin nombre",
          slug: model?.slug ?? "sin-slug",
          description: model?.quotesDescription ?? "Descripción no disponible",
          image: image,
          cotizarLink: model?.cotizarLink ? model?.cotizarLink : `/cotizador/${model?.slug ?? "cotizador"}`,
          link: model?.detailPageLink ?? `/vehiculos/${model?.slug ?? "modelo"}`,
          type: model?.vehicleFuelType ?? "Gasolina",
          category: {
            type:
              model?.modelCategories?.items?.map(
                (item: any) => item?.category?.name
              ) ?? [],
          },
          vehicleAttribs: {
            items: vehicleAttribs,
          },
          models: {
            items: [
              {
                id: `model-${model?.id}`,
                name: model?.modelName ?? "Modelo",
                value: model?.modelName ?? "Modelo",
                modelsByYear: {
                  items: model?.modelsByYear?.items?.map((yearItem: any) => ({
                    name: yearItem?.name ?? "Año desconocido",
                    priceListsByFeature: {
                      items:
                        yearItem?.priceListsByFeature?.items?.map(
                          (priceItem: any) => ({
                            priceList: {
                              name:
                                priceItem?.priceListLines?.items?.[0]?.value
                                  ?.toLocaleString("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                    minimumFractionDigits: 0,
                                  }) ?? "Precio no disponible",
                            },
                          })
                        ) ?? [],
                    },
                  })),
                },
              },
            ],
          },
        };
      });
  }, [data]);


  return (
    <React.Fragment>
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}

      <View backgroundColor={"#F6F6F6"} border={"4px solid white"}>
        <Grid
          templateColumns={{ xl: "auto 1fr", xxl: "378px auto" }}
          gap={{ xl: "2rem", xxl: "5.4375rem" }}
          maxWidth={"1920px"}
          position={{ base: "static", xl: "relative" }}
          margin={"0 auto"}
        >
          <View
            position={{ xl: "sticky" }}
            top={{ xl: "50px" }}
            alignSelf="start"
          >
            <Filter
              filters={filters}
              setFilters={setFilters}
              opened={filterPanel}
              toggle={toggleFilterPanel}
              filterData={vehiclesData}
            />
          </View>
          <NewVehiclesCardList
            filters={filters}
            toggleFilterPanel={toggleFilterPanel}
            destailsButton={true}
            data={vehiclesData}
          />
        </Grid>
      </View>
    </React.Fragment>
  );
}

// Define the type for Car component props
interface CarProps {
  title: string;
  type: string;
  price: string;
  description: string;
  image: string;
  link: string;
  cotizarLink?: string;
  modelName?: string;
}

const Car: React.FC<CarProps> = ({
  title,
  type,
  price,
  description,
  image,
  link,
  cotizarLink,
  modelName,
}) => {
  const { setCurrentModelState } = useModelStore((state) => state);
  const router = useRouter();
  return (
    <Flex
      boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px"
      backgroundColor="#fff"
      padding="20px"
      borderRadius="10px"
      alignContent="center"
      justifyContent="center"
    >
      <Flex direction="column" gap={"0"}>
        <Image
          src={image}
          alt={title}
          height="auto"
          maxHeight="200px"
          width="100%"
          borderRadius="8px"
        />
        <Text fontSize="22px" fontWeight="bold" lineHeight="28px">
          {title}
        </Text>
        <Text fontWeight="400" fontSize="14px">
          {type}
        </Text>
        <Text fontSize="12px" marginTop="10px">
          {description}
        </Text>
        <View marginTop="20px">
          <Text fontSize="9px">Desde</Text>
          <Text fontSize="18px">{price}</Text>
          <Text fontSize="9px">*Precio sugerido al público</Text>
        </View>

        <Flex justifyContent="space-between" paddingTop="10px" marginTop="auto">
          {/* Ver Detalles Button with Link */}
          <a href={link} style={{ textDecoration: "none" }}>
            <Button
              style={{
                width: "125px",
                height: "40px",
                fontFamily: "var(--font-roboto)",
                fontSize: "14px",
              }}
            >
              Ver Detalles
            </Button>
          </a>

          <Flex
            alignItems="center"
            style={{
              cursor: "pointer",
              color: "#D42224",
              textDecoration: "underline",
            }}
            onClick={() => {
              setCurrentModelState(modelName || title);
              router.push(cotizarLink);
            }}
          >
            Cotizar
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
