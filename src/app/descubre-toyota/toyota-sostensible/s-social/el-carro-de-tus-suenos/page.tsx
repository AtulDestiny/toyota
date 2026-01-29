// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import React from "react";
import renderComponent from "@/utils/renderComponent";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

// Datos para la página de SeguroToyota
const pageData: ComponentData[] = [
  {
    component: "HeroCarrodeTussuenos",
    props: {
      imageMobile: "/images/carro-de-tus-suenos/kids-banner-mobile.png",
      imageDesktop: "/images/carro-de-tus-suenos/kids-banner-desktop.png",
      topIcon: "/images/toyota-dream-car-contex.png",
      backgroundColor: "",
      penIcon: "/svgs/pen-icon.svg",
      starIcon: "/svgs/star-icno.svg",
      mindIcon: "/svgs/mind-icno.svg",
    },
  },

  {
    component: "InformacionDestacada",
    props: {
      icon: "/svgs/small-car-icon.svg",
      backgroundColor: "#A7D8F0",
      title: "Dale vida a tu imaginación con el carro de tus sueños de Toyota",
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: `El Carro de tus Sueños es un concurso que se hace a nivel mundial por Toyota, en el que han participado millones de niños, plasmando las ideas más creativas sobre el futuro de la movilidad a través de un dibujo.`,
        fontSize: { base: "16px", medium: "12px", xl: "22px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontWeight: "400",
        textAlign: {
          base: "center",
          medium: "center",
          xl: "center",
        },
        lineHeight: {
          base: "30.4px",
          medium: "normal",
          xl: "normal",
        },
        padding: {
          base: "46px 15px 35px",
          medium: "40px 0px 0px",
          xl: "79px 150px 70px",
        },
        width: {
          base: "100%",
          medium: "100%",
          xl: "100%",
        },
      },
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "row" },
        alignItems: {
          base: "center",
          xl: "center",
        },
        justifyContent: "center",
        maxHeight: {
          base: "auto",
          medium: "450px",
          xl: "450px",
        },
        flexWrap: "wrap",
        padding: {
          base: "",
          medium: "113px 0 0",
          xl: "113px 0 0",
        },
        textAlign: {
          base: "center",
          medium: "center",
          xl: "center",
        },
        margin: {
          base: "",
          medium: "0 auto",
          xl: "0 auto",
        },
      },
    },
  },

  // {
  //   component: "Button",
  //   props: {
  //     type: "button",
  //     color: "darkBlue",
  //     size: "small",
  //     disabled: false,
  //     className: "custom-darkblue-button",
  //     style: { margin: "1rem 0" },
  //     isFullWidth: false,
  //     isLoading: false,
  //     loadingText: "",
  //     textColor: "white",
  //     width: { base: "40px", xl: "330px" },
  //     height: { base: "40px", xl: "50px" },
  //     padding: {
  //       base: "9px 30px 9px",
  //       medium: "15px 50px 15px 50px",
  //       xl: "15px 50px 15px 50px",
  //     },
  //     display: {
  //       base: "flex",
  //       medium: "flex",
  //       xl: "flex",
  //     },
  //     gap: "8px",
  //     margin: {
  //       base: "0 auto",
  //       medium: "0 auto",
  //       xl: "0 auto",
  //     },
  //     onClick: () =>
  //       window.open(
  //         "/images/pdf/formulario-de-inscripcion-2025-.pdf",
  //         "_blank"
  //       ),
  //   },
  //   children: [{ component: "FormIcon" }, "Formulario de Inscripción"],
  // },

  // {
  //   component: "Button",
  //   props: {
  //     type: "button",
  //     color: "transparent",
  //     size: "small",
  //     disabled: false,
  //     className: "",
  //     style: { margin: "1rem 0", border: "none", textDecoration: "underline" },
  //     isFullWidth: false,
  //     isLoading: false,
  //     loadingText: "",
  //     textColor: "black",
  //     padding: {
  //       base: "17px 50px 15px",
  //       medium: "12px 50px 15px 50px",
  //       xl: "12px 50px 50px 50px",
  //     },
  //     display: {
  //       base: "flex",
  //       medium: "flex",
  //       xl: "flex",
  //     },
  //     margin: {
  //       base: "0 auto",
  //       medium: "0 auto",
  //       xl: "0 auto",
  //     },
  //     onClick: () =>
  //       window.open(
  //         "/images/pdf/Terminos-y-condiciones-carro-de-tus-suenos-2024-2025.pdf",
  //         "_blank"
  //       ),
  //   },
  //   children: ["Conoce los Términos y condicions"],
  // },
  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     layout: "horizontal",
  //     title: {
  //       text: `Conoce los Términos y condicions`,
  //       fontSize: { base: "14px", medium: "32px", xl: "14px" },
  //       fontFamily: "var(--font-roboto)",
  //       fontWeight: "500",
  //       textAlign: "center",
  //       lineHeight: {
  //         base: "41.6px",
  //         medium: "normal",
  //         xl: "41.6px",
  //       },
  //       margin: {
  //         base: "0 auto",
  //       },
  //       padding: {
  //         base: "17px 17px 65px",
  //         medium: "12px 0px 0px",
  //         xl: "12px 0px 0px",
  //       },
  //       textDecoration: "underline",

  //     },
  //     viewstyle: {
  //       display: "flex",
  //       flexDirection: { base: "column", xl: "row" },
  //       alignItems: { xl: "start" },
  //       justifyContent: "center",
  //       maxHeight: {
  //         base: "auto",
  //         medium: "450px",
  //         xl: "450px",
  //       },
  //       flexWrap: "wrap",
  //       padding: {
  //         base: "",
  //         medium: "113px 0 0",
  //         xl: "113px 0 0",
  //       },
  //       margin: {
  //         base: "0 auto",
  //         medium: "0 auto",
  //         xl: "0 auto",
  //       },
  //     },
  //   },
  // },

  // {
  //   component: "AWSAmplifyComponent",
  //   props: {
  //     layout: "horizontal",
  //     title: {
  //       text: `Descubre a dónde </br> te puede llevar tu imaginación`,
  //       fontSize: { base: "32px", medium: "12px", xl: "32px" },
  //       fontFamily: "var(--font-toyotaDisplay)",
  //       fontWeight: "400",
  //       textAlign: "center",
  //       lineHeight: {
  //         base: "41.6px",
  //         medium: "normal",
  //         xl: "41.6px",
  //       },
  //       padding: {
  //         base: "0px 15px 32px",
  //         medium: "40px 0px 0px",
  //         xl: "81px 0px 71px",
  //       },
  //     },
  //     viewstyle: {
  //       display: "flex",
  //       flexDirection: { base: "column", xl: "row" },
  //       alignItems: { xl: "start" },
  //       justifyContent: "center",
  //       maxHeight: {
  //         base: "auto",
  //         medium: "450px",
  //         xl: "450px",
  //       },
  //       flexWrap: "wrap",
  //       padding: {
  //         base: "",
  //         medium: "113px 0 0",
  //         xl: "113px 0 0",
  //       },
  //       margin: {
  //         base: "",
  //         medium: "0 auto",
  //         xl: "0 auto",
  //       },
  //     },
  //   },
  // },

  // {
  //   component: "VideoPlayer",
  //   props: {
  //     image: {
  //       src: "/images/child_reading_book.jpg",
  //       alt: "Captura de pantalla",
  //     },
  //   },
  // },
  // red-car-with-path-route.png
  //add image and child image and moving car
  {
    component: "ChildDrawingBanner",
    props: {
      backgroundSrc: "",
      childImageSrc: "/images/child-write-with-pencil.png",
      carPathImageSrc: "/images/red-car-with-path-route.png",
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "row" },
        alignItems: { base: "center", xl: "end" },
        justifyContent: "center",
        position: "relative",
        flexWrap: "wrap",
        maxHeight: { base: "auto", medium: "450px", xl: "450px" },
        padding: {
          base: "",
          medium: "113px 0 0",
          xl: "113px 0 0",
        },
        textAlign: {
          base: "center",
          medium: "center",
          xl: "center",
        },
        margin: {
          base: "",
          medium: "0 auto",
          xl: "0 auto",
        },
      },
      children: [
        {
          type: "Image",
          props: {
            src: "/images/red-car-with-path-route.png",
            alt: "red-car-path",
            width: { base: "100%" },
            height: "auto",
            objectFit: "contain",
            padding: {
              base: "57px 16px 0px 17px",
              medium: "57px 16px 0px 17px",
              xl: "0px 0px 0px 60px",
            },
            margin: {
              xl: "0px 0px 177px 0px",
            },
            maxWidth: {
              base: "",
              medium: "251px",
              xl: "250px",
            },
            position: {
              base: "",
              medium: "absolute",
              xl: "absolute",
            },
          },
        },
      ],
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      children: [
        {
          type: "Image",
          props: {
            src: "/images/child-write-with-pencil.png",
            alt: "child-write-with-pencil",
            width: { base: "100%" },
            height: "auto",
            objectFit: "contain",
            padding: {
              base: "57px 16px 0px 17px",
              medium: "57px 16px 0px 17px",
              xl: "0px 0px 0px 60px",
            },
            margin: {
              xl: "0px 0px 177px 0px",
            },
            maxWidth: {
              base: "",
              medium: "251px",
              xl: "250px",
            },
            position: {
              base: "",
              medium: "relative",
              xl: "relative",
            },
            transform: {
              base: "rotate(6.794deg)",
              medium: "rotate(6.794deg)",
              xl: "rotate(6.794deg)",
            },
          },
        },
      ],
    },
  },

  {
    component: "QuienesPuedenParticipar",
    props: {
      title: "¿Quiénes pueden participar?",
      imageMobile: "/images/carro-de-tus-suenos/yello-waves-mobile.svg",
      imageDesktop: "/images/carro-de-tus-suenos/yello-waves-desktop.svg",
      categories: [
        {
          imageSrc: "/images/ParticipantCategory_1.jpg",
          title: "Categoría 1 (4-7 años)",
          customStyles: {
            wrapperMarginLeft: { base: "auto", medium: "inherit" },
            wrapperBottom: { base: "-60px", medium: "inherit" },
          },
        },
        {
          imageSrc: "/images/ParticipantCategory_2.jpg",
          title: "Categoría 2 (8-11 años)",
          customStyles: {
            wrapperMarginLeft: { base: "-53%", medium: "inherit" },
          },
        },
        {
          imageSrc: "/images/ParticipantCategory_3.jpg",
          title: "Categoría 3 (12-15 años)",
          customStyles: {
            wrapperMarginLeft: { base: "auto", medium: "inherit" },
            wrapperTop: { base: "-60px", medium: "inherit" },
          },
        },
      ],
      // topWaveImage: "/images/top-wave.png",
      // bottomWaveImage: "/images/bottom-wave.png",
    },
  },

  {
    component: "ComoParticipar",
    props: {
      title: "¿Cómo puedes participar?",
      steps: [
        {
          imageSrc: "/images/participar_paso1.png",
          title: "PASO 1",
          description: "Descarga el formulario de inscripción",
          titleColor: "#52A942",
        },
        {
          imageSrc: "/images/participar_paso2.png",
          title: "PASO 2",
          description: "Diligéncialo con tus padres.",
          titleColor: "#B62411",
        },
        {
          imageSrc: "/images/participar_paso3.png",
          title: "PASO 3",
          description: "Dibuja el Carro de tus Sueños",
          titleColor: "#00A0E3",
        },
        {
          imageSrc: "/images/participar_paso4.png",
          title: "PASO 4",
          description:
            "Lleva tu dibujo con el formulario al Concesionario Toyota más cercano de tu ciudad.",
          titleColor: "#6B4EA0",
        },
      ],
    },
  },

  {
    component: "PremiosSection",
    props: {
      title: "Premios",
      subtitle: "Categorías 1, 2 y 3",
      prizes: [
        {
          imageSrc: "/images/carro-de-tus-suenos/premio-1003.png",
          // description: "Descripción premio",
        },

        {
          imageSrc: "/images/carro-de-tus-suenos/premio-1001.png",
          // description: "Descripción premio",
        },

        {
          imageSrc: "/images/carro-de-tus-suenos/premio-1004.png",
          // description: "Descripción premio",
        },
        {
          imageSrc: "/images/carro-de-tus-suenos/premio-1002.jpg",
          // description: "Descripción premio",
        },
      ],
    },
  },

  // add here stading girl with sectino : Conviértete en uno de
  {
    component: "GanadoresBanner",
    props: {
      backgroundImage: "/images/girl_with_sectino_image.png",
      girlImage: "/images/girl-thumbs-up.png",
      content: {
        title: "¡Conviértete en uno de nuestros ganadores!",
        description:
          "Participa ahora en esta nueva edición y muéstranos el Carro de tus Sueños.",
      },
      // button: {
      //   label: "📄 Formulario de Inscripción",
      //   link: "#formulario", // Optional: add link if needed
      // },
      // termsText: "Conoce los Términos y condiciones",
      // termsLink: "#terminos", // Optional
    },
  },
  {
    component: "Winners",
    props: {
      tabs: {
        title: "Ganadores 2025",
        bgimageSrc: "/images/Blue_Background_with_wavw.png",
        imageSrc: "/images/sample-trophy.png",
        categories: [
          {
            title: "Categoría 1",
            description: "(4 a 7 años)",
          },
          {
            title: "Categoría 2",
            description: "(8 a 11 años)",
          },
          {
            title: "Categoría 3",
            description: "(12 a 15 años)",
          },
        ],
      },
      carousel: {
        data: [
          {
            winnerName: "Sara Mileneth Gaona Ortiz",
            drawingTitle: "Toyota Ama la Vida y la hace feliz",
            image: "/images/winner/2025/sara-mileneth-gaona-ortiz.jpg",
            description:
              "Mi Toyota es ecológica y funciona con el sol, recoge todos los animales en peligro para salvarlos y darles comida, hogar y llenarlos de amor y felicidad.",
            category: "Categoría 1",
          },
          {
            winnerName: "Joel Jaramillo",
            drawingTitle: "Salvando el mar",
            image: "/images/winner/2025/joel-jaramillo.jpg",
            description:
              "Mi carro acuático Toyota saca la basura con su garra del fondo del mar, es amigable con los animales marinos y hace del mundo un lugar mejor. ",
            category: "Categoría 1",
          },
          {
            winnerName: "Luisa Maria Aguirre Pantoja",
            drawingTitle: "Carro Refugio",
            image: "/images/winner/2025/luisa-maria-aguirre-pantoja.jpg",
            description:
              "Es un carro casa para los niños que están en los semáforos, tiene un panel solar para calentar el agua para que se bañen, recoge agua de la lluvia, en cada piso tiene camas, cocina y también tiene juegos para que se diviertan.",
            category: "Categoría 1",
          },

          {
            winnerName: "Abigail Moreano Quiroz",
            drawingTitle: "El Auto Transformador de Vida",
            image: "/images/winner/2025/abigail-moreano-quiroz.jpg",
            description:
              "Es un carro volador que recorre el mundo, absorbe el aire y agua contaminada y la transforma en aire puro y agua limpia, transformando la muerte en vida.",
            category: "Categoría 2",
          },
          {
            winnerName: "Emmanuel Josue Martinez Barco",
            drawingTitle: "Desconectate y respira Toyota Futurista",
            image: "/images/winner/2025/emmanuel-josue-martinez-barco.jpg",
            description:
              "Se adjunta la descripción anexa al dibujo en una hoja color verde, ya que el espacio es muy pequeño. Muchas gracias por la oportunidad.",
            category: "Categoría 2",
          },
          {
            winnerName: "María Alejandra Castaño Ramirez",
            drawingTitle: "Toyota mi Sueño en Cuatro Ruedas",
            image: "/images/winner/2025/maria-alejandra-castaño-ramirez.jpg",
            description:
              "Que se convierte en barco y después en helicóptero y luego puedo hacer las dos cosas para pasear con mis perritos todos los lugares.",
            category: "Categoría 2",
          },

          {
            winnerName: "Gabriela Burbano",
            drawingTitle: "Agua Car",
            image: "/images/winner/2025/gabriela-burbano.jpg",
            description:
              "Es un carro submarino, su forma es como un tiburón. Recoge los desechos del mar con sus aletas y los almacena en su boca, transforma los plásticos para que no se conviertan en microplásticos.",
            category: "Categoría 3",
          },
          {
            winnerName: "Laura Daniela Gaona Ortiz",
            drawingTitle: "Toyota Surgiambiental",
            image: "/images/winner/2025/laura-daniela-gaona-ortiz.jpg",
            description:
              "Mi Toyota funciona gracias a la energía hidráulica y a la energía de la luz solar, se puede teletransportar con su velocidad, está capacitado para ayudar a regar los árboles para no contaminar el medio ambiente.",
            category: "Categoría 3",
          },
          {
            winnerName: "Tomás Ramírez Sánchez",
            drawingTitle: "Buhocar Toyota",
            image: "/images/winner/2025/tomas-ramirez-sanchez.jpg",
            description:
              "Es un Carro ecológico futurista inspirado en la sabiduria e inteligencia emocional que se desplaza por la tierra, aire y agua. Por medio de sensores identifica el estado emocional de sus ocupantes y transeuntes, emitiendo ondas sonoras y musicoterapia que ayuda a relajar y disminuir el estrés, proporcionandoles tranquilidad y equilibrio para que las personas en el mundo tengan mejor salud mental.",
            category: "Categoría 3",
          },
        ],
      },
    },
  },

  {
    component: "Winners",
    props: {
      tabs: {
        title: "Ganadores 2024",
        bgimageSrc: "/images/Blue_Background_with_wavw.png",
        imageSrc: "/images/sample-trophy.png",
        categories: [
          {
            title: "Categoría 1",
            description: "(4 a 7 años)",
          },
          {
            title: "Categoría 2",
            description: "(8 a 11 años)",
          },
          {
            title: "Categoría 3",
            description: "(12 a 15 años)",
          },
        ],
      },
      carousel: {
        data: [
          {
            winnerName: "Juan José Guarnizo Duque",
            drawingTitle: "Máquina del tiempo Toyota",
            image: "/images/winner/2024/juan-jose-guarnizo-duque.png",
            description:
              "En este vehículo podremos viajar al futuro para encontrar tecnologías más avanzadas para salvar el planeta",
            category: "Categoría 1",
          },
          {
            winnerName: "Sindy Contreras Patiño",
            drawingTitle: "Mi Panterita",
            image: "/images/winner/2024/sindy-contreras-patino.png",
            description:
              "Mi carro recorre la vereda recogiendo los animalitos que nadie les da de comer",
            category: "Categoría 1",
          },
          {
            winnerName: "Claudia Patricia Cruz Reyes",
            drawingTitle: "Coloritos Recolectores",
            image: "/images/winner/2024/claudia-patricia-cruz-reyes.png",
            description:
              "Mi carro recoge la fruta para que los papás tengan tiempo de jugar con los niños",
            category: "Categoría 1",
          },

          {
            winnerName: "Sara Ximena Zambrano",
            drawingTitle: "TOYOTACUY",
            image: "/images/winner/2024/sara-ximena-zambrano.png",
            description:
              "El carro de mis sueños, quiere mejorar la convivencia en el mundo, cambiando las personas con las malas actitudes ante los demás, como robar o matar, las cambia y las hace buenas.",
            category: "Categoría 2",
          },
          {
            winnerName: "Brigitte Johana Barco",
            drawingTitle: "TOYOTA EXPLORA VIDA",
            image: "/images/winner/2024/brigitte-johana-barco.png",
            description:
              "Toyota explora vida es un auto creado por emanuel un científico quien creo un radar que detecta la señal de los animales que piden ayuda, este viaja por el mundo salvando la vida de animales y plantas que se mueren por el calentamiento global",
            category: "Categoría 2",
          },
          {
            winnerName: "Miguel Angel Gonzalez",
            drawingTitle: "HACHI ROKU AL 91",
            image: "/images/winner/2024/miguel-angel-gonzalez.png",
            description:
              'Es un dron "Toyota Trueno" autónomo con inteligencia artificial, funciona como batería para llevar energías limpias a las familias más pobres del mundo y mejorar sus vidas. Se recarga con los elementos tales de la naturaleza que simboliza el Dragón; agua, aire, tierra, fuego, luz y de los buenos deseos de la humanidad.',
            category: "Categoría 2",
          },

          {
            winnerName: "Camilo Alexander Buitrago",
            drawingTitle: "El transformer humanitario",
            image: "/images/winner/2024/camilo-alexander-buitrago.png",
            description:
              "Para cumplir un beneficio para la sociedad, ayuda a los animales en situación de calle, puede volar, cambiar de color, se recarga o se impulsa con la energía que recibe en el panel solar, limpia las calles, recicla, les da regalos a los niños y adultos.",
            category: "Categoría 3",
          },
          {
            winnerName: "Daniel Jaramillo Murillo",
            drawingTitle: "Toyota Interdimensional con manos solidarias",
            image: "/images/winner/2024/daniel-jaramillo-murillo.png",
            description:
              "Es una nave que une países, continentes, planetas y galaxia. Esta Nave de última tecnología investiga cada roncón del universo para mejorar, preservar el agua, la fauna y la flora de cada planeta.",
            category: "Categoría 3",
          },
          {
            winnerName: "Sara Lucia Colmenares Bonilla",
            drawingTitle: "El Auto Invisible",
            image: "/images/winner/2024/sara-lucia-colmenares-bonilla.png",
            description:
              "El auto de mis sueños es el espacio seguro para muchos jóvenes, en donde podrán olvidarse de  sus preocupaciones y miedos.",
            category: "Categoría 3",
          },
        ],
      },
    },
  },

  {
    component: "Winners",
    props: {
      tabs: {
        title: "Ganadores 2023",
        bgimageSrc: "/images/Blue_Background_with_wavw.png",
        imageSrc: "/images/sample-trophy.png",
        categories: [
          {
            title: "Categoría 1",
            description: "(4 a 7 años)",
          },
          {
            title: "Categoría 2",
            description: "(8 a 11 años)",
          },
          {
            title: "Categoría 3",
            description: "(12 a 15 años)",
          },
        ],
      },
      carousel: {
        data: [
          {
            winnerName: "Ainhoa Manuela Mariño",
            drawingTitle: "El carro de mis sueños",
            image: "/images/winner/2023/ainhoa-manuela-marino.png",
            description:
              "Consiste en mejorar el ambiente usando paneles solares, alimentando los peces una vez que navegue, cambiar las groserías por cortería en el tráfico por medio de parlantes, además de volar cuándo sea necesario, todo sea por soñar y salvar el planeta.",
            category: "Categoría 1",
          },
          {
            winnerName: "Emmanuel Josue Martinez Barco",
            drawingTitle: "El auto laboratorio de sueños",
            image: "/images/winner/2023/emmanuel-josue-martinez-barco.png",
            description:
              "El auto laboratorio de los sueños tiene unas fórmulas mágicas con el amor, la fé, el respeto, donde todos los niños y niñas al subir el auto reciben las fórmulas y con ello lograr crear sus sueños, en el auto hay mucha diversión y aprendizaje.",
            category: "Categoría 1",
          },
          {
            winnerName: "Maria jose Garcia",
            drawingTitle: "Toyota Leopardo",
            image: "/images/winner/2023/maria-jose-garcia.png",
            description:
              "Ecológico, solar que protege al medio ambiente, con sensores de apagado rápido para no atropellar animales, será amigo de los animales y del ambiente.",
            category: "Categoría 1",
          },

          {
            winnerName: "Pablo Esteban Muñoz",
            drawingTitle: "Carro ecoinvisible",
            image: "/images/winner/2023/pablo-esteban-munoz.png",
            description:
              "Durante el día tiene muchos colores, porque para el futuro va a ser muy colorido, es volador y se carga con el sol, en la noche se vuelve invisible para ahorrar energía.",
            category: "Categoría 2",
          },
          {
            winnerName: "Jean Paul Mendoza Berti",
            drawingTitle: "Proteo",
            image: "/images/winner/2023/jean-paul-mendoza-berti.png",
            description:
              "En honor al perro rescatista quien murió completando su misión de busqueda a nuestros hermanos de turquía cuenta con un sistema de alta tecnología diseñada por la nasa para la busqueda de sobrevivientes en desastres naturales cuenta con un software que ayuda a localizar personas.",
            category: "Categoría 2",
          },

          {
            winnerName: "Mabel Gabriela Ramirez Rosero",
            drawingTitle: "Out of this world",
            image: "/images/winner/2023/mabel-gabriela-ramirez-rosero.png",
            description:
              "Tiene dos páneles solares, uno en la parte frontal con el que funciona todo el auto y otro en la parte posterior con el que funcionan dos brazos mecánicos que recogen la basura de los ríos y otros lugares para transformarla en energía renovable que a su vez disminuye la contaminación, además consta de asientos desplegables para mayor capacidad de espacio para pasajeros y propulsores en la parte donde están situadas las llantas par allegar a lugares donde no hay vías o donde el acceso es limitado. Es menos ruidoso lo que contribuye a disminuir la contaminación acústica del entorno y mejora la calidad de aire, los colores verdes son un acercamiento a la naturaleza o a la relación que hay entre el auto y el entorno con la finalidad de hacer del mundo un lugar mejor para todos.",
            category: "Categoría 2",
          },
          {
            winnerName: "Susana Marmolejo",
            drawingTitle: "The Moment",
            image: "/images/winner/2023/susana-marmolejo.png",
            description:
              "Represente en mi diseño el amor por la naturaleza el deterioro constante que le hacemos quise resaltar un auto psicodelico con un estilo mi auto ayuda al medio ambiente recogiendo los humos.",
            category: "Categoría 3",
          },
          {
            winnerName: "Valentina Buesaco",
            drawingTitle: "Toyota Cabra",
            image: "/images/winner/2023/valentina-buesaco.png",
            description:
              "Es un Toyota ecologico solar, familiar que me llevara a aconocer sendereos de culturs, ideal apra pasear, me hara ver la vida llena de colores= arcoiris.",
            category: "Categoría 3",
          },
        ],
      },
    },
  },

  {
    component: "Winners",
    props: {
      tabs: {
        title: "Ganadores  2019 al 2022",
        bgimageSrc: "/images/Blue_Background_with_wavw.png",
        imageSrc: "/images/sample-trophy.png",
        categories: [
          {
            title: "Categoría 1",
            description: "(4 a 7 años)",
          },
          {
            title: "Categoría 2",
            description: "(8 a 11 años)",
          },
          {
            title: "Categoría 3",
            description: "(12 a 15 años)",
          },
        ],
      },
      carousel: {
        data: [
          {
            winnerName: "Aron David Flórez ",
            drawingTitle: "Carro sin fronteras ",
            image: "/images/winner/2019-2022/cat-1/Aron.png",
            description:
              " Mi sueño con este carro es que las personas puedan transportarse por terrenos rústicos o de difícil acceso y llegar a su destino de forma segura.",
            category: "Categoría 1",
          },
          {
            winnerName: "Emily Lucero Ortega ",
            drawingTitle: " Una estrella viajera",
            image: "/images/winner/2019-2022/cat-1/Emily.png",
            description:
              "e gustaría viajar en el carro de mis sueños en una noche estrellada observando el cielo que Dios nos dejó para vivir. ",
            category: "Categoría 1",
          },
          {
            winnerName: "IAN MARCEL GALVIS MENESES ",
            drawingTitle: " CARRO VOLADOR COMEHOJAS",
            image: "/images/winner/2019-2022/cat-1/IAN.png",
            description:
              "Es un Carro volador Come Hojas y Troncos de arboles caidos y transformar en energia, residuos forestales y bota humo limpiando las ciudades de Arboles caidos y hojas caidas ( transforma en energia lo forestal). ",
            category: "Categoría 1",
          },
          {
            winnerName: " ISABELLA ARANGO MOSQUERA",
            drawingTitle: " AUTO VOLADOR",
            image: "/images/winner/2019-2022/cat-1/ISABELLA.png",
            description:
              "Me Gustaria que los autos fueran voladores porque no habria contaminación y permitiria llegar a nuestro destino de una forma más rapida ",
            category: "Categoría 1",
          },
          {
            winnerName: " Josue Snaider Guevara Cardozo",
            drawingTitle: " Dinotoyo",
            image: "/images/winner/2019-2022/cat-1/Josue.png",
            description:
              "Me gustan los colores, algo rápido y deportivo para ir a donde quiero. ",
            category: "Categoría 1",
          },
          {
            winnerName: " Maria Antonia Ruíz",
            drawingTitle: " El carro de mis sueños",
            image: "/images/winner/2019-2022/cat-1/Maria.png",
            description:
              " Mi gran sueño es que ya no contaminemos nuestro planeta. Mi carro ayuda con un aporte porque funciona con un panel solar y cuando se enciende devuelve todo lo que hemos perdido.",
            category: "Categoría 1",
          },
          {
            winnerName: "SAMUEL ELIAS PORTO ",
            drawingTitle: " FELICITYGEITOR 705",
            image: "/images/winner/2019-2022/cat-1/SAMUEL.png",
            description:
              "Soy un Niño Feliz y Quiero Que Todos Los Niños Sean Felices. El Carro De Mis Sueños Va Saltando Por El Mundo, Detectando Los Niños Tristes Y Los Succiona Por Su Túnel Llevándolos Dentro Del Carro Donde Hay Un Lindo Parque, Que Está Hecho De Un Súper Material Donde Transforma Todo Los Malos Sentimientos En Buena Energía Que Mezcla Con la Basura.",
            category: "Categoría 1",
          },
          {
            winnerName: "Sebastián Rodríguez ",
            drawingTitle: "Turbo Toyota Space Fire ",
            image: "/images/winner/2019-2022/cat-1/Sebastian-Rodriiguez.png",
            description: "Carro con el que puedo viajar a todos los planetas. ",
            category: "Categoría 1",
          },
          {
            winnerName: " Thomas Santiago Riatigo",
            drawingTitle: " Toyota Wheel Gol Champions",
            image: "/images/winner/2019-2022/cat-1/Thomas-Santiago-Riatigo.png",
            description:
              "Es el auto de mis sueños porque quiero convertirme en un gran futbolista y con la ayuda de Papá Dios y mis padres lo lograré, así puedo llevar a toda mi familia a viajar. ",
            category: "Categoría 1",
          },

          {
            winnerName: "Ángel Gerardo Omaña",
            drawingTitle: "Air 559",
            image: "/images/winner/2019-2022/cat-2/Angel.png",
            description:
              " Air 559 es una nave rápida que recolecta desechos y los convierte en semillas para plantar árboles y por sus propulsores expulsar anti bacterial porque mi nave fue hecha para acabar con ese malvado rival “coronavirus” y hacer que los niños pueden salir a jugar nuevamente.",
            category: "Categoría 2",
          },
          {
            winnerName: "Daniel Jaramillo Murillo ",
            drawingTitle: " Toyota Interdimensional con manos solidarias",
            image: "/images/winner/2019-2022/cat-2/DANIEL-JARAMILLO.png",
            description:
              "Es una nave que une países, continentes planetas y galaxia. Esta Nave de última tecnología investiga cada rincón del universo para mejorar  preservar el agua, el agua, la fama y la flora de cada planeta.",
            category: "Categoría 2",
          },
          {
            winnerName: "Danna Alejanda Careño ",
            drawingTitle: " Mi carro multifunción que ayuda al planeta",
            image: "/images/winner/2019-2022/cat-2/Danna-Alejanda.png",
            description:
              "Me gustaría que el carro de mis sueños se pudiera conducir con luz solar y tuviera una manguera para apagar incendios, una malla para recoger la basura que hay en el aire, una manguera para regar las plantas y un recolector de basura debajo. ",
            category: "Categoría 2",
          },
          {
            winnerName: " Joel David Sepúlveda",
            drawingTitle: " Carros ecológicos",
            image: "/images/winner/2019-2022/cat-2/Joel-David.png",
            description:
              "Es un vehículo Toyota, que funciona de manera ecológica transformando y reutilizando una cierta cantidad de rocas especiales. ",
            category: "Categoría 2",
          },
          {
            winnerName: " Johanna Andrea Anteliz",
            drawingTitle: " El carro del futuro",
            image: "/images/winner/2019-2022/cat-2/Johanna-Andrea.png",
            description:
              "Sueño que este auto será el que tendremos en el futuro, con energía solar y cuando vaya caminando succione la basura para ayudar a cuidar el medio ambiente. Lo que más quiero hacer en este auto sería viajar con mi familia y cuidar el medio ambiente. ",
            category: "Categoría 2",
          },
          {
            winnerName: " Juan Andrés Velásquez",
            drawingTitle: " Siguiendo sueños",
            image: "/images/winner/2019-2022/cat-2/Juan-Andrees.png",
            description:
              " El concepto del seguidor de sueños es seguir el arcoíris y el arco iris representa tus sueños más grandes.",
            category: "Categoría 2",
          },
          {
            winnerName: "María José Barrera",
            drawingTitle: " Burgu Toyota",
            image: "/images/winner/2019-2022/cat-2/Maria-Jose.png",
            description:
              "Mi carro Toyota, detecta personas que quieren salir, pero se sienten inseguras. Mi auto los protege en una burbuja con todo tipo de alta tecnología y con unos botones que están en el apoyabrazos. Les dice si los niveles de covid-19 son altos o bajos, también verifica el estado de la persona, la burbuja es muy resistente a cualquier tipo de temperatura.",
            category: "Categoría 2",
          },
          {
            winnerName: "MIGUEL ANGEL GONZALEZ",
            drawingTitle: "AMPHIBIUS TELEPORTER",
            image: "/images/winner/2019-2022/cat-2/MIGUEL-ANGEL.png",
            description:
              "En mi universo el baloncesto impulsa mi carro, que se teletransporta por agujeros negros al pasado a erradicar las enfermedades con nanobots al presente a limpiar plásticos del mar y al futuro a sembrar comida en el desierto con robots ",
            category: "Categoría 2",
          },
          {
            winnerName: " VALERY JOHANNA PINZON LATORRE",
            drawingTitle: " TOYOTA SIN FRONTERAS",
            image: "/images/winner/2019-2022/cat-2/VALERY-JOHANNA.png",
            description:
              "Toyota sin fronteras es un carro que logrará la unión y libertad de todos los países, personas y animales del mundo, pues es capaz de derribar fronteras que han sido creadas por las personas (las cuales separan familias, animales, cultura, etc) utilizando herramientas como un destructor de muros y una tijera que corta rejas. sin embargo, también tiene la capacidad de superar las fronteras naturales sin destruirlas mediante la creación de puentes, también puede movilizar a personas y animales por aire, tierra y agua, utilizando energía solar que es captada por las alas y la basura recolectada es utilizada para dar energía a las llantas y a las demás herramientas. Toyota sin fronteras es capaz de llegar a cualquier parte del mundo transmitiendo paz, felicidad, libertad, solidaridad y unión entre todos los continentes.",
            category: "Categoría 2",
          },

          {
            winnerName: "Danna Katherine Galvis",
            drawingTitle: "Aquablue I",
            image: "/images/winner/2019-2022/cat-3/Danna.png",
            description:
              " Mi carro bote es ecológico, mientras transforma agua de mar en agua potable para comunidades pobres, también recolecta basura del mar, pero si recolecta peces o algas, su sistema inteligente lo devuelve al mar. Mi gran sueño es ver playas limpias y niños pobres con agua potable.",
            category: "Categoría 3",
          },
          {
            winnerName: "HANNAH WALTER BEDOYA ",
            drawingTitle: " ROCK COLORIDO",
            image: "/images/winner/2019-2022/cat-3/HANNAH.png",
            description:
              "Mi Carro Soñado esta en una espacio diferente al nuestro, en el cual podemos ver un perro manejando ya que me encatan, me encanta el Rock asi que coloque los colores para representar el mundo que es colorido y coloque el carro que quiero tener cuando crezca con las cosas que me gustan.",
            category: "Categoría 3",
          },
          {
            winnerName: "JUAN BARBOSA BARBOSA",
            drawingTitle: "ECOTRANSFORMER",
            image: "/images/winner/2019-2022/cat-3/JUAN.png",
            description:
              "Es un carro que descontamina el ambiente y ayuda a eliminar el Dioxido De Carbono. ",
            category: "Categoría 3",
          },
          {
            winnerName: " Julián David Velandia",
            drawingTitle: " Viaje alrededor del mundo",
            image: "/images/winner/2019-2022/cat-3/Julian.png",
            description:
              "Es un coche propulsado por energías alternativas como la nuclear y así poder recorrer largas distancias. ",
            category: "Categoría 3",
          },
          {
            winnerName: " Laura Ximena Guerrero",
            drawingTitle: " Pulpo Toyota",
            image: "/images/winner/2019-2022/cat-3/Laura.png",
            description:
              "El auto de mis sueños es un auto que recolecta basura, elimina bacterias, virus, etc., y que puede descontaminar ríos y lagos. ",
            category: "Categoría 3",
          },
          {
            winnerName: " Nicole Dayana Velásquez",
            drawingTitle: " Dragón de lotería",
            image: "/images/winner/2019-2022/cat-3/Nicole.png",
            description:
              " El concepto de este carro es una mutación ya que está inspirado en el dragón, el poder, la fuerza y la velocidad.",
            category: "Categoría 3",
          },
          {
            winnerName: "SARA GABRIELA GARZON",
            drawingTitle: "EL BIOEARTH",
            image: "/images/winner/2019-2022/cat-3/SARA.png",
            description:
              "Recoge El Exceso de Co2 Para Generar Combistible Y Lo Convierte En Oxígeno. Tiene Un Panel De Abejas Para Ayudar A Polinizar, Riega Semillas Para Reforestar, Absorbe La Basura Para Reciclar Y Tiene Un Sistema De Procesos Para Reutilizar El Reciclaje.",
            category: "Categoría 3",
          },
          {
            winnerName: "Valeria Tatiana Uribe",
            drawingTitle: "Toyota Balto-Chien",
            image: "/images/winner/2019-2022/cat-3/Valeria.png",
            description:
              "Este dibujo está dedicado a un perrito que veía todos los días en mi ruta, aunque un día tristemente dejé de verlo. El coche de mis sueños sería 'Toyota Balto- Chien' con él viajaría alimentando y ayudando a los animales pequeños. ",
            category: "Categoría 3",
          },
          {
            winnerName: " Yulieth Velasco",
            drawingTitle: " Futuro Toyota",
            image: "/images/winner/2019-2022/cat-3/Yulieth.png",
            description:
              "El carro que dibujo es en sí mismo una máquina del tiempo. Cuando viaja al pasado es para corregir una situación negativa, cuando viaja al futuro es para mantener las buenas enseñanzas del pasado.",
            category: "Categoría 3",
          },
        ],
      },
    },
  },
];

export default function CarroDeTusSuenos() {
  return (
    <div style={{ background: "#F6F6F6" }}>
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
    </div>
  );
}
