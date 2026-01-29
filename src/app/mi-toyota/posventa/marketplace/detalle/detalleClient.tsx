"use client";

import {
  Button as AmplifyButton,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
  View,
  useBreakpointValue,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./page.css";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Layout/Button/Button";
import { MarketplaceCard } from "@/components/Cards/MarketplaceCard/MarketplaceCard";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCategoryIdByType,
  fetchProduct,
  fetchProductById,
  fetchSimilarProducts,
  fetchVehicleIdBySlug,
} from "./queries";
import MarketplaceUsedDialog from "@/components/MarketplaceUsedDialog/MarketplaceUsedDialog";

interface ProductAttribItem {
  id: string;
  name: string;
  key?: string;
  value: string;
}

interface ApiProduct {
  id: string;
  name: string;
  description: string | null;
  serialNumber?: string;
  priceListLines: {
    items: {
      value: number;
    }[];
  };
  productsAttribs: {
    items: ProductAttribItem[];
  };
  vehicle: {
    slug?: string;
    name?: string;
  };
  category?: {
    id: string;
    name?: string;
    type: string;
    shipmentDate?: string;
    parent?: string;
  };

  mainCategory?: {
    id: string;
    name: string;
  };

  model: {
    items: {
      name: string;
      key?: string;
      value: string;
    }[];
  };
  galleries: {
    items: {
      galleryAssets: {
        items: {
          description?: string;
          id?: string;
          name?: string;
          type?: string;
          url?: string;
        }[];
      };
    }[];
  };
}

