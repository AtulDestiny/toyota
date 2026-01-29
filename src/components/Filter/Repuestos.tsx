/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import "./Filter.css";
import "nouislider/distribute/nouislider.css";
import { Container, RangeItem } from "./Components";
import { FilterPanelChildProps } from ".";
import { SelectItem } from "./Components/SelectItem";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Text } from "@aws-amplify/ui-react";

interface Product {
  id: string;
  name: string;
  slug: string;
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const vehicleOptions = useMemo(() => {
    const allowedRepuestosModels = [
      "corolla",              
      "land cruiser prado",
      "fj cruiser",
      "rush",
      "rav4",
      "4runner",
      "fortuner",
      "land cruiser 200",     
      "hilux",           
      "land cruiser",        
    ];

    const normalize = (str: string) =>
      str.toLowerCase().replace(/-/g, " ").trim();

    // Normalize all vehicleData slugs/names
    const models = vehicleData
      ?.map((v) => v?.slug || v?.name)
      .filter((model): model is string => !!model)
      .map((m) => normalize(m));

    // Keep only allowed ones, normalized
    const filteredModels = allowedRepuestosModels.filter((allowed) =>
      models.includes(normalize(allowed))
    );

    return [
      { value: "Todos", label: "Todos" },
      ...filteredModels.map((model) => {
        const normalized = normalize(model);
        return {
          value: normalized.replace(/ /g, "-"), // slug-friendly value
          label: normalized
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(" "),
        };
      }),
    ];
  }, [vehicleData]);

  const clearFilters = () => {
    setFilters({});
    setPriceRangeSelected(priceRange);
    setIsPriceTouched(false);
  };

  function applyFilters(): void {
    toggle();
  }

  const allPrices = productData.flatMap((product) =>
    (product.priceListLines?.items ?? [])
      .map((item) => item?.value)
      .filter(
        (value): value is number => typeof value === "number" && !isNaN(value)
      )
  );

  // Compute dynamic min & max
  const lowerDataPrice = allPrices.length ? Math.min(...allPrices) : 1;
  const greaterDataPrice = allPrices.length
    ? Math.max(...allPrices)
    : 85_000_000;
  const priceRange: number[] = [lowerDataPrice, greaterDataPrice];

  const priceRangeSuggested: number[] = [lowerDataPrice, greaterDataPrice];

  const [priceRangeSelected, setPriceRangeSelected] =
    useState<number[]>(priceRangeSuggested);
  const [isPriceTouched, setIsPriceTouched] = useState(false);

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

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "Todos" ? [] : [value],
    }));

    const newParams = new URLSearchParams(searchParams.toString());
    if (key === "Modelo del vehículo") {
      if (value === "Todos") {
        newParams.delete("model");
      } else {
        newParams.set("model", value);
      }
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

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
        .amplify-accordion__item__content{
        padding-bottom: 40px !important; }

        @media (max-width: 720px) {
          .amplify-accordion__item__trigger{
          padding:15px 0 30px 0 !important;
          }
          }
    `}
      </style>
      <Container
        showFilters={opened}
        toggleShowFilters={toggle}
        onApply={applyFilters}
        onClear={clearFilters}
        expandedFilters={["Modelo del vehículo", "Precio"]}
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

        <RangeItem
          title="Precio"
          rangeHelperText="Precio de venta IVA incluído"
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
