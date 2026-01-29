import {
  Image,
  View,
  Grid,
  Flex,
  useBreakpointValue,
} from "@aws-amplify/ui-react";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import styles from "./Gallery.module.scss";
import { fetchImageUrl } from "@/services/fileService";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";

export interface Image {
  imagePath: string;
  mobileImagePath?: string; // Optional mobile-specific image path
  coverText?: string;
  priority: number;
  description?: string;
}

export interface GalleryProps {
  imageList: {
    imagePath: string;
    mobileImagePath?: string; // Optional mobile-specific image path
    coverText?: string;
    priority: number;
    description?: string;
  }[];
  customMobileHeights?: { [index: number]: string }; // New prop for custom heights by index
}

export default function Gallery({
  imageList = [],
  customMobileHeights,
}: GalleryProps) {
  const [index, setIndex] = useState(-1);
  const titleElementRef = useRef<HTMLDivElement | null>(null);
  const paginationElementRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useBreakpointValue({ base: true, xl: false });

  const updateButtonPosition = () => {
    const currentSlide = document.querySelector(
      ".yarl__slide_current img"
    ) as HTMLImageElement;

    if (currentSlide) {
      const imageWidth = currentSlide.clientWidth;
      const offset = 20;

      const prevButton = document.querySelector(
        ".yarl__navigation_prev"
      ) as HTMLElement;
      const nextButton = document.querySelector(
        ".yarl__navigation_next"
      ) as HTMLElement;

      if (prevButton && nextButton) {
        prevButton.style.left = `${
          (window.innerWidth - imageWidth) / 2 + offset
        }px`;
        nextButton.style.right = `${
          (window.innerWidth - imageWidth) / 2 + offset
        }px`;
      }
    }
  };

  const getAdjustedImageSize = () => {
    // Get the browser zoom level (approximation)
    const zoomLevel = window.devicePixelRatio;

    // If zoom is greater than 1.2 (roughly 120%), limit image size
    if (zoomLevel > 1.2) {
      return {
        maxWidth: "85%",
        maxHeight: "100vh",
      };
    }

    // return {
    //   maxWidth: "90%",
    //   maxHeight: "90vh",
    // };
  };

  // Function to format the image list
  const formatImageList = (
    list: Image[]
  ): {
    src: string;
    caption?: string;
    description?: string;
    title?: string;
  }[] => {
    return list
      .map((image) => ({
        src: fetchImageUrl(
          isMobile && image.mobileImagePath
            ? image.mobileImagePath
            : image.imagePath
        ),
        description: image.description,
        priority: image.priority,
        // title: image.coverText || "Titulo de la imagen",
      }))
      .sort((a, b) => a.priority - b.priority);
  };

  const formattedList = formatImageList(imageList);

  // Add title and pagination when lightbox opens
  useEffect(() => {
    if (index >= 0) {
      // Wait for the DOM to update after lightbox opens
      setTimeout(() => {
        const container = document.querySelector(".yarl__container");
        if (container) {
          // Create and append title element
          if (!titleElementRef.current) {
            const titleElement = document.createElement("div");
            titleElement.className = styles.lightboxTitle;
            // Apply styles from the CSS you provided
            titleElement.style.position = "fixed";
            titleElement.style.top = "20px";
            titleElement.style.left = "40px";
            titleElement.style.color = "#ffffff";
            titleElement.style.fontSize = "18px";
            titleElement.style.fontWeight = "400";
            titleElement.style.opacity = "1";
            titleElement.style.zIndex = "9998";
            container.appendChild(titleElement);
            titleElementRef.current = titleElement;
          }

          if (titleElementRef.current) {
            titleElementRef.current.textContent = "Galería de Imágenes";
          }

          // Create and append pagination element
          if (!paginationElementRef.current) {
            const paginationElement = document.createElement("div");
            paginationElement.className = styles.pagination;
            // Apply styles from the CSS you provided
            paginationElement.style.position = "fixed";
            paginationElement.style.bottom = "38px"; // Above the caption area
            paginationElement.style.left = "0";
            paginationElement.style.right = "0";
            paginationElement.style.textAlign = "center";
            paginationElement.style.color = "white";
            paginationElement.style.fontSize = "16px";
            paginationElement.style.zIndex = "9998";
            container.appendChild(paginationElement);
            paginationElementRef.current = paginationElement;
          }

          if (paginationElementRef.current) {
            paginationElementRef.current.textContent = `${index + 1} de ${formattedList.length}`;
          }

          // Ensure the caption stays at the bottom
          const captionElement = document.querySelector(
            ".yarl__slide_description_container"
          );
          if (captionElement) {
            (captionElement as HTMLElement).style.bottom = "10px";
            (captionElement as HTMLElement).style.zIndex = "9997"; // Ensure it's below pagination
          }
        }
      }, 100); // Small delay to ensure lightbox is rendered
    } else {
      // Reset refs when lightbox closes
      titleElementRef.current = null;
      paginationElementRef.current = null;
    }
  }, [index, formattedList]);

  // Update title and pagination when index changes
  useEffect(() => {
    if (index >= 0) {
      if (titleElementRef.current) {
        titleElementRef.current.textContent = "Galería de Imágenes";
      }

      if (paginationElementRef.current) {
        paginationElementRef.current.textContent = `${index + 1} de ${formattedList.length}`;
      }

      // Force check for the caption element each time slide changes
      setTimeout(() => {
        const captionElement = document.querySelector(
          ".yarl__slide_description_container"
        );
        if (captionElement) {
          (captionElement as HTMLElement).style.bottom = "10px";
          (captionElement as HTMLElement).style.zIndex = "9997"; // Lower than pagination
        }
      }, 50);
    }
  }, [index, formattedList]);

  // Add event listener for slide transitions in the lightbox
  useEffect(() => {
    const handleSlideChange = () => {
      if (paginationElementRef.current) {
        paginationElementRef.current.textContent = `${index + 1} dexx ${formattedList.length}`;
      }
    };

    // Add event listener for when slides change
    document.addEventListener("keydown", handleSlideChange);

    // Also monitor when prev/next buttons are clicked
    const prevButton = document.querySelector(".yarl__navigation_prev");
    const nextButton = document.querySelector(".yarl__navigation_next");

    if (prevButton) {
      prevButton.addEventListener("click", handleSlideChange);
    }

    if (nextButton) {
      nextButton.addEventListener("click", handleSlideChange);
    }

    return () => {
      document.removeEventListener("keydown", handleSlideChange);
      if (prevButton) {
        prevButton.removeEventListener("click", handleSlideChange);
      }
      if (nextButton) {
        nextButton.removeEventListener("click", handleSlideChange);
      }
    };
  }, [index, formattedList.length]);

  // Function to render an image with overlay
  const renderImageWithOverlay = (
    image: { src: string; caption?: string },
    imageIndex: number
  ) => (
    <View
      key={imageIndex}
      position="relative"
      onClick={() => setIndex(imageIndex)}
      style={{
        cursor: "pointer",
        width: "100%",
        height: "100%",
        flex: 1, // Ensure it takes full space
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src={image.src}
        alt={`Image ${imageIndex + 1}`}
        style={{
          display: "block",
          objectFit: "cover",
          width: "100%",
          height: "100%",
          objectPosition: "50% 50%",
        }}
      />
    </View>
  );

  // Function to divide images into groups according to the desired structure
  const getImageGroups = () => {
    const groups = [];
    let i = 0;

    while (i < formattedList.length) {
      if (groups.length % 2 === 0) {
        // Row of 3 columns
        groups.push(formattedList.slice(i, i + 3));
        i += 3;
      } else {
        // Row of 1 column
        groups.push(formattedList.slice(i, i + 1));
        i += 1;
      }
    }

    return groups;
  };

  const imageGroups = getImageGroups();

  // Functions to assign columns and rows in mobile
  const getMobileColumnStart = (index: number) => {
    if (index === 0 || index === 3) {
      return 1; // Spans 2 columns
    }
    if (index === 1 || index === 4 || index === 5) {
      return 1; // Left column
    }
    if (index === 2 || index === 6) {
      return 2; // Right column
    }
    return 1; // Default
  };

  const getMobileColumnSpan = (index: number) => {
    if (index === 0 || index === 3) {
      return 2; // Spans 2 columns
    }
    return 1; // Spans 1 column
  };

  const getMobileRowStart = (index: number) => {
    if (index === 0) {
      return 1; // Row 1
    }
    if (index === 1 || index === 2) {
      return 2; // Row 2
    }
    if (index === 3) {
      return 3; // Row 3
    }
    if (index === 4 || index === 6) {
      return 5; // Row 4
    }
    if (index === 5) {
      return 6; // Row 5
    }
    return 1; // Default
  };

  let flatIndex = 0;

  return (
    <View
      style={{
        width: "100%",
        maxWidth: "2000px",
        height: "100%",
        margin: "0 auto",
      }}
    >
      {/* Desktop View */}
      <View display={{ base: "none", xl: "block" }}>
        {imageGroups.map((group, groupIndex) => (
          <Grid
            key={groupIndex}
            templateColumns={
              group.length === 3 ? "repeat(3, 1fr)" : "repeat(1, 1fr)"
            }
            gap={{ base: "3px", xl: "23px" }}
            marginBottom={{ base: "3px", xl: "23px" }}
          >
            {group.map((image) => {
              const currentIndex = flatIndex;
              flatIndex++; // Increment for next image
              return (
                <View
                  key={currentIndex}
                  height={group.length === 3 ? "290px" : "400px"}
                >
                  {renderImageWithOverlay(image, currentIndex)}
                </View>
              );
            })}
          </Grid>
        ))}
      </View>
      {/* Mobile View */}
      <View display={{ base: "block", xl: "none" }}>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={{ base: "3px", xl: "10px" }}
          marginBottom="10px"
          style={{
            gridTemplateRows: "auto",
            gridAutoRows: "auto", // Use auto to prevent empty spaces
            gridAutoFlow: "row dense", // Pack items densely
          }}
        >
          {formattedList.map((image, imageIndex) => (
            <div
              className="image-gallery-grid"
              key={imageIndex}
              style={{
                gridColumn: `${getMobileColumnStart(
                  imageIndex
                )} / span ${getMobileColumnSpan(imageIndex)}`,
                gridRow: `${
                  imageIndex === 3 || imageIndex === 6
                    ? `${getMobileRowStart(imageIndex)} / span 2` // Spans 2 rows
                    : getMobileRowStart(imageIndex)
                }`,
                height: customMobileHeights?.[imageIndex] || "220px", // Default consistent height
                overflow: "hidden", // Prevent overflow
                display: "flex", // Ensure proper flex layout
                alignItems: "center", // Center content vertically
              }}
            >
              {renderImageWithOverlay(image, imageIndex)}
            </div>
          ))}
        </Grid>
      </View>
      <Lightbox
        index={index}
        slides={formattedList}
        open={index >= 0}
        close={() => setIndex(-1)}
        plugins={[Captions]}
        on={{
          view: ({ index: currentIndex }) => {
            setIndex(currentIndex);
          },
        }}
        render={{
          slide: () => {
            updateButtonPosition();
            // Update pagination each time slide is rendered
            setTimeout(() => {
              if (paginationElementRef.current) {
                paginationElementRef.current.textContent = `${index + 1} de ${formattedList.length}`;
              }

              // Ensure the caption stays at the bottom with correct z-index
              const captionElement = document.querySelector(
                ".yarl__slide_description_container"
              );
              if (captionElement) {
                (captionElement as HTMLElement).style.bottom = "10px";
                (captionElement as HTMLElement).style.zIndex = "9997"; // Lower than pagination
              }
            }, 50);
            return undefined;
          },
          iconPrev: () => <NavButton direction="prev" />,
          iconNext: () => <NavButton direction="next" />,
        }}
        className={styles.lightbox}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        styles={{
          slide: {
            ...getAdjustedImageSize(),
          },
        }}
      />
    </View>
  );
}

function NavButton({ direction }: { direction: "prev" | "next" }) {
  return (
    <Flex
      color="black"
      width={{ base: "3.4375rem", xl: "50px" }}
      height={{ base: "1.875rem", xl: "50px" }}
      backgroundColor="white"
      justifyContent="center"
      borderRadius={{ base: "20px", xl: "50%" }}
      alignItems="center"
      border="none"
      boxShadow="none"
      role="button"
      aria-label={direction == "prev" ? "Anterior" : "Siguiente"}
      // display={{ base: "none", xl: "flex" }}
    >
      <Image
        height="20px"
        alt={direction == "prev" ? "Anterior" : "Siguiente"}
        src={"/images/icons/left_arrow.svg"}
        style={{
          transform: direction === "next" ? "scaleX(-1)" : "none",
        }}
      />
    </Flex>
  );
}
