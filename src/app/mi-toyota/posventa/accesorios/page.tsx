import AccesoriosPage from "./accesoriosClient";

export default async function page({ params }: { params: { slug: string } }) {
  const slug = params.slug || "fortuner-sr-28";

  return <AccesoriosPage slug={slug} />;
}
