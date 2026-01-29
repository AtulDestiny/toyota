"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { JobDetailPage } from "@/components/JobDetailPage/JobDetailPage";

// Define job interface
interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  description: string;
  postedDate: string;
}

// Function to get job data by slug
const getJobData = (slug: string): Job | null => {
  const jobsData: Record<string, Job> = {
    "miembro-del-equipo-de-mantenimiento": {
      id: "4",
      slug: "miembro-del-equipo-de-mantenimiento",
      title:
        "Miembro del equipo de mantenimiento de herramientas y matrices especializado",
      department: "Producción",
      location: "MEDELLÍN COLOMBIA",
      description:
        "Encargado del mantenimiento integral de herramientas y matrices utilizadas en los procesos de estampado y ensamblaje de partes automotrices. Como parte del equipo técnico de planta, aseguraré la operatividad continua de los moldes de alta precisión empleados en la producción de carrocerías y componentes estructurales de vehículos Toyota.\n\n" +
        "Lidere intervenciones preventivas y correctivas en matrices de gran tonelaje, optimizando su vida útil mediante análisis de desgaste y aplicación de técnicas de rectificación milimétrica. Implementé mejoras en el sistema de gestión de mantenimiento (TPM) que permitieron reducir en un 25% los tiempos de parada no programada.\n\n" +
        "Colabore estrechamente con los equipos de ingeniería de producción y calidad, garantizando que todas las herramientas cumplieran con los estándares de manufactura esbelta (lean manufacturing) y las especificaciones del sistema Toyota de producción (TPS).",
      postedDate: "2025-04-27",
    },
    "director-de-producto": {
      id: "5",
      slug: "director-de-producto",
      title: "Director de Producto",
      department: "Tecnología",
      location: "BOGOTÁ, COLOMBIA",
      description:
        "Estamos buscando un Director de Producto experimentado para liderar el desarrollo estratégico de nuestras líneas de vehículos Toyota. El candidato ideal combinará visión de mercado con conocimientos técnicos profundos.\n\n" +
        "Como Director de Producto, serás responsable de definir la estrategia de producto para líneas de vehículos específicas, liderando equipos multidisciplinarios en el desarrollo de nuevos modelos.\n\n" +
        "Deberás analizar tendencias del mercado y necesidades del cliente, colaborando con equipos de ingeniería, diseño y marketing para definir especificaciones de producto y roadmaps.",
      postedDate: "2025-04-27",
    },
  };

  return jobsData[slug] || null;
};

export default function JobDetailPageWrapper() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const jobData = getJobData(slug);

  useEffect(() => {
    if (!jobData) {
      console.log(`No job found with slug: ${slug}`);
      router.push("/trabaja-con-nosotros");
    }
  }, [jobData, router, slug]);

  if (!jobData) {
    return null;
  }

  return <JobDetailPage {...jobData} />;
}
