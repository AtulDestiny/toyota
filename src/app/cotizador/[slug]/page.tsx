import "@aws-amplify/ui-react/styles.css";
import { redirect } from "next/navigation";
import CotizadorClient from "./CotizadorClient";
import { fetchVehiclesSlugs } from "./queries";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const slugs = await fetchVehiclesSlugs();
    return slugs
      .filter((item) => item && typeof item.slug === "string")
      .map((item) => ({ slug: item.slug }));
  } catch (e) {
    console.error("Failed to fetch slugs:", e);
    return [];
  }
}

export default async function CotizadorPage({
  params,
}: {
  params: { slug: string };
}) {
  const vehiclesSlugs = await fetchVehiclesSlugs();
  // if (!vehiclesSlugs.some((vehicle) => vehicle.slug === params.slug)) {
  //   redirect("/");
  // }

  return <CotizadorClient slug={params.slug} />;
}
