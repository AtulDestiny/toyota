export interface BlogContent {
  title?: string;
  heroImage?: string;
  sections: Array<{
    title: string;
    text: string;
  }>;
  features: Array<{
    icon: {
      src: string;
      width: number;
      height: number;
    };
    title: string;
    description: string;
  }>;
  quotes?: Array<{
    text: string;
    author?: string;
    position?: string;
    image?: string;
  }>;
  showQuotes?: boolean;
  quotesDescription?: string;
  multimedia: Array<{
    type: string;
    url: string;
    thumbnail?: string;
    alt: string;
  }>;
  galleryImages?: Array<{
    src: string;
    alt: string;
  }>;
  detailImages?: Array<{
    src: string;
    alt: string;
  }>;
}

export const defaultBlogContent: BlogContent = {
  title: "Híbridos enchufables Toyota",
  heroImage: "/images/mdev.svg",
  showQuotes: true,
  quotesDescription: "Toyota asumió el compromiso con alcanzar la neutralidad de carbono antes de 2050. Pero ya comenzó esa transición. Desde 1997, cuando lanzamos al mercado Toyota Prius, el primer híbrido de la historia, llevamos vendidos más de 20 millones de vehículos electrificados.",
  sections: [
    {
      title: "Híbridos enchufables Toyota",
      text: "Los híbridos enchufables combinan el motor eléctrico con el motor de combustión.\nCon una batería de mayor capacidad, los híbridos enchufables te dan la oportunidad \n de recorrer más tiempo en modo 100% eléctrico. Y si quieres ir más lejos, no hay \n problema, gracias al motor de combustión no tendrás que depender exclusivamente \n de la carga.",
    },
    {
      title: "¿Por qué un híbrido enchufable?",
      text: "La energía limpia es el futuro, y sabemos que tenemos que ser parte del cambio. \n Queremos encontrar una solución que no solo beneficie a mi comunidad, sino también \n al medio ambiente.",
    },
  ],
  features: [
    {
      icon: {
        src: "/images/icon1.svg",
        width: 52,
        height: 66,
      },
      title: "Repostar como siempre",
      description:
        "Repostar tu vehículo híbrido enchufable resulta muy \n sencillo. Llena el depósito de gasolina como de \n costumbre en las estaciones de servicio para hacer \n funcionar el motor de combustión en viajes más largos.",
    },
    {
      icon: {
        src: "/images/icon2.svg",
        width: 52,
        height: 80.36363220214844,
      },
      title: "Enchufable",
      description:
        "Para una recarga rápida, instala un punto de recarga en\ntu casa o utiliza los puntos de recarga públicos para\nmayor comodidad mientras viajas.",
    },
    {
      icon: {
        src: "/images/icon3.svg",
        width: 52,
        height: 65.24,
      },
      title: "Amplía autonomía\ny menos emisiones",
      description:
        "Con una capacidad para viajar más lejos únicamente con \n electricidad, disfruta de la conducción eléctrica de más \n de 60 km sin utilizar combustible y sin emisiones. Los \n híbridos enchufables Toyota tienen etiqueta CERO.",
    },
  ],
  quotes: [
    {
      text: "Nuestro enemigo son las emisiones de carbono,no el motor de combustión interna",
      author: "Akio Toyoda",
      position: "CEO de Toyota Motor Corporation",
      image: "/images/okio.svg",
    },
    {
      text: "La innovación no tiene verdadero impacto si no es a la vez práctica",
      author: "James Kuffner",
      position: "Chief Digital Officer de Toyota Motor Corporation",
      image: "/images/okio.svg",
    },
  ],
  multimedia: [
    {
      type: "image",
      url: "/images/charge.svg",
      alt: "Vehículo híbrido enchufable cargando",
    },
    {
      type: "video",
      url: "/videos/toyota-hybrid-showcase.mp4",
      thumbnail: "/images/blue.svg",
      alt: "Video de tecnología híbrida Toyota",
    },
  ],
  galleryImages: [
    {
      src: "/images/silver.svg",
      alt: "Toyota híbrido - vista principal",
    },
    {
      src: "/images/charge.svg",
      alt: "Toyota híbrido - cargando",
    },
    {
      src: "/images/blue.svg",
      alt: "Toyota híbrido - tecnología azul",
    },
  ],
  detailImages: [
    {
      src: "/images/busca.svg",
      alt: "Toyota híbrido - vista exterior",
    },
    {
      src: "/images/busca.svg",
      alt: "Toyota híbrido - vista interior",
    },
  ],
};

