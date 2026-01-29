import Cotizables from "./CotizablesClient";

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug || "fortuner-sr-28";
  return <Cotizables slug={slug} />;
}
