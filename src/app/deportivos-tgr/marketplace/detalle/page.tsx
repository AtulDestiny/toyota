import DetallePostventa from "./detalleClient";

export default async function page({ params }: { params: { slug: string } }) {
  const slug = params.slug || "fortuner-sr-28";

  return <DetallePostventa slug={slug} />;
}
