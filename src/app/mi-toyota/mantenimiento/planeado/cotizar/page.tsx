import  MantenimientoPlaneadoClient  from "./MantenimientoPlaneadoClient";

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug || "fortuner-sr-28";

  return <MantenimientoPlaneadoClient slug={slug} />;
}
