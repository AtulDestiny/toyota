"use client";

import { View, Text, Flex } from "@aws-amplify/ui-react";
import { ColorListItem } from "./ColorListItem/ColorListitem";
import { useState } from "react";
import { ColorOption } from "@/types";
import { fetchImageUrl } from "@/services/fileService";

interface ColorListProps {
  colorLists?: ColorOption[];
  onSelect?: (item: { id: string; img: string; title: string }) => void;
}

export function ColorList({
  colorLists = [],
  onSelect = () => {},
}: ColorListProps) {
  const [currentColor, setCurrentColor] = useState<string>(
    colorLists[0]?.id || ""
  );

  // If colorLists is empty, don't render anything
  if (!colorLists || colorLists.length === 0) {
    return null;
  }

  return (
    <View maxWidth="2000px" overflow={"hidden"}>
      <Flex
        justifyContent={"center"}
        gap={{ base: "24px", xl: "50px" }}
        paddingTop={{ base: "23px", xl: "inherit" }}
        style={{
          flexWrap: "wrap",
        }}
      >
        {colorLists.map((item, index) => (
          <ColorListItem
            key={item.id}
            item={{
              id: item.id,
              img: fetchImageUrl(item.iconPath) || "",
              title: item.name,
            }}
            onSelect={(selectedItem) => {
              setCurrentColor(selectedItem.id);
              // Always pass the selected item directly to onSelect
              onSelect(selectedItem);
            }}
            isSelected={item.id === currentColor}
          />
        ))}
      </Flex>

      <Text
        textAlign="center"
        fontSize={{ base: "14px", xl: "22px" }}
        fontWeight={{ base: "400", xl: "700" }}
        marginTop="32px"
        fontFamily="var(--font-toyotaDisplay)"
        lineHeight={"140%"}
        letterSpacing={"0"}
      >
        {colorLists.find((item) => item.id === currentColor)?.name || ""}
      </Text>
      <Text
        textAlign="center"
        fontSize={{ base: "xs", xl: "18px" }}
        marginTop={{ base: "5px", xl: "0px" }}
        fontFamily="var(--font-ToyotaType-Regular)"
      >
        *Los colores pueden variar por cada versión.
      </Text>
    </View>
  );
}
