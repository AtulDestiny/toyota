export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  meta: string;
  imageUrl: string;
  excerpt?: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "toyota-colombia-impulsa-sostenibilidad-innovacion-y-seguridad",
    title: "Toyota Colombia impulsa sostenibilidad, innovación y seguridad",
    category: "Últimas Noticias",
    date: "enero de 2025",
    meta: "enero de 2025 | Por: Equipo Técnico Toyota",
    imageUrl: "/images/blog/blog-00101.png",
    featured: true,
  },
  {
    id: "2",
    slug: "combustible-sintetico-una-apuesta-de-toyota",
    title: "Combustible sintético: una apuesta de Toyota",
    category: "Últimas Noticias",
    date: "abril de 2025",
    meta: "abril de 2025 | Por: Departamento de Innovación",
    imageUrl: "/images/blog/blog-02-002.png",
    featured: true,
  },
  {
    id: "3",
    slug: "bosque-toyota-refuerza-el-compromiso-ambiental-de-la-marca",
    title: "Bosque Toyota refuerza el compromiso ambiental de la marca.",
    category: "Últimas Noticias",
    date: "enero de 2025",
    meta: "enero de 2025 | Por: Equipo Toyota",
    imageUrl: "/images/blog-img-thumb.png",
    excerpt: "A continuación resolvemos todas tus dudas sobre la ITV de coches eléctricos, desde la documentación necesaria hasta las posibles sanciones por no tenerla en regla.",
  },
  {
    id: "4",
    slug: "toyota-colombia-premiada-por-seguridad-costos-y-sostenibilidad",
    title: "Toyota Colombia, premiada por seguridad, costos y sostenibilidad.",
    category: "Tecnología",
    date: "abril de 2025",
    meta: "abril de 2025 | Por: Departamento Financiero",
    imageUrl: "/images/blog/blog-miniatura.png",
    excerpt: "Cada Toyota viene con la tranquilidad de tener dos años de mantenimiento...",
  },
  // {
  //   id: "5",
  //   slug: "que-vehiculo-comprar-2025",
  //   title: "¿Qué vehículo comprar en este 2025?",
  //   category: "Últimas Noticias",
  //   date: "25 de Marzo de 2025",
  //   meta: "20 de Marzo, 2025 | Por: Equipo de Ventas",
  //   imageUrl: "/images/wheel.svg",
  //   excerpt: "Te ayudamos a encontrar tu Toyota...",
  // },
  // {
  //   id: "6",
  //   slug: "siglas-vehiculos-electricos",
  //   title: "La diferentes siglas de los vehículos eléctricos",
  //   category: "Tecnología",
  //   date: "25 de Marzo de 2025",
  //   meta: "18 de Marzo, 2025 | Por: Departamento Técnico",
  //   imageUrl: "/images/ev.svg",
  // },

];
