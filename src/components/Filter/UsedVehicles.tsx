'use client';

// /* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import "@aws-amplify/ui-react/styles.css";
import "./Filter.css";
import "nouislider/distribute/nouislider.css";
import {
  AccordionItem,
  Container,
  RangeItem,
  SelectRangeItem,
} from "./Components";
import { FilterPanelChildProps } from ".";
import { SelectItem } from "./Components/SelectItem";
import { Option } from "../Layout/Select/Select";
import { useQuery } from "@tanstack/react-query";
import { Text } from "@aws-amplify/ui-react";
import { fetchCitiesVehicles, fetchModels, fetchUsedDealershipsFromVehicles } from "./queries";

interface FilterProps extends FilterPanelChildProps {
  filters: Record<string, string[]>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}

export const Filter: React.FC<FilterProps> = ({
  filters,
  setFilters,
  opened,
  toggle,
}) => {
  const isFirstEffectRun = useRef(true);
  const [cities, setCities] = useState<{ label: string; value: string }[]>([]);
  const [model, setModel] = useState([]);
  const [dealership, setDealership] = useState<{ label: string; value: string }[]>([]);
  const { data: CityData, } = useQuery({
    queryKey: ["cities-principal"],
    queryFn: () => fetchCitiesVehicles(),
  });

  const { data: modelData } = useQuery({
    queryKey: ["models-principal"],
    queryFn: () => fetchModels(),
  });

  const { data: dealershipData } = useQuery({
    queryKey: ["dealship-principal"],
    queryFn: () => fetchUsedDealershipsFromVehicles(),
  });

  useEffect(() => {
    if (CityData) {
      const cityOptions = CityData.map((city: any) => ({
        label: city.name,
        value: city.id,
      }));
      setCities(cityOptions);
    }
  }, [CityData]);

  useEffect(() => {
    if (!modelData) return;

    const selectedCities = filters?.ciudad ?? [];
    const selectedDealerships = filters?.concesionario ?? [];

    const filteredModels = modelData.filter((item: any) => {
      const cityMatch =
        selectedCities.length === 0 ||
        selectedCities.includes(item?.dealership?.city?.id);

      const dealershipMatch =
        selectedDealerships.length === 0 ||
        selectedDealerships.includes(item?.dealership?.name);

      return cityMatch && dealershipMatch;
    });

    const uniqueModels: any = Array.from(
      new Map(
        filteredModels
          .filter((m: any) => m?.usedModel)
          .map((m: any) => [
            m.usedModel.id,
            {
              label: m.usedModel.modelName,
              value: m.usedModel.modelName, // ✅ better than name
            },
          ])
      ).values()
    );

    setModel(uniqueModels);
  }, [modelData, filters]);



  // useEffect(() => {
  //   if (dealershipData) {
  //     const dealsipOptions = dealershipData
  //       .map((model: any) => ({
  //         label: model.name,
  //         value: model.name,
  //       }))
  //       .sort((a: any, b: any) => a.label.localeCompare(b.label)); // ⬅ Sort A → Z

  //     setDealership(dealsipOptions);
  //   }
  // }, [dealershipData]);

  const handleCheckboxChange = (
    category: string,
    value: string,
    checked: boolean
  ) => {
    setFilters((prev) => {
      const updatedCategory = prev[category] || [];
      const updatedFilters = checked
        ? [...updatedCategory, value]
        : updatedCategory.filter((item) => item !== value);

      return { ...prev, [category]: updatedFilters };
    });
  };

  useEffect(() => {
    // Sync only on initial mount, or when filters are manually reset
    if (Object.keys(filters).length > 0) {
      setSelectedTipoUsado(
        filters["tipo_usado"]?.[0]
          ? { value: filters["tipo_usado"][0], label: filters["tipo_usado"][0] }
          : null
      );
      setSelectedCiudad(
        filters["ciudad"]?.[0]
          ? { value: filters["ciudad"][0], label: filters["ciudad"][0] }
          : null
      );
      setSelectedConsecionario(
        filters["concesionario"]?.[0]
          ? {
            value: filters["Concesionario"][0],
            label: filters["Concesionario"][0],
          }
          : null
      );
      setSelectedModelo(
        filters["modelo"]?.[0]
          ? { value: filters["modelo"][0], label: filters["modelo"][0] }
          : null
      );
      setSelectedVersion(
        filters["version"]?.[0]
          ? { value: filters["version"][0], label: filters["version"][0] }
          : null
      );

      const [desde, hasta] = filters["anio"] || [];
      setSelectedAnioDesde(desde ? { value: desde, label: desde } : null);
      setSelectedAnioHasta(hasta ? { value: hasta, label: hasta } : null);

      setPriceRangeSelected(
        filters["precio"]?.map(Number) || priceRangeSuggested
      );
      setKmRangeSelected(
        filters["kilometraje"]?.map(Number) || kmRangeSuggested
      );
    }
  }, []);

  function applyFilters(): void {
    const updatedFilters: Record<string, string[]> = {};

    if (
      priceRangeSelected[0] === priceRange[0] &&
      priceRangeSelected[1] === priceRange[1]
    ) {
      // Don't add precio filter
    } else {
      updatedFilters["precio"] = priceRangeSelected.map(String);
    }
    // tipo_usado
    if (selectedTipoUsado?.value && selectedTipoUsado.value !== "Todos") {
      updatedFilters["tipo_usado"] = [selectedTipoUsado.value];
    }

    // ciudad
    if (selectedCiudad?.value && selectedCiudad.value !== "Todas") {
      updatedFilters["ciudad"] = [selectedCiudad.value];
    }

    // consecionario
    if (
      selectedConsecionario?.value &&
      selectedConsecionario.value !== "Todos"
    ) {
      updatedFilters["concesionario"] = [selectedConsecionario.value];
    }

    // modelo
    if (selectedModelo?.value && selectedModelo.value !== "Todos") {
      updatedFilters["modelo"] = [selectedModelo.value];
    }

    // version
    if (selectedVersion?.value && selectedVersion.value !== "Todos") {
      updatedFilters["version"] = [selectedVersion.value];
    }

    // anio (año desde/hasta)
    if (selectedAnioDesde || selectedAnioHasta) {
      const anio = [selectedAnioDesde?.value, selectedAnioHasta?.value].filter(
        (val): val is string => typeof val === "string"
      );
      if (anio.length > 0) {
        updatedFilters["anio"] = anio;
      }
    }

    // precio (only if different from full range)
    if (
      priceRangeSelected[0] !== priceRange[0] ||
      priceRangeSelected[1] !== priceRange[1]
    ) {
      updatedFilters["precio"] = priceRangeSelected.map(String);
    }

    // kilometraje (only if different from full range)
    if (
      kmRangeSelected[0] !== kmRange[0] ||
      kmRangeSelected[1] !== kmRange[1]
    ) {
      updatedFilters["kilometraje"] = kmRangeSelected.map(String);
    }

    // Add any checkbox filters (like "Último dígito de la placa") here if needed
    // Example:
    if (filters["digit"]) {
      updatedFilters["digit"] = filters["digit"];
    }

    setFilters(updatedFilters);
    toggle();
  }


  const currentYear = new Date().getFullYear();
  // Generate dynamic year arrays
  const yearOptions = (start: number, end: number) => {
    const years = [];
    for (let y = end; y >= start; y--) {
      years.push({ value: String(y), label: String(y) });
    }
    return years;
  };

  const minYear = 2000;
  const maxYear = currentYear;

  const desdeYears = yearOptions(minYear, maxYear);
  const hastaYears = yearOptions(minYear, maxYear);


  const priceRange: number[] = [85000000, 400000000];

  const priceRangeSuggested: number[] = [85000000, 400000000];

  const [priceRangeSelected, setPriceRangeSelected] =
    useState<number[]>(priceRangeSuggested);

  const kmRange: number[] = [10, 250000];

  const kmRangeSuggested: number[] = [10, 250000];

  const [kmRangeSelected, setKmRangeSelected] =
    useState<number[]>(kmRangeSuggested);

  const [selectedTipoUsado, setSelectedTipoUsado] = useState<Option | null>(
    null
  );
  const [selectedCiudad, setSelectedCiudad] = useState<Option | null>(null);
  const [selectedConsecionario, setSelectedConsecionario] =
    useState<Option | null>(null);
  const [selectedModelo, setSelectedModelo] = useState<Option | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<Option | null>(null);
  const [selectedAnioDesde, setSelectedAnioDesde] = useState<Option | null>(
    null
  );
  const [selectedAnioHasta, setSelectedAnioHasta] = useState<Option | null>(
    null
  );

  const clearFilters = () => {
    setSelectedTipoUsado(null);
    setSelectedCiudad(null);
    setSelectedConsecionario(null);
    setSelectedModelo(null);
    setSelectedVersion(null);
    setSelectedAnioDesde(null);
    setSelectedAnioHasta(null);
    setPriceRangeSelected(priceRangeSuggested);
    setKmRangeSelected(kmRangeSuggested);
    setFilters({});
  };

  useEffect(() => {
    if (isFirstEffectRun.current) {
      isFirstEffectRun.current = false;
      return;
    }
    applyFilters();
  }, [
    selectedTipoUsado,
    selectedCiudad,
    selectedConsecionario,
    selectedModelo,
    selectedVersion,
    selectedAnioDesde,
    selectedAnioHasta,
    priceRangeSelected,
    kmRangeSelected,
  ]);

  useEffect(() => {
    if (!dealershipData) return;

    // If NO city selected → show empty list
    if (!selectedCiudad || !selectedCiudad.value) {
      setDealership([]);
      return;
    }

    // If city selected → filter dealerships
    const filteredDealers = dealershipData
      .filter((d: any) => d.city?.id === selectedCiudad.value)
      .map((d: any) => ({
        label: d.name,
        value: d.name,
      }))
      .sort((a: any, b: any) => a.label.localeCompare(b.label));

    setDealership(filteredDealers);
  }, [selectedCiudad, dealershipData]);

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
        expandedFilters={[
          "Precio",
          "Año",
          "Kilomentraje",
          "Tipo de usado",
          "Ciudad",
          "Modelo",
          "Concesionario",
          "Versión",
          "Último dígito de la placa",
        ]}
      >
        <Text className="filters-dropdown">
          <SelectItem
            title="Tipo de usado"
            placeHolder="Todos"
            elements={[
              { value: "Todos", label: "Todos" },
              { value: "true", label: "Certificado" },
              { value: "false", label: "No certificado" },
            ]}
            value={selectedTipoUsado}
            handleChange={(e) => setSelectedTipoUsado(e)}
          />
        </Text>
        <Text className="filters-dropdown">
          <SelectItem
            title="Ciudad"
            placeHolder="Todas"
            elements={cities}
            value={selectedCiudad}
            handleChange={(e) => setSelectedCiudad(e)}
          />
        </Text>
        <Text className="filters-dropdown">
          <SelectItem
            title="Concesionario"
            placeHolder="Todos"
            elements={dealership}
            value={selectedConsecionario}
            handleChange={(e) => setSelectedConsecionario(e)}
          />
        </Text>
        <Text className="filters-dropdown">
          <SelectItem
            title="Modelo"
            placeHolder="Todos"
            elements={model}
            value={selectedModelo}
            handleChange={(e) => setSelectedModelo(e)}
          />
        </Text>

        <SelectRangeItem
          title="Año"
          first={{
            placeHolder: "Desde",
            elements: desdeYears,
            handleChange: (e) => setSelectedAnioDesde(e),
            value: selectedAnioDesde,
          }}
          second={{
            placeHolder: "Hasta",
            elements: hastaYears,
            handleChange: (e) => setSelectedAnioHasta(e),
            value: selectedAnioHasta,
          }}
        />

        <RangeItem
          title="Precio"
          rangeHelperText="Precio de venta IVA incluído"
          selectedRange={priceRangeSelected}
          priceRange={priceRange}
          setSelectedRange={setPriceRangeSelected}
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
        <RangeItem
          title="Kilomentraje"
          selectedRange={kmRangeSelected}
          priceRange={kmRange}
          setSelectedRange={setKmRangeSelected}
          selectedRangeStartText={`${kmRangeSelected[0].toString()} KM`}
          selectedRangeEndText={`${kmRangeSelected[1].toString()} KM`}
        />
        {/* <AccordionItem
        key={"Último dígito de la placa"}
        item={{
          title: "Último dígito de la placa",
          value: "digit",
          elements: [
            { label: "Número par", name: "par", value: "par", amount: 42 },
            {
              label: "Número impar",
              name: "inpar",
              value: "inpar",
              amount: 27,
            },
          ],
        }}
        filters={filters}
        handleCheckboxChange={handleCheckboxChange}
      /> */}
      </Container>
    </>
  );
};
