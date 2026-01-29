import {
  View,
  Flex,
  Grid,
  Collection,
  Heading,
  Image,
  useBreakpointValue,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Option, Select } from "@/components/Layout/Select/Select";
import Button from "../../Layout/Button/Button";
import "./Marketplace.css";
import { MarketplaceCard } from "@/components/Cards/MarketplaceCard/MarketplaceCard";
import Link from "next/link";
import { useMemo, useState } from "react";

export interface Vehicle {
  id: string;
  name: string;
  year: string;
  type: string;
  vehicleSlug: string;
  serialNumber?: string;
  vehicleName: string;
  categoryType: string;
  price: number;
  description: string;
  img: string;
}

export enum SelectTheme {
  Dark = "dark",
  Light = "light",
}

interface VehiclesGridProps {
  filters: Record<string, string[]>;
  toggleFilterPanel: () => void;
  destailsButton?: boolean;
  type: string;
  items?: Vehicle[];
}

export const Marketplace: React.FC<VehiclesGridProps> = ({
  filters,
  toggleFilterPanel,
  type,
  items = [],
}) => {
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const [sortOption, setSortOption] = useState("menor");

  const filteredVehicles = useMemo(() => {
    const filtered = items.filter((product) => {
      return Object.entries(filters).every(([key, values]) => {
        if (!values.length) return true;

        switch (key) {
          case "Modelo del vehículo":
            return values.includes(product.vehicleSlug);
          case "Categoría":
            return (
              product.categoryType &&
              values
                .map((v) => v.toLowerCase())
                .includes(product.categoryType.toLowerCase())
            );
          case "Tipo de producto":
            return values.includes(product.categoryType?.toLowerCase());
          case "Tipo":
            return values.includes(product.type);
          case "Precio":
            const [min, max] = values.map(Number);
            return product.price >= min && product.price <= max;
          default:
            return true;
        }
      });
    });

    const sorted = [...filtered];
    switch (sortOption) {
      case "a-z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "menor":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "mayor":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "recientes":
      default:
        break;
    }

    return sorted;
  }, [items, filters, sortOption]);

  const placesList: Option[] = [
    { label: "Recientes", value: "recientes" },
    { label: "Repuestos: A-Z", value: "a-z" },
    { label: "Repuestos: Z-A", value: "z-a" },
    { label: "Precio: Mayor a Menor", value: "menor" },
    { label: "Precio: Menor a Mayor", value: "mayor" },
  ];

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
        padding={{ base: "0rem 1rem 1rem 1rem", xl: "2.19rem 2.5rem 0 " }}
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
              href={`/mi-toyota/posventa/marketplace/detalle?id=${vehicle.id}&type=${type}`}
              key={index}
            >
              <MarketplaceCard
                title={vehicle.name}
                id={vehicle.id}
                price={vehicle.price}
                imageSrc={vehicle.img}
                description={vehicle.description}
                subDescription={vehicle.type}
                showSuggestedPrice
                showReferenceImage
                addedFavorite={false}
                backgroundColor="white"
                minWidth={isMobile ? "445px" : "100%"}
                minHeight="528px" // Custom height
                imageHeight={{ base: "205px", xl: "263px" }}
                objectFit="cover"
              />
            </Link>
          )}
        </Collection>
      </View>
    </>
  );
};
