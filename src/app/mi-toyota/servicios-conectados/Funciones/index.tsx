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

const pageData: ComponentData[] = [
  {
    component: "SafetyFeaturesGrid",
    props: {
      features: [
        {
          title: "Estado del vehículo",
          description:
            "*Tienes control sobre tu vehículo directamente en la aplicación. Consulta el nivel de combustible, el odómetro, su ubicación actual y recibe alertas de advertencias técnicas. Comodidad y seguridad al alcance de tu mano.",
          image: "/images/servicios-conectados/inicio/estado-del-vehiculo.png",
          link: "#",
        },
        {
          title: "Últimos viajes",
          description:
            "Este servicio tiene como objetivo recopilar información de todos los viajes realizados por el vehículo. Consulta información como velocidad promedio, distancias recorridas y puntos de partida y destino, todo en un solo lugar. Ideal para quienes buscan optimizar rutas y planificar paradas con precisión.",
          image: "/images/servicios-conectados/funciones/ultimos-viajes.png",
          link: "#",
        },
        {
          title: "Monitoreo Mejorado",
          description:
            "Ante una desaceleración repentina o la apertura de airbags, el sistema enviará una notificación a través de la App. En el caso de no recibir respuesta, nos contactaremos por teléfono para verificar todo este bien.",
          image:
            "/images/servicios-conectados/funciones/monitoreo-mejorado.png",
          link: "#",
        },
        {
          title: "Notificación de alarma",
          description:
            "Protege tu vehículo: Siempre que la alarma se active, recibirás una alerta en la aplicación, permitiéndote activar el rastreo y/o la inmovilización.",
          image:
            "/images/servicios-conectados/funciones/notificacion-de-alarma.png",
          link: "#",
        },
        {
          title: "Inmovilización de vehículo",
          description:
            "Con este servicio puedes solicitar la inmovilización del vehículo. Una vez que se apaga el auto, no volverá a arrancar hasta que se desactive la inmovilización.",
          image:
            "/images/servicios-conectados/funciones/inmovilizacion-de-vehiculo.jpg",
          link: "#",
        },
        {
          title: "Rastreo de vehículo Robado",
          description:
            "A través de un llamado al Call Center o desde la aplicación, podrás solicitar el rastreo y la posterior inmovilización del vehículo.",
          image:
            "/images/servicios-conectados/funciones/rastreo-de-vehiculo-robado.jpg",
          link: "#",
        },
        {
          title: "Delimitación Geográfica",
          description:
            "Puedes crear una cerca virtual utilizando la posición de GPS del vehículo. Tendrás información sobre la entrada y salida del vehículo en la zona marcada cuando esté en marcha.",
          image:
            "/images/servicios-conectados/funciones/delimitacion-geografica.jpg",
          link: "#",
        },
        {
          title: "Alerta de Velocidad",
          description:
            "Con esta función puedes definir un límite máximo para la velocidad de tu vehículo y recibir una notificación siempre que se supere. Además, accede al historial de viajes y ajusta los límites según tus necesidades.",
          image:
            "/images/servicios-conectados/funciones/alerta-de-velocidad.png",
          link: "#",
        },
      ],
      isButton: false,
      isDivider: false,
      isMobileDivider: false,

      viewStyle: {
        margin: {
          base: "0",
          xl: "0 auto",
        },
        maxWidth: {
          xl: "80%",
        },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Salud del vehículo",
        width: "100%",
        fontSize: { base: "26px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "700",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "36px",
        textAlign: { base: "center", xl: "center" },
        padding: { base: "32px 60px 10px 60px", xl: "162px  0px 0px" },
      },
    },
  },

  // Components with different ordering on mobile vs desktop
  {
    component: "SliderSection",
    props: {
      theme: "light",
      items: [
        {
          image: {
            src: "/images/servicios-conectados/funciones/Puntuacion_de_combustible.png",
          },
          title: "Puntuación de Combustible",
          description:
            "Esta función analiza los hábitos de conducción y proporciona una puntuación basada en diversos factores, como la aceleración y la velocidad mantenida durante los viajes.",
        },
        {
          image: {
            src: "/images/servicios-conectados/funciones/Diagnostico_preventivo.png",
          },
          title: "Diagnóstico Preventivo",
          description:
            "El sistema detecta la condición actual del vehículo, informa sobre advertencias técnicas y envía notificaciones en la aplicación con alertas indicando que podría ser necesaria una revisión.",
        },
        {
          image: {
            src: "/images/servicios-conectados/funciones/Recordatorio_de_mantenimiento.png",
          },
          title: "Recordatorio de Mantenimiento",
          description:
            "A través de la aplicación se envían notificaciones personalizadas sobre mantenimientos programados, ayudándote a matener la seguridad y el rendimiento de tu vehículo.",
        },
      ],
      showButton: false,
    },
    order: {
      mobile: 1, // First in mobile
      desktop: 3, // Last in desktop
    },
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Servicios opcionales",
        fontSize: { base: "26px", xl: "22px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "700",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: "30.4px",
        textAlign: { base: "center", xl: "center" },
        padding: { base: "20px 60px 58px 60px", xl: "0px  0px 40px" },
        margin: { base: "0 auto", xl: "" },
      },
    },
  },

  {
    component: "SafetyFeaturesGrid",
    props: {
      features: [
        {
          title: "Wi-fi a bordo",
          description:
            "*** A solicitud del cliente, Wi-Fi a Bordo ofrece conectividad en el vehículo, permitiéndote comprar paquetes de datos directamente con un operador asociado. Accede a internet durante tus viajes con facilidad, garantizando más comodidad y practicidad.",
          image: "/images/servicios-conectados/inicio/wi-fi-a-bordo.png",
          link: "#",
          height: { base: "235px" },
        },
        // {
        //   title: "Seguro Conectado",
        //   description:
        //     "Al contratar un Seguro Conectado (****), obtendras acceso gratuito al paquete pago de Servicios Conectados (13 servicios) durante toda la vigencia del contrato de seguros. ",
        //   image: "/images/servicios-conectados/funciones/seguro-conectado.png",
        //   link: "#",
        // },
      ],
      isButton: false,
      isDivider: false,
      isMobileDivider: false,
      viewStyle: {
        margin: {
          base: "0",
          xl: "0 auto",
        },
        maxWidth: {
          xl: "80%",
        },
      },
    },
  },

  // ----

  {
    component: "AWSAmplifyComponent",
    props: {
      image: {
        src: "/svgs/mobile.svg",
        alt: "toyota-servicios-conectados",
        width: { base: "100%", xl: "auto" },
        display: "block",
        height: { base: "40px", xl: "auto" },
        objectFit: "contain",
        margin: { base: "45px auto 0px", medium: "105px auto 32px" },
      },
      viewstyle: {
        display: "flex",
        flexDirection: { base: "column", xl: "row" },
        alignItems: "center",
        justifyContent: "center",
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      layout: "horizontal",
      title: {
        text: "Toyota App",
        fontSize: { base: "22px", xl: "56px" },
        fontFamily: "var(--font-ToyotaType-Regular)",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: { base: "normal", xl: "61.6px" },
        textAlign: { base: "center", xl: "center" },
        maxWidth: {
          xl: "80%",
        },
        width: {
          xl: "386px",
        },
        padding: { base: "18px 15px 0px", xl: "0" },
        margin: { base: "0 auto", xl: "" },
        letterSpacing: "-1.12px",
      },
      viewstyle: {
        display: { base: "flex" },
        flexDirection: { base: "column" },
        alignItems: { base: "center" },
        justifyContent: { base: "center" },
      },
    },
  },

  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Conéctate con  todo lo que te mueve ",
        fontSize: { base: "14px", xl: "22px" },
        fontFamily: "var(--font-toyotaDisplay)",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          xl: "70%",
        },
        lineHeight: { base: "normal", xl: "30.4px" },
        textAlign: { base: "center", xl: "center" },
        padding: { base: "11px 16px 34px 15px", xl: "32px  0px 72px" },
        margin: { base: "0 auto", xl: "" },
      },
    },
  },
  // playstore component
  {
    component: "ConnectedServices",
  },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text: "Línea de atención gratuita para clientes con vehículos con Servicios Conectados: (01 800) 519 1353.",
        fontSize: { base: "12px", xl: "16px" },
        fontFamily: { base: "var(--font-ToyotaType-Regular)", xl: "var(--font-toyotaDisplay)" },
        fontStyle: "normal",
        fontWeight: { base: "400", xl: "400" },
        maxWidth: {
          // xl: "70%",
        },
        lineHeight: { base: "100%", xl: "30.4px" },
        textAlign: { base: "start", medium: "center", large: "center", xl: "center" },
        padding: { base: "24px 15px 23px 0px", xl: "32px  0px 72px" },
        margin: { base: "0 auto", xl: "" },
        letterSpacing: { base: "0px", xl: "" },

      },
    },
  },

  {
    component: "AmplifyAccordion",
    props: {
      data: [
        {
          sectionTitle: "Preguntas Frecuentes",
          items: [
            {
              title: "Servicios Conectados",
              content:
                "*Toyota Servicios Conectados te permite controlar los datos de tu vehículo desde la app de Toyota. Podrás ver la ubicación, consumo de combustible, últimos viajes, recibir alertas, delimitar velocidad máxima y mucho más.",
            },
            {
              title: "¿Cuántas opciones de planes hay disponibles?",
              content:
                "*Hay 2 paquetes disponibles: Siempre Conectado (paquete de 5 servicios) y Seguridad Conectada (los 5 servicios anteriores + servicios adicionales).",
            },
            {
              title: "¿Qué servicios incluye el plan Siempre Conectado?",
              content:
                "*El plan Siempre Conectado incluye 5 servicios: estado del vehículo, recordatorio de mantenimiento, indicador de nivel de combustible, últimos viajes y diagnóstico del vehículo.",
            },
            {
              title: "¿Qué servicios incluye el plan Seguridad Conectada?",
              content:
                "Incluye todos los 5 servicios del plan Siempre Conectado y algunas funciones adicionales como la delimitación geográfica, notificación de alarma, rastreo de vehículo robado, alerta de velocidad, inmovilización del vehículo, monitoreo mejorado y aviso de desconexión del módulo.",
            },
            {
              title: "¿Cómo utilizo Servicios Conectados?",
              content: `*Lo primero que tienes que hacer es activar el vehículo en el concesionario. Después, descarga la app disponible en la tienda de tu celular (Toyota en Android y Toyota LATAM en iOS) e inicia sesión utilizando la misma dirección de correo electrónico utilizada para activar el vehículo (puedes apoyarte en tu concesionario). Una vez que hayas iniciado sesión, tu vehículo aparecerá en la pestaña "Mi Toyota". Solo tienes que seguir los pasos de activación y al finalizar ya podrás utilizar los Servicios Conectados.`,
            },
            {
              title: "¿Cómo activo mi vehículo conectado?",
              content:
                "*La activación se realiza al momento de entrega del vehículo en el concesionario. Si aún no lo activaste, acércate a un concesionario oficial de la red Toyota Colombia.",
            },
            {
              title: "¿Cómo configuro una alerta de velocidad en la app?",
              content: `Ingresa a la pestaña "Mi Toyota" y selecciona la opción Alerta de Velocidad. Ahí podrás configurar la alerta haciendo clic en la tarjeta para establecer la velocidalímite.`,
            },
            {
              title: "¿Puedo configurar más de una alerta de velocidad?",
              content: "No, sólo podrás configurar una alerta a la vez.",
            },
            {
              title: "¿Cómo sé si la alerta de velocidad está activada?",
              content: `En la pestaña "Mi Toyota", la tarjeta de Alerta de Velocidad muestra el estado actual, si se encuentra Activado o Desactivado.`,
            },
            {
              title: "¿Quién puede crear una alerta de velocidad?",
              content: `Sólo el usuario con el perfil "Propietario" puede crear una alerta de velocidad.`,
            },
            {
              title:
                "¿Quién recibirá una notificación si se supera el límite de velocidad?",
              content:
                "El propietario y los conductores adicionales registrados recibirán una alerta si se supera el límite de velocidad establecido.",
            },
            {
              title: "¿Cómo funciona la delimitación geográfica?",
              content: `Este servicio crea una geo-valla virtual alrededor del vehículo utilizando la posición GPS. Si la valla se rompe, recibirás una notificación en tu aplicación y podrás solicitar asistencia al Centro de Atención al Cliente de Toyota. Para que funcione, la valla debe haber sido creada previamente por el usuario con el perfil "Propietario".`,
            },
            {
              title: "¿Cuántas delimitaciones puedo crear al mismo tiempo?",
              content:
                "Puedes crear hasta 5 delmitaciones geográficas al mismo tiempo.",
            },
            {
              title:
                "¿Quién recibirá una notificación si se rompe una geo-valla?",
              content:
                "Todos los usuarios registrados recibirán una notificación en la aplicación si se rompe una geo-valla.",
            },
            {
              title: "¿Cómo funciona la notificación de alarma?",
              content:
                "Este servicio genera una notificación en la App cuando se activa la alarma del vehículo, ya sea abriendo puertas, rompiendo ventanillas o moviendo el vehículo.",
            },
            {
              title: "¿Qué hacer cuando se recibe una notificación de alarma?",
              content:
                "Cuando recibas una notificación de alarma, puedes elegir entre varias acciones: 1 - Llamar al Centro de Atención al Cliente; 2 - Solicitar la activación del seguimiento del vehículo.",
            },
            {
              title:
                "He recibido una notificación de alarma. ¿Cómo funciona la activación del seguimiento de vehículo?",
              content:
                "Cuando recibas una notificación de alarma, verás la opción de “Solicitar la activación del seguimiento del vehículo”. Al hacer clic en esta opción, el Centro de Atención al Cliente recibirá la solicitud, se pondrá en contacto con el propietario para confirmar la identidad y activar el seguimiento.",
            },
            {
              title:
                "¿Cómo funciona el servicio de inmovilización de vehículo?",
              content:
                "Puedes ponerte en contacto con el Centro de Atención al Cliente a través de la aplicación o por teléfono para solicitar la inmobilización del vehículo. Tras confirmar tu identidad, el Centro de Atención al Cliente enviará la señal de inmovilización. Así, una vez que se apague el motor del vehículo, no volverá a arrancar hasta que se desactive la inmovilización.",
            },
            {
              title: "¿Quién puede solicitar la inmovilización del vehículo?",
              content: `Sólo el usuario con el perfil "Propietario" puede solicitar la inmovilización del vehículo.`,
            },
            {
              title: "¿Cómo funciona la alerta de desconexión del módulo?",
              content: `El Centro de Atención al Cliente recibirá una notificación si el módulo se desconecta. A continuación, se pondrá en contacto con la persona registrada como "propietario" para confirmar si se encuentra en una situación particular o para ayudarlo con el error.`,
            },
          ],
        },
      ],
      viewStyle: {
        bgColor: { base: "#fff", xl: "#F6F6F6" },
        margin: {
          base: "57px 0 42px",
          xl: "148px auto 82px",
        },
        padding: {
          base: "0",
          xl: "6.5rem 9.6875rem 5.25rem",
        },
        maxWidth: {
          base: "100%",
          xl: "95.625rem",
        },
      },
    },
  },

  // add slider here
  // {
  //   component: "VehicleCardList",
  //   props: {
  //     vehicles: [
  //       {
  //         imageSrc: "/svgs/mobile.svg",
  //         title: "title",
  //         price: "55d4ee",
  //         description: "dnekjhdkhejhdhegdjehhdehdfhge",
  //         buttonText: "button",
  //       },
  //       {
  //         imageSrc: "/svgs/mobile.svg",
  //         title: "title",
  //         price: "55d4ee",
  //         description: "dnekjhdkhejhdhegdjehhdehdfhge",
  //         buttonText: "button",
  //       },
  //       {
  //         imageSrc: "/svgs/mobile.svg",
  //         title: "title",
  //         price: "55d4ee",
  //         description: "dnekjhdkhejhdhegdjehhdehdfhge",
  //         buttonText: "button",
  //       },
  //     ],
  //   }
  // },
  {
    component: "AWSAmplifyComponent",
    props: {
      title: {
        text:
          "(*) Servicios Conectados son aplicables de acuerdo con el tipo de vehículo y versión. Se refiere a los servicios de movilidad que, mediante la integración de tecnologías digitales, proporciona una variedad de características y funcionalidades que permitan al propietario tener más seguridad y comodidad en su vehículo. Podrá obtener toda información, planes vigentes, condiciones o limitaciones que puedan aplicarse a los servicios, así como una lista completa de sus características en el presente sitio. A todo evento, resultan de aplicación los Términos y Condiciones del servicio." +
          '<a style="color: blue" href="https://www.toyota.com.co/legales/terminos_y_condiciones_de_uso_de_los_servicios_conectados" target="_blank" rel="noopener noreferrer">https://www.toyota.com.co/legales/terminos_y_condiciones_de_uso_de_los_servicios_conectados</a>\n' +
          "(**) Servicios válidos y vigentes dentro del Territorio Colombiano. Precio sugerido al público, vigente desde el 1/08/2025 hasta el 31/12/2025. Los valores informados incluyen IVA e impuestos internos vigentes; cualquier otro impuesto, alícuota, percepción, tasa, contribución y/o tributo que pudiere establecerse, modificará el importe detallado.\n" +
          "(***) Servicio provisto por la compañía de telecomunicaciones disponible para consulta desde la Toyota App. Con quien usted deberá suscribir un contrato de adhesión. Aplican los Términos y Condiciones, así como la Política de Privacidad de la empresa prestadora del servicio.",
        fontSize: { base: "12px", xl: "12px" },
        fontFamily: "var(--font-toyotaDisplay)",
        wordBreak: "break-word",
        fontStyle: "normal",
        fontWeight: "500",
        maxWidth: {
          base: "100%",
          xl: "95.625rem",
        },
        lineHeight: "100%",
        textAlign: { base: "left", xl: "left" },
        padding: { base: "32px 16px 0px 15px", xl: "32px 16px 0px 16px" },
        color: "#000",
        whiteSpace: "pre-line",
      },
    },
  },
];
export function FuncionesComponent() {
  return (
    <React.Fragment>
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
