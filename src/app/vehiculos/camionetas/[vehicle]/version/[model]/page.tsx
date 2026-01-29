import "@aws-amplify/ui-react/styles.css";
import { redirect } from "next/navigation";
import VehicleClient from "./vehicleClient";
import { fetchVehicleSlugs } from "./queries";

export default async function CotizadorPage({
  params,
}: {
  params: { vehicle: string };
}) {
  return <VehicleClient slug={params.vehicle} />;
}
