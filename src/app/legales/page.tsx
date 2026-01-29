"use client";
import React from "react";
import renderComponent from "@/utils/renderComponent";
import { useSearchParams } from "next/navigation";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

// Datos para la página de Legales

export default function LegalesPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const pageData: ComponentData[] = [
    {
      component: "MainSlider",
      props: {
        slides: [
          {
            imageDesktop: "/images/Banner-legal-desktop.png",
            imageMobile: "/images/Banner-legal-mobile.png",
          },
        ],
        sliderConfig: {
          slidesPerView: 1,
          spaceBetween: 10,
          loop: false,
          isButton: false,
          autoplay: false,
          pagination: {
            clickable: true,
          },
          navigation: false,
          controls: false,
          playButton: false,
        },
        isPlayicon: false,
        containerProps: {
          height: { base: "260px", medium: "50vh", large: "50vh", xl: "632px" },
        },
      },
    },
    {
      component: "ToyotaWorld",
      props: {
        showTitle: false,
        mainTitle: "Información Legal",
        mainSubtitle: "Toyota Colombia",
        mainTitleStyle: {
          fontSize: "xxxxl",
          lineHeight: "110%",
          paddingBottom: "3rem",
          fontWeight: 500,
          letterSpacing: "-1%",
        },
        mainSubtitleStyle: {
          fontSize: { base: "md", xl: "lg" },
          fontWeight: 400,
          marginBottom: "0.5rem",
        },
        containerStyle: {
          margin: { base: "19px 20px 60px", xl: "60px 0 100px" },
        },
        isRedirectLink: true,
        baseUrl: "legales",
        items: [
          {
            label: "Términos y Condiciones",
            value: "terminos_y_condiciones",
            sections: [
              {
                title: "TÉRMINOS Y CONDICIONES",
                description: "DATOS DE LA EMPRESA",
                titleStyle: {
                  fontSize: "26px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  marginTop: "68px",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1.5rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Denominación Social: Automotores Toyota Colombia S.A.S. distribuidor único y autorizado de vehículos de la marca TOYOTA en Colombia, marca de propiedad de Toyota Motor Corporation.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title: "Domicilio: Bogotá",
                description:
                  "Teléfonos: 01 8000 123 691 /(601) 380 9424 Bogotá",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1.5rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title: "ACCESO Y USO DE LA PÁGINA WEB",
                description:
                  "Esta página web puede ser visitada libremente por los usuarios, el uso de esta página es a nivel exclusivamente personal.",
                titleStyle: {
                  fontSize: "26px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Tanto el acceso a esta página web, como el uso que se pueda realizar de la información y contenidos incluidos, será de exclusiva responsabilidad de quien lo realice. Las condiciones de acceso a esta web estarán supeditadas a las leyes vigentes y a los principios de la buena fe y uso lícito por parte del usuario de la misma, quedando prohibido con carácter general, cualquier actuación en perjuicio de Toyota (Automotores Toyota Colombia S.A.S.) , o de terceros.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Se considerará terminantemente prohibido el uso de esta página web con fines ilegales o no autorizados, en concreto y sin carácter exclusivo los siguientes:",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "• Cualquier forma de violación de los derechos de terceros (derecho a la intimidad, a la propia imagen, al secreto de las comunicaciones, a la propiedad intelectual e industrial, a la protección de datos personales, etc.)",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "• Publicar, divulgar y anunciar cualquier material, asunto o información con contenidos obscenos, pornográficos, abusivos, difamatorios o ilegales.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "• Introducir cualquier tipo de virus informático, archivos defectuosos, etc, que puedan provocar daños o alteraciones no autorizadas de los contenidos o sistemas de cualquier clase, accesibles a través de esta página web.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                  marginBottom: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "PROPIEDAD INTELECTUAL",
                description:
                  "El acceso a esta página web, no supone de ninguna manera, licencia para su reproducción y/o distribución, éstas actividades quedan absolutamente prohibidas, salvo que cuenten con el permiso expreso y por escrito de Toyota Motor Corporation, y Automotores Toyota Colombia S.A.S.",
                titleStyle: {
                  fontSize: "26px",
                  fontWeight: 700,
                  marginBottom: "0.75rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "El código fuente, los diseños gráficos, las imágenes, las fotografías, los sonidos, las animaciones, el software, los textos, así como la información y los contenidos que se recogen en el presente sitio web están protegidos por la legislación Colombiana, sobre los derechos de propiedad intelectual e industrial a favor de Toyota Motor Corporation y Automotores Toyota Colombia S.A.S., por lo tanto no se permite la reproducción y/o publicación total o parcial del sitio web, ni su tratamiento informático, su distribución, su difusión, ni su modificación, transformación o “descompilación”, ni demás derechos reconocidos legalmente a su titular, sin el permiso previo y por escrito de Toyota Motor Corporation y Automotores Toyota Colombia S.A.S.",
                description:
                  "El usuario, única y exclusivamente, puede utilizar el material que aparezca en este sitio web para su uso personal y privado, quedando prohibido su uso con fines comerciales o para incurrir en actividades ilícitas. Todos los derechos derivados de la propiedad intelectual están expresamente reservados por Toyota Motor Corporation y Automotores Toyota Colombia S.A.S.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0.75rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "Toyota Motor Corporation, y Automotores Toyota Colombia S.A.S., velarán por el cumplimiento de las anteriores condiciones, como también por la debida utilización de los contenidos presentados en su página web, ejercitando todas las acciones civiles y penales que le correspondan, en el caso de infracción o incumplimiento de estos derechos por parte del usuario.",

                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "RESPONSABILIDAD",
                description:
                  "A.- El sitio web de Toyota no utiliza cookies que se quedarán almacenadas en el ordenador. Las cookies son pequeños archivos que nuestro ordenador envía al suyo, pero que no proporcionan información sobre su nombre, o sobre cualquier dato de carácter personal. Cuando el usuario se encuentre navegando por las páginas web de Toyota, el servidor donde se encuentra alojada reconoce automáticamente la dirección IP de su ordenador, el día y la hora en la que comienza la visita, en la que abandona la visita, así como información sobre las distintas secciones consultadas. Es necesario que el servidor conozca estos datos para poder comunicarse y enviarle la petición realizada, la cual a su vez a través del navegador, se pueda ver en la pantalla.",
                titleStyle: {
                  fontSize: "26px",
                  fontWeight: 700,
                  marginBottom: "0.75rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "B.- Toyota Motor Corporation y Automotores Toyota Colombia S.A.S. se comprometen a través de este medio a NO INCURRIR EN PUBLICIDAD ENGAÑOSA. A estos efectos, por lo tanto, no serán considerados como publicidad engañosa los errores formales o numéricos, que puedan encontrarse a lo largo del contenido de las distintas secciones de la web de Toyota, producidos como consecuencia de un mantenimiento y/o actualización incompleta o defectuosa de la información contenida en estas secciones.Toyota, como consecuencia de lo dispuesto en este apartado, se compromete a corregirlo tan pronto como tenga conocimiento de dichos errores.",
                description:
                  "C.- Toyota Motor Corporation y Automotores Toyota Colombia S.A.S. se comprometen a NO REMITIR COMUNICACIONES COMERCIALES SIN IDENTIFICARLAS COMO TALES. A estos efectos no será considerado como comunicación comercial toda la información que se envíe A LOS CLIENTES de Toyota, siempre que tenga por finalidad el mantenimiento de la relación contractual existente entre cliente y Toyota, así como el desempeño de las tareas de información, formación y otras actividades propias del servicio que el cliente tiene contratado con la empresa.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0.75rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "D.- Toyota Motor Corporation y Automotores Toyota Colombia S.A.S. no se hacen responsables del incumplimiento o no cumplimiento de cualquier norma aplicable en que pueda incurrir el usuario en su acceso al sitio web, el presente sitio web y/o en el uso de las informaciones contenidas en el mismo.",
                description:
                  "E.- Toyota Motor Corporation y Automotores Toyota Colombia S.A.S., no serán responsables de los daños y perjuicios producidos o que puedan producirse, directa o colateralmente cualquiera que sea su naturaleza, que se deriven del uso de la información, de las materias contenidas en este website y de los programas que incorpora. Los enlaces (Links) e hipertexto que posibiliten, a través del sitio web, acceder al usuario a prestaciones y servicios ofrecidos por terceros, no pertenecen ni se encuentran bajo el control de Toyota; dicha entidad no se hace responsable ni de la información contenida en los mismos, ni de cualesquiera efectos que pudieran derivarse de dicha información.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0.75rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "F.- Toyota Motor Corporation y Automotores Toyota Colombia S.A.S., no se hacen responsables del uso ilegítimo que terceras personas puedan hacer de los nombres de marca, nombres de producto, marcas comerciales que, no siendo propiedad de dicha entidad, aparezcan en el presente sitio web. Tampoco se responsabilizan de la integridad, veracidad y licitud del contenido de los enlaces a las webs a las que pueda accederse desde el presente sitio web.",
                description:
                  "G.- Toyota Motor Corporation y Automotores Toyota Colombia S.A.S., no se hacen responsables de los daños o perjuicios directos o indirectos derivados del uso de esta página web, incluidos daños a sistemas informáticos y la introducción de virus.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0.75rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "H.- Toyota Motor Corporation y Automotores Toyota Colombia S.A.S., no se hacen responsables de los contenidos que publiquen las páginas enlazadas y respetan los derechos de propiedad intelectual que sus autores puedan poseer. Cualquier correspondencia, compra de bienes o servicios que realice el usuario con los titulares de las webs enlazadas, atañen estrictamente al usuario y dichos titulares.",
                description:
                  "I.- Toyota Motor Corporation y Automotores Toyota Colombia S.A.S., no se hacen responsables, bajo ningún concepto, de cualquier daño que puedan ocasionar los usuarios de esta página web, por el uso ilegal o indebido de la misma, o de los contenidos e informaciones accesibles o facilitadas a través de ella.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0.75rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "J.- Toyota Motor Corporation y Automotores Toyota Colombia S.A.S., no garantizan que esta página web se encuentre operativa en todo momento, debido a la posibilidad de problemas en la red Internet, averías en los equipos servidores y otras posibles contingencias imprevisibles.",
                description:
                  "K.- En definitiva, el Usuario es el único responsable del uso que realice de los servicios, contenidos, enlaces (links) e hipertextos incluidos en el sitio web del presente sitio web.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0.75rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title: "MODIFICACIONES",
                description:
                  "A.- Toyota podrá modificar, sin previo aviso, la información contenida en su sitio web, así como su configuración y presentación.",
                titleStyle: {
                  fontSize: "26px",
                  fontWeight: 700,
                  marginBottom: "0.75rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "B.- Las presentes Condiciones Generales y todas las relaciones que se establezcan entre el usuario y Toyota se regirán por la legislación colombiana, siendo competentes para la resolución de todos los conflictos derivados o relacionados con el uso de esta página web, los Juzgados y Tribunales Colombianos.",
                description:
                  "C.- La utilización de esta página web implica la aceptación de las anteriores Condiciones Generales.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0.75rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
            ],
          },
          {
            label: "Política de Privacidad",
            value: "politica_de_privacidad",
            sections: [
              {
                title: "POLÍTICAS DE PRIVACIDAD",
                description: "Protegiendo su privacidad e información",
                titleStyle: {
                  fontSize: "26px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  marginTop: "68px",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title: "VERSIÓN ACTUALIZADA",
                description: "19 DE MARZO DE 2025",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1.5rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "Su privacidad es importante para nosotros. Por ello, AUTOMOTORES TOYOTA COLOMBIA S.A.S. (en adelante ATC) se compromete a actuar con responsabilidad al momento de recopilar sus Datos Personales, y a proteger su privacidad. Los “Datos Personales” es aquella información que lo identifica y se relaciona con usted o con otras personas (como, por ejemplo, las personas a su cargo que directamente, o por intermedio suyo, nos entregan su información). ",
                description: " ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1.5rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "Si bien esta Política de Privacidad no constituye un contrato ni crea derechos legales, sí expresa el compromiso de ATC de proteger sus Datos Personales. ATC se reserva el derecho a modificar esta Política de Privacidad en cualquier momento y notificará a sus usuarios sobre cualquier cambio en dicha Política, actualizando el contenido de ésta en la página Web, incluyendo al inicio del texto la frase “VERSIÓN ACTUALIZADA” junto con la fecha de la última actualización. Esta Política de Privacidad lo ayudará a despejar sus dudas acerca de las fuentes y tipo de información que recibimos, cómo la utilizamos, cuándo puede ser compartida con otros, y cómo salvaguardamos su confidencialidad y seguridad. Además, le informamos cómo corregir la información que usted nos brinda y a limitar la divulgación de esta información a terceros. Esta Política de Privacidad es aplicable pero no limitada a, cotizaciones, ventas, investigaciones de mercado, servicios posventa, renting y servicio de atención al cliente. ",
                description: " ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1.5rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "a. Identificación del responsable de tratamiento de sus Datos Personales  ",
                description:
                  "AUTOMOTORES TOYOTA COLOMBIA S.A.S. NIT 900780510-5  ",
                titleStyle: {
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "Carrera 9A No. 99 – 02 Oficina 602. Bogotá D.C., Colombia  ",
                description: "PBX + 57. (601)6381200 / 018000 123691",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title: "www.toyota.com.co",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "b. Tipo de información solicitada y ¿cómo la obtenemos?",
                description:
                  "Con el fin de facilitar el contacto con usted y de administrar nuestro negocio, recibimos, recolectamos y mantenemos sus Datos Personales. Para poder entender y satisfacer sus necesidades, ATC obtiene información de sus clientes a través de muchas fuentes, tales como: ",
                titleStyle: {
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "• Usted, cuando voluntariamente nos brinda información.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "1rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "• Sus transacciones con nosotros o con nuestros aliados.  ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "• Fuentes relacionadas con la red de Concesionarios autorizados por ATC, que brindan información inherente al bien o servicio que usted requiere. ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Los Datos Personales que recogemos de nuestros clientes a través de estas fuentes puede incluir, pero no limitarse a: ",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "• Nombre, direcciones y números de teléfono.   ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "1rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title: "• Fecha de nacimiento y género.   ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title: "• Direcciones de correo electrónico.   ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "• Información necesaria para facilitar la venta u otros servicios, incluyendo información familiar o laboral. ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "• Número de cédula o número de pasaporte, nacionalidad y país de residencia.   ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title: "• Uso de productos y servicios.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "• Datos Personales brindados a través de encuestas u otros métodos de investigación de mercado. ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "• Datos Personales brindados a representantes del departamento de atención al cliente, con la finalidad de investigar y resolver asuntos en discusión y absolver interrogantes. ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "c. ¿Cómo es utilizada su información?  ",
                description:
                  "ATC utiliza Datos Personales de identidad para completar transacciones y llenar solicitudes para obtener nuestros servicios. ATC le pedirá brindar Datos Personales al momento de hacer cotizaciones para comprar bienes, productos y/o servicios que incluyen, pero no se limitan a venta de vehículos, venta de repuestos, venta de seguros, prestación de servicios técnicos, operaciones de renting, servicios de soluciones logísticas, campañas de seguridad y campañas de satisfacción al cliente a través de la red de concesionarios autorizados por ATC. ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Además de utilizarla para procesar, confirmar y cumplir con la venta o algún otro servicio que usted solicite, ATC puede utilizar esta información para fines administrativos y analíticos, tales como pero no limitados a, administración de sistemas de información, contabilidad, facturación y auditorias, marketing, evaluaciones de servicio, procesamiento y verificación de cheques o tarjetas de crédito, correspondencia de nuestra área de Atención al Cliente, control y prevención del lavado de activos y financiación del terrorismo, incluyendo mas no limitándose a consulta en listas restrictivas, para el control de lavado de activos o financiación del terrorismo administradas por organismos internacionales o cualquier autoridad nacional o extranjera, consulta en fuentes de antecedentes judiciales, geolocalización y/o para el funcionamiento de los programas promocionales que se llagasen a implementar. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "En la medida que lo requiera la Ley, brindaremos sus Datos Personales a las autoridades administrativas, gubernamentales o judiciales o a terceros que la requieran en virtud de una citación legal u otro tipo de proceso legal. De la misma manera y si la Ley lo permite, podremos usar o revelar su información para proteger los derechos o el patrimonio de ATC, de nuestros clientes, de nuestro sitio web o de sus usuarios. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "ATC no vende la información de clientes, ni comparte su dirección electrónica o datos de contacto con terceros, excepto por lo expresamente establecido de conformidad con esta política. Sin embargo, podemos divulgar y divulgaremos información de nuestros clientes a Toyota Motor Corporation, compañías afiliadas de ATC, nuestros socios y/o a terceros no afiliados para poder brindarle los productos y servicios solicitados, evaluar los productos y servicios que le hemos ofrecido y/o proteger su seguridad o integridad. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Asimismo, ATC puede combinar la información recibida de usted con información recolectada de otras fuentes. Esta información sería utilizada para proporcionarle las ofertas y/o servicios que se ajusten específicamente a sus intereses, evaluar los productos y servicios que le hemos ofrecido y/o proteger su seguridad o integridad. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "En el caso de que vendamos o cedamos una unidad comercial a otra compañía y sus Datos Personales sean usados por dicha unidad comercial, entonces su información puede ser transferida al comprador junto con el negocio, para que éste pueda utilizarla de la misma manera. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "ATC también usa su información para identificar, desarrollar y comercializar productos y servicios que, a nuestro juicio, son valiosos para usted. Ocasionalmente, usted podrá recibir nuestras promociones, ofertas o cualquier otro mecanismo publicitario o de ventas. Además, podríamos proporcionar a terceros la información que recolectamos de usted, con la finalidad de que éstos distribuyan o informen promociones, concursos, encuestas de marketing, focus groups, entrevistas y otras oportunidades ofrecidas por ATC o la red de concesionarios autorizados. Estos terceros están sujetos a estrictos requisitos de confidencialidad y seguridad de información, y luego de completar sus servicios, toda la información de los clientes es devuelta a ATC o destruida. Usted podrá restringir estas comunicaciones de marketing y la divulgación de su información a terceros, de conformidad con el procedimiento establecido en la Ley y la sección titulada “Para no recibir comunicaciones promocionales y evitar la divulgación de su información a terceros” y la Ley 2300 del 2023 la cual tiene por objeto proteger el derecho a la intimidad de los consumidores y/o cualquier otra que la modifique, aclare o revoque. ",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "ATC también usa su información para identificar, desarrollar y comercializar productos y servicios que, a nuestro juicio, son valiosos para usted, por lo cual podríamos comunicarnos con usted a través del teléfono, correo electrónico, mensajes de texto, courrier o cualquier otro mecanismo que ATC designe. En caso que usted no desee recibir estas comunicaciones por parte de nosotros, podrá optar por no ser incluido en la lista de distribución al momento de brindarnos su información, o durante todo el tiempo que se encuentre incluido. Si usted actualmente no es un cliente, pero desea ser incluido en la lista de distribución para recibir correos electrónicos o mensajes de texto por parte de ATC, las compañías afiliadas o de terceros cuidadosamente seleccionados con quienes mantenemos una relación de negocios, entonces podrá enviarnos su solicitud vía correo electrónico a clientes@toyota.com.co o habeasdata@toyota.com.co. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "d. Datos Sensibles",
                description:
                  "ATC no realizará tratamiento de información sensible, relacionada entre otros, con datos sobre origen racial o étnico, la pertenencia a sindicatos, organizaciones sociales o de derechos humanos, convicciones políticas, religiosas, de la vida sexual, o datos de la salud. ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "KINTO es la marca global de servicios de movilidad de ATC, diseñada para ofrecer soluciones de transporte convenientes, inteligentes y confiables. KINTO incluye varias modalidades de alquiler de vehículos. Estos servicios están diseñados para proporcionar una movilidad sin complicaciones, con tarifas mensuales fijas que incluyen mantenimiento, seguros e impuestos. Al utilizar KINTO, trataremos sus datos personales para las siguientes: ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Tratamos tus datos personales para gestionar y facilitar los servicios de alquiler de vehículos a corto, mediano y largo plazo, incluyendo KINTO SHARE, KINTO ONE PERSONAL y KINTO ONE FLEET. Esto incluye la verificación de identidad, la gestión de reservas, la facturación y el cobro de tarifas, así como la administración de contratos de alquiler. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Utilizamos tus datos para coordinar y proporcionar servicios de mantenimiento, reparaciones y soporte técnico de los vehículos alquilados. Esto incluye la programación de citas, la gestión de garantías y la comunicación de recordatorios de mantenimiento. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Tratamos tus datos personales para cumplir con nuestras obligaciones legales y contractuales, incluyendo la gestión de seguros, el pago de impuestos y la respuesta a solicitudes de autoridades gubernamentales. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Utilizamos tus datos para analizar y mejorar nuestros servicios, así como para personalizar tu experiencia de usuario. Esto incluye la realización de encuestas de satisfacción, el análisis de patrones de uso y la implementación de mejoras en nuestros servicios y plataformas. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Igualmente, realizamos una revisión de antecedentes judiciales debido a que la naturaleza del servicio lo requiere para evitar riesgos para terceros y para ATC. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "f. Toyota Connected Services",
                description:
                  "Toyota Connected Services es un conjunto de servicios de conectividad que mejoran la experiencia de manejo a través de la integración de tecnología avanzada en los vehículos Toyota. Estos servicios incluyen Safety Connect, Service Connect, Drive Connect, Remote Connect y Wi-Fi Connect, cada uno ofreciendo características específicas como asistencia en emergencias, diagnósticos del vehículo, navegación en tiempo real, control remoto del vehículo y conectividad Wi-Fi. Al utilizar Toyota Connected Services, trataremos sus datos personales para las siguientes: ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "• Tratamos tus datos personales para proporcionar y gestionar los servicios de conectividad de Toyota, incluyendo Safety Connect, Service Connect, Drive Connect, Remote Connect y Wi-Fi Connect. Esto incluye la activación y administración de servicios, la gestión de suscripciones y la provisión de soporte técnico. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                  paddingLeft: "1.5rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "• Utilizamos tus datos para ofrecer servicios de seguridad y asistencia en carretera, como la notificación automática de colisión, la asistencia en emergencias y el localizador de vehículos robados. Esto incluye la comunicación con servicios de emergencia y la coordinación de asistencia en carretera. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                  paddingLeft: "1.5rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "• Tratamos tus datos para proporcionar servicios de mantenimiento y diagnóstico del vehículo a través de Service Connect. Esto incluye la generación de informes sobre la condición del vehículo, alertas de mantenimiento y recordatorios de servicio. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                  paddingLeft: "1.5rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "• Utilizamos tus datos para ofrecer servicios de navegación y entretenimiento a través de Drive Connect y Wi-Fi Connect. Esto incluye la provisión de información de tráfico en tiempo real, la asistencia de navegación por agentes en vivo y la integración de servicios de streaming como Apple Music® y Amazon Music™. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                  paddingLeft: "1.5rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "• Tratamos tus datos personales para cumplir con nuestras obligaciones legales y contractuales, incluyendo la gestión de suscripciones, el pago de tarifas y la respuesta a solicitudes de autoridades gubernamentales. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                  paddingLeft: "1.5rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "• Utilizamos tus datos para analizar y mejorar nuestros servicios de conectividad, así como para personalizar tu experiencia de usuario. Esto incluye la realización de encuestas de satisfacción, el análisis de patrones de uso y la implementación de mejoras en nuestros servicios y plataformas. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                  paddingLeft: "1.5rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "• Debido a la naturaleza del servicio, a través de Connected tenemos acceso a la ubicación del vehículo e información sensible de georreferenciación, la cual es indispensable para garantizar la adecuada prestación del servicio. Si no desea conceder acceso a información de georreferenciación deberá abstenerse de adquirir o acceder a los servicios. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                  paddingLeft: "1.5rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "g. Datos de Menores de Edad  ",
                description:
                  "ATC no realizará tratamiento de datos de menores de edad, salvo por actividades y eventos especiales en los cuales, con autorización de los padres de familia o representantes legales del menor, y para fines especiales sea necesario y se mantengan solo por el tiempo requerido para cumplir el propósito del tratamiento. ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "El suministro de los Datos Personales de menores de edad es facultativo y debe realizarse con autorización de los padres de familia o representantes legales del menor. El tratamiento de los datos de los menores de edad se hará dando cumplimiento a lo establecido en el artículo7 de la ley 1581 de 2012 y el Decreto 1377 de 2013. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "h. Transferencia y/o Trasmisión internacional de Datos Personales.",
                description:
                  "Dada la naturaleza de nuestro negocio, para los fines arriba indicados y sujeto a los requerimientos legales aplicables, con la aceptación de la presente política, nos autoriza de forma expresa e inequívoca para que podemos transferir y/o transmitir Datos Personales a personas jurídicas que tienen la calidad de filiales, subsidiarias, o vinculadas a ATC u otras entidades situadas en países (incluso Estados Unidos y otros países que tienen un régimen de protección de datos diferente al del país donde usted tiene su sede). Podemos transferir y/o transmitir la información a nivel internacional por ejemplo a Toyota Motor Corporation, proveedores de servicios, ajustadores, call centers, investigadores, intermediarios de seguros, compañías de asistencia, socios comerciales y autoridades gubernamentales o públicas con las finalidades enunciadas en la Sección 3 de la presente Política. Sin perjuicio de los parámetros que sobre el particular establezca la autoridad de protección de datos en Colombia, ATC realizará, en cada caso, el proceso de debida diligencia a fin de verificar que el país receptor de los Datos Personales cuenta, cuando menos, con similares estándares de protección de datos a los previstos por la regulación colombiana. El receptor de los Datos Personales deberá comprometerse a observar los términos y condiciones previstos en esta Política. Adicionalmente, usted podrá ejercer siempre y en todo momento sus derechos derivados del hábeas data – dentro de los procedimientos previstos en la ley colombiana aplicable – directamente ante ATC, sin tener que acudir a terceros ubicados en un país diferente. ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "i. Otra Información que podríamos recopilar a través de este sitio web  ",
                description:
                  "“Otra Información” es cualquier información que no revela su identidad específica, es decir que no califica como Datos Personales, tal como: ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "• Información del navegador de Internet",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "1rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "• Información recopilada a través de cookies, tags pixel y otras tecnologías",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "• Información demográfica y otra información que nos proporcione",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title: "• Información agregada",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "j. Otra Información que recopilamos",
                description:
                  "Nosotros y nuestros terceros proveedores de servicios podríamos recopilar otra Información de varias maneras, incluso: ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "• A través de su navegador de Internet: La mayoría de los sitios web recogen cierta información, como su dirección de IP (es decir, la dirección de la computadora en Internet), resolución de pantalla, tipo de sistema operativo (Windows, Mac o cualquier otro) y versión, tipo de navegador de Internet y versión, tiempo de la visita y las páginas visitadas. Usamos esta información para fines como calcular los niveles de uso de este sitio web, ayudar a diagnosticar problemas del servidor y administrar este sitio web. ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "1rem",
                  paddingLeft: "1.5rem",
                  marginBottom: "1rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "• Uso de cookies: Las cookies son porciones de información almacenada directamente en la computadora que se está utilizando. Las cookies nos permiten reconocer su computadora y recopilar información como el tipo de navegador de Internet, el tiempo pasado en este sitio web, las páginas visitadas y las preferencias de idioma. Podemos utilizar la información para fines de seguridad, para facilitar la navegación, para mostrar la información de manera más eficaz, para personalizar su experiencia al visitar este sitio web, o para recopilar información estadística sobre el uso de este sitio web. Las cookies también nos permiten presentarle los anuncios u ofertas que es más probable que le gusten. También podemos utilizar cookies para rastrear sus respuestas a nuestros anuncios, y utilizar cookies u otros archivos para rastrear el uso de otros sitios web. ",

                description:
                  "• Uso de tags pixel, contadores de visitantes, GIF transparentes u otras tecnologías parecidas: Estos podrían ser utilizados en relación con algunas páginas de este sitio web y mensajes del formato HTML para, entre otras cosas, darles seguimiento a las acciones de los usuarios de este sitio web y destinatarios. ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "• De usted: Parte de la información (por ejemplo, su ubicación o medio de comunicación preferido) se obtiene cuando usted la proporciona voluntariamente. Salvo que se combine con sus Datos Personales, esta información no lo identifica personalmente ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "1rem",
                  paddingLeft: "1.5rem",
                  marginBottom: "1rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "• Reuniendo información: Podemos reunir y utilizar determinada información (por ejemplo, se puede reunir información para calcular el porcentaje de usuarios que tienen un código de área telefónica en particular). ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "0rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Al aceptar los términos y condiciones de esta Política, usted autoriza el uso y divulgación de Otra Información para cualquier finalidad, salvo que la Ley vigente disponga lo contrario. En caso de que estemos obligados por Ley a tratar la Otra Información como Datos Personales, además de los usos especificados en la sección ¨Otra Información que Recopilamos¨, podremos utilizar y revelar dicha Otra Información para los mismos fines autorizados para los Datos Personales. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  paddingLeft: "1.5rem",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "k. Uso del sitio por parte de menores de edad",
                description:
                  "Este sitio web no está destinado al uso de personas que tengan menos de dieciocho (18) años, y pedimos que estas personas no incluyan Datos Personales en este sitio web. En el evento en que usted nos revele o entregue información sobre menores de edad, usted se compromete a obtener la autorización expresa del padre y/o representante legal del menor, informándole de manera exacta (i) los Datos Personales que nos ha suministrado; (ii) el propósito de la entrega de dicha información; (iii) la forma como podremos usarla de acuerdo con esta Política; y (iv) el hecho de que dicha información puede ser eventualmente transferida a terceros países en los términos y condiciones descritos en esta Política; (v) el derecho del menor de emitir su opinión sobre la recolección y uso de los Datos Personales. ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "l. Datos Personales de otras personas",
                description:
                  "Si proporciona Datos Personales a ATC en relación con otras personas, usted acepta: (a) informar a la persona sobre el contenido de esta Política de Privacidad, y (b) obtener el consentimiento legalmente necesario para la recopilación, uso, divulgación y transferencia (incluso la transferencia a otros países) de Datos Personales acerca de la persona de acuerdo con esta Política de Privacidad. ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "m. Grabaciones telefónicas  ",
                description:
                  "Para efectos de prestar un mejor servicio, realizar un adecuado control de calidad y dejar constancia de su consentimiento o de seguimiento a las comunicaciones, ATC realizará grabaciones de llamadas telefónicas. ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "n. Grabaciones circuito de vigilancia",
                description:
                  "Con el propósito de ofrecer un servicio de mayor calidad y garantizar la seguridad dentro de las instalaciones, ATC ha implementado un circuito cerrado de vigilancia. Este sistema permite la grabación y monitoreo continuo de diversas áreas, asegurando así una supervisión constante y eficaz. Es importante que los usuarios y visitantes tengan en cuenta que, en cualquier momento, pueden ser grabados o monitoreados por las cámaras de seguridad, contribuyendo a un entorno más seguro y controlado. La información recopilada a través de estas grabaciones se maneja con estricta confidencialidad y se utiliza únicamente con fines de seguridad y mejora del servicio. ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "La implementación de este sistema se ha realizado con el mayor respeto a la privacidad y protección de los datos personales de los titilares de la información, cumpliendo con todas las normativas y estándares legales vigentes en materia de protección de datos.",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "o. Datos Biométricos",
                description:
                  "Para mejorar la seguridad en las instalaciones de ATC, se ha implementado un sistema de identificación biométrica. Este sistema permite la identificación y autenticación de los empleados mediante métodos avanzados como el reconocimiento de escaneo facial, ofreciendo un control de acceso más seguro y fiable. ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "La implementación de este sistema se ha realizado con el mayor respeto a la privacidad y protección de los datos personales de los empleados, cumpliendo con todas las normativas y estándares legales vigentes en materia de protección de datos. ",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "p. A quién contactar en relación con sus Datos Personales",
                description:
                  "Si usted tiene alguna pregunta acerca de nuestro uso o tratamiento de sus Datos Personales o si desea ejercer los derechos establecidos en el artículo 8 de la Ley 1581 de 2012 “Habeas Data” podrá: ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "a. Conocer, actualizar y rectificar sus Datos Personales frente a los Responsables del Tratamiento o Encargados del Tratamiento. Este derecho se podrá ejercer, entre otros frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan al error, o aquellos cuyo Tratamiento esté prohibido o no haya sido autorizado. ",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "b. Solicitar prueba de la autorización otorgada al Responsable del Tratamiento.",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "c. Ser informado por el Responsable del Tratamiento o el Encargado de éste, previa solicitud, respecto del uso que le ha dado a sus Datos Personales. ",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "d. Presentar ante la Superintendencia de Industria y Comercio quejas por infracciones a las disposiciones en materia de protección de datos. ",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "e. Revocar la autorización y/o solicitar la supresión del dato cuando en el Tratamiento no se respeten los principios, derechos y garantías constitucionales y legales.",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "f. Acceder en forma gratuita a sus Datos Personales que hayan sido objeto de Tratamiento.",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Puede enviar un correo electrónico a clientes@toyota.com.co o habeasdata@toyota.com.co o contáctenos a la Línea Gratuita de Atención Nacional 01 8000 123691 o en Bogotá al (601) 3809424. El área de Servicio al Cliente de Automotores Toyota Colombia S.A.S., será el responsable de atender sus peticiones, consultas y reclamos. ",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "q. Seguridad de la información  ",
                description:
                  "La seguridad de la información es importante en ATC. Mantenemos estrictos procedimientos físicos, electrónicos y administrativos para proteger los Datos Personales y revisamos con regularidad nuestros estándares y procedimientos de seguridad para proteger dicha información contra accesos no autorizados. Cualquier consideración o comentario que tenga con relación a la seguridad usada en el manejo de su información no dude en enviar un correo electrónico a clientes@toyota.com.co o habeasdata@toyota.com.co o contáctenos a la Línea Gratuita de Atención Nacional 01 8000 123691 o en Bogotá al (601) 3809424. ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "r. Cumplimiento de la Ley de Protección de Datos Personales  ",
                description:
                  "ATC cumple con la Ley de protección de datos personales, en la medida en que ésta aplique a información mantenida por ATC. Esto le brinda ciertos derechos en relación con la información que conservamos sobre usted, lo que incluye el derecho a conocer, actualizar, rectificar y solicitar la supresión de sus Datos Personales a través de los canales de atención indicados. Por favor, recuerde que las regulaciones de seguridad nos exigen brindar a las autoridades acceso a la información suministrada por nuestros clientes. ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "s. Enlaces a otros sitios web de interés  ",
                description:
                  "Así mismo, quisiéramos recordarle que nosotros proporcionamos enlaces a recursos que creemos le serán de utilidad. Estos enlaces lo llevarán a sitios web que no están asociados a ATC y que pueden funcionar bajo distintas políticas de privacidad. Nuestros usuarios serán responsables de leer las políticas de privacidad de dichos sitios web, ya que nosotros no tenemos control sobre la información proporcionada a estas compañías. ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "t. Para no recibir comunicaciones promocionales y evitar la divulgación de sus Datos Personales a terceros ",
                description:
                  "Si usted no desea que ATC utilice o comparta sus Datos Personales con la finalidad de enviarle materiales promocionales o de marketing, puede enviar un correo electrónico a clientes@toyota.com.co o habeasdata@toyota.com.co o contáctenos a la Línea Gratuita de Atención Nacional 01 8000 123691 o en Bogotá al (601) 3809424 y/o registrarse directamente en el sitio de la Comisión de Regulación de Comunicaciones en la plataforma del Registro Nacional de Excluidos. ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Tenga en cuenta que si su solicitud no fue tramitada mediante la plataforma del Registro Nacional de Excluidos es probable que siga recibiendo comunicaciones de marketing que ya estaban en proceso de ser enviadas antes de recibir su solicitud. ",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Así mismo, todos los correos electrónicos promociónales de ATC incluirán dentro del cuerpo del mensaje un enlace para elegir ser retirado de la lista de distribución. Tenga en cuenta que, al optar por ser excluido de estas listas vía correo electrónico, usted estará cancelando la suscripción de todos los usuarios registrados con dicha dirección. ",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "u. ¿Cómo contactarnos?  ",
                description:
                  "Si tiene alguna pregunta, comentario o inquietud respecto de nuestras políticas de privacidad, comuníquese con nosotros al correo electrónico clientes@toyota.com.co o habeasdata@toyota.com.co o contáctenos a la Línea Gratuita de Atención Nacional 01 8000 123691 o en Bogotá al (601) 3809424. ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Si usted desea que retiremos todos sus Datos Personales que mantenemos sobre usted en nuestros registros, envíe un mensaje al mismo correo anteriormente señalado, indicando sus datos y realizando dicha solicitud de acuerdo con los requisitos legales. Recuerde, sin embargo, que para poder ofrecerle nuestros servicios requeriremos de cierta información importante de parte de usted, y si usted nos pide retirar una parte o la totalidad de dicha información, usted no podrá volver a tener acceso a este sitio web o a determinadas secciones del mismo. ",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Mediante la autorización otorgada usted reconoce que ATC y su red de concesionarios a nivel nacional le han informado cuáles son las finalidades del tratamiento y le han comunicado sus derechos referentes a la posibilidad de solicitar conocer, actualizar y rectificar sus Datos Personales; conocer sobre el uso que se le ha dado a sus Datos Personales; solicitar prueba de la presente autorización; revocar su autorización para el tratamiento o solicitar la supresión de sus Datos Personales y acceder en forma gratuita a ellos, de acuerdo a lo señalado en estas políticas. Reconoce que puede ejercer sus derechos como titular de los Datos Personales a través del correo electrónico clientes@toyota.com.co o habeasdata@toyota.com.co y a través de los números telefónicos: línea gratuita nacional 018000 123 691 y línea en Bogotá (601) 380 9424, así como presentando ante la Superintendencia de Industria y Comercio reclamaciones de acuerdo con la Ley que regula el Hábeas Data. ",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "v. Solicitudes de acceso y corrección, preguntas y reclamos",
                description:
                  "Para el ejercicio de sus derechos, el titular de la información podrá presentar consultas o reclamos: ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "A. Procedimiento para realizar consultas (solicitar prueba del consentimiento, conocer los datos que se han recolectado y el tratamiento aplicado).",
                description:
                  "El titular podrá presentar consultas sobre su Información Personal, almacenada en nuestras bases de datos, de conformidad con las siguientes reglas: ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "• Analizaremos la consulta para verificar su identidad. Si la consulta la realiza una persona distinta al titular de Datos Personales y no se acredita que actúa en nombre de este último de acuerdo con la legislación vigente, la consulta será rechazada. ",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                  paddingLeft: "1.5rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "• Todas las consultas serán atendidas en un plazo máximo de diez (10) días hábiles contados a partir de la fecha de recepción y de acuerdo con los demás términos previstos en el artículo 14 de la Ley 1581 de 2012. Si no fuese posible atender la consulta dentro de dicho término, será posible ampliar el plazo por un máximo de cinco (5) días hábiles, siempre y cuando se informe al interesado expresando los motivos de demora y señalando la fecha en que se atenderá su consulta. ",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                  paddingLeft: "1.5rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "B. Procedimiento para presentar reclamos sobre actualización, rectificación, supresión o revocación del consentimiento: ",
                description:
                  "Si considera que su información personal almacenada en las bases de datos de ATC debe ser actualizada, corregida o suprimida, o si cree que ATC ha incumplido alguno de sus deberes como responsable del tratamiento, puede presentar un reclamo siguiendo estas pautas: ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "• Analizaremos el reclamo para verificar su identidad. Si la reclamación es realizada por una persona distinta al titular y no se evidencia su representación de acuerdo con la legislación vigente, el reclamo será rechazado. ",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "• El plazo máximo para atender un reclamo será de quince (15) días hábiles a partir del día siguiente a su recepción, conforme a lo establecido en el artículo 15 de la Ley 1581 de 2012. Si no fuese posible atender el reclamo dentro de dicho término, será posible ampliar el plazo un máximo de ocho (8) días hábiles, siempre y cuando se informe al interesado expresando los motivos de demora y señalando la fecha en que se atenderá su reclamo. ",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "w. Modificaciones a la Política de Privacidad  ",
                description:
                  "ATC se reserva el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será publicado aquí, así que asegúrese de revisar esta página periódicamente. Si bien esta Política de Privacidad no constituye un contrato ni crea derechos legales, sí sirve como expresión del compromiso de ATC de proteger sus Datos Personales.",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "x. Vigencia de la Política de Privacidad",
                description:
                  "Esta Política de Tratamiento de la información fue publicada en la página web en el mes de diciembre de 2014. Las áreas especialmente impactadas fueron informadas de estas disposiciones de manera previa a su publicación, y la Compañía realizó un trabajo colectivo orientado a difundir los aspectos relevantes de esta nueva normativa. Este trabajo de cultura, educación e información se seguirá adelantando a lo largo de la vigencia de la Ley. ",
                titleStyle: {
                  marginTop: "1rem",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                image: {
                  src: "/images/politicas-table.png",
                  alt: "Tabla de Control de Cambios",
                  width: "100%", // Adjust width as needed
                  maxWidth: "553px",
                  marginTop: "1rem",
                },
                titleStyle: {
                  fontSize: "26px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  marginTop: "68px",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0rem",
                },
                padding: { base: "0 20px", xl: "0 380px" },
              },
            ],
          },
          {
            label: "Política de seguridad SGCS",
            value: "politica_de_seguridad_sgcs",
            sections: [
              {
                title: "POLÍTICA DE GESTIÓN EN CONTROL Y SEGURIDAD POLÍTICA",
                description:
                  "Como importadores, Automotores Toyota Colombia S.A.S. (ATC) realiza por cuenta propia o a través de sus ASOCIADOS DE NEGOCIO la compra y venta de vehículos automotores, partes y repuestos para los mismos, involucrando actividades de transporte (aéreo, marítimo y terrestre), desaduanamiento, almacenamiento y despacho.",
                titleStyle: {
                  fontSize: "26px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  marginTop: "68px",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "0rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Nuestro compromiso es garantizar la integridad de nuestros PROCESOS previniendo todo tipo de actividades ilícitas, corrupción, soborno, narcotráfico y terrorismo, lavado de activos entre otros, a través de la implementación del SISTEMA DE GESTION EN CONTROL Y SEGURIDAD – SGCS. Para esto adoptaremos las mejores prácticas en el manejo y GESTIÓN DEL RIESGO asociado a cada parte del proceso de la cadena logística, comprometiéndonos a salvaguardar y minimizar el riesgo asociado a la seguridad en todo lo relacionado a nuestras instalaciones físicas, personal, activos y operaciones.",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "ATC promueve la seguridad en el uso de las tecnologías de la información, el control y la seguridad mediante el cumplimiento de los requisitos legales aplicables a nuestra actividad, garantizando la sostenibilidad del SGCS a través de ciclo de mejora continua PHVA (Planear, Hacer, Verificar, Actuar).",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Los asociados de negocio son una parte esencial de esta estrategia de sostenibilidad, por lo tanto deben de igual manera comprometerse a garantizar la seguridad en sus procesos y a aportar toda la información relacionada a la seguridad de la CADENA DE SUMINISTRO y sus actividades comerciales con ATC, quien revisará periódicamente el cumplimiento de estas obligaciones.",

                descriptionStyle: {
                  marginTop: "1rem",
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
            ],
          },
        ],
        defaultValue: type ? type : "terminos_y_condiciones",
        showFooter: false,
        footerText: "¿Quieres conocer más sobre Toyota en Colombia?",
        footerButtonText: "Contáctanos",
        footerButtonAction: () => console.log("Contact button clicked"),
      },
    },
  ];
  return (
    <div>
      {pageData.map((componentData, index) => (
        <React.Fragment key={index}>
          {renderComponent(componentData)}
        </React.Fragment>
      ))}
    </div>
  );
}
