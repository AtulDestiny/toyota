import { FlotasYVentasCorporativas } from "@/components/FlotasYVentasCorporativas/FlotasYVentasCorporativas";

export default function RepuestosPage() {
  return (
    <FlotasYVentasCorporativas
      introDescription="Ventas Corporativas Toyota se enfoca en brindar soluciones personalizadas de movilidad y mantenimiento a empresas y entidades que deseen adquirir una flota de vehículos nuevos, con un enfoque en la productividad, respaldo y garantía."
      introButtonLabel="Cotizar"
      isintroButtonLabel={true}
      whySubtitle="¿Por qué Toyota?"
      whyTitle="Somos el aliado ideal para tu flota de vehículos"
      whyDescription="Toyota  ofrece una amplia gama de  vehículos  especializados para  satisfacer las necesidades de diversos sectores económicos incluyendo:"
      whyDescriptionTwo="Transporte , Minería , Seguridad privada, Entidades Gubernamentales, Agroindustrial , Y otros sectores privados
"
      whyList={[
        "Transporte",
        "Minería",
        "Seguridad privada",
        "Entidades Gubernamentales",
        "Agroindustrial",
        "Y otros sectores privados",
      ]}
    />
  );
}
