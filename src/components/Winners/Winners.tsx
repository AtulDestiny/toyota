"use client";
import { View } from "@aws-amplify/ui-react";
import {
  Category,
  WinnersTabs,
  WinnersTabsProps,
} from "../WinnersTabs/WinnersTabs";
import {
  WinnersCarousel,
  WinnersCarouselProps,
} from "../WinnersCarousel/WinnersCarousel";
import { useState } from "react";

type WinnersProps = {
  tabs: WinnersTabsProps;
  carousel: WinnersCarouselProps;
};

export function Winners({ tabs, carousel }: WinnersProps) {
  const [currentCategory, setCurrentCategory] = useState<Category>({
    title: "Categoría 1",
    description: "(4 a 7 años)",
  });

  const onUpdateCurrentCategory = (newCategory: Category) => {
    setCurrentCategory(newCategory);
  };

  return (
    <View>
      <WinnersTabs
        {...tabs}
        onUpdateCurrentCategory={onUpdateCurrentCategory}
      />
      <WinnersCarousel {...carousel} currentCategory={currentCategory} />
    </View>
  );
}