export default function DetallePostventa({
  slug,
}: {
  slug: string;
}): JSX.Element {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const isMobile = useBreakpointValue({ base: true, large: false });
  const [currentDetalle, setCurrentDetalle] = useState<number>(1);
  const [currentDetalleSimilar, setCurrentDetalleSimilar] = useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const {
    data: filteredData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product-by-id", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });
  const {
    data,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useQuery({
    queryKey: ["product-list", slug, type],
    queryFn: () => fetchProduct(slug, type),
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const selectedProduct = filteredData;
  const similarProducts =
    selectedProduct?.reference?.items?.map((refItem: any) => {
      return refItem?.referencedProduct;
    }) || [];
  // console.log("similarProducts" ,similarProducts);

  const [gqlSimilarProducts, setGqlSimilarProducts] = useState<any>(null);
  const [loadingSimilar, setLoadingSimilar] = useState(true);

  useEffect(() => {
    async function fetchSimilar() {
      if (!selectedProduct) {
        return;
      }

      try {
        setLoadingSimilar(true);

        const vehicleSlug =
          selectedProduct?.vehicle?.slug ||
          selectedProduct?.vehicle?.name?.toLowerCase().replace(/\s+/g, "-");

        const categoryType = selectedProduct?.category?.type;
        const mainCategoryId = selectedProduct?.mainCategory?.id;

        // fetch IDs only if value exists
        const vehicleId = vehicleSlug
          ? await fetchVehicleIdBySlug(vehicleSlug)
          : null;
        const categoryId = categoryType
          ? await fetchCategoryIdByType(categoryType)
          : null;

        // if none of the filters exist, exit
        if (!vehicleId && !categoryId && !mainCategoryId) {
          setGqlSimilarProducts([]);
          return;
        }

        const result = await fetchSimilarProducts(
          vehicleId,
          categoryId,
          mainCategoryId
        );

        const filteredResult = (result as any[]).filter(
          (item) => item.id !== selectedProduct?.id
        );
        setGqlSimilarProducts(filteredResult);
      } catch (error) {
        console.error("Error fetching similar products:", error);
        setGqlSimilarProducts([]);
      } finally {
        setLoadingSimilar(false);
      }
    }

    fetchSimilar();
  }, [selectedProduct]);

  // Decide which list to show
  const productsToShow =
    type === "prendas" || type === "merch"
      ? similarProducts
      : gqlSimilarProducts;

  let price = selectedProduct?.priceListLines?.items[0].value;

  const vehiclesData: {
    description?: string;
    id?: string;
    name?: string;
    type?: string;
    url?: string;
  }[] = selectedProduct?.galleries?.items[0]?.galleryAssets?.items || [];
  const router = useRouter();
  const totalPages = vehiclesData?.length;

  const pagination = {
    clickable: true,
    el: ".custom-pagination",
    renderBullet: function () {
      return '<span class="swiper-pagination-bullet"></span>';
    },
  };

  useEffect(() => {
    const existing = JSON.parse(
      localStorage.getItem("favourite-items") || "[]"
    );
    setIsFavorite(existing.includes(id));
  }, [id]);

  const handleToggleFavorite = (id: string) => {
    const existing = JSON.parse(
      localStorage.getItem("favourite-items") || "[]"
    );

    let updatedFavorites;
    if (existing.includes(id)) {
      updatedFavorites = existing.filter((item: string) => item !== id);
    } else {
      updatedFavorites = [...existing, id];
    }

    localStorage.setItem("favourite-items", JSON.stringify(updatedFavorites));
    setIsFavorite(updatedFavorites.includes(id));
  };

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  return (
    <>
      {
        <style>
          {`
        .swiper-slide , .swiper-slide-active{
        display:flex !important;
        align-items:center !important;
        justify-content:center !important;}

        @media (min-width: 370px) and (max-width: 479px) {
           .custom-swiper-2 .swiper-slide {
            min-width: 350px;
          }
        }
         @media (min-width: 480px) and (max-width: 680px) {
           .custom-swiper-2 .swiper-slide {
            max-width: 250px;
          }
        }

        @media (min-width: 681px) and (max-width: 767px) {
           .custom-swiper-2 .swiper-slide {
            max-width: 250px;
          }
        }
        @media (min-width: 768px) and (max-width: 1200px) {
           .custom-swiper-2 .swiper-slide {
            max-width: 267px;
          }
        }
        @media (min-width: 1201px) and (max-width: 1279px) {
           .custom-swiper-2 .swiper-slide {
            max-width: 250px;
          }
        }
        /* 1280px to 1439px */
        @media (min-width: 1280px) and (max-width: 1439px) {
           .custom-swiper-2 .swiper-slide {
            max-width: 380px;
          }
        }

        /* 1440px to 1599px */
        @media (min-width: 1440px) and (max-width: 1599px) {
           .custom-swiper-2 .swiper-slide {
            max-width: 380px;
          }
        }

        /* 1600px to 1919px */
        @media (min-width: 1600px) and (max-width: 1919px) {
           .custom-swiper-2 .swiper-slide {
            max-width: 380px;
          }
        }

        /* 1920px and up */
        @media (min-width: 1920px) {
           .custom-swiper-2 .swiper-slide {
            max-width: 400px;
          }
        }
    `}
        </style>
      }

      <View paddingBottom={{ base: "4.25rem" }}>
        <Link
          onClick={() => router.back()}
          // href={`/servicios/posventa/${type}`}
          display={{ base: "inline-block" }}
          width={{ base: "max-content" }}
          padding={{
            base: "1.12rem 0.94rem 0.94rem",
            large: "2.69rem 3.1669rem 3.56rem",
          }}
        >
          <Flex gap={{ base: "0.7869rem" }} alignItems={{ base: "center" }}>
            <Image src="/svgs/arrow--left-black-short.svg" alt="Arrow left" />
            <Text>Volver a Resultados</Text>
          </Flex>
        </Link>

        <View padding={{ base: "0 0.94rem" }}>
          <Flex
            className="detalle"
            backgroundColor={{ base: "#F6F6F6" }}
            position={"relative"}
            width={{ base: "100%", large: "min(76.25rem, 100%)" }}
            margin={"0 auto"}
            padding={{
              base: "30px 20px 30px 20px",
              large: "27px 6.565rem 2.37rem",
            }}
            borderRadius={{ base: "0.5rem" }}
            alignItems={{ base: "center" }}
            justifyContent={{ base: "center" }}
            direction={{ base: "column", large: "row" }}
            gap={{ base: "0.75rem", large: "9.63rem" }}
            height={{ base: "411px", xl: "577px" }}
          >
            <Flex
              width={"100%"}
              direction={{ base: "column" }}
              gap={{ base: "17px", xl: "36px" }}
            >
              <Flex direction={{ base: "column" }} gap={{ base: "0.44rem" }}>
                <Flex
                  justifyContent={{ base: "space-between" }}
                  gap={{ base: "1rem" }}
                >
                  <Heading
                    as="h2"
                    fontFamily={"var(--font-ToyotaType-Regular)"}
                    color={"#58595B"}
                    textTransform={"capitalize"}
                    textAlign={{ base: "center" }}
                    fontSize={{ base: "1.125rem", xl: "32px" }}
                    fontWeight={{ base: "400" }}
                    lineHeight={{ base: "normal", xl: "130%" }}
                  >
                    {selectedProduct?.name || "Bujía (punta de iridio)"}
                  </Heading>
                  <Image
                    src={
                      isFavorite
                        ? "/images/icons/favorite.svg"
                        : "/images/icons/notFavorite.svg"
                    }
                    alt="Heart"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (id) {
                        handleToggleFavorite(id);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                    className="heart-icon"
                    width={{ base: "19px", xl: "35px" }}
                    height={{ base: "17px", xl: "31.3157901763916" }}
                  />
                </Flex>

                <Flex direction={{ base: "column" }} gap={{ base: "0" }}>
                  <Heading
                    as="h3"
                    fontFamily={"var(--font-ToyotaType-Regular)"}
                    color={"#000"}
                    textAlign={{ base: "left" }}
                    fontSize={{ base: "1.625rem", xl: "32px" }}
                    fontWeight={{ base: "700", xl: "400" }}
                    lineHeight={{ base: "normal", xl: "130%" }}
                    paddingBottom={{ base: "0", xl: "7px" }}
                  >
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      maximumFractionDigits: 0,
                    }).format(Number(price))}
                  </Heading>
                  <Text
                    fontFamily={"var(--font-ToyotaType-Regular)"}
                    color={"#58595B"}
                    textAlign={{ base: "left" }}
                    fontSize={{ base: "0.75rem", xl: "12px" }}
                    fontWeight={{ base: "400" }}
                    lineHeight={{ base: "100%" }}
                  >
                    *precio sugerido al público
                  </Text>
                </Flex>
              </Flex>
              {vehiclesData.length > 0 && (
                <>
                  {/* <AmplifyButton
                    className="detalle-prev arrowCustom arrowCustom--prev"
                    display={{ base: "none", large: "flex" }}
                    position="absolute"
                    top="50%"
                    left="2rem"
                    transform="translateY(-50%)"
                    backgroundColor="black"
                    borderRadius="50%"
                  />
                  <AmplifyButton
                    className="detalle-next arrowCustom arrowCustom--next"
                    display={{ base: "none", large: "flex" }}
                    position="absolute"
                    top="50%"
                    right="2rem"
                    transform="translateY(-50%)"
                    backgroundColor="black"
                    borderRadius="50%"
                  /> */}
                  {/* Swiper */}
                  <Swiper
                    className="swiper-container"
                    loop
                    slidesPerView={1}
                    centeredSlides
                    pagination={pagination}
                    navigation={{
                      nextEl: ".detalle-next",
                      prevEl: ".detalle-prev",
                    }}
                    onSlideChange={(swiper) =>
                      setCurrentDetalle(swiper.realIndex + 1)
                    }
                    modules={[Pagination, Navigation]}
                  >
                    {vehiclesData.map((vehicle) => (
                      <SwiperSlide key={vehicle.name}>
                        <Flex
                          justifyContent="center"
                          alignItems="center"
                          backgroundColor="white"
                          width={{ base: "305px", xl: "600px" }}
                          height={{ base: "205px", xl: "325px" }}
                        >
                          <Image
                            src={vehicle.url || "/images/Image-not-found.png"}
                            alt={vehicle.name}
                            width="100%"
                            height="100%"
                            objectFit="cover"
                          />
                        </Flex>
                      </SwiperSlide>
                    ))}
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={"1rem"}
                      paddingTop={"2rem"}
                      width={{ large: "min(27.5rem, 100%)" }}
                      margin={{ large: "0 auto" }}
                      display={{ base: "none", large: "flex" }}
                    >
                      <View className="custom-pagination"></View>
                    </Flex>
                  </Swiper>
                  {/* {isMobile && (
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      width="100%"
                      maxWidth="21.625rem"
                      margin="0 auto"
                      position="relative"
                    >
                      <AmplifyButton
                        className="detalle-prev arrowCustom arrowCustom--prev"
                        padding="0"
                        width="3.4375rem"
                        height="1.875rem"
                      >
                        <Image
                          src="/images/arrow-simple-prev.svg"
                          alt="Arrow prev"
                          width="1.3125rem"
                          height=".8125rem"
                        />
                      </AmplifyButton>

                      <Text
                        fontWeight={500}
                        fontFamily="var(--font-ToyotaType-Regular)"
                      >
                        {currentDetalle} de {totalPages}
                      </Text>

                      <AmplifyButton
                        className="detalle-next arrowCustom arrowCustom--next"
                        padding="0"
                        width="3.4375rem"
                        height="1.875rem"
                      >
                        <Image
                          src="/images/arrow-simple-next.svg"
                          alt="Arrow next"
                          width="1.3125rem"
                          height=".8125rem"
                        />
                      </AmplifyButton>
                    </Flex>
                  )} */}
                </>
              )}
            </Flex>
          </Flex>
        </View>

        <Flex
          direction={{ base: "column", large: "row" }}
          justifyContent={{ large: "space-between" }}
          alignItems={{ large: "center" }}
          gap={{ base: "2.375rem" }}
          width={{ large: "min(76.25rem, 100%)" }}
          margin={"0 auto"}
          padding={{ base: "1.31rem 0.94rem 1rem", xl: "3.125rem 0 4.78rem" }}
        >
          <Flex
            direction={{ base: "column", large: "row" }}
            gap={{ base: "0", large: "1.25rem" }}
            padding={{ base: "0 1.25rem", xl: "0" }}
            fontSize={{ base: "16px", xl: "22px" }}
            lineHeight={{ base: "140%", xl: "100%" }}
            letterSpacing={"0"}
            fontFamily={{ base: "var(--font-toyotaDisplay)" }}
          >
            <Text textTransform={"capitalize"}>{type}</Text>
            <Text>{selectedProduct?.name}</Text>
          </Flex>

          <AmplifyButton
            backgroundColor={{ base: "#D42224" }}
            color={{ base: "white" }}
            border={{ base: "none" }}
            borderRadius={{ base: "6.25rem" }}
            fontFamily={"var(--font-ToyotaType-Regular)"}
            textAlign={{ base: "center" }}
            fontSize={{ base: "0.875rem" }}
            fontWeight={{ base: "500" }}
            lineHeight={{ base: "1.25rem" }}
            letterSpacing={{ base: "0.00625rem" }}
            padding={{ base: "0.62rem", large: "0.94rem" }}
            width={{ base: "min(27.75rem, 100%)" }}
            onClick={() => setIsDialogOpen(!isDialogOpen)}
          >
            Solicitar información
          </AmplifyButton>

          <MarketplaceUsedDialog
            product={{ name: selectedProduct?.name, id: selectedProduct?.id }}
            isOpen={isDialogOpen}
            onToggle={() => setIsDialogOpen(!isDialogOpen)}
          />
        </Flex>

        <Grid
          gap={{ base: "2.5625rem", large: "1.87rem" }}
          templateColumns={{ large: "repeat(2, 1fr)" }}
          width={{ large: "min(76.25rem, 100%)" }}
          margin={"0 auto"}
          padding={{ base: "1rem 0.94rem 44px", xl: "4.22rem 0 154px" }}
        >
          <Flex
            direction={{ base: "column" }}
            gap={{ base: "2.5625rem", large: "2.75rem" }}
          >
            <Heading
              as="h3"
              fontFamily={"var(--font-ToyotaType-Regular)"}
              color={"black"}
              textAlign={{ base: "left" }}
              fontSize={{ base: "1.375rem", large: "1.625rem" }}
              fontWeight={{ base: "700" }}
              lineHeight={{ base: "normal" }}
            >
              Descripción
            </Heading>
            <Flex
              as="ul"
              direction={{ base: "column" }}
              gap={{ base: "0" }}
              marginLeft={{ base: "3ch" }}
            >
              {selectedProduct?.description?.includes("*") ? (
                selectedProduct.description
                  .split("*")
                  .filter((line: any) => line.trim() !== "")
                  .map((line: any, index: any) => (
                    <li
                      key={index}
                      style={{
                        color: "#58595B",
                        fontFamily: "var(--font-ToyotaType-Regular)",
                        fontSize: "1.125rem",
                        lineHeight: "normal",
                        fontWeight: 400,
                      }}
                    >
                      {line.trim()}
                    </li>
                  ))
              ) : (
                <Text
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  color={"#58595B"}
                  textAlign={{ base: "left" }}
                  fontSize={{ base: "1.125rem", large: "1.375rem" }}
                  fontWeight={{ base: "400" }}
                  lineHeight={{ base: "normal" }}
                >
                  {selectedProduct?.description}
                </Text>
              )}
            </Flex>
          </Flex>

          <Flex
            direction={{ base: "column" }}
            gap={{ base: "1.125rem", large: "2.75rem" }}
          >
            <Heading
              as="h4"
              fontFamily={"var(--font-ToyotaType-Regular)"}
              color={"#000"}
              textAlign={{ base: "left" }}
              fontSize={{ base: "1.125rem", large: "1.625rem" }}
              fontWeight={{ base: "400", xl: "700" }}
              lineHeight={{ base: "normal" }}
            >
              Información Adicional
            </Heading>

            <Text
              fontFamily={"var(--font-ToyotaType-Regular)"}
              color={"#58595B"}
              textAlign={{ base: "left" }}
              fontSize={{ base: "0.5625rem", large: "0.75rem" }}
              fontWeight={{ base: "400" }}
              lineHeight={{ base: "normal" }}
            >
              *Imágenes de referencia. Precios de venta sugeridos al público con
              IVA incluido. Vigencia del 01 de junio hasta el 31 de diciembre de
              2025. La disponibilidad de los productos se encuentra sujeta al
              inventario de cada concesionario.
            </Text>
          </Flex>
        </Grid>

        <Flex
          direction={{ base: "column", large: "row" }}
          alignItems={{ base: "center" }}
          justifyContent={{ base: "center" }}
          gap={{ base: "2.375rem", large: "5.25rem" }}
          width={{ large: "min(95.5625rem, 65.625%)" }}
          margin={{ base: "0 auto" }}
        >
          {loadingSimilar ? (
            <Flex justifyContent="center" alignItems="center" minHeight="200px">
              {/* You can replace with a spinner or skeleton */}
            </Flex>
          ) : productsToShow?.length > 0 ? (
            <>
              <AmplifyButton
                className="detalle-similar-prev slider arrowCustom arrowCustom--prev"
                display={{ base: "none", large: "flex" }}
                position={{ base: "absolute" }}
                top={"50%"}
                left={"10%"}
                borderRadius={"50%"}
                backgroundColor={"black"}
                style={{ aspectRatio: "1 / 1" }}
              />

              <Flex
                direction={{ base: "column" }}
                width={{ base: "min(78.75rem, 100%)" }}
                margin={{ base: "0 auto" }}
                gap={{ base: "2.38rem" }}
              >
                <Heading
                  as="h3"
                  padding={{ base: "0 0.92rem" }}
                  fontFamily={"var(--font-ToyotaType-Regular)"}
                  color={"#000"}
                  textAlign={{ base: "left", xl: "center" }}
                  fontSize={{ base: "1.375rem", large: "1.625rem" }}
                  fontWeight={{ base: "700" }}
                  lineHeight={{ base: "normal" }}
                >
                  Otros productos
                </Heading>

                <Flex
                  className="detalle-similar"
                  direction={{ base: "column" }}
                  gap={{ base: "28px", xl: "10px" }}
                  paddingLeft={{ base: "0.94rem" }}
                >
                  <Swiper
                    className="custom-swiper-2"
                    loop={true}
                    slidesPerView={1} // Show 1.5 cards on mobile by default
                    centeredSlides={true}
                    spaceBetween={20}
                    slidesOffsetAfter={0}
                    breakpoints={{
                      320: {
                        slidesPerView: 1.3, // Very small screens
                        spaceBetween: 20,
                      },
                      375: {
                        slidesPerView: 1.5, // Standard mobile screens
                        spaceBetween: 20,
                      },
                      480: {
                        slidesPerView: 1.8, // Larger mobile screens
                        spaceBetween: 20,
                      },
                      640: {
                        slidesPerView: 2.2, // Small tablets
                        spaceBetween: 20,
                      },
                      768: {
                        slidesPerView: 2, // Tablets
                        spaceBetween: 33,
                      },
                      1280: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                      },
                    }}
                    navigation={{
                      nextEl: ".detalle-similar-next",
                      prevEl: ".detalle-similar-prev",
                    }}
                    onSlideChange={(swiper) =>
                      setCurrentDetalleSimilar(swiper.realIndex + 1)
                    }
                    modules={[Navigation]}
                  >
                    {productsToShow?.map(
                      (vehicle: ApiProduct, index: number) => {
                        const imageAttr =
                          vehicle?.galleries?.items?.[0]?.galleryAssets
                            ?.items?.[0];

                        const imageUrl = imageAttr?.url ?? "";
                        const isValidImage =
                          typeof imageUrl === "string" &&
                          /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(imageUrl);
                        const VehicleModel = vehicle?.vehicle?.name;
                        let price =
                          vehicle?.priceListLines?.items[0].value;

                        const imageSrc = isValidImage
                          ? imageUrl
                          : "/images/Image-not-found.png";

                        return (
                          <SwiperSlide key={`${vehicle.name}-${index}`}>
                            <Link
                              href={`/mi-toyota/posventa/marketplace/detalle?id=${vehicle.id}&type=${type}`}
                              key={index}
                            >
                              <View width="100%">
                                <MarketplaceCard
                                  title={
                                    vehicle.name || "Amortiguador delantero"
                                  }
                                  mobileTitle={
                                    vehicle.name || "Amortiguador/ndelantero"
                                  }
                                  price={`${price}`}
                                  imageSrc={imageSrc}
                                  description={VehicleModel || ""}
                                  subDescription={
                                    vehicle?.serialNumber || "Original"
                                  }
                                  showSuggestedPrice={true}
                                  showReferenceImage={true}
                                  id={vehicle.id}
                                  addedFavorite={false}
                                  useRoundedCorners={false}
                                  borderRadius="0px"
                                  imageHeight={{ base: "130px", xl: "205px" }}
                                  cardWidth={{ base: "254px", xl: "100%" }}
                                  cardHeight={{ base: "345px", xl: "432px" }}
                                  backgroundColor="#F6F6F6"
                                />
                              </View>
                            </Link>
                          </SwiperSlide>
                        );
                      }
                    )}
                  </Swiper>

                  {isMobile ? (
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      width={"100%"}
                      maxWidth={{ base: "21.625rem", large: "max-content" }}
                      gap={{ large: "8.75rem" }}
                      margin={{ base: "0 auto" }}
                    >
                      <AmplifyButton
                        className="detalle-similar-prev arrowCustom arrowCustom--prev"
                        color={"transparent"}
                        padding={"0"}
                        width={"3.4375rem"}
                        height={"1.875rem"}
                      >
                        <Image
                          src="/images/arrow-simple-prev.svg"
                          alt="Arrow prev"
                          width={"1.3125rem"}
                          height={".8125rem"}
                        />
                      </AmplifyButton>
                      <Text
                        fontWeight={500}
                        fontFamily="var(--font-ToyotaType-Regular)"
                      >
                        {currentDetalleSimilar} de {productsToShow?.length}
                      </Text>
                      <AmplifyButton
                        className="detalle-similar-next detalle-next arrowCustom arrowCustom--next"
                        color={"transparent"}
                        padding={"0"}
                        width={"3.4375rem"}
                        height={"1.875rem"}
                      >
                        <Image
                          src="/images/arrow-simple-next.svg"
                          alt="Arrow next"
                          width={"1.3125rem"}
                          height={".8125rem"}
                        />
                      </AmplifyButton>
                    </Flex>
                  ) : null}
                </Flex>
              </Flex>
              <AmplifyButton
                className="detalle-similar-next slider arrowCustom arrowCustom--next"
                display={{ base: "none", large: "flex" }}
                position={{ base: "absolute" }}
                top={"50%"}
                left={"10%"}
                borderRadius={"50%"}
                backgroundColor={"black"}
                style={{ aspectRatio: "1 / 1" }}
              />
            </>
          ) : (
            <Button
              color="transparentBlack"
              textColor="black"
              style={{
                display: "block",
                margin: isMobile ? "0rem auto 0" : "1.75rem auto 0",
                padding: isMobile ? "0px 18px" : ".9375rem 3.625rem",
                fontSize: ".875rem",
                minHeight: "3.125rem",
                height: isMobile ? "40px !important" : undefined,
                width: isMobile ? "225px" : undefined,
              }}
              onClick={() => router.push("/servicios/posventa/")}
            >
              Explora todos los productos
            </Button>
          )}
        </Flex>
      </View>
    </>
  );
}
