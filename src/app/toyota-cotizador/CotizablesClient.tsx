"use client";
import { useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import SectionTitle from "@/components/Layout/SectionTitle/SectionTitle";
import { NewVehiclesFilter as Filter } from "@/components/Filter";
import { Grid, View } from "@aws-amplify/ui-react";
import { NewVehiclesCardList } from "@/components/CardsList";
import "./page.css";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicle } from "./queries";

export default function Cotizables({ slug }: { slug: string }) {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [filterPanel, setFilterPanel] = useState<boolean>(false);

  function toggleFilterPanel(): void {
    setFilterPanel(!filterPanel);
  }
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mantenimiento"],
    queryFn: () => fetchVehicle(slug, "mantenimiento"),
    enabled: !!slug,
  });

  return (
    <>
      <SectionTitle
        title={
          <>
            Cotiza tu{" "}
            <span className="mobile-break">
              <br />
            </span>
            Toyota Colombia
          </>
        }
        subtitle="Encuentra el Toyota perfecto para ti:"
        titleFontSize={{ base: "32px" }}
        subtitleFontSize={{ base: "sm", xl: "md" }}
        padding={{ base: "33.17px 15px 2rem 16px", xl: "4rem 1rem 2.75rem" }}
        SubtitlefontFamily="var(--font-ToyotaType-Regular)"
        titleColor="#000000"
        titleFontWeight="400"
      />
      <View
        backgroundColor={"#F6F6F6"}
        padding={{ xl: "0 0 104px 0" }}
        marginBottom={{ xl: "4px" }}
      >
        <Grid
          templateColumns={{ xl: "auto 1fr" }}
          gap={{ xl: "2rem", xxl: "5.4375rem" }}
          maxWidth={"1920px"}
          margin={"0 auto"}
          className="item-wrapper"
        >
          <Filter
            filters={filters}
            setFilters={setFilters}
            opened={filterPanel}
            toggle={toggleFilterPanel}
            filterData={data}
          />
          {isLoading ? (
            <div>Loading....</div>
          ) : (
            <NewVehiclesCardList
              filters={filters}
              toggleFilterPanel={toggleFilterPanel}
              destailsButton={false}
              data={data}
            />
          )}
        </Grid>
      </View>
    </>
  );
}
