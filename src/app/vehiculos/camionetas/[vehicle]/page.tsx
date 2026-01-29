import "@aws-amplify/ui-react/styles.css";
// import { redirect } from "next/navigation";
import { fetchVehicleSlugs } from "./queries";
import CamionetasYSuvClient from "./camionetasYSuvClient";

export default async function CotizadorPage({
  params,
}: {
  params: { vehicle: string };
}) {
  return <CamionetasYSuvClient slug={params.vehicle} />;
}
