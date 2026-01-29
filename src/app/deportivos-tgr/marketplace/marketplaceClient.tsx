"use client";

import { useEffect, useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import {
  BoutiqueFilter,
  RepuestosFilter,
  AccesoriesFilter,
} from "@/components/Filter";
import { Grid, View } from "@aws-amplify/ui-react";
import { Marketplace } from "@/components/CardsList";
import { SectionTitleMarketplace } from "@/components/Layout/SectionTitleMarketplace/SectionTitleMarketplace";
import { useSearchParams } from "next/navigation";
import { fetchProduct, fetchVehicle } from "./queries";
import { useQuery } from "@tanstack/react-query";
import SkeletonLoader from "@/components/SkeletonLoader/ProductSkeletonLoader";

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  serialNumber?: string;
  priceListLines: {
    items: {
      value: number;
    }[];
  };
  vehicle: {
    slug?: string;
    name?: string;
  };
  category: {
    type?: string;
  };
  mainCategory?: {
    id?: string;
    name?: string;
  };
  galleries: {
    items: {
      id: string;
      name: string;
      galleryAssets: {
        items: {
          id: string;
          name: string;
          url: string;
          description: string;
          type: string;
        }[];
      };
    }[];
  };

  model: {
    items: {
      name: string;
      key?: string;
      value: string;
    }[];
  };
  productsAttribs: {
    items: {
      name: string;
      key?: string;
      value: string;
    }[];
  };
}

