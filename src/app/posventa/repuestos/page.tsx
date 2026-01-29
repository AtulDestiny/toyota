import { fetchVehicleSlugs } from "./queries";
import RepuestosPage from "./repuestosClient";

export default async function page({ params }: { params: { slug: string } }) {
  const slug = params.slug || "fortuner-sr-28";

  return <RepuestosPage slug={slug} />;
}
