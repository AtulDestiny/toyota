"use client";
import { useState } from "react";
import {
  View,
  Image,
  Text,
  Button,
  Flex,
  useBreakpointValue,
  Grid,
} from "@aws-amplify/ui-react";
import { motion, AnimatePresence } from "framer-motion";
import { Category } from "../WinnersTabs/WinnersTabs";

interface WinnerDrawing {
  winnerName: string;
  drawingTitle: string;
  image: string;
  description?: string;
  category?: string;
}

export interface WinnersCarouselProps {
  data?: WinnerDrawing[] | null;
  header?: string;
  subHeader?: string;
  subDescription?: string;
  currentCategory?: Category;
}

const defaultWinners: WinnerDrawing[] = [
  {
    winnerName: "Angélica Ortega 1",
    drawingTitle: "Máquina del tiempo Toyota 1",
    image: "/images/sample-drawing.png",
    category: "Categoría 1", // Added category for testing
  },
  {
    winnerName: "Angélica Ortega 2",
    drawingTitle: "Máquina del tiempo Toyota 2",
    image: "/images/sample-drawing.png",
    category: "Categoría 1", // Added category for testing
  },
  {
    winnerName: "Angélica Ortega 3",
    drawingTitle: "Máquina del tiempo Toyota 3",
    image: "/images/sample-drawing.png",
    category: "Categoría 2", // Different category
  },
  {
    winnerName: "Angélica Ortega 4",
    drawingTitle: "Máquina del tiempo Toyota 4",
    image: "/images/sample-drawing.png",
    category: "Categoría 1", // Added category for testing
  },
  {
    winnerName: "Angélica Ortega 5",
    drawingTitle: "Máquina del tiempo Toyota 5",
    image: "/images/sample-drawing.png",
    category: "Categoría 1", // Added category for testing
  },
  {
    winnerName: "Angélica Ortega 6",
    drawingTitle: "Máquina del tiempo Toyota 6",
    image: "/images/sample-drawing.png",
    category: "Categoría 1", // Added category for testing
  },
  // Add more items to test pagination
  {
    winnerName: "Angélica Ortega 7",
    drawingTitle: "Máquina del tiempo Toyota 7",
    image: "/images/sample-drawing.png",
    category: "Categoría 1", // Added category for testing
  },
  {
    winnerName: "Angélica Ortega 8",
    drawingTitle: "Máquina del tiempo Toyota 8",
    image: "/images/sample-drawing.png",
    category: "Categoría 1", // Added category for testing
  },
];

const MotionFlex = motion(Flex);
const bgImageSrc = "/images/Blue_Background_2.png";

