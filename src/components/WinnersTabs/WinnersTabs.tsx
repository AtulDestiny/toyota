"use client";
import { useState } from "react";
import { View, Text, Button, Flex, Image } from "@aws-amplify/ui-react";

export interface Category {
  title: string;
  description: string;
  count?: number;
}

export interface WinnersTabsProps {
  title?: string;
  categories?: Category[];
  imageSrc?: string;
  bgimageSrc?: string;
  onUpdateCurrentCategory: (newCategory: Category) => void;
}

const defaultCategories: Category[] = [
  { title: "Categoría 1", description: "(4 a 7 años)" },
  {
    title: "Categoría 2",
    description: "(8 a 10 años)",
    count: 196,
  },
  { title: "Categoría 3", description: "(11 a 13 años)" },
];

export function WinnersTabs({
  title = "Ganadores 2024",
  bgimageSrc = "/images/Blue_Background_with_wavw.png",
  categories = defaultCategories,
  imageSrc = "/images/sample-trophy.png",
  onUpdateCurrentCategory,
}: WinnersTabsProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  function updateCurrentCategory(newCategory: Category) {
    onUpdateCurrentCategory(newCategory);
  }

  function selectCategory(category: Category, index: number): void {
    setActiveIndex(index);
    updateCurrentCategory(category);
  }

  return (
    <View
      position="relative"
      overflow="hidden"
      padding={{ base: "2rem 15px", xl: "2rem" }}
      backgroundColor="#B7DAE8"
    >
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
          src={bgimageSrc}
          alt="Background"
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </View>

      {/* Foreground Content Layer */}
      <View position="relative" style={{ zIndex: 0 }} textAlign="center">
        {/* Trophy Image */}
        <View marginBottom="2rem">
          <Image
            src={imageSrc}
            alt="Trophy Image"
            width="100px"
            height="100px"
            margin="0 auto"
            objectFit="contain"
          />
        </View>

        {/* Title */}
        <Text
          fontSize={{ base: "28px", xl: "48px" }}
          fontWeight="600"
          fontFamily={{
            base: "var(--font-toyotaDisplay)",
            xl: "var(--font-ToyotaType-Regular)",
          }}
          marginBottom="2rem"
          color="black"
        >
          {title}
        </Text>

        {/* Tabs */}
        <Flex
          justifyContent="center"
          alignItems="center"
          gap={{ base: "0.75rem", xl: "1rem" }}
          marginBottom="1.5rem"
          wrap="wrap"
        >
          {categories.map((category, index) => {
            const isActive = index === activeIndex;
            return (
              <Button
                key={index}
                onClick={() => selectCategory(category, index)}
                backgroundColor={isActive ? "#000" : "#fff"}
                color={isActive ? "#fff" : "#000"}
                borderRadius="50px"
                padding={{ base: "0.5rem 1.25rem", xl: "0.75rem 1.5rem" }}
                fontWeight="600"
                fontSize={{ base: "0.9rem", xl: "1rem" }}
                minWidth="120px"
                position="relative"
                height={{ base: "45px", xl: "50px" }}
              >
                {category.title}

                {category.count !== undefined && isActive && (
                  <Flex
                    position="absolute"
                    top="-8px"
                    right="-8px"
                    backgroundColor="red"
                    borderRadius="50%"
                    width="22px"
                    height="22px"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="0.7rem"
                    fontWeight="600"
                    color="#fff"
                  >
                    {category.count}
                  </Flex>
                )}
              </Button>
            );
          })}
        </Flex>

        {/* Category Description */}
        <Text
          fontSize={{ base: "1rem", xl: "1.125rem" }}
          fontWeight="400"
          color="black"
        >
          {categories[activeIndex]?.description}
        </Text>
      </View>
    </View>
  );
}