// Specific content for individual blog posts
export const specificBlogContent: Record<string, BlogContent> = {


  "toyota-colombia-impulsa-sostenibilidad-innovacion-y-seguridad": {
    title: "Toyota Colombia impulsa sostenibilidad, innovación y seguridad",
    heroImage: "/images/blog/blog-00101.png",
    showQuotes: true,

    sections: [
      {
        title: "Automotores Toyota Colombia prioriza la sostenibilidad,  ",
        text: "la innovación y la satisfacción del cliente, con metas claras hacia una movilidad más accesible, segura y respetuosa con el medio ambiente.",
      },
      // {
      //   title: "Beneficios del motor híbrido Toyota",
      //   text: "Los motores híbridos de Toyota ofrecen una serie de ventajas significativas:\n• Mayor eficiencia de combustible\n• Reducción de emisiones contaminantes\n• Funcionamiento silencioso en modo eléctrico\n• Mayor autonomía comparado con vehículos completamente eléctricos",
      // },
    ],

    detailImages: [
      {
        src: "/images/01-destacada-circular-.png",
        alt: "Motor híbrido - vista detallada exterior",
      },
      {
        src: "/images/01-destacada-normal-1.png",
        alt: "Motor híbrido - componentes internos",
      },
    ],
    features: [
      {
        icon: {
          src: "/images/icon1.svg",
          width: 52,
          height: 66,
        },
        title: "Repostar como siempre",
        description: "Hiroshi Yonenaga asume la presidencia de Automotores Toyota Colombia, aportando más de 40 años con un enfoque en la cercanía con las comunidades y el fortalecimiento del mercado local.",
      },
      {
        icon: {
          src: "/images/icon2.svg",
          width: 52,
          height: 80.36363220214844,
        },
        title: "Enchufable",
        description: "En 2025, Automotores Toyota Colombia reafirma su compromiso con el sector automotriz, con un enfoque claro en la sostenibilidad, la satisfacción del cliente y la mejora continua, comprometida con liderar el camino hacia un futuro de movilidad más sostenible. Este año marca la llegada de Hiroshi Yonenaga como nuevo presidente, cuyo liderazgo se centrará en continuar consolidando la cercanía de la compañía con el mercado colombiano y fortalecer su legado como referente en soluciones de movilidad confiables y sostenibles. Su posicionamiento marca un paso importante para la filosofía One Toyota, ofreciendo un servicio posventa integral, con beneficios exclusivos para su comunidad y todos los interesados en los vehículos de la marca, así como un esquema de financiamiento personalizado de calidad.",
      },
      {
        icon: {
          src: "/images/icon3.svg",
          width: 52,
          height: 65.24,
        },
        title: "Amplía autonomía \n y menos emisiones",
        description: "A partir del rendimiento del 2024 la compañía ha proyectado un 2025 enfocado en fortalecer su cadena de valor.",
      },
    ],

    galleryImages: [
      {
        src: "/images/content-blog1-001.png",
        alt: "Motor híbrido Toyota - vista principal",
      },
      {
        src: "/images/content-blog1-002.png",
        alt: "Sistema Synergy Drive",
      },

    ],
    quotes: [
      // {
      //   text: "La compañía ha desarrollado iniciativas que impactan positivamente a los actores viales del país; impulsando una movilidad cada vez más sostenible para todos, trabajando de la mano con aliados estratégicos para ofrecer vehículos eficientes y asertivos con las condiciones del país, mientras garantiza un servicio posventa que responda a las necesidades de sus clientes. Asimismo, de acuerdo con las metas de sostenibilidad trazadas, Automotores Toyota Colombia proyecta ser actor clave en la transición hacia una movilidad más accesible, segura y respetuosa con el entorno. En este contexto, Hiroshi Yonenaga, con su amplio liderazgo en América Latina, asume la presidencia de Automotores Toyota Colombia, liderando la estrategia de la marca para reforzar su presencia en el mercado del país. ",
      //   author: "Akio Toyoda",
      //   position: "CEO de Toyota Motor Corporation",
      //   image: "/images/okio.svg",
      // },

      {
        text: "La compañía ha desarrollado iniciativas que impactan positivamente a los actores viales del país; impulsando una movilidad cada vez más sostenible para todos, trabajando de la mano con aliados estratégicos para ofrecer vehículos eficientes y asertivos con las condiciones del país, mientras garantiza un servicio posventa que responda a las necesidades de sus clientes. Asimismo, de acuerdo con las metas de sostenibilidad trazadas, Automotores Toyota Colombia proyecta ser actor clave en la transición hacia una movilidad más accesible, segura y respetuosa con el entorno. En este contexto, Hiroshi Yonenaga, con su amplio liderazgo en América Latina, asume la presidencia de Automotores Toyota Colombia, liderando la estrategia de la marca para reforzar su presencia en el mercado del país.",
      },

      // {
      //   text: "Innovation drives the future of mobility",
      //   author: "James Kuffner",
      //   // No position provided - will be optional
      //   image: "/images/okio.svg",
      // },
    ],
    quotesDescription: "“Me llena de entusiasmo asumir la presidencia de Automotores Toyota Colombia y enfrentar los retos y oportunidades que este nuevo capítulo representa. Colombia es un mercado dinámico y lleno de potencial, estoy seguro de que, trabajando de la mano con nuestro talentoso equipo y nuestros aliados continuaremos impulsando la innovación, la sostenibilidad y la cercanía con nuestras comunidades.” Destacó Hiroshi Yonenaga, presidente de Automotores Toyota Colombia. ",

    multimedia: [
      // {
      //   type: "video",
      //   url: "/videos/como-funciona-motor-hibrido.mp4",
      //   thumbnail: "/images/charge.svg",
      //   alt: "Video explicativo del funcionamiento del motor híbrido",
      // },
      // {
      //   type: "image",
      //   url: "/images/blue.svg",
      //   alt: "Diagrama del sistema híbrido Toyota",
      // },
    ],


  },



  "combustible-sintetico-una-apuesta-de-toyota": {
    title: "Toyota apuesta por combustibles sintéticos para un futuro sostenible en la Expo 2025 de Japón",
    heroImage: "/images/combustible-sintetico-una-apuesta-de-toyota-banner-desk.png",
    showQuotes: true,

    sections: [
      {
        title: "La compañía presenta vehículos impulsados   ",
        text: "con combustibles sintéticos como parte de un proyecto internacional para reducir emisiones de carbono.",
      },
      // {
      //   title: "Beneficios del motor híbrido Toyota",
      //   text: "Los motores híbridos de Toyota ofrecen una serie de ventajas significativas:\n• Mayor eficiencia de combustible\n• Reducción de emisiones contaminantes\n• Funcionamiento silencioso en modo eléctrico\n• Mayor autonomía comparado con vehículos completamente eléctricos",
      // },
    ],

    detailImages: [
      {
        src: "/images/apuesta-de-toyota-circle.png",
        alt: "Motor híbrido - vista detallada exterior",
      },
      {
        src: "/images/apuesta-de-toyota-square.png",
        alt: "Motor híbrido - componentes internos",
      },
    ],
    features: [
      {
        icon: {
          src: "/images/icon1.svg",
          width: 52,
          height: 66,
        },
        title: "Repostar como siempre",
        description: "Toyota Motor Corporation, anunció su participación en un proyecto pionero que busca reducir las emisiones de carbono mediante el uso de combustibles sintéticos en vehículos con motor. Esta colaboración internacional se vio reflejada en la Expo 2025 de Osaka, donde se hizo uso de estos combustibles en el transporte de invitados y personal del evento.",
      },
      {
        icon: {
          src: "/images/icon2.svg",
          width: 52,
          height: 80.36363220214844,
        },
        title: "Enchufable",
        description: "El combustible fue suministrado por ENEOS, empresa encargada de su producción en una planta de demostración desarrollada especialmente para este fin. Este combustible sintético, fabricado a partir de hidrógeno proveniente de fuentes renovables y CO₂ capturado, representa una alternativa más limpia a la gasolina convencional. Al aprovechar la infraestructura actual, permite avanzar hacia la neutralidad de carbono sin renunciar a los motores de combustión interna.",
      },
      {
        icon: {
          src: "/images/icon3.svg",
          width: 52,
          height: 65.24,
        },
        title: "Amplía autonomía \n y menos emisiones",
        description: "A partir del rendimiento del 2024 la compañía ha proyectado un 2025 enfocado en fortalecer su cadena de valor.",
      },
    ],

    galleryImages: [
      {
        src: "/images/blog/blog-00101.png",
        alt: "Motor híbrido Toyota - vista principal",
      },
      {
        src: "/images/blog/blog-00101.png",
        alt: "Sistema Synergy Drive",
      },
      {
        src: "/images/blog/blog-00101.png",
        alt: "Batería híbrida Toyota",
      },
    ],
    quotes: [
      // {
      //   text: "La compañía ha desarrollado iniciativas que impactan positivamente a los actores viales del país; impulsando una movilidad cada vez más sostenible para todos, trabajando de la mano con aliados estratégicos para ofrecer vehículos eficientes y asertivos con las condiciones del país, mientras garantiza un servicio posventa que responda a las necesidades de sus clientes. Asimismo, de acuerdo con las metas de sostenibilidad trazadas, Automotores Toyota Colombia proyecta ser actor clave en la transición hacia una movilidad más accesible, segura y respetuosa con el entorno. En este contexto, Hiroshi Yonenaga, con su amplio liderazgo en América Latina, asume la presidencia de Automotores Toyota Colombia, liderando la estrategia de la marca para reforzar su presencia en el mercado del país. ",
      //   author: "Akio Toyoda",
      //   position: "CEO de Toyota Motor Corporation",
      //   image: "/images/okio.svg",
      // },

      // {
      //   text: "La compañía ha desarrollado iniciativas que impactan positivamente a los actores viales del país; impulsando una movilidad cada vez más sostenible para todos, trabajando de la mano con aliados estratégicos para ofrecer vehículos eficientes y asertivos con las condiciones del país, mientras garantiza un servicio posventa que responda a las necesidades de sus clientes. Asimismo, de acuerdo con las metas de sostenibilidad trazadas, Automotores Toyota Colombia proyecta ser actor clave en la transición hacia una movilidad más accesible, segura y respetuosa con el entorno. En este contexto, Hiroshi Yonenaga, con su amplio liderazgo en América Latina, asume la presidencia de Automotores Toyota Colombia, liderando la estrategia de la marca para reforzar su presencia en el mercado del país.",
      // },

      // {
      //   text: "Innovation drives the future of mobility",
      //   author: "James Kuffner",
      //   // No position provided - will be optional
      //   image: "/images/okio.svg",
      // },
    ],
    // quotesDescription: "“Me llena de entusiasmo asumir la presidencia de Automotores Toyota Colombia y enfrentar los retos y oportunidades que este nuevo capítulo representa. Colombia es un mercado dinámico y lleno de potencial, estoy seguro de que, trabajando de la mano con nuestro talentoso equipo y nuestros aliados continuaremos impulsando la innovación, la sostenibilidad y la cercanía con nuestras comunidades.” Destacó Hiroshi Yonenaga, presidente de Automotores Toyota Colombia. ",

    multimedia: [
      {
        type: "image",
        url: "/images/apuesta-de-toyota-multimeadia-1.png",
        thumbnail: "/images/apuesta-de-toyota-multimeadia-1.png",
        alt: "Video explicativo del funcionamiento del motor híbrido",
      },
      {
        type: "image",
        url: "/images/apuesta-de-toyota-multimeadia-2.png",
        alt: "Diagrama del sistema híbrido Toyota",
      },
    ],


  },


  "bosque-toyota-refuerza-el-compromiso-ambiental-de-la-marca": {
    title: "El proyecto de reforestación Bosque Toyota reafirma el compromiso de Automotores Toyota Colombia con el cuidado del entorno ",
    heroImage: "/images/blog-content-desk-2-002.png",
    showQuotes: true,

    sections: [
      {
        title: "Por más de cinco años, la compañía ha reforestado el territorio colombiano.   ",
        text: "El proyecto de reforestación Bosque Toyota destaca la importancia de las regiones en la conservación del medio ambiente. La iniciativa ha llegado al oriente antioqueño, con la siembra de aproximadamente 2.000 árboles en La Reserva Biológica El Silencio, ubicada en el municipio de El Retiro.",
      },
      // {
      //   title: "Beneficios del motor híbrido Toyota",
      //   text: "Los motores híbridos de Toyota ofrecen una serie de ventajas significativas:\n• Mayor eficiencia de combustible\n• Reducción de emisiones contaminantes\n• Funcionamiento silencioso en modo eléctrico\n• Mayor autonomía comparado con vehículos completamente eléctricos",
      // },
    ],

    detailImages: [
      {
        src: "/images/02-destacada-circular-0.png",
        alt: "Motor híbrido - vista detallada exterior",
      },
      {
        src: "/images/blog-img-2-slider.png",
        alt: "Motor híbrido - componentes internos",
      },
    ],
    features: [
      {
        icon: {
          src: "/images/icon1.svg",
          width: 52,
          height: 66,
        },
        title: "Repostar como siempre",
        description: "El programa ha alcanzado una meta acumulada de 28.000 árboles en todo el país, incluyendo especies nativas fundamentales para la recuperación de los ecosistemas locales.",
      },
      {
        icon: {
          src: "/images/icon2.svg",
          width: 52,
          height: 80.36363220214844,
        },
        title: "Enchufable",
        description: "La siembra en La Reserva Biológica El Silencio continúa aportando a la creación de hábitats favorables para la fauna y la flora nativa, al tiempo que impulsará la regeneración del bosque y la dispersión de semillas, facilitando la consolidación de un ecosistema más resiliente. Además, este esfuerzo en la región de Antioquia complementa las acciones realizadas en otras zonas del país, reafirmando el compromiso de la compañía con el desarrollo ambiental y social en Colombia.",
      },
      {
        icon: {
          src: "/images/icon3.svg",
          width: 52,
          height: 65.24,
        },
        title: "Amplía autonomía \n y menos emisiones",
        description: "“El cuidado del medio ambiente es una responsabilidad compartida. Con Bosque Toyota hemos logrado no solo sembrar árboles, sino también fortalecer ecosistemas, proteger cuerpos de agua y recuperar suelos degradados. Nos enorgullece trabajar de la mano con aliados y comunidades locales para generar un impacto positivo y sostenible”, afirmó Hiroshi Yonenaga, presidente de Automotores Toyota Colombia.",
      },
    ],

    galleryImages: [
      {
        src: "/images/blog-img-2-slider.png",
        alt: "Motor híbrido Toyota - vista principal",
      },

    ],
    quotes: [
      // {
      //   text: "La compañía ha desarrollado iniciativas que impactan positivamente a los actores viales del país; impulsando una movilidad cada vez más sostenible para todos, trabajando de la mano con aliados estratégicos para ofrecer vehículos eficientes y asertivos con las condiciones del país, mientras garantiza un servicio posventa que responda a las necesidades de sus clientes. Asimismo, de acuerdo con las metas de sostenibilidad trazadas, Automotores Toyota Colombia proyecta ser actor clave en la transición hacia una movilidad más accesible, segura y respetuosa con el entorno. En este contexto, Hiroshi Yonenaga, con su amplio liderazgo en América Latina, asume la presidencia de Automotores Toyota Colombia, liderando la estrategia de la marca para reforzar su presencia en el mercado del país. ",
      //   author: "Akio Toyoda",
      //   position: "CEO de Toyota Motor Corporation",
      //   image: "/images/okio.svg",
      // },

      // {
      //   text: "La compañía ha desarrollado iniciativas que impactan positivamente a los actores viales del país; impulsando una movilidad cada vez más sostenible para todos, trabajando de la mano con aliados estratégicos para ofrecer vehículos eficientes y asertivos con las condiciones del país, mientras garantiza un servicio posventa que responda a las necesidades de sus clientes. Asimismo, de acuerdo con las metas de sostenibilidad trazadas, Automotores Toyota Colombia proyecta ser actor clave en la transición hacia una movilidad más accesible, segura y respetuosa con el entorno. En este contexto, Hiroshi Yonenaga, con su amplio liderazgo en América Latina, asume la presidencia de Automotores Toyota Colombia, liderando la estrategia de la marca para reforzar su presencia en el mercado del país.",
      // },

      // {
      //   text: "Innovation drives the future of mobility",
      //   author: "James Kuffner",
      //   // No position provided - will be optional
      //   image: "/images/okio.svg",
      // },
    ],
    // quotesDescription: "“Me llena de entusiasmo asumir la presidencia de Automotores Toyota Colombia y enfrentar los retos y oportunidades que este nuevo capítulo representa. Colombia es un mercado dinámico y lleno de potencial, estoy seguro de que, trabajando de la mano con nuestro talentoso equipo y nuestros aliados continuaremos impulsando la innovación, la sostenibilidad y la cercanía con nuestras comunidades.” Destacó Hiroshi Yonenaga, presidente de Automotores Toyota Colombia. ",

    multimedia: [
      // {
      //   type: "video",
      //   url: "/videos/como-funciona-motor-hibrido.mp4",
      //   thumbnail: "/images/charge.svg",
      //   alt: "Video explicativo del funcionamiento del motor híbrido",
      // },
      // {
      //   type: "image",
      //   url: "/images/blue.svg",
      //   alt: "Diagrama del sistema híbrido Toyota",
      // },
    ],


  },

  "toyota-colombia-premiada-por-seguridad-costos-y-sostenibilidad": {
    title: "En su onceava edición, los Premios Vía destacan a Automotores Toyota Colombia por su apuesta en seguridad, costo de reparación y movilidad sostenible",
    heroImage: "/images/blog/blog-00104.png",
    showQuotes: true,

    sections: [
      {
        title: "Automotores Toyota Colombia fue reconocida en las categorías de:   ",
        text: "mejor equipamiento de seguridad, mejor costo de reparación y galardón a la movilidad sostenible, demostrando una vez más su compromiso con los más altos estándares de calidad y servicio en el país. A lo largo de once ediciones de los Premios Vía, Automotores Toyota Colombia ha participado en este espacio, reafirmando su compromiso con la movilidad. Este año, la compañía se destacó al recibir cuatro galardones, que consolidan su compromiso con la innovación, eficiencia y movilidad responsable. En la categoría de mejor equipamiento en seguridad, en el segmento de pickups, se otorgó el galardón al modelo Hilux, una pick-up que se distingue por incorporar tecnología avanzada y ofrecer altos estándares de protección para todos los ocupantes. ",
      },
      // {
      //   title: "Beneficios del motor híbrido Toyota",
      //   text: "Los motores híbridos de Toyota ofrecen una serie de ventajas significativas:\n• Mayor eficiencia de combustible\n• Reducción de emisiones contaminantes\n• Funcionamiento silencioso en modo eléctrico\n• Mayor autonomía comparado con vehículos completamente eléctricos",
      // },
    ],

    detailImages: [
      {
        src: "/images/blog/blog-00104.png",
        alt: "Motor híbrido - vista detallada exterior",
      },
      {
        src: "/images/blog/blog-00104.png",
        alt: "Motor híbrido - componentes internos",
      },
    ],
    features: [
      {
        icon: {
          src: "/images/icon1.svg",
          width: 52,
          height: 66,
        },
        title: "Repostar como siempre",
        description: "Este espacio refleja la evolución de las preferencias de los consumidores, quienes buscan vehículos que integren tecnología, seguridad sin comprometer la calidad ni la confiabilidad.",
      },
      {
        icon: {
          src: "/images/icon2.svg",
          width: 52,
          height: 80.36363220214844,
        },
        title: "Enchufable",
        description: "Por su parte, en la categoría de mejor costo de reparación, Hilux volvió a destacarse, ratificando su posición como un vehículo que combina resistencia y eficiencia en su mantenimiento. En esta misma categoría, 4Runner, una SUV emblemática del portafolio de la marca, también fue galardonada. A estos reconocimientos se suma el galardón de Movilidad Sostenible, que Automotores Toyota Colombia recibe por tercera vez y este 2025, por segundo año consecutivo. Una conmemoración que refleja su firme compromiso con el desarrollo de tecnologías más limpias y su visión a largo plazo hacia la carbono neutralidad. Este reconocimiento valida el trabajo constante que la marca realiza en Colombia para ofrecer soluciones de movilidad que sean eficientes y también responsables con el medio ambiente.",
      },
      {
        icon: {
          src: "/images/icon3.svg",
          width: 52,
          height: 65.24,
        },
        title: "Amplía autonomía \n y menos emisiones",
        description: "“Estos reconocimientos reflejan el esfuerzo integral de todos quienes hacemos parte de Toyota en Colombia. Nos llena de orgullo ver premiados modelos como Hilux y 4Runner, que representan nuestro compromiso con la calidad, la seguridad y la experiencia del cliente. Además, del esfuerzo continuo de todo el equipo por ofrecer una amplia canasta de repuestos originales con precios competitivos en el mercado y de nuestros técnicos de Servicio calificado que trabajan diariamente en los talleres de nuestros concesionarios autorizados a nivel nacional. Por otro lado, recibir el galardón a la Movilidad Sostenible reafirma nuestra visión de futuro: una movilidad más limpia, eficiente y responsable. Seguiremos promoviendo buenas prácticas en posventa y acompañando a nuestros clientes en su transición hacia un modelo de transporte más consciente con el planeta.”, dijo Hiroshi Yonenaga, presidente para Automotores Toyota Colombia.",
      },
    ],

    galleryImages: [
      {
        src: "/images/blog/blog-00101.png",
        alt: "Motor híbrido Toyota - vista principal",
      },
      {
        src: "/images/blog/blog-00101.png",
        alt: "Sistema Synergy Drive",
      },
      {
        src: "/images/blog/blog-00101.png",
        alt: "Batería híbrida Toyota",
      },
    ],
    quotes: [
      // {
      //   text: "La compañía ha desarrollado iniciativas que impactan positivamente a los actores viales del país; impulsando una movilidad cada vez más sostenible para todos, trabajando de la mano con aliados estratégicos para ofrecer vehículos eficientes y asertivos con las condiciones del país, mientras garantiza un servicio posventa que responda a las necesidades de sus clientes. Asimismo, de acuerdo con las metas de sostenibilidad trazadas, Automotores Toyota Colombia proyecta ser actor clave en la transición hacia una movilidad más accesible, segura y respetuosa con el entorno. En este contexto, Hiroshi Yonenaga, con su amplio liderazgo en América Latina, asume la presidencia de Automotores Toyota Colombia, liderando la estrategia de la marca para reforzar su presencia en el mercado del país. ",
      //   author: "Akio Toyoda",
      //   position: "CEO de Toyota Motor Corporation",
      //   image: "/images/okio.svg",
      // },

      // {
      //   text: "La compañía ha desarrollado iniciativas que impactan positivamente a los actores viales del país; impulsando una movilidad cada vez más sostenible para todos, trabajando de la mano con aliados estratégicos para ofrecer vehículos eficientes y asertivos con las condiciones del país, mientras garantiza un servicio posventa que responda a las necesidades de sus clientes. Asimismo, de acuerdo con las metas de sostenibilidad trazadas, Automotores Toyota Colombia proyecta ser actor clave en la transición hacia una movilidad más accesible, segura y respetuosa con el entorno. En este contexto, Hiroshi Yonenaga, con su amplio liderazgo en América Latina, asume la presidencia de Automotores Toyota Colombia, liderando la estrategia de la marca para reforzar su presencia en el mercado del país.",
      // },

      // {
      //   text: "Innovation drives the future of mobility",
      //   author: "James Kuffner",
      //   // No position provided - will be optional
      //   image: "/images/okio.svg",
      // },
    ],
    // quotesDescription: "“Me llena de entusiasmo asumir la presidencia de Automotores Toyota Colombia y enfrentar los retos y oportunidades que este nuevo capítulo representa. Colombia es un mercado dinámico y lleno de potencial, estoy seguro de que, trabajando de la mano con nuestro talentoso equipo y nuestros aliados continuaremos impulsando la innovación, la sostenibilidad y la cercanía con nuestras comunidades.” Destacó Hiroshi Yonenaga, presidente de Automotores Toyota Colombia. ",

    multimedia: [
      // {
      //   type: "video",
      //   url: "/videos/como-funciona-motor-hibrido.mp4",
      //   thumbnail: "/images/charge.svg",
      //   alt: "Video explicativo del funcionamiento del motor híbrido",
      // },
      // {
      //   type: "image",
      //   url: "/images/blue.svg",
      //   alt: "Diagrama del sistema híbrido Toyota",
      // },
    ],


  },



  "como-funciona-motor-hibrido": {
    title: "¿Sabes cómo funciona un motor híbrido?",
    heroImage: "/images/mdev.svg",
    showQuotes: true,
    quotesDescription: "La tecnología híbrida de Toyota representa más de 25 años de innovación continua. Desde el lanzamiento del primer Prius en 1997, la compañía ha perfeccionado esta tecnología que combina lo mejor de ambos mundos: la eficiencia eléctrica y la confiabilidad del motor de combustión.",
    sections: [
      {
        title: "Automotores Toyota Colombia prioriza la sostenibilidad, ",
        text: "la innovación y la satisfacción del cliente, con metas claras hacia una movilidad más accesible, segura y respetuosa con el medio ambiente.",
      },
      // {
      //   title: "Beneficios del motor híbrido Toyota",
      //   text: "Los motores híbridos de Toyota ofrecen una serie de ventajas significativas:\n• Mayor eficiencia de combustible\n• Reducción de emisiones contaminantes\n• Funcionamiento silencioso en modo eléctrico\n• Mayor autonomía comparado con vehículos completamente eléctricos",
      // },
    ],
    features: [
      {
        icon: {
          src: "/images/icon1.svg",
          width: 52,
          height: 66,
        },
        title: "Repostar como siempre",
        description: "Hiroshi Yonenaga asume la presidencia de Automotores Toyota Colombia, aportando más de 40 años con un enfoque en la cercanía con las comunidades y el fortalecimiento del mercado local.",
      },
      {
        icon: {
          src: "/images/icon2.svg",
          width: 52,
          height: 80.36363220214844,
        },
        title: "Enchufable",
        description: "En 2025, Automotores Toyota Colombia reafirma su compromiso con el sector automotriz, con un enfoque claro en la sostenibilidad, la satisfacción del cliente y la mejora continua, comprometida con liderar el camino hacia un futuro de movilidad más sostenible. Este año marca la llegada de Hiroshi Yonenaga como nuevo presidente, cuyo liderazgo se centrará en continuar consolidando la cercanía de la compañía con el mercado colombiano y fortalecer su legado como referente en soluciones de movilidad confiables y sostenibles. Su posicionamiento marca un paso importante para la filosofía One Toyota, ofreciendo un servicio posventa integral, con beneficios exclusivos para su comunidad y todos los interesados en los vehículos de la marca, así como un esquema de financiamiento personalizado de calidad.",
      },
      {
        icon: {
          src: "/images/icon3.svg",
          width: 52,
          height: 65.24,
        },
        title: "Amplía autonomía \n y menos emisiones",
        description: "A partir del rendimiento del 2024 la compañía ha proyectado un 2025 enfocado en fortalecer su cadena de valor.",
      },
    ],
    quotes: [
      {
        text: "La tecnología híbrida es el puente perfecto hacia un futuro más sostenible",
        author: "Akio Toyoda",
        position: "CEO de Toyota Motor Corporation",
        image: "/images/okio.svg",
      },
      {
        text: "Innovation drives the future of mobility",
        author: "James Kuffner",
        // No position provided - will be optional
        image: "/images/okio.svg",
      },
      {
        text: "La eficiencia energética es clave para el desarrollo sostenible",
        // No author or position - anonymous quote
        // No image - just the quote text
      },
    ],

    multimedia: [
      // {
      //   type: "video",
      //   url: "/videos/como-funciona-motor-hibrido.mp4",
      //   thumbnail: "/images/charge.svg",
      //   alt: "Video explicativo del funcionamiento del motor híbrido",
      // },
      // {
      //   type: "image",
      //   url: "/images/blue.svg",
      //   alt: "Diagrama del sistema híbrido Toyota",
      // },
    ],
    galleryImages: [
      {
        src: "/images/hybrid-main.svg",
        alt: "Motor híbrido Toyota - vista principal",
      },
      {
        src: "/images/synergy-drive.svg",
        alt: "Sistema Synergy Drive",
      },
      {
        src: "/images/hybrid-battery.svg",
        alt: "Batería híbrida Toyota",
      },
    ],
    detailImages: [
      {
        src: "/images/hybrid-engine-detail.svg",
        alt: "Motor híbrido - vista detallada exterior",
      },
      {
        src: "/images/hybrid-interior.svg",
        alt: "Motor híbrido - componentes internos",
      },
    ],
  },

  "consumo-hibrido-vs-enchufable": {
    title: "Híbrido vs Híbrido Enchufable: Comparativa de consumo",
    heroImage: "/images/comparison-hero.svg",
    showQuotes: true,
    quotesDescription: "La elección entre un híbrido tradicional y un híbrido enchufable no es solo una decisión técnica, sino una decisión de estilo de vida. Cada tecnología tiene sus ventajas específicas según tus necesidades de movilidad diaria.",
    sections: [
      {
        title: "Híbrido vs Híbrido Enchufable: Comparativa de consumo",
        text: "La principal diferencia entre un híbrido tradicional y un híbrido enchufable radica en la capacidad de la batería y la autonomía eléctrica.\n\nMientras que un híbrido tradicional tiene una autonomía eléctrica limitada, los híbridos enchufables pueden recorrer distancias considerables solo con electricidad.",
      },
      {
        title: "¿Cuál consume menos?",
        text: "El consumo depende en gran medida del tipo de uso:\n• Para trayectos cortos urbanos: Híbrido enchufable\n• Para viajes largos: Híbrido tradicional\n• Para uso mixto: Ambos ofrecen excelente eficiencia",
      },
    ],
    features: [
      {
        icon: {
          src: "/images/fuel-efficiency.svg",
          width: 52,
          height: 66,
        },
        title: "Híbrido tradicional",
        description: "Consumo promedio de 4.5L/100km en ciudad y carretera combinados.",
      },
      {
        icon: {
          src: "/images/plug-in-efficiency.svg",
          width: 52,
          height: 80.36363220214844,
        },
        title: "Híbrido enchufable",
        description: "Hasta 60km de autonomía eléctrica pura, ideal para desplazamientos urbanos.",
      },
      {
        icon: {
          src: "/images/cost-savings.svg",
          width: 52,
          height: 65.24,
        },
        title: "Ahorro económico",
        description: "Ambas tecnologías ofrecen ahorros significativos en combustible comparado con vehículos convencionales.",
      },
    ],
    quotes: [
      {
        text: "La elección entre híbrido y enchufable depende de tus hábitos de conducción",
        author: "Equipo Técnico Toyota",
        position: "Departamento de Innovación",
        image: "/images/okio.svg",
      },
      {
        text: "El futuro de la movilidad es flexible y adaptable a cada necesidad",
        author: "Especialista en Sostenibilidad",
        // No position - showing author without specific title
        // No image - showing quote with author but no photo
      },
      {
        text: "Cada kilómetro cuenta cuando hablamos de sostenibilidad",
        // Anonymous industry quote - no author, position, or image
      },
    ],
    multimedia: [
      // {
      //   type: "image",
      //   url: "/images/consumption-comparison.svg",
      //   alt: "Comparativa de consumo híbrido vs enchufable",
      // },
      // {
      //   type: "video",
      //   url: "/videos/hybrid-vs-plugin-comparison.mp4",
      //   thumbnail: "/images/comparison-video-thumb.svg",
      //   alt: "Video comparativo entre híbrido y enchufable",
      // },
    ],
    galleryImages: [
      {
        src: "/images/hybrid-vs-plugin-main.svg",
        alt: "Comparativa híbrido vs enchufable - vista principal",
      },
      {
        src: "/images/fuel-consumption.svg",
        alt: "Gráfico de consumo de combustible",
      },
      {
        src: "/images/efficiency-chart.svg",
        alt: "Tabla de eficiencia energética",
      },
    ],
    detailImages: [
      {
        src: "/images/hybrid-traditional.svg",
        alt: "Vehículo híbrido tradicional - vista exterior",
      },
      {
        src: "/images/plugin-hybrid.svg",
        alt: "Vehículo híbrido enchufable - vista interior",
      },
    ],
  },

  "como-conducir-electrico-toyota": {
    title: "Guía para conducir un eléctrico Toyota",
    heroImage: "/images/electric-hero.svg",
    showQuotes: false, // Hide quotes for this blog post
    // No quotesDescription since quotes are hidden
    sections: [
      {
        title: "Guía para conducir un eléctrico Toyota",
        text: "Conducir un vehículo eléctrico Toyota es una experiencia única que combina tecnología avanzada con simplicidad de uso.\n\nLos vehículos eléctricos ofrecen una conducción silenciosa, respuesta instantánea y cero emisiones locales.",
      },
      {
        title: "Consejos para maximizar la autonomía",
        text: "Para obtener el máximo rendimiento de tu Toyota eléctrico:\n• Utiliza el modo ECO en ciudad\n• Aprovecha la frenada regenerativa\n• Planifica tus rutas considerando puntos de carga\n• Mantén una velocidad constante en carretera",
      },
    ],
    features: [
      {
        icon: {
          src: "/images/silent-drive.svg",
          width: 52,
          height: 66,
        },
        title: "Conducción silenciosa",
        description: "Disfruta de una experiencia de conducción excepcionalmente silenciosa y suave.",
      },
      {
        icon: {
          src: "/images/instant-torque.svg",
          width: 52,
          height: 80.36363220214844,
        },
        title: "Respuesta instantánea",
        description: "Los motores eléctricos proporcionan torque máximo desde el primer momento.",
      },
      {
        icon: {
          src: "/images/zero-emissions.svg",
          width: 52,
          height: 65.24,
        },
        title: "Cero emisiones",
        description: "Contribuye a un aire más limpio con cero emisiones locales durante la conducción.",
      },
    ],
    quotes: [
      {
        text: "Los vehículos eléctricos representan el futuro de la movilidad sostenible",
        author: "James Kuffner",
        position: "Chief Digital Officer de Toyota",
        image: "/images/okio.svg",
      },
    ],
    multimedia: [
      // {
      //   type: "video",
      //   url: "/videos/como-conducir-electrico.mp4",
      //   thumbnail: "/images/electric-drive-thumb.svg",
      //   alt: "Guía de conducción de vehículos eléctricos Toyota",
      // },
      // {
      //   type: "image",
      //   url: "/images/electric-dashboard.svg",
      //   alt: "Panel de control de vehículo eléctrico Toyota",
      // },
    ],
    galleryImages: [
      {
        src: "/images/electric-main.svg",
        alt: "Vehículo eléctrico Toyota - vista principal",
      },
      {
        src: "/images/charging-station.svg",
        alt: "Estación de carga eléctrica",
      },
      {
        src: "/images/electric-dashboard-detail.svg",
        alt: "Panel de control avanzado",
      },
    ],
    detailImages: [
      {
        src: "/images/electric-exterior.svg",
        alt: "Vehículo eléctrico - vista exterior",
      },
      {
        src: "/images/electric-interior-tech.svg",
        alt: "Vehículo eléctrico - tecnología interior",
      },
    ],
  },
};

// Helper function to get specific content for a blog post
export function getBlogContent(slug: string): BlogContent {
  return specificBlogContent[slug] || defaultBlogContent;
}
