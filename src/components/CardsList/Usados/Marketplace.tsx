import { colors } from "@/theme/colors";
import {
  View,
  Flex,
  Grid,
  Collection,
  Heading,
  Image,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Option, Select } from "@/components/Layout/Select/Select";
import Button from "../../Layout/Button/Button";
import "./Marketplace.css";
import { MarketplaceCard } from "@/components/Cards/MarketplaceCard/MarketplaceCard";
import Link from "next/link";
import { useBreakpointValue } from "@aws-amplify/ui-react";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsedVehicles } from "./queries";

interface Vehicle {
  name: string;
  year: string;
  type: string;
  price: string;
  description: string;
  img: string;
  vehicle: string;
}

export enum SelectTheme {
  Dark = "dark",
  Light = "light",
}

interface VehiclesGridProps {
  filters: Record<string, string[]>;
  toggleFilterPanel: () => void;
  destailsButton?: boolean;
}

export const Marketplace: React.FC<VehiclesGridProps> = ({
  filters,
  toggleFilterPanel,
}) => {

  const { data: Modeldata, isLoading, isError } = useQuery({
    queryKey: ["model-principal"],
    queryFn: () => fetchUsedVehicles(),
  });
  function mapVehiclesData(apiData: any[]) {
    return apiData?.map((vehicle) => {
      const numericPrice = Number(vehicle.price);

      return {
        id: vehicle.id,
        slug:vehicle.slug,
        name: `${vehicle.modelVersion.versionName.trim()}`,
        modelo: vehicle.usedModel.modelName.trim(),
        version: vehicle.modelVersion?.versionName?.trim(),
        tipo_usado: vehicle.certified ? "true" : "false",
        ciudad: vehicle?.dealership?.city?.id,
        concesionario: vehicle?.dealership?.name,
        year: vehicle?.modelVersion?.year?.toString(),
        kilometraje: vehicle?.mileage?.toString(),
        price: !isNaN(numericPrice) ? numericPrice : 0,
        img: vehicle?.displayImage || "/images/test-car-image.avif", // ✅ image from galleryJson
        subDescription: vehicle.dealership?.name,
        description: "",
        isFavorite: false,
      };
    });
  }
  // Usage example
  const vehiclesData = useMemo(() => {
    return Modeldata ? mapVehiclesData(Modeldata) : [];
  }, [Modeldata]);
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const isLarge = useBreakpointValue({ base: false, xl: false, xxl: true });
  const isDesktop = useBreakpointValue({ base: false, xl: true, xxl: false });
  const [sortOption, setSortOption] = useState<string | undefined>("menor");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const filteredVehicles = useMemo(() => {
    const filtered = vehiclesData.filter((vehicle: any) => {

      return Object.entries(filters).every(([category, values]) => {
        if (values.length === 0) return true;

        const value = vehicle[category as keyof typeof vehicle];

        if (category === "anio" && values.length === 2) {
          const year = parseInt(vehicle.year, 10);
          const [from, to] = values.map(Number);
          return year >= from && year <= to;
        }

        if (category === "precio" && values.length === 2) {
          const price = Number(vehicle.price); // ✅ numeric now
          const [min, max] = values.map(Number);
          return price >= min && price <= max;
        }

        if (category === "kilometraje" && values.length === 2) {
          const km = parseInt(vehicle.kilometraje?.toString().replace(/\D/g, ""), 10);
          const [min, max] = values.map(Number);
          return km >= min && km <= max;
        }

        return values.includes(value);
      });
    });

    switch (sortOption) {
      case "a-z":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case "z-a":
        return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
      case "mayor":
        return [...filtered].sort((a, b) => b.price - a.price); // ✅ numeric compare
      case "menor":
        return [...filtered].sort((a, b) => a.price - b.price);
      default:
        return filtered;
    }
  }, [filters, sortOption, vehiclesData]);

  const isBase = useBreakpointValue({
    base: true,
    xl: false,
  });
  const placesList: Option[] = [
    { label: "Recientes", value: "recientes" },
    { label: "Vehículos: A-Z", value: "a-z" },
    { label: "Vehículos: Z-A", value: "z-a" },
    { label: "Precio: Mayor a Menor", value: "mayor" },
    { label: "Precio: Menor a Mayor", value: "menor" },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p>Loading vehicles...</p>
      </div>
    );
  }

  return (
    <>
      {" "}
      <style>
        {`
         @media (max-width: 1990px) {
         .css-pjbozy-menu{
         position: absolute !important;
         left:-75px !important;
         }
         }
         .amplify-accordion__item:where(:first-of-type){
         border:none !important;
         }
         }
     `}
      </style>
      <View
        className="all-vehicles-cars-grid"
        backgroundColor={{ base: "white", xl: "#f6f6f6" }}
        padding={{ base: "0rem 1rem 1rem 1rem", xxl: "2.19rem 2.5rem 0 " }}
      >
        <Grid
          justifyContent="flex-start"
          templateColumns={{ base: "1fr 1fr", large: "1fr auto" }}
          alignItems={"center"}
          gap={{ base: "0.25rem", xl: "0.88rem" }}
          marginBottom={{ base: "45px", xl: "0" }}
        >
          <View display={{ base: "block", large: "none" }}>
            <Button
              color="transparentBlack"
              textColor="black"
              onClick={toggleFilterPanel}
              padding="0.62rem 1.5rem 0.62rem 1rem"
              style={{
                width: "101px",
              }}
            >
              <Flex
                alignItems={"center"}
                gap={"0.5rem"}
                maxHeight={"2.5rem"}
                justifyContent="center"
              >
                <Image
                  src="/images/funnel2.svg"
                  alt="Filter"
                  height={".6987rem"}
                />
                <View as="span" lineHeight={"1.137rem"}>
                  Filtros
                </View>
              </Flex>
            </Button>
          </View>
          <View
            className="all-vehicles-cars-grid__sort"
            width="216px"
            maxHeight={"2.5rem"}
            marginLeft="auto"
          >
            <Select
              options={placesList}
              selectedOption={placesList.find(
                (option) => option.value === sortOption
              )}
              onSelect={(selected) => {
                if (selected) {
                  setSortOption(selected.value);
                }
              }}
              placeholder="Organizar por"
              theme={SelectTheme.Light}
            // fixedPlaceholder
            />
          </View>
        </Grid>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          marginBottom={{ base: "11px", xl: "0" }}
        >
          <Heading
            level={4}
            lineHeight={"100%"}
            fontFamily={{
              base: "var(--font-toyotaDisplay)",
              xl: "var(--font-ToyotaType-Regular)",
            }}
            fontSize={{ base: "14px", xl: "24px" }}
            fontWeight={{ base: "400", xl: "700" }}
            position={"relative"}
            letterSpacing={"0"}
            top={{ base: "0", xl: "-25px" }}
          >
            {filteredVehicles.length} Resultados
          </Heading>
          <View display={{ base: "block", large: "none" }}>
            <Link
              href="/favoritos"
              style={{
                fontFamily: "var(--font-toyotaDisplay)",
                fontSize: "14px",
                fontWeight: "400",
                color: "#000",
                textDecoration: "underline",
              }}
            >
              Ver Favoritos
            </Link>
          </View>
        </Flex>
        <Flex
          justifyContent="flex-end"
          alignItems="center"
          marginBottom="2rem"
          display={{ base: "none", xl: "flex" }}
          marginTop={{ xl: "-1rem" }}
        ></Flex>

        <Collection
          items={filteredVehicles}
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
          {(vehicle, index) => (
            <Link
              key={index}
              className="card-box"
              href={`/cotiza-tu-toyota/vehiculos-usados/detalle/${vehicle?.slug}`}
            >
              <MarketplaceCard
                id={vehicle?.slug}
                title={vehicle.name}
                price={vehicle.price}
                imageSrc={vehicle.img}
                description={''}
                subDescription={vehicle.subDescription}
                addedFavorite={vehicle.isFavorite}
                backgroundColor="white"
                minWidth={isMobile ? "445px" : "100%"}
                minHeight={isLarge ? "528px" : isMobile ? "528px" : "432px"}// Custom height
                imageHeight={{ base: "205px", xl: "200px", xxl: "263px" }}
                objectFit={"cover"}
              />
            </Link>
          )}
        </Collection>
      </View>
    </>
  );
};