export default function MarketplaceClient() {
  const searchParams = useSearchParams();
  const typeFromUrl = searchParams.get("type");

  const [type, setType] = useState(searchParams.get("type") ?? "");
  const model = searchParams.get("model");
  const [selectedType, setSelectedType] = useState(typeFromUrl ?? "");
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [filterPanel, setFilterPanel] = useState<boolean>(false);
  useEffect(() => {
    const typeFromUrl = searchParams.get("type") || "";
    setSelectedType(typeFromUrl);
  }, [searchParams]);

  const category: string =
    model === "ecofriendly" || model === "tgr"
      ? "boutique-ecofriendly"
      : (type ?? "");

  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useQuery({
    queryKey: ["product", selectedType, model], // 🔹 depends on selectedType
    queryFn: () => fetchProduct(selectedType, model),
    enabled: !!selectedType,
  });

  const {
    data: vehicleData,
    isLoading: isVehicleLoading,
    isError: isVehicleError,
  } = useQuery({
    queryKey: ["vehicle", type, category],
    queryFn: () => fetchVehicle(type, category),
  });

  const filterProductByCategory = productData?.filter((item: ApiProduct) => {
    const normalizedType = normalizeCategoryName(selectedType);
    const normalizedItemCategory = normalizeCategoryName(item.category?.type);
    const normalizedMainCategory = normalizeCategoryName(
      item.mainCategory?.name
    );

    // console.log("normalizedType in cleint ," ,normalizedType )
    // console.log("normalizedItemCategory in cleint ," ,normalizedMainCategory )
    // console.log("normalizedMainCategory in cleint ," ,normalizedMainCategory )

    // Case 1: Special handling ONLY for boutique-toyota → match by mainCategory
    if (normalizedType === "boutique-toyota") {
      return (
        normalizedMainCategory === "boutique-toyota" &&
        (!model || item.vehicle?.slug === model)
      );
    }

    if (
      normalizedType === "boutique-ecofriendly" ||
      normalizedType === "boutique-eco-friendly"
    ) {
      return (
        normalizedMainCategory === "boutique-ecofriendly" &&
        (!model || item.vehicle?.slug === model)
      );
    }

    if (
      normalizedType === "boutique-gazooracing" ||
      normalizedType === "boutique-gazoo-racing"
    ) {
      return (
        normalizedMainCategory === "boutique-gazoo-racing" &&
        (!model || item.vehicle?.slug === model)
      );
    }

    // Case 2: For all other categories → match by category.type
    return (
      normalizedItemCategory === normalizedType &&
      (!model || item.vehicle?.slug === model)
    );
  });

  function normalizeCategoryName(name?: string | null) {
    if (!name) return "";

    return name
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, "-") // spaces/underscores → dashes
      .replace(/-+/g, "-") // collapse multiple dashes
      .replace(/eco-friendly/g, "ecofriendly"); // unify eco-friendly/ecofriendly
  }

  function toggleFilterPanel(): void {
    setFilterPanel(!filterPanel);
  }

  function getType() {
    switch (type) {
      case "accesorios":
        return "Catálogo de Accesorios";
      case "boutique":
        return "Boutique";
      case "repuestos":
        return "Catálogo de Repuestos";
      case "boutique-gazoo-racing":
        return "Boutique Gazoo Racing";
      case "boutique-ecofriendly":
        return "Boutique Ecofriendly";
      case "boutique-toyota":
        return "Boutique Toyota";
      default:
        return type;
    }
  }

  useEffect(() => {
    if (productData) {
    }
  }, [productData]);

  useEffect(() => {
    const typeParam = searchParams.get("type") || "";
    setSelectedType(typeParam);
    setType(typeParam);
  }, [searchParams]);
  function mapApiDataToVehicles(apiData: ApiProduct[]) {
    return apiData.map((product) => {
      const imageAsset =
        product.galleries?.items?.[0]?.galleryAssets?.items?.find(
          (item) => item?.type === "main_image" || item?.name === "main_image"
        );

      const imageUrl = imageAsset?.url ?? "";
      const isValidImage =
        typeof imageUrl === "string" &&
        /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(imageUrl);
      const VehicleModel = product?.vehicle?.name;
      const numericPrice = product?.priceListLines?.items?.[0]?.value;

      return {
        id: product.id,
        name: product.name,
        year: "2024",
        type: product.serialNumber || "",
        price: numericPrice,
        description: VehicleModel || "",
        img: isValidImage ? imageUrl : "/images/Image-not-found.png",
        vehicleSlug: product.vehicle?.slug || "",
        vehicleName: product.vehicle?.name || "",
        categoryType: product.category?.type || "",
        mainCategoryName: product.mainCategory?.name || "",
      };
    });
  }

  return (
    <>
      <SectionTitleMarketplace
        title={model}
        subtitle={getType()}
        backLink={
          type === "boutique-ecofriendly" || type === "boutique-toyota"
            ? "/mi-toyota/boutique"
            : type === "boutique-gazoo-racing"
              ? "/deportivos-tgr"
              : `/posventa/${type}`
        }
        titleFontSize={{ base: "22px", xl: "32px" }}
        subtitleFontSize={{ base: "22px", xl: "32px" }}
        padding={{ base: "2rem 1rem", xl: "4rem 1rem 2.75rem" }}
        backText={"Volver a" + " " + getType()}
      />
      {isProductLoading ? (
        <SkeletonLoader />
      ) : (
        <View backgroundColor={"#F6F6F6"}>
          <Grid
            templateColumns={{ xl: "auto 1fr" }}
            gap={{ xl: "2rem", xxl: "5.4375rem" }}
            maxWidth={"1920px"}
            margin={"0 auto"}
            className="item-wrapper"
          >
            {type === "accesorios" && (
              <AccesoriesFilter
                filters={filters}
                setFilters={setFilters}
                opened={filterPanel}
                toggle={toggleFilterPanel}
                vehicleData={vehicleData}
                productData={productData}
              />
            )}

            {["boutique", "boutique-ecofriendly", "boutique-toyota"].includes(
              type ?? ""
            ) && (
                <BoutiqueFilter
                  filters={filters}
                  setFilters={setFilters}
                  opened={filterPanel}
                  setSelectedType={setSelectedType}
                  toggle={toggleFilterPanel}
                  vehicleData={vehicleData}
                  productData={productData}
                />
              )}

            {type === "repuestos" && (
              <RepuestosFilter
                filters={filters}
                setFilters={setFilters}
                opened={filterPanel}
                toggle={toggleFilterPanel}
                vehicleData={vehicleData}
                productData={productData}
              />
            )}

            {![
              "accesorios",
              "repuestos",
              "boutique",
              "boutique-toyota",
              "boutique-ecofriendly",
            ].includes(type ?? "") && (
                <BoutiqueFilter
                  filters={filters}
                  setFilters={setFilters}
                  opened={filterPanel}
                  setSelectedType={setSelectedType}
                  toggle={toggleFilterPanel}
                  vehicleData={vehicleData}
                  productData={productData}
                />
              )}

            <Marketplace
              type={type ?? ""}
              filters={filters}
              toggleFilterPanel={toggleFilterPanel}
              destailsButton={true}
              items={
                filterProductByCategory
                  ? mapApiDataToVehicles(filterProductByCategory)
                  : []
              }
            />
          </Grid>
        </View>
      )}
    </>
  );
}
