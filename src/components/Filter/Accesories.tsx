/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import "./Filter.css";
import "nouislider/distribute/nouislider.css";
import { Container, RangeItem } from "./Components";
import { FilterPanelChildProps } from ".";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SelectItem } from "./Components/SelectItem";
import { Text } from "@aws-amplify/ui-react";
interface Product {
  id: string;
  name: string;
  slug: string;
  serialNumber?: string;
  category?: {
    id: string;
    type: string;
    shipmentDate?: string | null;
  };
  vehicle?: {
    name: string;
    slug: string;
    image?: string | null;
  };
  productsAttribs?: {
    items: {
      id: string;
      name: string;
      key?: string;
      value: string;
    }[];
  };
  priceListLines?: {
    items?: {
      value?: number;
    }[];
  };
}

interface FilterProps extends FilterPanelChildProps {
  filters: Record<string, string[]>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  vehicleData: {
    slug?: string;
    name?: string;
    category: {
      type: string;
    };
  }[];
  productData: Product[];
}

export const Filter: React.FC<FilterProps> = ({
  filters,
  setFilters,
  opened,
  toggle,
  vehicleData = [],
  productData = [],
}) => {
  const allowedModels = [
    "corolla",
    "yaris",
    "land cruiser prado",
    "yaris cross",
    "rav-4",
    "4runner",
    "fortuner",
    "corolla cross",
    "tundra",
    "hilux",
    "tacoma",
  ];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const clearFilters = () => {
    setFilters({});
    setPriceRangeSelected(priceRange);
    setIsPriceTouched(false);
  };

  function applyFilters(): void {
    toggle();
  }
  const categoryOptions = [
    { label: "Todos", value: "Todos" },
    { label: "Accesorios", value: "accesorios" },
    { label: "Repuestos", value: "repuestos" },
    { label: "Boutique", value: "boutique" },
  ];

  const typeOptions = useMemo(() => {
    const types = productData
      ?.map((product) => product.serialNumber)
      .filter((type): type is string => !!type);

    const uniqueTypes = Array.from(new Set(types));

    return [
      { value: "Todos", label: "Todos" },
      ...uniqueTypes.map((type) => ({
        value: type,
        label: type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, " "),
      })),
    ];
  }, [productData]);

  const vehicleOptions = useMemo(() => {
    const normalize = (str: string) =>
      str.toLowerCase().replace(/-/g, " ").trim();

    const models = vehicleData
      ?.map((v) => v?.slug || v?.name)
      .filter((model): model is string => !!model)
      .map((m) => normalize(m));

    // Keep only allowed models, but normalized
    const filteredModels = allowedModels.filter((allowed) =>
      models.includes(normalize(allowed))
    );

    return [
      ...filteredModels.map((model) => ({
        value: model.replace(/ /g, "-"), // slug-friendly value
        label: model
          .split(" ")
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(" "),
      })),
    ];
  }, [vehicleData]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "Todos" ? [] : [value],
    }));

    const newParams = new URLSearchParams(searchParams.toString());

    if (key === "Categoría") {
      if (value === "Todos") {
        newParams.delete("type");
      } else {
        newParams.set("type", value);
      }
    }

    if (key === "Modelo del vehículo") {
      if (value === "Todos") {
        newParams.delete("model");
      } else {
        newParams.set("model", value);
      }
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  // Extract all numeric prices from productData
  const allPrices = productData.flatMap((product) =>
    (product.priceListLines?.items ?? [])
      .map((item) => item?.value)
      .filter(
        (value): value is number => typeof value === "number" && !isNaN(value)
      )
  );

  const lowerDataPrice = allPrices.length ? Math.min(...allPrices) : 1;
  const greaterDataPrice = allPrices.length
    ? Math.max(...allPrices)
    : 85_000_000;
  const priceRange: number[] = [lowerDataPrice, greaterDataPrice];

  // const lowerDataPrice = allPrices.length ? Math.min(...allPrices) : 85000000;
  // const greaterDataPrice = allPrices.length
  //   ? Math.max(...allPrices)
  //   : 400000000;
  // const priceRange: number[] = [lowerDataPrice, greaterDataPrice];

  const priceRangeSuggested: number[] = [lowerDataPrice, greaterDataPrice];
  const [isPriceTouched, setIsPriceTouched] = useState(false);

  const [priceRangeSelected, setPriceRangeSelected] =
    useState<number[]>(priceRangeSuggested);

  useEffect(() => {
    if (isPriceTouched) {
      setFilters((prev) => ({
        ...prev,
        Precio: [
          priceRangeSelected[0].toString(),
          priceRangeSelected[1].toString(),
        ],
      }));
    }
  }, [priceRangeSelected, isPriceTouched]);

  useEffect(() => {
    const modelParam = searchParams.get("model");
    if (modelParam) {
      setFilters((prev) => ({
        ...prev,
        "Modelo del vehículo": [modelParam],
      }));
    }
  }, [searchParams, setFilters]);

  return (
    <>
      <style>
        {`
        @media (min-width: 990px) {
        .css-pjbozy-menu{
        position: absolute !important;
        left:25px !important;
        }
        }
    `}
      </style>
      <Container
        showFilters={opened}
        toggleShowFilters={toggle}
        onApply={applyFilters}
        onClear={clearFilters}
        expandedFilters={["Modelo del vehículo", "Tipo", "Categoría", "Precio"]}
      >
        <Text className="filters-dropdown">
          <SelectItem
            title="Modelo del vehículo"
            placeHolder="Todos"
            elements={vehicleOptions}
            value={
              vehicleOptions.find(
                (opt) =>
                  opt.value === (filters["Modelo del vehículo"]?.[0] || "Todos")
              ) || null
            }
            handleChange={(e: any) =>
              handleFilterChange("Modelo del vehículo", e.value)
            }
          />
        </Text>
        {/* <Text className="filters-dropdown">
          <SelectItem
            title="Tipo"
            placeHolder="Todos"
            elements={typeOptions}
            value={
              typeOptions.find(
                (opt) => opt.value === (filters["Tipo"]?.[0] || "Tipo")
              ) || null
            }
            handleChange={(e: any) => handleFilterChange("Tipo", e.value)}
          />
        </Text>
        <Text className="filters-dropdown">
          <SelectItem
            title="Categoría"
            placeHolder="Todos"
            elements={categoryOptions}
            value={
              categoryOptions.find(
                (opt) => opt.value === (filters["Categoría"]?.[0] || "Todos")
              ) || null
            }
            handleChange={(e: any) => handleFilterChange("Categoría", e.value)}
          />
        </Text> */}

        <RangeItem
          title="Precio"
          rangeHelperText="Precio sugerido al público"
          selectedRange={priceRangeSelected}
          priceRange={priceRange}
          setSelectedRange={(range) => {
            setIsPriceTouched(true);
            setPriceRangeSelected(range);
          }}
          selectedRangeStartText={new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
          }).format(priceRangeSelected[0])}
          selectedRangeEndText={new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
          }).format(priceRangeSelected[1])}
        />
      </Container>
    </>
  );
};
