/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Accordion, Flex, Image, Text, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./Filter.css";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { AccordionItem, Container } from "./Components";
import { FilterPanelChildProps } from ".";

type Vehicle = {
  id?: string;
  slug?: string;
  name: string;
  image: string;
  category: { type: string[] };
  vehicleAttribs: {
    items: {
      id?: string;
      key?: string;
      name?: string;
      value?: string;
    }[];
  };
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
};

interface FilterProps extends FilterPanelChildProps {
  filters: Record<string, string[]>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  filterData: Vehicle[];
}

export const Filter: React.FC<FilterProps> = ({
  filters,
  setFilters,
  opened,
  toggle,
  filterData = [],
}) => {
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

  const clearFilters = () => {
    setFilters({});
    setPriceRangeSelected(priceRangeSuggested);
  };
  function applyFilters(): void {
    // Sync priceRangeSelected into filters under a "price" key
    setFilters((prev) => {
      const updated = { ...prev };
      if (priceChanged) {
        updated.Precio = priceRangeSelected.map(String);
      }
      return updated;
    });

    toggle();
  }

  const allPrices =
    filterData.flatMap(
      (vehicle) =>
        vehicle.models?.items?.flatMap(
          (model) =>
            model.modelsByYear?.items?.flatMap(
              (year) =>
                year.priceListsByFeature?.items?.flatMap((feature) => {
                  const price = feature.priceList?.name
                    ? parseInt(feature.priceList.name.replace(/[^\d]/g, ""), 10)
                    : undefined;
                  return price ? [price] : [];
                }) ?? []
            ) ?? []
        ) ?? []
    ) ?? [];

  const lowerDataPrice = allPrices.length ? Math.min(...allPrices) : 85000000;
  const greaterDataPrice = allPrices.length
    ? Math.max(...allPrices)
    : 400000000;
  const priceRange: number[] = [lowerDataPrice, greaterDataPrice];

  const priceRangeSuggested: number[] = [85000000, 360000000];

  const [priceRangeSelected, setPriceRangeSelected] =
    useState<number[]>(priceRangeSuggested);
  const [priceChanged, setPriceChanged] = useState(false);


  const sliderRef = useRef<any>(null);
  const sliderSubject = useRef(new Subject<number[]>()).current;

  useEffect(() => {
    const subscription = sliderSubject
      .pipe(debounceTime(200))
      .subscribe((value) => {
        setPriceChanged(true);
        setPriceRangeSelected(value);

        setFilters((prev) => ({
          ...prev,
          Precio: [value[0].toString(), value[1].toString()],
        }));
      });

    return () => subscription.unsubscribe();
  }, [sliderSubject]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.noUiSlider.updateOptions({
        start: priceRangeSelected,
      });
    }
  }, [priceRangeSelected]);

  function onSlide(render: any, handle: any, value: number[]): void {
    sliderSubject.next([value[0], value[1]]);
  }

  return (
    <Container
      showFilters={opened}
      toggleShowFilters={toggle}
      onApply={applyFilters}
      onClear={clearFilters}
      expandedFilters={["price", "Vehiculos", "seats", "models"]}
    >
      <AccordionItem
        key="vehicles"
        item={{
          title: "Vehículos",
          value: "vehicles",
          elements: Object.entries(
            filterData?.reduce(
              (acc, v) => {
                const types = v?.category?.type;
                if (Array.isArray(types)) {
                  types.forEach((t) => {
                    acc[t] = (acc[t] || 0) + 1;
                  });
                }
                return acc;
              },
              {} as Record<string, number>
            )
          ).map(([type, count]) => ({
            label: type,
            name: type,
            value: type,
            amount: count,
          })),
        }}
        filters={filters}
        handleCheckboxChange={handleCheckboxChange}
      />

      <Accordion.Item
        value={"price"}
        key={"price"}
        borderRadius={{ base: "0" }}
        style={{
          borderLeft: 0,
          borderRight: 0,
          borderBottom: 0,
          borderTop: "1px solid #D9D9D9",
        }}
      >
        <Accordion.Trigger
          fontSize={{ base: "md" }}
          fontFamily="var(--font-ToyotaType-Regular)"
          padding={"30px 0 22px"}
        >
          Precio
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content paddingInlineStart={"0px"} paddingBottom={30}>
          <View className={"rangeSlider"}>
            <View marginBottom="25px">
              <Text
                fontSize={"ss"}
                fontFamily="var(--font-ToyotaType-Regular)"
                fontWeight={400}
              >
                Precio sugerido al público
              </Text>
              <Flex gap={"1.6875rem"} fontSize={"sm"}>
                <Text fontFamily="var(--font-toyotaDisplay)">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(priceRangeSelected[0])}
                </Text>
                <Text fontFamily="var(--font-toyotaDisplay)">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(priceRangeSelected[1])}
                </Text>
              </Flex>
            </View>
            <View className={"range"}>
              <Nouislider
                ref={sliderRef}
                range={{ min: priceRange[0], max: priceRange[1] }}
                start={priceRangeSelected}
                connect
                step={100000}
                onSlide={onSlide}
              />
            </View>

            <Flex gap={"9px"} alignItems={"center"}>
              <View>
                <Text
                  fontFamily="var(--font-ToyotaType-Regular)"
                  className="range__title"
                  fontSize={"0.5625rem"}
                  fontWeight={"400"}
                  paddingBottom={"0.12rem"}
                >
                  Desde
                </Text>
                <input
                  type="text"
                  value={new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                    .format(priceRangeSelected[0])
                    .replace(/\s/g, "")}
                  className="minInput"
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^\d]/g, "");
                    let value = parseInt(numericValue, 10);
                    if (isNaN(value)) value = priceRange[0];
                    value = Math.max(
                      priceRange[0],
                      Math.min(value, priceRange[1])
                    );
                    if (value > priceRangeSelected[1]) {
                      value = priceRangeSelected[1];
                    }

                    const newRange = [value, priceRangeSelected[1]];
                    setPriceRangeSelected(newRange);
                    setFilters((prev) => ({
                      ...prev,
                      Precio: newRange.map(String),
                    }));
                  }}
                />
              </View>

              <Image
                src={"/images/icons/range_divider.svg"}
                alt="Range"
                width="14px"
                marginTop={14}
              />

              <View>
                <Text
                  fontFamily="var(--font-ToyotaType-Regular)"
                  className="range__title"
                  fontSize={"0.5625rem"}
                  fontWeight={"400"}
                  paddingBottom={"0.12rem"}
                >
                  Hasta
                </Text>
                <input
                  type="text"
                  value={new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                    .format(priceRangeSelected[1])
                    .replace(/\s/g, "")}
                  className="maxInput"
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^\d]/g, "");
                    let value = parseInt(numericValue, 10);
                    if (isNaN(value)) {
                      value = priceRangeSelected[1];
                    }
                    value = Math.max(
                      priceRange[0],
                      Math.min(value, priceRange[1])
                    );
                    if (value < priceRangeSelected[0]) {
                      value = priceRangeSelected[0];
                    }

                    const newRange = [priceRangeSelected[0], value];
                    setPriceRangeSelected(newRange);
                    setFilters((prev) => ({
                      ...prev,
                      Precio: newRange.map(String),
                    }));
                  }}
                />
              </View>
            </Flex>
          </View>
        </Accordion.Content>
      </Accordion.Item>
      <AccordionItem
        key="seats"
        item={{
          title: "Asientos Disponibles",
          value: "seats",
          elements: Object.entries(
            filterData.reduce(
              (acc, vehicle) => {
                vehicle?.vehicleAttribs?.items?.forEach((attrib) => {
                  if (attrib.name === "Asientos Disponibles") {
                    const seatCount = attrib.value;
                    if (seatCount) {
                      acc[seatCount] = (acc[seatCount] || 0) + 1;
                    }
                  }
                });
                return acc;
              },
              {} as Record<string, number>
            )
          ).map(([seat, count]) => ({
            label: seat,
            name: seat,
            value: seat,
            amount: count,
          })),
        }}
        filters={filters}
        handleCheckboxChange={handleCheckboxChange}
      />
      <AccordionItem
        key="Modelo"
        item={{
          title: "Modelo",
          value: "modelo",
          elements: Object.entries(
            filterData.reduce(
              (acc, vehicle) => {
                vehicle.models?.items?.forEach((model) => {
                  model.modelsByYear?.items?.forEach((year) => {
                    const yearName = year?.name;
                    if (yearName) {
                      acc[yearName] = (acc[yearName] || 0) + 1;
                    }
                  });
                });
                return acc;
              },
              {} as Record<string, number>
            )
          ).map(([year, count]) => ({
            label: year,
            name: year,
            value: year,
            amount: count,
          })),
        }}
        filters={filters}
        handleCheckboxChange={handleCheckboxChange}
      />
    </Container>
  );
};
