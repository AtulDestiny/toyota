"use client";
import React from "react";
import renderComponent from "@/utils/renderComponent";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";

interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
  children?: (ComponentData | string)[];
}

// Datos para la página de Legales

export default function LegalesPage() {
  const params = useParams();
  const type = params?.type;

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
          {
            label: "Términos Y Condiciones - Cotizador Web",
            value: "terminos_y_condiciones_cotizador_web",
            sections: [
              {
                title: "TÉRMINOS Y CONDICIONES - COTIZADOR WEB",
                description:
                  "La presente cotización tiene carácter informativo y no constituye una oferta comercial mercantil vinculante. El precio de venta, descuentos, disponibilidad, especificaciones, año modelo, equipamiento y demás condiciones especificadas en este documento son de referencia y están sujetos a cambios sin previo aviso. Los gastos de matrícula y seguros no están incluidos en esta cotización. La validez (fecha de vencimiento) de esta cotización será definida por el concesionario. Pasada esta fecha, los términos y condiciones deberán ser revisados y actualizados, en relación con cualquier cambio en las especificaciones o en las condiciones del mercado. Este vehículo puede ser vendido con las siguientes garantías, según el caso: 1. Con garantía vigente otorgada por el fabricante y/o importador. 2. Garantía adicional (otorgada por el proveedor o expendedor una vez vencida la otorgada por el fabricante y/o importador) 3. Sin garantía. Una vez vencida la garantía otorgada por el fabricante y/o importador (1) o cuando el vendedor, o distribuir no la ofrezca (2).",
                titleStyle: {
                  fontSize: "26px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  marginTop: "68px",
                },
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
            ],
          },
          {
            label: "Autorización De Tratamiento De Datos Personales",
            value: "autorizacion_tratamiento_datos_personales",
            sections: [
              {
                title: "AUTORIZACIÓN DE TRATAMIENTO DE DATOS PERSONALES",
                titleStyle: {
                  fontSize: "26px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  marginTop: "68px",
                },

                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Mediante la entrega del presente formulario autorizo a mi concesionario de preferencia (en adelante el “CONCESIONARIO”) y AUTOMOTORES TOYOTA COLOMBIA S.A.S. (en adelante ATC) para recolectar, almacenar, utilizar, circular, suprimir, transmitir y/o transferir (por fuera o dentro de Colombia) y en general, tratar mis datos personales.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "El tratamiento de mis datos personales se realizará en los términos y por las personas que se indican en la Política de los Datos Personales del CONCESIONARIO y ATC, y para perseguir las siguientes finalidades:",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "• Envío de comunicaciones sobre actividades comerciales o promocionales del CONCESIONARIO o ATC a través de mis canales autorizados.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description: "•  Comercialización de productos;",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "• Envío de notificaciones, comunicaciones y mensajes a través de medios físicos y/o electrónicos relacionados con las actividades, productos y servicios que el CONCESIONARIO y ATC ofrecen, los productos o servicios que yo he adquirido en el CONCESIONARIO;",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Análisis de datos de encuestas y sus resultados, programas y estrategias de marketing y gestión de ventas con o sin fines estadísticos, investigativos, comerciales o actuariales;",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "• Aspectos relacionados con la obligación del CONCESIONARIO y ATC de hacer efectiva la garantía legal;",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "• Cumplimiento de normatividad del sector en Colombia o en los países en donde el CONCESIONARIOS y ATC tengan filiales o aliados comerciales o estratégicos;",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description: "•  Manejo de pagos y controles contables;",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Entrega y remisión de informes a las autoridades de control;",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Aspectos relacionados con la prestación de servicios postventa; y",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Aspectos relacionados con la implementación de campañas de seguridad de sus productos.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Consulta en fuentes de antecedentes judiciales.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Consulta y captura de datos que permitan la georreferencia.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Procesamiento de información a través de sistemas de inteligencia artificial seguras.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Mediante la suscripción de este documento, reconozco que el CONCESIONARIO y ATC me han dado a conocer sus Políticas de Tratamiento de Datos Personales, las cuales se encuentran disponibles en (LUGAR DE PUBLICACIÓN DE LA POLÍTICA DEL CONCESIONARIO] y en https://www.toyota.com.co/políticas-de-privacidad/.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Declaro que conozco y entiendo mis derechos, los cuales consisten en: (i) conocer, actualizar y rectificar mis datos personales; (ii) solicitar copia de la presente autorización; (iii) ser informado del uso que se le dará a mis datos personales; (iv) presentar quejas ante el CONCESIONARIO y ATC, y ante la Superintendencia de Industria y Comercio; (v) acceder de forma gratuita a mis datos personales; (vi) revocar la presente autorización, y (vii) solicitar la supresión de mis datos personales. En cualquier caso, declaro y entiendo que la supresión de mis Datos Personales procederá siempre que no exista una obligación legal o contractual que requiera la conservación de los mismos.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Me han informado que el CONCESIONARIO y ATC han dispuesto el siguiente correo electrónico habeasdata@toyota.com.co y los siguientes números telefónicos 6013809424 y 018000123691 para la atención de requerimientos relacionados con el tratamiento de mis datos personales y el ejercicio de mis derechos.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Finalmente, reconozco que el suministro de mis datos personales sensibles es facultativo y que en caso de suministrarlos ha sido de manera voluntaria, sin que se me hubiera condicionado a la prestación de ningún servicio.",
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
            label: "Políticas de Privacidad Servicios Conectados",
            value: "politicas_de_privacidad_servicios_conectados",
            sections: [
              {
                title: "POLÍTICAS DE PRIVACIDAD ",
                titleStyle: {
                  fontSize: "26px",
                  fontWeight: 700,
                  marginTop: "68px",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description: "Protegiendo su privacidad e información ",
                descriptionStyle: {
                  fontSize: "26px",
                  fontWeight: 700,
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description: "10 DE JULIO DE 2025",
                descriptionStyle: {
                  fontSize: "26px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Su privacidad es importante para nosotros. Por ello, AUTOMOTORES TOYOTA COLOMBIA S.A.S. (en adelante ATC) y TOYOTA DO BRASIL LTDA. (en adelante TDB) se comprometen a actuar con responsabilidad al momento de recopilar sus Datos Personales, y a proteger su privacidad. Los “Datos Personales” es aquella información que lo identifica y se relaciona con usted o con otras personas (como, por ejemplo, las personas a su cargo que directamente, o por intermedio suyo, nos entregan su información).",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Si bien esta Política de Privacidad no constituye un contrato ni crea derechos legales, sí expresa el compromiso de ATC y TDB de proteger sus Datos Personales. ATC y TDB se reservan el derecho a modificar esta Política de Privacidad en cualquier momento y notificará a sus usuarios sobre cualquier cambio en dicha Política, actualizando el contenido de ésta en la página Web, incluyendo al inicio del texto la frase “VERSIÓN ACTUALIZADA” junto con la fecha de la última actualización. Esta Política de Privacidad lo ayudará a despejar sus dudas acerca de las fuentes y tipo de información que recibimos, cómo la utilizamos, cuándo puede ser compartida con otros, y cómo salvaguardamos su confidencialidad y seguridad. Además, le informamos cómo corregir la información que usted nos brinda y a limitar la divulgación de esta información a terceros. Esta Política de Privacidad es aplicable pero no limitada a, cotizaciones, ventas, investigaciones de mercado, servicios posventa, renting y servicio de atención al cliente.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "a. Identificación del responsables de tratamiento de sus Datos Personales",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "AUTOMOTORES TOYOTA COLOMBIA S.A.S. NIT 900780510-5 Carrera 9A No. 99 – 02 Oficina 602. Bogotá D.C., Colombia PBX + 57. (601)6381200 / 018000 123691 www.toyota.com.co y",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "TOYOTA DO BRASIL LTDA., una empresa privada con sede en el Municipio de Sorocaba, Estado de São Paulo, Avenida Toyota, nº 9.055, Itavuvu, CEP 18.079-755, Brasil, inscrita en el CNPJ bajo el nº 59.104.760/ 0006-04.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "b. Tipo de información solicitada y ¿cómo la obtenemos?",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Con el fin de facilitar el contacto con usted y de administrar nuestro negocio, recibimos, recolectamos y mantenemossus Datos Personales. Para poder entender y satisfacer sus necesidades, ATC y TDB obtienen información de sus clientes a través de muchas fuentes, tales como:",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Usted, cuando voluntariamente nos brinda información.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Sus transacciones con nosotros o con nuestros aliados.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Fuentes relacionadas con la red de Concesionarios autorizados por ATC o TDB, que brindan información inherente al bien o servicio que usted requiere.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Automáticamente, al utilizar la Aplicación Toyota, una situación en la que los Datos Personales pueden recopilarse mediante el uso de cookies.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Los Datos Personales que recogemos de nuestros clientes a través de estas fuentes puede incluir, pero no limitarse a:",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Nombre, contraseña, direcciones, correo electrónico, números de teléfono, contato de emergencia (nombre y teléfono) y foto.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description: "•  Fecha de nacimiento y género.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description: "•  Direcciones de correo electrónico.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Información necesaria para facilitar la venta u otros servicios, incluyendo información familiar o laboral.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Número de cédula o número de pasaporte, nacionalidad, idioma y país de residencia.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description: "•  Uso de productos y servicios.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Datos Personales brindados a través de encuestas u otros métodos de investigación de mercado.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Datos Personales brindados a representantes del departamento de atención al cliente, con la finalidad de investigar y resolver asuntos en discusión y absolver interrogantes.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  datos del vehículo: matrícula, modelo, año, chasis, VIN;",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  datos de comportamiento: geolocalización, comportamiento de conducción, tiempo de residencia, concesionarios favoritos;",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  atributos asociados con sus dispositivos electrónicos: user ID, dirección IP, fecha y hora de uso.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "c. ¿Cómo es utilizada su información?",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "ATC y TDB utilizan Datos Personales para completar transacciones y llenar solicitudes para obtener nuestros servicios. ATC y TDB le pedirán brindar Datos Personales al momento de hacer cotizaciones para comprar bienes, productos y/o servicios que incluyen, pero no se limitan a venta de vehículos, venta de repuestos, venta de seguros, prestación de servicios técnicos, operaciones de renting, servicios de soluciones logísticas, campañas de seguridad y campañas de satisfacción al cliente a través de la red de concesionarios autorizados por ATC o TDB.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Además de utilizarla para procesar, confirmar y cumplir con la venta o algún otro servicio que usted solicite, ATC y TDB pueden utilizar esta información para fines administrativos y analíticos, tales como pero no limitados a, administración de sistemas de información, contabilidad, facturación y auditorias, marketing, evaluaciones de servicio, procesamiento y verificación de cheques o tarjetas de crédito, correspondencia de nuestra área de Atención al Cliente, control y prevención del lavado de activos y financiación del terrorismo, incluyendo mas no limitándose a consulta en listas restrictivas, para el control de lavado de activos o financiación del terrorismo administradas por organismos internacionales o cualquier autoridad nacional o extranjera, consulta en fuentes de antecedentes judiciales, geolocalización y/o para el funcionamiento de los programas promocionales que se llagasen a implementar.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "En la medida que lo requiera la Ley, brindaremos sus Datos Personales a las autoridades administrativas, gubernamentales o judiciales o a terceros que la requieran en virtud de una citación legal u otro tipo de proceso legal. De la misma manera y si la Ley lo permite, podremos usar o revelar su información para proteger los derechos o el patrimonio de ATC y TDB, de nuestros clientes, de nuestro sitio web o de sus usuarios o cumplir con nuestras obligaciones legales o reglamentarias o permitir el ejercicio regular de nuestros derechos.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "ATC y TDB no venden la información de clientes, ni comparte su dirección electrónica o datos de contacto con terceros, excepto por lo expresamente establecido de conformidad con esta política. Sin embargo, podemos divulgar y divulgaremos información de nuestros clientes entre ATC y TDB, a Toyota Motor Corporation, compañías afiliadas de ATC o TDB, nuestros socios y/o a terceros no afiliados para poder brindarle los productos y servicios solicitados, evaluar los productos y servicios que le hemos ofrecido y/o proteger su seguridad o integridad.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Asimismo, ATC y TDB pueden combinar la información recibida de usted con información recolectada de otras fuentes. Esta información sería utilizada para proporcionarle las ofertas y/o servicios que se ajusten específicamente a sus intereses, evaluar los productos y servicios que le hemos ofrecido y/o proteger su seguridad o integridad.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "En el caso de que vendamos o cedamos una unidad comercial a otra compañía y sus Datos Personales sean usados por dicha unidad comercial, entonces su información puede ser transferida al comprador junto con el negocio, para que éste pueda utilizarla de la misma manera.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "ATC y TDB también usan su información para identificar, desarrollar y comercializar productos y servicios que, a nuestro juicio, son valiosos para usted. Ocasionalmente, usted podrá recibir nuestras promociones, ofertas o cualquier otro mecanismo publicitario o de ventas. Además, podríamos proporcionar a terceros la información que recolectamos de usted, con la finalidad de que éstos distribuyan o informen promociones, concursos, encuestas de marketing, focus groups, entrevistas y otras oportunidades ofrecidas por ATC, TDB o la red de concesionarios autorizados. Estos terceros están sujetos a estrictos requisitos de confidencialidad y seguridad de información, y luego de completar sus servicios, toda la información de los clientes es devuelta a ATC y TDB o destruida. Usted podrá restringir estas comunicaciones de marketing y la divulgación de su información a terceros, de conformidad con el procedimiento establecido en la Ley y la sección titulada “Para no recibir comunicaciones promocionales y evitar la divulgación de su información a terceros” y la Ley 2300 del 2023 la cual tiene por objeto proteger el derecho a la intimidad de los consumidores y/o cualquier otra que la modifique, aclare o revoque.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "ATC y TDB también usan su información para identificar, desarrollar y comercializar productos y servicios que, a nuestro juicio, son valiosos para usted, por lo cual podríamos comunicarnos con usted a través del teléfono, correo electrónico, mensajes de texto, courrier o cualquier otro mecanismo que ATC o TDB designe. En caso que usted no desee recibir estas comunicaciones por parte de nosotros, podrá optar por no ser incluido en la lista de distribución al momento de brindarnos su información, o durante todo el tiempo que se encuentre incluido. Si usted actualmente no es un cliente, pero desea ser incluido en la lista de distribución para recibir correos electrónicos o mensajes de texto por parte de ATC o TDB, las compañías afiliadas o de terceros cuidadosamente seleccionados con quienes mantenemos una relación de negocios, entonces podrá enviarnos su solicitud vía correo electrónico a clientes@toyota.com.co o habeasdata@toyota.com.co.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "d. Datos Sensibles",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "ATC y TDB no realizarán tratamiento de información sensible, relacionada entre otros, con datos sobre origen racial o étnico, la pertenencia a sindicatos, organizaciones sociales o de derechos humanos, convicciones políticas, religiosas, de la vida sexual, o datos de la salud.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "e. KINTO",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "KINTO es la marca global de servicios de movilidad de ATC, diseñada para ofrecer soluciones de transporte convenientes, inteligentes y confiables. KINTO incluye varias modalidades de alquiler de vehículos. Estos servicios están diseñados para proporcionar una movilidad sin complicaciones, con tarifas mensuales fijas que incluyen mantenimiento, seguros e impuestos. Al utilizar KINTO, trataremos sus datos personales para las siguientes:",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Tratamos tus datos personales para gestionar y facilitar los servicios de alquiler de vehículos a corto, mediano y largo plazo, incluyendo KINTO SHARE, KINTO ONE PERSONAL y KINTO ONE FLEET. Esto incluye la verificación de identidad, la gestión de reservas, la facturación y el cobro de tarifas, así como la administración de contratos de alquiler.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Utilizamos tus datos para coordinar y proporcionar servicios de mantenimiento, reparaciones y soporte técnico de los vehículos alquilados. Esto incluye la programación de citas, la gestión de garantías y la comunicación de recordatorios de mantenimiento.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Para los clientes corporativos que utilizan KINTO ONE FLEET, tratamos los datos personales para administrar y optimizar la gestión de flotas, incluyendo la asignación de vehículos, el seguimiento del uso y el rendimiento de los vehículos, y la generación de informes de gestión.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Tratamos tus datos personales para cumplir con nuestras obligaciones legales y contractuales, incluyendo la gestión de seguros, el pago de impuestos y la respuesta a solicitudes de autoridades gubernamentales.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Utilizamos tus datos para analizar y mejorar nuestros servicios, así como para personalizar tu experiencia de usuario. Esto incluye la realización de encuestas de satisfacción, el análisis de patrones de uso y la implementación de mejoras en nuestros servicios y plataformas.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Igualmente, realizamos una revisión de antecedentes judiciales debido a que la naturaleza del servicio lo requiere para evitar riesgos para terceros y para ATC.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "f. Toyota Connected Services",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Tratamos tus datos personales para proporcionar y gestionar los servicios de conectividad de Toyota, incluyendo Safety Connect, Service Connect, Drive Connect, Remote Connect y Wi-Fi Connect. Esto incluye la activación y administración de servicios, la gestión de suscripciones y la provisión de soporte técnico.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Utilizamos tus datos para ofrecer servicios de seguridad y asistencia en carretera, como la notificación automática de colisión, la asistencia en emergencias y el localizador de vehículos robados. Esto incluye la comunicación con servicios de emergencia y la coordinación de asistencia en carretera.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Tratamos tus datos para proporcionar servicios de mantenimiento y diagnóstico del vehículo a través de Service Connect. Esto incluye la generación de informes sobre la condición del vehículo, alertas de mantenimiento y recordatorios de servicio.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Utilizamos tus datos para ofrecer servicios de navegación y entretenimiento a través de Drive Connect y Wi-Fi Connect. Esto incluye la provisión de información de tráfico en tiempo real, la asistencia de navegación por agentes en vivo y la integración de servicios de streaming como Apple Music® y Amazon Music™.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Utilizamos tus datos para analizar y mejorar nuestros servicios de conectividad, así como para personalizar tu experiencia de usuario. Esto incluye la realización de encuestas de satisfacción, el análisis de patrones de uso y la implementación de mejoras en nuestros servicios y plataformas.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Debido a la naturaleza del servicio, a través de Connected tenemos acceso a la ubicación del vehículo e información sensible de georreferenciación, la cual es indispensable para garantizar la adecuada prestación del servicio. Si no desea conceder acceso a información de georreferenciación deberá abstenerse de adquirir o acceder a los servicios.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "g. Datos de Menores de Edad",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "ATC y TDB no realizarán tratamiento de datos de menores de edad, salvo por actividades y eventos especiales en los cuales, con autorización de los padres de familia o representantes legales del menor, y para fines especiales sea necesario y se mantengan solo por el tiempo requerido para cumplir el propósito del tratamiento.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "El suministro de los Datos Personales de menores de edad es facultativo y debe realizarse con autorización de los padres de familia o representantes legales del menor. El tratamiento de los datos de los menores de edad se hará dando cumplimiento a lo establecido en el artículo7 de la ley 1581 de 2012 y el Decreto 1377 de 2013.",
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
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Dada la naturaleza de nuestro negocio, para los fines arriba indicados y sujeto a los requerimientos legales aplicables, con la aceptación de la presente política, nos autoriza de forma expresa e inequívoca para que podemos transferir y/o transmitir Datos Personales a personas jurídicas que tienen la calidad de filiales, subsidiarias, o vinculadas a ATC o TDB u otras entidades situadas en países (incluso Estados Unidos y otros países que tienen un régimen de protección de datos diferente al del país donde usted tiene su sede). Podemos transferir y/o transmitir la información a nivel internacional por ejemplo entre ATC y TDB, a Toyota Motor Corporation, proveedores de servicios, ajustadores, call centers, investigadores, intermediarios de seguros, compañías de asistencia, socios comerciales y autoridades gubernamentales o públicas con las finalidades enunciadas en la Sección 3 de la presente Política.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Sin perjuicio de los parámetros que sobre el particular establezca la autoridad de protección de datos en Colombia, ATC y TDB realizarán, en cada caso, el proceso de debida diligencia a fin de verificar que el país receptor de los Datos Personales cuenta, cuando menos, con similares estándares de protección de datos a los previstos por la regulación colombiana. El receptor de los Datos Personales deberá comprometerse a observar los términos y condiciones previstos en esta Política. Adicionalmente, usted podrá ejercer siempre y en todo momento sus derechos derivados del hábeas data – dentro de los procedimientos previstos en la ley colombiana aplicable – directamente ante ATC y TDB, sin tener que acudir a terceros ubicados en un país diferente.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Es posible que exista una transferencia internacional también de Datos Personales de los usuarios de la Aplicación Toyota, ya que TDB utiliza servidores de Google, Microsoft, Salesforce y Amazon alojados en Estados Unidos.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Llevaremos a cabo estas actividades de transferencia internacional mientras tenga una relación con nosotros o mientras utilicemos los servicios prestados por los socios mencionados.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "En cualquier caso, al realizar transferencias internacionales de Datos Personales, utilizamos métodos para garantizar que sus datos permanezcan seguros y se traten de acuerdo con las leyes de protección de datos aplicables.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Para garantizar la seguridad en la transferencia, usamos MuleSoft, un producto de Salesforce que está instalado en los servidores locales de TOYOTA. En una solución API de MuleSoft, la transferencia de datos se asegura utilizando cifrado HTTPS/TLS para proteger los datos en tránsito. Los mecanismos de autenticación como OAuth 2.0, pares de ID de cliente/secreto o TLS mutuo aseguran que solo los clientes autorizados accedan a las API. Las políticas de seguridad adicionales, incluyendo la limitación de velocidad, la lista blanca de IP y la protección contra amenazas, se aplican a través del API Gateway para prevenir el uso indebido y los ataques.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "i. Otra Información que podríamos recopilar a través de este sitio web",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "“Otra Información” es cualquier información que no revela su identidad específica, es decir que no califica como Datos Personales, tal como:",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description: "•  Información del navegador de Internet",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Información recopilada a través de cookies, tags pixel y otras tecnologías",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Información demográfica y otra información que nos proporcione",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description: "•  Información agregada",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "j. Otra Información que recopilamos",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Nosotros y nuestros terceros proveedores de servicios podríamos recopilar otra Información de varias maneras, incluso:",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  A través de su navegador de Internet: La mayoría de los sitios web recogen cierta información, como su dirección de IP (es decir, la dirección de la computadora en Internet), resolución de pantalla, tipo de sistema operativo (Windows, Mac o cualquier otro) y versión, tipo de navegador de Internet y versión, tiempo de la visita y las páginas visitadas. Usamos esta información para fines como calcular los niveles de uso de este sitio web, ayudar a diagnosticar problemas del servidor y administrar este sitio web.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Uso de cookies: Las cookies son porciones de información almacenada directamente en la computadora que se está utilizando. Las cookies nos permiten reconocer su computadora y recopilar información como el tipo de navegador de Internet, el tiempo pasado en este sitio web, las páginas visitadas y las preferencias de idioma. Podemos utilizar la información para fines de seguridad, para facilitar la navegación, para mostrar la información de manera más eficaz, para personalizar su experiencia al visitar este sitio web, o para recopilar información estadística sobre el uso de este sitio web. Las cookies también nos permiten presentarle los anuncios u ofertas que es más probable que le gusten. También podemos utilizar cookies para rastrear sus respuestas a nuestros anuncios, y utilizar cookies u otros archivos para rastrear el uso de otros sitios web.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "TDB utiliza cookies estrictamente necesarias para que la Aplicación Toyota funcione correctamente, como las cookies para autenticar el inicio de sesión. Dado que estas cookies son esenciales para el funcionamiento de la aplicación, no es posible rechazarlas. ",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Además de las cookies informadas anteriormente, las herramientas y el correo electrónico enviados por la aplicación Toyota pueden contener pequeños archivos electrónicos conocidos como web beacons (web beacons, pixel tags, etc.) que permiten, por ejemplo, contar el número de usuarios que visitaron aplicaciones y sitios web.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Uso de tags pixel, contadores de visitantes, GIF transparentes u otras tecnologías parecidas: Estos podrían ser utilizados en relación con algunas páginas de este sitio web y mensajes del formato HTML para, entre otras cosas, darles seguimiento a las acciones de los usuarios de este sitio web y destinatarios.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  De usted: Parte de la información (por ejemplo, su ubicación o medio de comunicación preferido) se obtiene cuando usted la proporciona voluntariamente. Salvo que se combine con sus Datos Personales, esta información no lo identifica personalmente",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Reuniendo información: Podemos reunir y utilizar determinada información (por ejemplo, se puede reunir información para calcular el porcentaje de usuarios que tienen un código de área telefónica en particular).",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Al aceptar los términos y condiciones de esta Política, usted autoriza el uso y divulgación de Otra Información para los propósitos especificados en esta política. En caso de que estemos obligados por Ley a tratar la Otra Información como Datos Personales, además de los usos especificados en la sección ¨Otra Información que Recopilamos¨, podremos utilizar y revelar dicha Otra Información para los mismos fines autorizados para los Datos Personales.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "k. Uso del sitio por parte de menores de edad",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Este sitio web no está destinado al uso de personas que tengan menos de dieciocho (18) años, y pedimos que estas personas no incluyan Datos Personales en este sitio web. En el evento en que usted nos revele o entregue información sobre menores de edad, usted se compromete a obtener la autorización expresa del padre y/o representante legal del menor, informándole de manera exacta (i) los Datos Personales que nos ha suministrado; (ii) el propósito de la entrega de dicha información; (iii) la forma como podremos usarla de acuerdo con esta Política; y (iv) el hecho de que dicha información puede ser eventualmente transferida a terceros países en los términos y condiciones descritos en esta Política; (v) el derecho del menor de emitir su opinión sobre la recolección y uso de los Datos Personales.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "l. Datos Personales de otras personas",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Si proporciona Datos Personales a ATC o TDB en relación con otras personas, usted acepta: (a) informar a la persona sobre el contenido de esta Política de Privacidad, y (b) obtener el consentimiento legalmente necesario para la recopilación, uso, divulgación y transferencia (incluso la transferencia a otros países) de Datos Personales acerca de la persona de acuerdo con esta Política de Privacidad.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "m. Grabaciones telefónicas",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Para efectos de prestar un mejor servicio, realizar un adecuado control de calidad y dejar constancia de su consentimiento o de seguimiento a las comunicaciones, ATC y TDB realizarán grabaciones de llamadas telefónicas.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "n. Grabaciones circuito de vigilancia",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Con el propósito de ofrecer un servicio de mayor calidad y garantizar la seguridad dentro de las instalaciones, ATC ha implementado un circuito cerrado de vigilancia. Este sistema permite la grabación y monitoreo continuo de diversas áreas, asegurando así una supervisión constante y eficaz. Es importante que los usuarios y visitantes tengan en cuenta que, en cualquier momento, pueden ser grabados o monitoreados por las cámaras de seguridad, contribuyendo a un entorno más seguro y controlado. La información recopilada a través de estas grabaciones se maneja con estricta confidencialidad y se utiliza únicamente con fines de seguridad y mejora del servicio.",
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
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "o. Datos Biométricos",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Para mejorar la seguridad en las instalaciones de ATC, se ha implementado un sistema de identificación biométrica. Este sistema permite la identificación y autenticación de los empleados mediante métodos avanzados como el reconocimiento de escaneo facial, ofreciendo un control de acceso más seguro y fiable. La implementación de este sistema se ha realizado con el mayor respeto a la privacidad y protección de los datos personales de los empleados, cumpliendo con todas las normativas y estándares legales vigentes en materia de protección de datos.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "p. A quién contactar en relación con sus Datos Personales",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "TDB informa que designa como representante para el territorio colombiano a ATC, quien será responsable de asegurar el cumplimiento de las obligaciones previstas en la Ley 1581 de 2012. Al respecto, ATC será responsable de:",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Actuar como punto de contacto para cualquier consulta, solicitud, reclamación o queja relacionada con el tratamiento de los datos personales, y gestionar estas de manera eficiente y conforme a la ley.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Facilitar el ejercicio de los derechos de los titulares de datos personales, como el acceso, rectificación, cancelación y oposición.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Informar a la autoridad de protección de datos en Colombia y a los titulares de datos personales sobre cualquier incidente de seguridad que puedan afectar datos personales.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Informar a la autoridad de protección de datos en Colombia y a los titulares de datos personales sobre cualquier incidente de seguridad que puedan afectar datos personales.Informar adecuadamente a los titulares de los datos personales sobre el tratamiento de sus datos, incluyendo finalidad y los destinatarios de este.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Proporcionar toda la información requerida por la autoridad de protección de datos en Colombia en caso de inspecciones de cumplimiento, auditorías internas, requerimientos de información durante una investigación o denuncia de parte u oficio, así como su gestión y recepción.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Si usted tiene alguna pregunta acerca de nuestro uso o tratamiento de sus Datos Personales o si desea ejercer los derechos establecidos en el artículo 8 de la Ley 1581 de 2012 “Habeas Data” podrá:",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "a. Conocer, actualizar y rectificar sus Datos Personales frente a los Responsables del Tratamiento o Encargados del Tratamiento. Este derecho se podrá ejercer, entre otros frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan al error, o aquellos cuyo Tratamiento esté prohibido o no haya sido autorizado.",
                descriptionStyle: {
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
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "c. Ser informado por el Responsable del Tratamiento o el Encargado de éste, previa solicitud, respecto del uso que le ha dado a sus Datos Personales.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "d. Presentar ante la Superintendencia de Industria y Comercio quejas por infracciones a las disposiciones en materia de protección de datos.",
                descriptionStyle: {
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
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Puede enviar un correo electrónico a clientes@toyota.com.co o habeasdata@toyota.com.co o contáctenos a la Línea Gratuita de Atención Nacional 01 8000 123691 o en Bogotá al (601) 3809424. El área de Servicio al Cliente de Automotores Toyota Colombia S.A.S., será el responsable de atender sus peticiones, consultas y reclamos.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "q. Seguridad de la información",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "La seguridad de la información es importante en ATC y TDB. Mantenemos estrictos procedimientos físicos, electrónicos y administrativos para proteger los Datos Personales y revisamos con regularidad nuestros estándares y procedimientos de seguridad para proteger dicha información contra accesos no autorizados.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Cualquier consideración o comentario que tenga con relación a la seguridad usada en el manejo de su información no dude en enviar un correo electrónico a clientes@toyota.com.co o habeasdata@toyota.com.co o contáctenos a la Línea Gratuita de Atención Nacional 01 8000 123691 o en Bogotá al (601) 3809424.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "r. Cumplimiento de la Ley de Protección de Datos Personales",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "ATC y TDB cumple con la Ley de protección de datos personales, en la medida en que ésta aplique a información mantenida por ATC o TDB. Esto le brinda ciertos derechos en relación con la información que conservamos sobre usted, lo que incluye el derecho a conocer, actualizar, rectificar y solicitar la supresión de sus Datos Personales a través de los canales de atención indicados. Por favor, recuerde que las regulaciones de seguridad nos exigen brindar a las autoridades acceso a la información suministrada por nuestros clientes.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "s. Enlaces a otros sitios web de interés",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Así mismo, quisiéramos recordarle que nosotros proporcionamos enlaces a recursos que creemos le serán de utilidad. Estos enlaces lo llevarán a sitios web que no están asociados a ATC y TDB  y que pueden funcionar bajo distintas políticas de privacidad. Nuestros usuarios serán responsables de leer las políticas de privacidad de dichos sitios web, ya que nosotros no tenemos control sobre la información proporcionada a estas compañías.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "t. Para no recibir comunicaciones promocionales y evitar la divulgación de sus Datos Personales a terceros",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Si usted no desea que ATC o TDB utilice o comparta sus Datos Personales con la finalidad de enviarle materiales promocionales o de marketing, puede enviar un correo electrónico a clientes@toyota.com.co o habeasdata@toyota.com.co o contáctenos a la Línea Gratuita de Atención Nacional 01 8000 123691 o en Bogotá al (601) 3809424 y/o registrarse directamente en el sitio de la Comisión de Regulación de Comunicaciones en la plataforma del Registro Nacional de Excluidos.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Tenga en cuenta que si su solicitud no fue tramitada mediante la plataforma del Registro Nacional de Excluidos es probable que siga recibiendo comunicaciones de marketing que ya estaban en proceso de ser enviadas antes de recibir su solicitud.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Así mismo, todos los correos electrónicos promociónales de ATC y TDB incluirán dentro del cuerpo del mensaje un enlace para elegir ser retirado de la lista de distribución. Tenga en cuenta que, al optar por ser excluido de estas listas vía correo electrónico, usted estará cancelando la suscripción de todos los usuarios registrados con dicha dirección.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "u. ¿Cómo contactarnos?",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Si tiene alguna pregunta, comentario o inquietud respecto de nuestras políticas de privacidad, comuníquese con nosotros al correo electrónico clientes@toyota.com.co o habeasdata@toyota.com.co o contáctenos a la Línea Gratuita de Atención Nacional 01 8000 123691 o en Bogotá al (601) 3809424.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Si usted desea que retiremos todos sus Datos Personales que mantenemos sobre usted en nuestros registros, envíe un mensaje al mismo correo anteriormente señalado, indicando sus datos y realizando dicha solicitud de acuerdo con los requisitos legales. Recuerde, sin embargo, que para poder ofrecerle nuestros servicios requeriremos de cierta información importante de parte de usted, y si usted nos pide retirar una parte o la totalidad de dicha información, usted no podrá volver a tener acceso a este sitio web o a determinadas secciones del mismo.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Mediante la autorización otorgada usted reconoce que TDB, ATC y su red de concesionarios a nivel nacional le han informado cuáles son las finalidades del tratamiento y le han comunicado sus derechos referentes a la posibilidad de solicitar conocer, actualizar y rectificar sus Datos Personales; conocer sobre el uso que se le ha dado a sus Datos Personales; solicitar prueba de la presente autorización; revocar su autorización para el tratamiento o solicitar la supresión de sus Datos Personales y acceder en forma gratuita a ellos, de acuerdo a lo señalado en estas políticas. Reconoce que puede ejercer sus derechos como titular de los Datos Personales a través del correo electrónico clientes@toyota.com.co o habeasdata@toyota.com.co y a través de los números telefónicos: línea gratuita nacional 018000 123 691 y línea en Bogotá (601) 380 9424, así como presentando ante la Superintendencia de Industria y Comercio reclamaciones de acuerdo con la Ley que regula el Hábeas Data.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "v. Solicitudes de acceso y corrección, preguntas y reclamos",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Para el ejercicio de sus derechos, el titular de la información podrá presentar consultas o reclamos:",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "A. Procedimiento para realizar consultas (solicitar prueba del consentimiento, conocer los datos que se han recolectado y el tratamiento aplicado).",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "El titular podrá presentar consultas sobre su Información Personal, almacenada en nuestras bases de datos, de conformidad con las siguientes reglas:",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Analizaremos la consulta para verificar su identidad. Si la consulta la realiza una persona distinta al titular de Datos Personales y no se acredita que actúa en nombre de este último de acuerdo con la legislación vigente, la consulta será rechazada.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Todas las consultas serán atendidas en un plazo máximo de diez (10) días hábiles contados a partir de la fecha de recepción y de acuerdo con los demás términos previstos en el artículo 14 de la Ley 1581 de 2012. Si no fuese posible atender la consulta dentro de dicho término, será posible ampliar el plazo por un máximo de cinco (5) días hábiles, siempre y cuando se informe al interesado expresando los motivos de demora y señalando la fecha en que se atenderá su consulta.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "B. Procedimiento para presentar reclamos sobre actualización, rectificación, supresión o revocación del consentimiento:",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Si considera que su información personal almacenada en las bases de datos de ATC y TDB debe ser actualizada, corregida o suprimida, o si cree que ATC o TDB ha incumplido alguno de sus deberes como responsable del tratamiento, puede presentar un reclamo siguiendo estas pautas:",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  Analizaremos el reclamo para verificar su identidad. Si la reclamación es realizada por una persona distinta al titular y no se evidencia su representación de acuerdo con la legislación vigente, el reclamo será rechazado.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "•  El plazo máximo para atender un reclamo será de quince (15) días hábiles a partir del día siguiente a su recepción, conforme a lo establecido en el artículo 15 de la Ley 1581 de 2012. Si no fuese posible atender el reclamo dentro de dicho término, será posible ampliar el plazo un máximo de ocho (8) días hábiles, siempre y cuando se informe al interesado expresando los motivos de demora y señalando la fecha en que se atenderá su reclamo.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "w. Modificaciones a la Política de Privacidad",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "ATC y TDB se reservan el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será publicado aquí, así que asegúrese de revisar esta página periódicamente. Si bien esta Política de Privacidad no constituye un contrato ni crea derechos legales, sí sirve como expresión del compromiso de ATC y TDB de proteger sus Datos Personales.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "x. Vigencia de la Política de Privacidad",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Esta Política de Tratamiento de la información fue publicada en la página web en https://www.toyota.com.co/legales/politica-de-privacidad/servicios-conectados/. Las áreas especialmente impactadas fueron informadas de estas disposiciones de manera previa a su publicación, y la Compañía realizó un trabajo colectivo orientado a difundir los aspectos relevantes de esta nueva normativa. Este trabajo de cultura, educación e información se seguirá adelantando a lo largo de la vigencia de la Ley.",
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
            label: "Términos y Condiciones de Uso de Toyota App",
            value: "terminos_y_condiciones_de_uso_de_toyota_app",
            sections: [
              {
                title: "Términos y Condiciones de Uso",
                titleStyle: {
                  fontSize: "26px",
                  fontWeight: 700,
                  marginTop: "68px",
                  marginBottom: "1.5rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Nosotros, de TOYOTA DO BRASIL LTDA., persona jurídica regida por el derecho privado, inscrita en el CNPJ con el n° 59.104.760/0006-04 (“Toyota“), buscamos la mejor manera de satisfacer las necesidades de nuestros clientes y usuarios (“Usted“).",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Para satisfacer las necesidades de nuestros clientes y usuarios, hemos creado la aplicación móvil llamada “Toyota“, que incluye todos los contenidos, funcionalidades y servicios ofrecidos por Toyota, y/o las empresas del grupo y/o asociados.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Los Términos y Condiciones Generales de Uso (“Términos y Condiciones“ o “Términos“) de la aplicación móvil “Toyota“, rigen el acceso y el uso de la aplicación y reflejan el acuerdo celebrado entre usted, TOYOTA DO BRASIL LTDA.), y/o las empresas del grupo y/o asociados. El acceso y uso de la aplicación Toyota también estará sujeto a nuestra Política de Privacidad.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Por favor, lea los Términos y Condiciones de Uso cuidadosamente antes de comenzar a usar la Aplicación Móvil. Previo a utilizar la Aplicación Móvil, Usted deberá aceptar estos Términos y Condiciones de Uso y nuestra Política de Privacidad, la cuál estará disponible en https://www.toyota.com.co/legales/politica-de-privacidad/servicios-conectados/ y que explica cómo recopilamos, usamos, compartimos y almacenamos su información personal. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Una vez aceptados estos Términos y Condiciones de Uso, junto con nuestra Política de Privacidad, Usted podrá: (i) Acceder y hacer uso de la Aplicación, (ii) suscribirse a Servicios adicionales “Servicios“ y (iii) abrir y utilizar su “Cuenta”.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Al utilizar la aplicación de Toyota, usted declara que ha leído, comprende y acepta que está sujeto a estos Términos y condiciones de uso y a nuestra Política de privacidad (“Política”).  Si no está de acuerdo con alguna de las disposiciones de estos Términos, no acceda ni utilice la aplicación de Toyota.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "1. Modificaciones a los Términos y Condiciones de Uso",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Como siempre estamos buscando una mejora continua, estos Términos y el Política de Privacidad pueden modificarse en cualquier momento y sin previo aviso. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Cuando actualicemos estos Términos y el Política, revisaremos la fecha informada en el campo “última modificación“ al final de estos documentos. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Si se realizan cambios relevantes que requieran un nuevo consentimiento de su parte, publicaremos esta actualización y solicitaremos un nuevo consentimiento. Si no está de acuerdo con cualquier cambio, puede cancelar su cuenta, y el uso continuado de la aplicación Toyota después de la publicación de los Términos o Política revisados, significará que acepta y está de acuerdo con los cambios. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title:
                  "2. Acceso a la aplicación móvil y a la cuenta de seguridad",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Se puede acceder a la aplicación Toyota a través de un teléfono móvil compatible. TOYOTA DO BRASIL LTDA. no garantiza que la aplicación de Toyota sea compatible con su dispositivo móvil, en este sentido, le recomendamos que verifique la compatibilidad de su modelo de smartphone con el fabricante respectivo.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Usted reconoce que está sujeto a versiones actualizadas y que dichas actualizaciones pueden dar lugar a actualizaciones automáticas. Usted acepta esta actualización automática en su dispositivo móvil y acepta que los términos y condiciones contenidos en este documento se aplicarán a todas las actualizaciones.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Para registrarse en la aplicación Toyota, el usuario debe ser mayor de 18 años, por lo que pedimos que cualquier persona menor de 18 años no utilice la app y se abstenga de enviarnos cualquier información. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Para registrarse, el usuario deberá proporcionar los siguientes datos personales: nombre completo, número de documento de identidad (Cédula de Ciudadanía), correo electrónico, fecha de nacimiento, número de teléfono celular, chasis de los vehículos de la marca Toyota de su propiedad. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "El registro en la aplicación Toyota es obligatorio para utilizar la aplicación, y el registro está disponible de forma gratuita.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Sus credenciales para acceder a la aplicación Toyota son muy personales e intransferibles y no deben compartirse con terceros bajo ninguna circunstancia. No somos responsables del uso compartido y uso por parte de terceros.  ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Al aceptar estos Términos, el usuario se compromete a proporcionar información verdadera y precisa, así como a mantenerla actualizada. Si se causa algún daño a TOYOTA DO BRASIL LTDA. o a terceros, como resultado de tergiversaciones o datos personales incorrectos, será su exclusiva responsabilidad.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "La aplicación Toyota proporcionará acceso a información sobre productos, servicios, eventos y otros contenidos publicados por TOYOTA DO BRASIL LTDA. (“contenido“).  ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "El Usuario se obliga a notificar a TOYOTA DO BRASIL respecto de la venta o transferencia del o los Vehículos. De esta manera, toda actualización y/o modificación de la titularidad del o los vehículos, protegerá tanto su cuenta e información suministrada, como la información proporcionada por el nuevo Usuario. Adicionalmente, evitará que resulten cobrados los Servicios contratados una vez producida la venta o transferencia del o los vehículos. A los fines de avanzar con la notificación, tenga a bien contactarnos a los teléfonos 01 8000 123 691 /(601) 380 9424 en Bogotá y/o correo electrónico clientes@toyota.com.co.  ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Nos reservamos el derecho de retirar o modificar la aplicación Toyota, así como cualquier servicio o Contenido que proporcionemos en diferentes entornos digitales, a nuestra entera discreción y sin previo aviso.  En este sentido, TOYOTA DO BRASIL LTDA. no serán responsables, total o parcialmente, en caso de indisponibilidad o alteración de dichos contenidos.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "3. Derechos de Propiedad Intelectual y Marcas ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "La aplicación Toyota y todos sus contenidos, características y funcionalidades (incluyendo, pero no limitado a, toda la información, software, texto, diseño, diseño, imágenes, videos y audios), pertenecen a Toyota TOYOTA DO BRASIL LTDA, sus licenciantes y/u otros proveedores.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "No se le transferirán derechos de propiedad personal o intelectual de ningún tipo en virtud del registro y uso de la aplicación Toyota y/o su contenido.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Estos Términos le permiten utilizar la aplicación Toyota y su contenido solo para fines personales, quedando prohibido el uso con fines comerciales, así como no autorizar la modificación y creación de obras, ingeniería inversa, derivación del código fuente. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Además, los logotipos, marcas, expresiones, nombres, productos, diseños, lemas o cualquier otro elemento de identificación, incluyendo, pero no limitado a, el término “Toyota“ (“marcas“), son propiedad de TOYOTA DO BRASIL LTDA y/o empresas del grupo y/o asociados.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Por estos Términos y Condiciones, usted declara que es consciente de que no está autorizado a utilizar las marcas comerciales sin el consentimiento previo y expreso del propietario. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "4. Usos prohibidos e infracciones",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Puede usar la aplicación Toyota solo para fines legales y de acuerdo con estos Términos. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Al aceptar estos Términos, usted declara ser consciente de que, si hay una infracción con respecto al uso de la aplicación Toyota, puede ser considerado responsable y, además, el acceso puede ser cancelado inmediatamente.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "5. Monitoreo y cumplimiento de la normativa",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Toda la información que obtenemos en la aplicación Toyota está sujeta a nuestra Política de Privacidad y se trata de acuerdo con las leyes aplicables.  ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Al usar la aplicación Toyota, TOYOTA DO BRASIL LTDA.  tiene derecho a tomar las medidas legales apropiadas, que incluyen, entre otras, informar cualquier uso no autorizado o ilegal de la aplicación móvil a las autoridades respectivas, así como cancelar o suspender su acceso a toda o parte de la aplicación Toyota, con o sin causa.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "6. Enlaces constantes en la aplicación Toyota",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "La aplicación Toyota puede proporcionar enlaces a otros sitios web, aplicaciones y/o recursos proporcionados por terceros, incluidos anuncios patrocinados.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Por estos Términos, usted reconoce que  pondrán a disposición dichos enlaces solo para su conveniencia y no es responsable del contenido, características, productos o servicios disponibles en dichos sitios web o aplicaciones.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "7. Entornos y características de la aplicación Toyota",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Puede acceder, a su discreción y elección, a diferentes entornos y/o herramientas dentro de la aplicación Toyota, que pueden proporcionar acceso a información, promociones, productos y/o servicios de TOYOTA DO BRASIL LTDA., y/o empresas del grupo y/o asociados y aseguradoras.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Al aceptar estos Términos, usted reconoce que algunos entornos y herramientas dentro de la aplicación Toyota que proporcionan información, productos y/o servicios pueden regirse por Términos y Condiciones Específicos. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Por lo tanto, para utilizar estos entornos, debe leer atentamente y aceptar los respectivos Términos y Condiciones Específicos.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Los Términos y Condiciones Específicos no sustituyen a estos Términos y Condiciones de Uso de la aplicación Toyota, debiendo el usuario observar y respetar ambos.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "En la aplicación Toyota tendrá acceso a las siguientes funcionalidades:",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "Encuentre un concesionario",
                description:
                  "Encuentre un concesionario por geolocalización en el mapa, vea la información detallada del concesionario y definirlo como favorito.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
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
                title: "Programar servicios",
                description:
                  "Permite al usuario programar servicios en el concesionario, a través de la APP",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
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
                title: "Mi Toyota",
                description:
                  "Proporciona todos los productos y/o servicios de Toyota, empresas del grupo y/o asociados: KINTO y vehículos propios.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
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
                title: "KINTO",
                description:
                  "Muestra información sobre las reservas de KINTO  (pasadas, actuales y futuras) realizadas por el usuario.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
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
                title: "Compra",
                description: "Redirección del enlace del sitio.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
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
                title: "Relación con el cliente y soporte",
                description:
                  "Permite al usuario enviar correos electrónicos al servicio de Relaciones de TOYOTA DO BRASIL LTDA. , redirigen al usuario a sitios web relacionados con reclamos, consultas Preguntas Frecuentes y realiza una llamada al servicio de relaciones de Toyota.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
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
                title: "Gazoo Racing",
                description: "Redirección del enlace del sitio.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
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
                title: "Notificaciones",
                description:
                  "Notificaciones en la aplicación sobre acciones de comunicación.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
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
                title: "Mi cuenta",
                description:
                  "Consulta de datos personales de clientes y actualización de algunos campos.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
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
                title: "Tablero del vehículo",
                description: "Explicación de los símbolos del panel.",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
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
                title: "8. Exención de garantías",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "No garantizamos que los archivos disponibles para su descarga en nuestro sitio web o en nuestra aplicación móvil estén libres de virus u otro código dañino. ",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Usted es responsable de implementar procedimientos y verificaciones con respecto a la protección contra virus y la precisión de la carga y descarga de datos. ",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY, NO SEREMOS RESPONSABLES DE NINGUNA PÉRDIDA O DAÑO CAUSADO POR UN ATAQUE DE VIRUS U OTRO MATERIAL TECNOLÓGICAMENTE DAÑINO QUE PUEDA INFECTAR SU TELÉFONO, COMPUTADOR, PROGRAMAS INFORMÁTICOS, DATOS U OTROS MATERIALES PATENTADOS DEBIDO A SU USO DE LA APLICACIÓN TOYOTA O CUALQUIER SERVICIO O ARTÍCULO OBTENIDO O DESCARGADO A TRAVÉS DE LA APLICACIÓN O SITIO WEB.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "LA APLICACIÓN TOYOTA, SU CONTENIDO Y CUALQUIER SERVICIO, PRODUCTO O ELEMENTO AL QUE SE ACCEDA A TRAVÉS DE ELLA SE PROPORCIONAN “TAL CUAL“ Y “SEGÚN DISPONIBILIDAD“ SIN GARANTÍAS DE NINGÚN TIPO, YA SEAN EXPRESAS O IMPLÍCITAS. ",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "9. Limitación de Responsabilidad ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "EN LA MÁXIMA MEDIDA ESTABLECIDA POR LA LEY, EN NINGÚN CASO TOYOTA DO BRASIL LTDA, SUS AFILIADOS, ASOCIADOS, SUS LICENCIANTES, PROVEEDORES DE SERVICIOS, FUNCIONARIOS, AGENTES, FUNCIONARIOS O DIRECTORES SERÁN RESPONSABLES DE NINGUNA MANERA POR LOS DAÑOS DE CUALQUIER TIPO QUE SURJAN O ESTÉN RELACIONADOS CON SU USO O INCAPACIDAD PARA USAR LA APLICACIÓN MÓVIL, CUALQUIERA DE LOS SITIOS WEB VINCULADOS A ELLA, CUALQUIER  CONTENIDO DE LA APLICACIÓN MÓVIL O DICHOS SITIOS WEB VINCULADOS A ELLA, INCLUIDOS DAÑOS DIRECTOS,  INDIRECTOS, ESPECIALES, INCIDENTALES,  CONSECUENTES O PUNITIVOS, INCLUIDOS, ENTRE OTROS, DAÑOS CONSECUENTES, DIRECTOS O INDIRECTOS, DAÑOS MATERIALES, MORALES, PSICOLÓGICOS Y PÉRDIDAS DE BENEFICIOS, ASÍ COMO DAÑOS CAUSADOS POR AGRAVIO, INCUMPLIMIENTO DE CONTRATO U OTROS TIPOS DE DAÑOS, INCLUSO SI SON PREVISIBLES. ",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "10. Garantía de Indemnización",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Usted acepta defender, indemnizar y eximir de responsabilidad a TOYOTA DO BRASIL LTDA., sus afiliados, licenciantes y proveedores de servicios, así como a sus respectivos funcionarios, directores, funcionarios, contratistas, agentes, licenciantes, proveedores, sucesores y cesionarios de y contra todos y cada uno de los reclamos y responsabilidades de cualquier naturaleza que surjan de o estén vinculados a un incumplimiento por su parte de estos Términos o su uso de la aplicación Toyota, incluido, entre otros, cualquier uso del contenido, servicios o productos en la aplicación Toyota que no sea el expresamente autorizado en estos Términos.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "11. Consideraciones Finales",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "• La tolerancia de TOYOTA DO BRASIL LTDA., en caso de incumplimiento por su parte de cualquier término o condición de estos Términos, no implicará una renuncia a sus derechos o al derecho a exigir el cumplimiento de las demás disposiciones y obligaciones establecidas en estos Términos, ni constituirá novación o perdón, y no podrá invocarse como precedente para concesiones nuevas o idénticas.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "• Si alguna disposición de estos Términos se considera nula o inaplicable, la validez o aplicabilidad de las disposiciones restantes de los mismos no se verá afectada y permanecerá en pleno vigor y efecto. ",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "• Los Términos y Condiciones de Uso y la Política de Privacidad constituyen el único y completo acuerdo entre usted TOYOTA DO BRASIL LTDA. con respecto a la aplicación Toyota, excepto en el caso de que sea necesario aceptar los Términos y Condiciones Específicos para el acceso desde otros sitios web y herramientas disponibles en la aplicación móvil.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "• Estos Términos prevalecen sobre todos los demás acuerdos, convenios y/o garantías contemporáneos, escritos y orales, con respecto a la aplicación Toyota.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "• El tratamiento de sus datos personales se llevará a cabo de acuerdo con nuestra Política de Privacidad y la Ley de Protección de Datos Personales (Ley 1589 de 2015). Para ejercer cualquier derecho relacionado con los datos personales diríjase a nuestra página web https://www.toyota.com.co/legales/politica-de-privacidad/servicios-conectados/ o escribanos a los correos electrónicos habeasdata@toyota.com.co , clientes@toyota.com.co; o contáctenos a la Línea Gratuita de Atención Nacional 01 8000 123691 o en Bogotá al (601) 3809424.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "• Este sitio web es administrado por TOYOTA DO BRASIL LTDA. Cualquier observación, solicitud de asistencia técnica y otras comunicaciones relacionadas con la aplicación deben dirigirse a: dcx@toyota.com.br.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "12. Ley Aplicable y Jurisdicción",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Todas las cuestiones relacionadas con la Aplicación Móvil y los presentes Términos y Condiciones de Uso, y toda controversia o reclamo que surja o se relacione con ellos (en cada caso particular incluirá las controversias o reclamos por responsabilidad extra- contractual) se regirán e interpretarán en conformidad con las leyes de la República de Colombia.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Todo juicio, acción o proceso que surja o se relacione con estos Términos y Condiciones de Uso o con la Aplicación Móvil serán iniciados exclusivamente ante los tribunales competentes.",
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
            label: "Términos y Condiciones de Uso de Los Servicios Conectados",
            value: "terminos_y_condiciones_de_uso_de_los_servicios_conectados",
            sections: [
              {
                title:
                  "Términos y Condiciones de Uso de los Servicios Conectados",
                titleStyle: {
                  fontSize: "26px",
                  fontWeight: 700,
                  marginTop: "68px",
                  marginBottom: "1.5rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "Este documento (“Términos“) es un contrato entre usted y Toyota do Brasil Ltda., una empresa privada con sede en el Municipio de São Bernardo do Campo, Estado de São Paulo, Avenida Toyota, nº 9.055, Itavuvu, CEP 18.079-755, inscrita en el CNPJ bajo el nº 59.104.760/ 0006-04, sus afiliados y socios (“Toyota“), que rige el uso de los Servicios Conectados puestos a su disposición como se define a continuación (los “Servicios“).",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Estos Términos son obligatorios y, al utilizar los Servicios, usted acepta plenamente todas sus disposiciones en su nombre y en el de todas las personas que utilicen los Servicios con su cuenta. Léalos atentamente. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Al utilizar los Servicios descritos en este documento, usted indica que ha leído, comprende y acepta las obligaciones establecidas por estos Términos y otros términos, políticas, pautas y procesos a los que se refieren (colectivamente, “Contrato”), que incluye: ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description: "• Los Términos de Uso; ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description: "• Política de Privacidad.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Si no acepta alguno de estos documentos, debe rechazar estos Términos durante el proceso de registro o por cualquier otro medio que pueda ponerse a su disposición. No está autorizado a acceder o utilizar ningún Servicio si no está obligado por estos Términos.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "1.  DE LOS SERVICIOS Y PLANES DISPONIBLES",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "1.1. Los Servicios Conectados que se describen a continuación se ofrecen a los vehículos Toyota equipados con tecnología conectada de fábrica (“Vehículo Conectado”), tras la activación del módulo de conectividad en el concesionario y la obtención y activación de la versión más actualizada de la Aplicación (“App”) Toyota LATAM, a través de la tienda virtual de su dispositivo móvil. Para acceder a las opciones del plan, debe iniciar sesión en la aplicación con el mismo correo electrónico utilizado para activar el módulo en el concesionario.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "1.2. Para que los Servicios se realicen, debe mantener la App instalada en su teléfono móvil y con acceso a Internet, teniendo en cuenta que Toyota no ofrece servicios de telecomunicaciones ni telefónicos.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "1.3. Toyota le ofrece los Servicios a través de los planes que se describen a continuación:",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "(a) Siempre Conectado – Gratis por 5 años",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Estado del vehículo: Con este servicio podrá ver la información de su vehículo en tiempo real. Son: cuentakilómetros, nivel de combustible, estado del motor (encendido o apagado) y ubicación del vehículo.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Puntuación del combustible:  Este servicio funciona como un juego con un enfoque en el consumo de combustible. Usted acumula puntos a medida que cumple con los desafíos estipulados de acuerdo con su comportamiento de conducción.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Últimos viajes: El propósito de este servicio es recopilar datos sobre todos los viajes realizados por el vehículo. Un viaje se caracteriza desde el momento en que se da el arranque hasta el momento en que se apaga el motor. Es posible combinar datos de más de un viaje, transformando tantos ciclos de arranque como el cliente desee en un solo viaje. Esta función es útil para viajes más largos, donde el cliente hará una o más paradas en el camino, pero desea ver los datos en su conjunto. Sin embargo, no es posible combinar viajes con brechas entre ellos. Los viajes deben ser secuenciales para que se puedan combinar. Los detalles de cada viaje son: Estadísticas de conducción, velocidad media y velocidad máxima alcanzada) e Información del viaje (duración, dirección de salida, dirección de llegada y distancia total recorrida). ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Recordatorio de revisión: Cuando el kilometraje del vehículo se acerque a múltiplos de 5.000 km, la app enviará un recordatorio de revisión y el cliente podrá realizar ese agendamiento con mayor facilidad.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Diagnóstico del vehículo: Este servicio identifica los fallos generados por el vehículo. Cuando se identifica una falla, aparecerá un mensaje en la tarjeta de diagnóstico del automóvil en la pantalla Mi Toyota en la aplicación. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Recepción del vehículo: Este servicio proporciona a los concesionarios una herramienta que les permite optimizar la información del vehículo para el mantenimiento/reparación en el concesionario, mejorando la experiencia del cliente. Al llegar a realizar el servicio, el cliente proporcionará el número de chasis (VIN), y el distribuidor podrá ver los problemas identificados en el vehículo, teniendo también la posibilidad de añadir más observaciones informadas por el cliente.​",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "(b) Seguridad Conectada",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                title:
                  "Todos los servicios del paquete Siempre Conectado, y más:",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Cerco geográfico: Con esta función, es posible crear un cerco geográfico virtual alrededor del vehículo utilizando la posición GPS. Si el vehículo entra o sale de este cerco virtual, dependiendo de la configuración realizada por el usuario, se enviará una notificación informando de lo sucedido.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Notificación de alarma: Con esta función, tan pronto como se active la alarma del vehículo, se enviará una notificación al cliente informando de lo sucedido.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Monitoreo mejorado: Si el vehículo identifica un posible accidente, se enviará una notificación preguntando si hay necesidad de ayuda al propietario y al Call Center. Si no hay respuesta del propietario, el Call Center Toyota intentará ponerse en contacto dos veces. Si los intentos no tienen éxito o el cliente confirma que necesita ayuda, se enviará una ambulancia y la policía a la ubicación del vehículo. Servicio disponible solo en el territorio nacional. Toyota no se hace responsable por los tiempos de respuesta de ambulancia o policía.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Diagnóstico del vehículo: Este servicio identifica los fallos generados por el vehículo. Cuando se identifica una falla, aparecerá un mensaje en la tarjeta de diagnóstico del automóvil en la pantalla Mi Toyota en la aplicación.  Tan pronto como haga clic en la tarjeta de diagnóstico, la siguiente pantalla mostrará cuál es la falla, si es una falla moderada o crítica, y una breve descripción de la falla. Al final de la descripción del fallo, aparecerá una recomendación sobre cómo proceder.   ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Rastreo de vehículo robado: En caso de robo/hurto, este servicio permite al cliente solicitar el rastreo del vehículo y.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Inmovilización del vehículo: Con este servicio, el cliente tiene la posibilidad de solicitar la activación de la inmovilización del vehículo. Tan pronto como se apague el vehículo, con la inmovilización activada, no volverá a arrancar hasta que se desactive la inmovilización.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Alerta de velocidad: En este servicio, el cliente debe seleccionar un valor de velocidad máxima al que desea que su vehículo se mueva y con qué frecuencia quiere ser notificado. Se notificará al cliente cuando el vehículo se mueva más rápido que el límite establecido y podrá acceder al historial de viajes, pudiendo editar, cancelar o continuar con el mismo límite para el próximo viaje.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Desconexión del módulo: Se notificará a Toyota si hay una desconexión del módulo, ya sea debido a un defecto en la conexión o a la retirada del dispositivo. Por lo tanto, Toyota se pondrá en contacto con el cliente para verificar lo que sucedió. Si se identifica una falla en el módulo, el cliente será dirigido a un concesionario, que proporcionará soporte para corregir el defecto en la conexión.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "Servicio adicional opcional: Wi-Fi Hotspot: El servicio está destinado a ofrecer conectividad Wi-Fi a los clientes dentro del vehículo. El cliente podrá iniciar sesión a través de una única aplicación y completar la compra del servicio a través de la página web de la empresa asociada. Esto significa que el propietario debe tener un contrato con la empresa asociada, no con Toyota. El pago no será procesado por la Toyota App, será manejado directamente por la empresa asociada (no se almacenarán tarjetas de crédito de clientes en el lado de Toyota para este servicio). La tarifa de Wi-Fi no está incluida en la tarifa de Servicios conectados. El servicio Wi-Fi está aislado del paquete de servicios conectados como una opción adicional.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "1.4. Toyota puede añadir, cambiar o eliminar los Servicios en cualquier momento, en la medida permitida por la ley, previa notificación que se pondrá a su disposición.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "2.  DEL VALOR Y FORMA DE PAGO DE LOS PLANES",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "2.1. El Servicio y/o Plan denominado: “Siempre Conectado” – Será Gratuito hasta por tres (3) años desde la compra del vehículo. Después de los tres (3) años el valor a pagar por la prestación del servicio, será el establecido por Toyota con expresa aceptación del cliente, para la prestación del servicio. *",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "2.2. Una vez se completen los tres (3) años el Valor de la suscripción del plan de Seguridad Conectada será el siguiente: ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "(a) Mensual - $33.730 (Treinta y tres mil setecientos treinta Pesos Colombianos).",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "(b) Anual – $404.760 (Cuatrocientos cuatro mil setecientos sesenta pesos colombianos).",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description: "*  valores están sujetos a variación ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "2.2.1. Toyota puede, en cualquier momento, cambiar o aumentar el valor mensual de los planes, dentro de los límites establecidos por la ley. Recibirá un aviso de cualquier aumento o modificación de precio, para que pueda cancelar la suscripción del plan si lo desea.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "2.3. El pago de los Servicios se realizará a través de la App. El cliente solo podrá registrar 1 (una) tarjeta para el cobro de los Servicios, a partir de la cual siempre se realizará el cargo en esta tarjeta. Si hay algún problema con la tarjeta registrada, el cliente puede reemplazarla. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "2.4. Si la fecha de vencimiento cae en un día festivo o fin de semana, el cargo se realizará el siguiente día hábil. En el caso de que su pago se devuelva debido a fondos insuficientes o fondos aún no disponibles o cualquier imposibilidad técnica, por la presente nos autoriza a realizar un nuevo intento de cobro a menos que se disponga lo contrario en las normas que rigen su tarjeta o cuenta bancaria o la ley aplicable. Las tarifas de procesamiento de pagos asociadas con su Cuenta de Pago, como las tarifas de conversión de moneda, la tarifa por déficit de fondos, las tarifas de devolución de cargo o sobregiro, son su responsabilidad y no le reembolsamos. Puede actualizar su Cuenta de Pago o cancelar su autorización en cualquier momento.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "2.5. El pago se realizará con anterioridad a la liberación de los Servicios a usted, y una vez realizada la contratación y el pago, no será posible revertir el pago ya realizado o cambiar el vehículo vinculado a la contratación.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "2.6. Todos los impuestos y tasas previstos en la legislación nacional están incluidos dentro de la cantidad pagada por usted, y no hay adición posterior de importes para este fin.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "2.7. Toyota no es responsable de la interrupción de los Servicios como resultado de la provisión de información incorrecta por su parte en el momento del registro del método de pago.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "2.8. El uso de los Servicios puede incurrir en costos con su empresa de telefonía móvil e internet. Dichos cargos no forman parte de este acuerdo y no son responsabilidad de Toyota.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "3.  DEL PLAZO, PERIODO GRATUITO Y TERMINACIÓN",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "3.1. Los Servicios estarán disponibles para usted mientras esté registrado, después de obtener la App en la tienda de aplicaciones de su teléfono móvil, crear la cuenta respectiva, emparejar el vehículo con su cuenta de usuario activa en un teléfono móvil con acceso a Internet, contratar uno de los planes ofrecidos y pagar por el plan, de acuerdo con el formulario aplicable.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "3.2. Puede cancelar el plan en cualquier momento. Si cancela dentro de los primeros 07 (siete) días de suscripción o conversión de suscripción gratuita a suscripción de pago, le reembolsaremos el precio total de la compra. No tendrá derecho a ningún otro reembolso por los Servicios. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "3.3. Toyota se reserva el derecho de inhabilitar su acceso a los Servicios y rescindir este Contrato si (i) no cumple con cualquier obligación en virtud de este Contrato; (ii) usted o cualquier parte que actúe en su nombre, a través de o en nombre de, o en conjunto con, practicando, participando, fomentando, participando en cualquier conducta ilícita, ilegal o fraudulenta relacionada con este Contrato o cualquiera de los Servicios; (iii) no está de acuerdo con las enmiendas a este Contrato en los términos en los que lo ponemos a disposición en el futuro; (iv) en caso de incumplimiento; (v) deshabilita o cancela su cuenta; (vi) intenta dañar deliberadamente cualquiera de los sistemas, software, hardware y otros componentes vinculados al vehículo o la App, o perjudica el funcionamiento legítimo de los Servicios.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "4.  DISPONIBILIDAD DE RED Y DE LOS SERVICIOS ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "4.1. Los Servicios utilizan redes inalámbricas de comunicación y la red satelital del Sistema de Posicionamiento Global (“GPS“) y, por lo tanto, están sujetos a la disponibilidad de la red y otras tecnologías. Toyota no se hace responsable del mal funcionamiento de los Servicios causado por el fallo o la falta de cobertura de la red inalámbrica o del GPS. No todos los servicios están disponibles en todas partes, especialmente en áreas remotas o cerradas. El área en la que conduce puede afectar al funcionamiento de los Servicios.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "4.2. Dependiendo de la disponibilidad de redes inalámbricas y GPS, los Servicios pueden no estar disponibles, suspenderse o desactivarse debido a fuerza mayor o circunstancias imprevisibles, incluidos, entre otros, bloqueos de señal, inestabilidad de la red, órdenes gubernamentales o medidas técnicas y de otro tipo (por ejemplo, reparaciones, mantenimiento, actualizaciones y extensiones de software) necesarias en nuestros sistemas o en los de proveedores de contenido aguas abajo o aguas arriba, proveedores de red y operadores.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                description:
                  "4.3. Su vehículo debe contener necesariamente un sistema eléctrico en funcionamiento (incluida la carga adecuada de la batería) para que los Servicios funcionen.",
                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "4.4. Es posible que los Servicios no funcionen si: ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "a) No mantiene el equipo o su vehículo en buen estado de funcionamiento; ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "b) Surgen otros problemas fuera del control de Toyota que interfieren con los Servicios, como colinas, edificios altos, túneles, clima, daños a partes importantes de su Vehículo en un accidente, congestión o interferencia en la red.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "5. CONDICIONES DE USO DE LOS SERVICIOS ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "5.1. Usted deberá cumplir con las leyes aplicables al territorio nacional, aplicables e impuestas en la adquisición y uso de los Servicios, respetando los derechos de Toyota sobre los servicios puestos a su disposición e, igualmente, los de terceros al utilizar los Servicios.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "5.2. No debe utilizar los Servicios con fines ilícitos ni facilitar a terceros el uso de los Servicios con fines ilícitos y/o en violación de los derechos de cualquier tipo de otras personas;",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "5.3. Usted es el único responsable del uso de los Servicios en su vehículo, incluso si no ha sido utilizado por usted. También es el único responsable de los servicios solicitados por usted o por cualquier persona que utilice su vehículo.  Si usted o un conductor de su Vehículo utiliza los Servicios o el Sistema para cometer un delito o cualquier otro agravio, usted será responsable de los daños debidos como resultado de dicho uso.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "5.4. No deberá utilizar el Sistema para dañar dichos servicios y sus intergeneraciones, ya sea mediante la instalación activa de virus, malware, worms, trojans, ataques DNS o cualquier forma de manipulación del sistema en perjuicio de terceros o de Toyota;",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "5.5. Usted será responsable de cualquier reparación de su dispositivo móvil que resulte del uso indebido de los Servicios, así como de cualquier daño causado por la violación de los derechos de terceros debido al uso indebido de los Servicios;",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "5.6. Usted asumirá todos los costos de reparación de las piezas que componen el módulo de Servicios instalado en su vehículo por su uso indebido, así como por cualquier daño causado por la violación o mal uso de la unidad.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "5.7. Usted no modificará, adaptará, sublicenciará, traducirá, venderá, realizará ingeniería inversa, descompilará o desensamblará ninguna parte del módulo o del software, ni eliminará, alterará, eludirá o manipulará de otro modo ninguna tecnología de seguridad.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "5.8. Cualquier intento de dañar deliberadamente cualquiera de los sistemas, software, hardware y otros componentes vinculados al vehículo o a la App, o de perjudicar el funcionamiento legítimo de los Servicios constituye un incumplimiento del presente Contrato. Toyota puede investigar cualquier actividad sospechosa y tomar las medidas apropiadas para obtener todos los recursos necesarios para que cese el intento de daño, sin perjuicio de las pérdidas y daños. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "5.9. Si realiza la venta, transferencia o cancelación permanente del vehículo, debe informar inmediatamente este hecho a Toyota, para que podamos evitar cargos indebidos y proteger la información de su cuenta. Toyota no es responsable de ningún daño resultante de la ausencia de comunicación de venta, transferencia o cancelación.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "6. PROPIEDAD INTELECTUAL ",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "6.1. Todo el contenido de los Servicios, así como los sistemas y componentes vinculados, incluido el software, los datos, las aplicaciones y las configuraciones, son propiedad de Toyota o de terceros que hayan otorgado la autorización para el uso con la licencia correspondiente. Por lo tanto, todos los derechos sobre estos artículos pertenecen a Toyota o a terceros.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "6.2. Usted no está autorizado, al comprar los Servicios, a vender, distribuir, publicar, transmitir, circular o explotar comercialmente los Servicios de ninguna manera sin el consentimiento expreso por escrito de Toyota. No puede reproducir (en su totalidad o en parte), transmitir (por medios electrónicos o de otro tipo), modificar, mostrar, volver a enviar, licenciar, vincular o utilizar los Servicios para ningún propósito público o comercial sin permiso previo.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "6.3. Nada en este Contrato constituye una concesión de licencia o derecho a:",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "6.3.1. Utilizar cualquier imagen, marca comercial, marca de servicio o logotipo, todos propiedad de Toyota o de terceros;",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "6.3.2. Arrendar, sublicenciar, prestar, proporcionar o poner a disposición los Servicios, ya sea en su totalidad o en parte, para fines privados o públicos, privados o comerciales, sin nuestro consentimiento previo por escrito;",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "6.3.3. Desmontar, realizar ingeniería inversa, fusionar, adaptar, variar, alterar o modificar o crear trabajos derivados basados en la totalidad o parte de los sistemas, software, hardware y otros componentes instalados en el vehículo vinculado a los Servicios.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },

              {
                title: "7. CAMBIOS DE LOS TÉRMINOS Y DE LOS SERVICIOS",
                titleStyle: {
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "7.1. Toyota se reserva el derecho de realizar enmiendas a este Contrato para reflejar cambios legales, mejoras, adiciones, alteraciones y suspensiones de características, servicios, derechos y deberes. ",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "7.2. Se le notificará cualquier cambio en este Contrato antes de la fecha de vigencia de dicho cambio.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
              {
                description:
                  "7.3. Si no está de acuerdo con los cambios informados, este Contrato se rescindirá, de conformidad con el punto 3.2, sin derecho al reembolso de las cantidades ya pagadas; en este caso, los Servicios seguirán estando disponibles para usted durante el período ya pagado.",

                descriptionStyle: {
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "1rem",
                },
                padding: { base: " 0 20px", xl: "0 380px" },
              },
            ],
          },
        ],
        defaultValue: type ? type : "info",
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
