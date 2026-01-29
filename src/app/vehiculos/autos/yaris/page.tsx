// app/autos/yaris/page.tsx
import type { Metadata } from "next";
import ClientYarisPage from "./ClientYarisPage";

export const metadata: Metadata = {
  title: "Toyota Yaris 2025 | Precios y versiones en Colombia",
  description:
    "Descubre el Toyota Yaris 2025: desde $87.900.000, motor 1.5L, versiones XS y Sport, conectividad avanzada y garantía de 5 años.",
  openGraph: {
    title: "Toyota Yaris 2025",
    description:
      "Descubre el Toyota Yaris 2025, un vehículo compacto con diseño moderno y deportivo. Consulta precios, conoce versiones XS y Sport, motor 1.5L, transmisión CVT y conectividad.",
    url: "https://www.toyota.com.co/vehiculos/autos/yaris/",
    siteName: "Toyota Colombia",
    images: [
      {
        url: "https://www.toyota.com.co/images/yaris-pro/hero-banner/yaris.png",
        width: 1200,
        height: 630,
        alt: "Toyota Yaris 2025 en color azul sobre carretera de Bogotá",
      },
    ],
  },
  alternates: {
    canonical: "https://www.toyota.com.co/vehiculos/autos/yaris/",
  },
  authors: [{ name: "Toyota" }],
  keywords: [
    "toyota yaris",
    "toyota yaris 2025",
    "toyota yaris precio colombia",
    "toyota yaris xs",
    "toyota yaris sport",
    "toyota yaris cvt",
    "carro compacto toyota",
    "hatchback económico",
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

export default function YarisPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Toyota Yaris 2025",
    brand: { "@type": "Brand", name: "Toyota" },
    category: "Compacto / Sedán / Hatchback",
    description:
      "Descubre el Toyota Yaris 2025, un vehículo compacto con diseño moderno y deportivo. Consulta precios desde $87.900.000, conoce sus versiones XS y Sport con motor 1.5L, transmisión CVT, conectividad y garantía de fábrica de 5 años.",
    image: "https://www.toyota.com.co/images/yaris-pro/hero-banner/yaris.png",
    offers: {
      "@type": "AggregateOffer",
      url: "https://www.toyota.com.co/vehiculos/autos/yaris/",
      priceCurrency: "COP",
      lowPrice: "87900000",
      highPrice: "130000000",
      offerCount: 2,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <ClientYarisPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
