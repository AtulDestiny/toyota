import MarketplaceClient from "./marketplaceClient";

// export async function generateStaticParams(): Promise<string[]> {
//   return await fetchVehicleSlugs("fortuner-sr-28", "accesorios-informativa");
// }

export default async function page({ params }: { params: { slug: string } }) {
  return <MarketplaceClient />;
}
