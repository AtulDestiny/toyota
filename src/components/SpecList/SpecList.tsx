"use client";

import { View, Grid } from "@aws-amplify/ui-react";
import { SpecListItem } from "@/components/SpecList/SpecListItem/SpecListItem";

interface SpecListProps {
  details?: {
    engine?: string;
    gears?: string;
    doors?: number;
    passengers?: number;
    warranty?: { warranty: { name: string } }[];
    fuelType?: string;
  };
}

export function SpecList({
  details = {
    engine: "2.0L 4 cilindros",
    gears: "Automática 6 velocidades",
    doors: 4,
    passengers: 5,
    warranty: [{ warranty: { name: "3 años o 100,000 km" } }],
    fuelType: "Gasolina",
  },
}: SpecListProps) {
  let specifications = [
    {
      id: 1,
      img: {
        alt: "Motor",
        src: "/assets/icons/icon_motor.svg",
      },
      title: "Motor",
      description: details?.engine || "No disponible",
    },
    {
      id: 2,
      img: {
        alt: "Velocidades",
        src: "/assets/icons/icon_velocidades.svg",
      },
      title: "Velocidades",
      description: details?.gears || "No disponible",
    },
    {
      id: 3,
      img: {
        alt: "Puertas",
        src: "/assets/icons/icon_puertas.svg",
      },
      title: "Puertas",
      description: `${details?.doors || 0} puertas`,
    },
    {
      id: 4,
      img: {
        alt: "Pasajeros",
        src: "/assets/icons/icon_pasajeros.svg",
      },
      title: "Pasajeros",
      description: `Capacidad de ${details?.passengers || 0} pasajeros`,
    },
  ];

  if (Array.isArray(details?.warranty)) {
    specifications = [
      ...specifications,
      ...details.warranty.map((w, idx) => ({
        id: 5 + idx,
        img: {
          alt: "Garantia",
          src: "/assets/icons/icon_garantia.svg",
        },
        title: `Garantía${
          (details?.warranty?.length ?? 0) > 1 ? ` ${idx + 1}` : ""
        }`.trim(),
        description: w?.warranty?.name || "No disponible",
      })),
    ];
  }

  return (
    <View margin="0 auto">
      <Grid
        templateColumns={{
          base: "repeat(2, minmax(0, 1fr))",
        }}
        gap={{ base: "6px" }}
      >
        {specifications.map((item, index) => (
          <SpecListItem
            key={item.id}
            item={item}
            isLarge={item.title.startsWith("Garantía")}
          />
        ))}
      </Grid>
    </View>
  );
}
