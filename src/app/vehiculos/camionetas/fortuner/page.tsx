import type { Metadata } from "next";
import FortunerClientPage from "./FortunerClientPage";

export const metadata: Metadata = {
  title: "Toyota Fortuner 2025: precios, versiones y ficha en Colombia",
  description:
    "Descubre la Toyota Fortuner 2025 en Colombia: SUV diésel o gasolina, 4x2 o 4x4. Ideal para ciudad y aventura. Consulta precios, consumo y ficha técnica.",
  openGraph: {
    title: "Toyota Fortuner 2025",
    description:
      "SUV diésel o gasolina, 4x2 o 4x4, ideal para ciudad y aventura. Consulta precios, versiones, consumo y ficha técnica.",
    url: "https://www.toyota.com.co/vehiculos/camionetas/fortuner/",
    siteName: "Toyota Colombia",
    images: [
      {
        url: "https://www.tusitio.com/images/fortuner/FORTUNER10.jpg",
        width: 1200,
        height: 630,
        alt: "Toyota Fortuner 2025 en color plateado, sobre un camino destapado con vista a la ciudad",
      },
    ],
  },
  alternates: {
    canonical: "https://www.toyota.com.co/vehiculos/camionetas/fortuner/",
  },
  authors: [{ name: "Toyota" }],
  keywords: [
    "toyota fortuner",
    "toyota fortuner 2025",
    "toyota fortuner precio",
    "toyota fortuner 2025 precio colombia",
    "camioneta toyota fortuner",
    "toyota fortuner 4x4",
    "toyota fortuner diesel",
    "toyota fortuner interior",
  ],
  robots: {
    index: true,
    follow: true,
  },
  other: {
    audience: "B2C",
    "business-objective": "Generar leads",
    "content-type": "Artículo",
    "user-intent": "Informativo",
    "performance-metric": "Tráfico a pagina",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Toyota Fortuner 2025",
    brand: { "@type": "Brand", name: "Toyota" },
    category: "SUV",
    description:
      "Descubre la Toyota Fortuner 2025 en Colombia. SUV diésel o gasolina, 4x2 o 4x4, ideal para ciudad y aventura. Consulta precios, versiones, consumo y ficha técnica.",
    image: "https://www.tusitio.com/images/fortuner/FORTUNER1.jpg",
    offers: {
      "@type": "AggregateOffer",
      url: "https://www.toyota.com.co/vehiculos/camionetas/fortuner/",
      priceCurrency: "COP",
      lowPrice: "190000000",
      highPrice: "260000000",
      offerCount: 5,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <FortunerClientPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