export function WinnersCarousel({
  data,
  header = "",
  subHeader = "",
  subDescription = "",
  currentCategory = { title: "Categoría 1", description: "(4 a 7 años)" },
}: WinnersCarouselProps): JSX.Element {
  const allWinners: WinnerDrawing[] =
    data && data.length > 0 ? data : defaultWinners;

  // 1. Filter winners by the current category first
  const filteredWinners = allWinners.filter(
    (winner) => winner.category === currentCategory.title
  );

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const itemsPerPage =
    useBreakpointValue({
      base: 1, // 1 per page on mobile
      medium: 3, // 3 per page on desktop/medium screens
    }) ?? 1;

  const [page, setPage] = useState<number>(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const safeItemsPerPage = Number(itemsPerPage);

  // 2. Calculate pagination variables based on the filtered list length
  const maxPage = Math.ceil(filteredWinners.length / safeItemsPerPage);

  // Guard clause to reset page if the number of items changes significantly
  if (page >= maxPage && maxPage > 0) {
    setPage(maxPage - 1);
  } else if (maxPage === 0 && page !== 0) {
    setPage(0);
  }

  const startIndex = page * safeItemsPerPage;
  const endIndex = startIndex + safeItemsPerPage;

  // 3. Slice the filtered list for the current page
  const paginatedWinners = filteredWinners.slice(startIndex, endIndex);

  const paginate = (newDirection: 1 | -1) => {
    setDirection(newDirection);
    setPage((prev) => (prev + newDirection + maxPage) % maxPage);
  };

  // Only render the carousel if there are winners in the current category
  if (filteredWinners.length === 0) {
    return (
      <View position="relative" overflow="hidden" backgroundColor="#B7DAE8">
        {/* Background Image Layer (kept for consistency) */}
        <View
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          style={{ zIndex: 0 }}
        >
          <Image
            src={bgImageSrc}
            alt="Background"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </View>

        {/* Foreground Content */}
        <View
          textAlign="center"
          padding={{ base: "2rem 15px", xl: "2rem" }}
          paddingTop={{ base: "63px", xl: "50px" }}
          position="relative"
          style={{ zIndex: 1 }}
        >
          {/* Headers... (kept for consistency) */}
          <Text
            textAlign={{ base: "left", xl: "center" }}
            fontSize={{ base: "14px", xl: "14px" }}
            color="white"
          >
            {subHeader}
          </Text>
          <Text
            textAlign={{ base: "left", xl: "center" }}
            fontFamily={{
              base: "var(--font-toyotaDisplay)",
              medium: "var(--font-toyotaDisplay)",
              xl: "var(--font-ToyotaType-Regular)",
            }}
            fontSize={{ base: "32px", xl: "32px" }}
            fontWeight="500"
            marginBottom="2rem"
            color="white"
          >
            {header}
          </Text>
          {subDescription && (
            <Text
              fontWeight="400"
              textAlign={{ base: "left", xl: "center" }}
              marginBottom="3rem"
              color="white"
            >
              {subDescription}
            </Text>
          )}
          <Text color="white" fontSize="1.25rem" padding="3rem">
            No hay ganadores para la categoría: {currentCategory.title}{" "}
            {currentCategory.description}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View position="relative" overflow="hidden" backgroundColor="#B7DAE8">
      {/* Background Image Layer */}
      <View
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        style={{ zIndex: 0 }}
      >
        <Image
          src={bgImageSrc}
          alt="Background"
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </View>

      {/* Foreground Content */}
      <View
        textAlign="center"
        padding={{ base: "2rem 15px", xl: "2rem" }}
        paddingTop={{ base: "63px", xl: "50px" }}
        position="relative"
        style={{ zIndex: 1 }}
      >
        {/* Headers */}
        <Text
          textAlign={{ base: "left", xl: "center" }}
          fontSize={{ base: "14px", xl: "14px" }}
          color="white"
        >
          {subHeader}
        </Text>
        <Text
          textAlign={{ base: "left", xl: "center" }}
          fontFamily={{
            base: "var(--font-toyotaDisplay)",
            medium: "var(--font-toyotaDisplay)",
            xl: "var(--font-ToyotaType-Regular)",
          }}
          fontSize={{ base: "32px", xl: "32px" }}
          fontWeight="500"
          marginBottom="2rem"
          color="white"
        >
          {header}
        </Text>
        {subDescription && (
          <Text
            fontWeight="400"
            textAlign={{ base: "left", xl: "center" }}
            marginBottom="3rem"
            color="white"
          >
            {subDescription}
          </Text>
        )}

        {/* Carousel */}
        <View
          position="relative"
          height="auto"
          minHeight="387px"
          marginBottom="2rem"
        >
          <AnimatePresence mode="wait" initial={false}>
            <MotionFlex
              key={page}
              position="absolute"
              top="0"
              left="0"
              right="0"
              justifyContent="center"
              wrap="wrap"
              gap="2rem"
              initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* This array now only contains the items for the current page and category */}
              {paginatedWinners.map((winner, index) => {
                return (
                  <Grid
                    templateRows={"auto 164px"}
                    key={startIndex + index}
                    width={itemsPerPage === 1 ? "100%" : "300px"}
                    maxWidth="100%"
                    textAlign="left"
                    backgroundColor="white"
                    borderRadius="1rem"
                    overflow="hidden"
                    boxShadow="medium"
                    maxHeight="max-content"
                    style={{ zIndex: 1 }}
                  >
                    <Image
                      src={winner.image}
                      alt={`Dibujo de ${winner.winnerName}`}
                      objectFit="cover"
                      width="100%"
                      height="200px"
                    />
                    <View height={"100%"} overflow={"auto"} padding="1rem">
                      <Text fontSize="0.75rem" color="gray">
                        Nombre del ganador:
                      </Text>
                      <Text fontWeight="600" marginBottom="0.5rem">
                        {winner.winnerName}
                      </Text>
                      <Text fontSize="0.75rem" color="gray">
                        Nombre del dibujo:
                      </Text>
                      <Text fontWeight="600" marginBottom="1rem">
                        {winner.drawingTitle}
                      </Text>

                      {expandedIndex === startIndex + index &&
                        winner.description && (
                          <Text
                            marginTop="1rem"
                            color="black"
                            fontSize="0.875rem"
                          >
                            {winner.description}
                          </Text>
                        )}

                      <a
                        href="#"
                        style={{
                          fontSize: "0.875rem",
                          padding: 0,
                          backgroundColor: "transparent",
                          color: "#047d95",
                          textDecoration: "none",
                          cursor: "pointer",
                          display: "inline-block",
                          fontWeight: "bold",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          setExpandedIndex(
                            expandedIndex === startIndex + index
                              ? null
                              : startIndex + index
                          );
                        }}
                      >
                        {expandedIndex === startIndex + index
                          ? "Ocultar detalle"
                          : "Ver detalle"}
                      </a>
                    </View>
                  </Grid>
                );
              })}
            </MotionFlex>
          </AnimatePresence>
        </View>

        {/* Pagination Controls */}
        {maxPage > 1 && ( // Only show controls if there's more than one page
          <Flex
            justifyContent="center"
            marginBottom={{ base: "62px", xl: "147px" }}
            alignItems="center"
            gap="3rem"
          >
            <Button
              backgroundColor="#000"
              color="#fff"
              onClick={() => paginate(-1)}
              variation="link"
              size="small"
              disabled={maxPage <= 1} // Disable button if there's only one page
            >
              <Image
                src="/images/icons/right-arrow-Vector.png"
                style={{ transform: "rotate(180deg)" }}
                alt="arrow-icon"
              />
            </Button>
            <Text fontSize="0.875rem" color="black">
              {page + 1} de {maxPage}
            </Text>
            <Button
              backgroundColor="#000"
              color="#fff"
              onClick={() => paginate(1)}
              variation="link"
              size="small"
              disabled={maxPage <= 1} // Disable button if there's only one page
            >
              <Image
                src="/images/icons/right-arrow-Vector.png"
                alt="arrow-icon"
              />
            </Button>
          </Flex>
        )}
      </View>
    </View>
  );
}
