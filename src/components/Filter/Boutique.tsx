import { useEffect, useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import "./Filter.css";
import "nouislider/distribute/nouislider.css";
import { Container, RangeItem } from "./Components";
import { FilterPanelChildProps } from ".";
import { SelectItem } from "./Components/SelectItem";
import { Text } from "@aws-amplify/ui-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
  vehicleData?: {
    slug?: string;
    name?: string;
    category: {
      type: string;
    };
  }[];
  productData: Product[];
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
}

export const Filter: React.FC<FilterProps> = ({
  filters,
  setFilters,
  opened,
  toggle,
  vehicleData = [],
  productData = [],
  setSelectedType,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const clearFilters = () => {
    setFilters({});
    setIsPriceTouched(false); // reset touched flag
    setPriceRangeSelected(priceRangeSuggested); // reset slider to full range
  };
    function applyFilters(): void {
    toggle();
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "Todos" ? [] : [value],
    }));
  
    const newParams = new URLSearchParams(searchParams.toString());
  
    if (key === "Categoría") {
      if (value !== "Todos") {
        newParams.set("category", value.toLowerCase()); 
      } else {
        newParams.delete("category"); 
      }
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const typeOptions = [
    { label: "Todos", value: "Todos" },
    { label: "Merch", value: "merch" },
    { label: "Prendas", value: "prendas" },
  ];

// Extract all numeric prices from productData
const allPrices = productData.flatMap((product) =>
  (product.priceListLines?.items ?? [])
    .map((item) => item?.value)
    .filter((value): value is number => typeof value === "number" && !isNaN(value))
);

// Compute dynamic min & max
const lowerDataPrice = allPrices.length ? Math.min(...allPrices) : 1;
const greaterDataPrice = allPrices.length ? Math.max(...allPrices) : 85_000_000;
const priceRange: number[] = [lowerDataPrice, greaterDataPrice];

// Dynamic suggested price range
const priceRangeSuggested: number[] = [lowerDataPrice, greaterDataPrice];

// State with suggested range as initial
const [priceRangeSelected, setPriceRangeSelected] =
  useState<number[]>(priceRangeSuggested);
  const [isPriceTouched, setIsPriceTouched] = useState(false);

  // Ensure the selected range stays within the boundaries of the dynamic range
  const handleSliderChange = (range: number[]) => {
    const clampedRange = [
      Math.max(range[0], priceRange[0]), 
      Math.min(range[1], priceRange[1]), 
    ];
    setIsPriceTouched(true);
    setPriceRangeSelected(clampedRange);
  };

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

  return (
    <Container
      showFilters={opened}
      toggleShowFilters={toggle}
      onApply={applyFilters}
      onClear={clearFilters}
      expandedFilters={["Categoría", "Precio"]}
    >
      <Text className="filters-dropdown">
        <SelectItem
          title="Categoría"
          placeHolder="Todas"
          elements={typeOptions}
          value={
            typeOptions.find(
              (opt) => opt.value === (filters["Categoría"]?.[0] || "Todas")
            ) || null
          }
          handleChange={(e: any) => handleFilterChange("Categoría", e.value)}
        />
      </Text>

      <RangeItem
        title="Precio"
        rangeHelperText="Precio sugerido al público"
        selectedRange={priceRangeSelected}
        priceRange={priceRange} // Dynamic price range based on product data
        setSelectedRange={handleSliderChange} // Update the selected range with user interaction
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
  );
};
