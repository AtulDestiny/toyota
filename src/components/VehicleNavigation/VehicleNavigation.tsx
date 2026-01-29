"use client";

import { Flex, View, Text, Heading, Link } from "@aws-amplify/ui-react";
import "./VehicleNavigation.css";
import Image from "next/image";
import { useState } from "react";

interface NavLink {
  label: string;
  href?: string;
}

interface NavSection {
  title: string;
  links?: NavLink[];
  redirect?: string;
}

interface VehicleNavigationProps {
  vehicleName?: string;
  sections?: NavSection[];
}

export function VehicleNavigation({
  vehicleName = "Land Cruiser Prado",
  sections = [
    {
      title: "Información Ficha Técnica",
      redirect: "/images/pdf/FT-Yaris-HB.pdf",
    },
    {
      title: "Versiones",
      links: [
        { label: "Land Cruiser TX", href: "#" },
        { label: "Land Cruiser TXL", href: "#" },
        { label: "Land Cruiser First Edition", href: "#" },
      ],
    },
    {
      title: "Especificaciones Generales",
      links: [
        {
          label: "Especificaciones completas",
          href: "/images/pdf/FT-Yaris-HB.pdf",
        },
      ],
    },
    {
      title: "Galería",
      links: [
        { label: "Exterior", href: "#" },
        { label: "Interior", href: "#" },
        { label: "Vistas 360", href: "#" },
      ],
    },
    { title: "Accesorios", redirect: "/images/pdf/FT-Yaris-HB.pdf" },
    {
      title: "Materiales Descargables",
      links: [
        { label: "Ficha Técnica", href: "/images/pdf/FT-Yaris-HB.pdf" },
        {
          label: "Manual del buen conductor",
          href: "/images/pdf/Manual_del_buen_conductor_Toyota.pdf",
        },
        {
          label: "Cobertura extendida T10",
          href: "/images/pdf/cobertura-extendida-t10.pdf",
        },
      ],
    },
    { title: "Garantía", redirect: "/images/pdf/FT-Yaris-HB.pdf" },
  ],
}: VehicleNavigationProps) {
  const [modal, setModal] = useState<boolean>(false);

  function toggleModal(): void {
    setModal(!modal);
    document.body.style.overflow = modal ? "auto" : "hidden";
  }

  return (
    <Flex direction={"column"} gap={"0"}>
      <Flex
        position={"absolute"}
        top={"0"}
        width={"100%"}
        alignItems={"center"}
        backgroundColor={"#000000"}
        gap={".625rem"}
        padding={".5625rem .9375rem"}
        style={{ zIndex: 4 }}
        onClick={toggleModal}
      >
        <Heading
          level={2}
          color={"white"}
          fontFamily={"var(--font-ToyotaType-Regular)"}
          fontSize={{ base: "0.875rem", medium: "1.125rem" }}
          fontWeight={"400"}
          lineHeight={"100%"}
        >
          {vehicleName}
        </Heading>
        <Image
          width={12}
          height={7.41}
          src="/images/icons/arrow--short-bottom-white.svg"
          alt="Dropdown arrow"
        />
      </Flex>

      {modal && (
        <View
          padding={"calc(6.1769rem + 2.1875rem) 1.25rem 3.1875rem"}
          position={"fixed"}
          top={"0"}
          left={"0"}
          width={"100%"}
          backgroundColor={"#FFFFFF"}
          style={{ zIndex: 3 }}
          height={"100svh"}
          overflow={"auto"}
        >
          {sections.map((section, index) => (
            <Flex direction={"column"} gap={"0"} key={index}>
              <Heading
                level={3}
                padding={"0.94rem 0 1.13rem"}
                fontFamily={"var(--font-ToyotaType-Display)"}
                fontSize={"0.875rem"}
                fontWeight={"500"}
                lineHeight={"1.225rem"}
                style={{
                  borderBottom: "0.0625rem solid #E0E0E0",
                  cursor: section.redirect ? "pointer" : "default",
                }}
                onClick={() => {
                  if (section.redirect) {
                    window.location.href = section.redirect;
                  }
                }}
              >
                {section.title}
              </Heading>

              {section.links && section.links.length > 0 && (
                <Flex direction={"column"} gap={"0"}>
                  {section.links.map((link, idx) => (
                    <Link href={link.href} key={idx}>
                      <Heading
                        level={3}
                        padding={"0.94rem 0 1.13rem 1.25rem"}
                        color={"#58595B"}
                        fontFamily={"var(--font-ToyotaType-Display)"}
                        fontSize={"0.875rem"}
                        fontWeight={"400"}
                        lineHeight={"1.225rem"}
                        style={{
                          borderBottom: "0.0625rem solid #E0E0E0",
                          cursor: "pointer",
                        }}
                      >
                        {link.label}
                      </Heading>
                    </Link>
                  ))}
                </Flex>
              )}
            </Flex>
          ))}
        </View>
      )}
    </Flex>
  );
}

// "use client";
// import { Flex, View, Text, Heading, Link } from "@aws-amplify/ui-react";
// import "./VehicleNavigation.css";
// import Image from "next/image";
// import { useState } from "react";

// interface NavLink {
//   label: string;
//   href: string;
// }

// interface NavSection {
//   title: string;
//   links?: NavLink[];
// }

// interface VehicleNavigationProps {
//   vehicleName: string;
//   sections: NavSection[];
// }

// export function VehicleNavigation() {
//   const [modal, setModal] = useState<boolean>(false);

//   function toggleModal(): void {
//     setModal(!modal);
//     document.body.style.overflow = modal ? "auto" : "hidden";
//   }

//   return (
//     <Flex direction={"column"} gap={"0"}>
//       <Flex
//         position={"absolute"}
//         top={"0"}
//         width={"100%"}
//         alignItems={"center"}
//         backgroundColor={"#000000"}
//         gap={".625rem"}
//         padding={".5625rem .9375rem"}
//         style={{ zIndex: 4 }}
//         onClick={toggleModal}
//       >
//         <Heading
//           level={2}
//           color={"white"}
//           fontFamily={"var(--font-ToyotaType-Regular)"}
//           fontSize={"1.125rem"}
//           fontWeight={"400"}
//           lineHeight={"100%"}
//           style={{
//             verticalAlign: "middle",
//             lineHeight: "100%",
//             letterSpacing: "0",
//           }}
//         >
//           Land Cruiser Prado
//         </Heading>
//         <Image
//           width={12}
//           height={7.41}
//           src="/images/icons/arrow--short-bottom-white.svg"
//           alt="Dropdown arrow"
//         ></Image>
//       </Flex>
//       {modal && (
//         <View
//           padding={"calc(6.1769rem + 2.1875rem) 1.25rem 3.1875rem"}
//           position={"fixed"}
//           top={"0"}
//           left={"0"}
//           width={"100%"}
//           backgroundColor={"#FFFFFF"}
//           style={{ zIndex: 3 }}
//           height={"100svh"}
//           overflow={"auto"}
//         >
//           <Flex direction={"column"} gap={"0"}>
//             <Heading
//               level={3}
//               padding={"0.94rem 0 1.13rem"}
//               fontFamily={"var(--font-ToyotaType-Display)"}
//               fontSize={"14px"}
//               fontWeight={"500"}
//               lineHeight={"1.225rem"}
//               style={{
//                 borderBottom: "0.0625rem solid #E0E0E0",
//                 cursor: "pointer",
//               }}
//             >
//               Información Ficha Técnica
//             </Heading>
//           </Flex>
//           <Flex direction={"column"} gap={"0"}>
//             <Heading
//               level={3}
//               padding={"0.94rem 0 1.13rem"}
//               fontFamily={"var(--font-ToyotaType-Display)"}
//               fontSize={"0.875rem"}
//               fontWeight={"500"}
//               lineHeight={"1.225rem"}
//               style={{
//                 borderBottom: "0.0625rem solid #E0E0E0",
//                 cursor: "pointer",
//               }}
//             >
//               Versiones
//             </Heading>
//             <Flex direction={"column"} gap={"0"}>
//               <Link href="#">
//                 <Text
//                   padding={"0.94rem 0 1.13rem 1.25rem"}
//                   color={"#58595B"}
//                   fontFamily={"var(--font-ToyotaType-Display)"}
//                   fontSize={"0.875rem"}
//                   fontWeight={"400"}
//                   lineHeight={"1.225rem"}
//                   style={{
//                     borderBottom: "0.0625rem solid #E0E0E0",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Land Cruiser TX
//                 </Text>
//               </Link>
//               <Link href="#">
//                 <Text
//                   padding={"0.94rem 0 1.13rem 1.25rem"}
//                   color={"#58595B"}
//                   fontFamily={"var(--font-ToyotaType-Display)"}
//                   fontSize={"0.875rem"}
//                   fontWeight={"400"}
//                   lineHeight={"1.225rem"}
//                   style={{
//                     borderBottom: "0.0625rem solid #E0E0E0",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Land Cruiser TXL
//                 </Text>
//               </Link>
//               <Link href="#">
//                 <Text
//                   padding={"0.94rem 0 1.13rem 1.25rem"}
//                   color={"#58595B"}
//                   fontFamily={"var(--font-ToyotaType-Display)"}
//                   fontSize={"0.875rem"}
//                   fontWeight={"400"}
//                   lineHeight={"1.225rem"}
//                   style={{
//                     borderBottom: "0.0625rem solid #E0E0E0",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Land Cruiser First Edition
//                 </Text>
//               </Link>
//             </Flex>
//           </Flex>
//           <Flex direction={"column"} gap={"0"}>
//             <Heading
//               level={3}
//               padding={"0.94rem 0 1.13rem"}
//               fontFamily={"var(--font-ToyotaType-Display)"}
//               fontSize={"0.875rem"}
//               fontWeight={"500"}
//               lineHeight={"1.225rem"}
//               style={{
//                 borderBottom: "0.0625rem solid #E0E0E0",
//                 cursor: "pointer",
//               }}
//             >
//               Especificaciones Generales
//             </Heading>
//             <Flex direction={"column"} gap={"0"}>
//               <Link href="#">
//                 <Text
//                   padding={"0.94rem 0 1.13rem 1.25rem"}
//                   color={"#58595B"}
//                   fontFamily={"var(--font-ToyotaType-Display)"}
//                   fontSize={"0.875rem"}
//                   fontWeight={"400"}
//                   lineHeight={"1.225rem"}
//                   style={{
//                     borderBottom: "0.0625rem solid #E0E0E0",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Especificaciones completas
//                 </Text>
//               </Link>
//             </Flex>
//           </Flex>
//           <Flex direction={"column"} gap={"0"}>
//             <Heading
//               level={3}
//               padding={"0.94rem 0 1.13rem"}
//               fontFamily={"var(--font-ToyotaType-Display)"}
//               fontSize={"0.875rem"}
//               fontWeight={"500"}
//               lineHeight={"1.225rem"}
//               style={{
//                 borderBottom: "0.0625rem solid #E0E0E0",
//                 cursor: "pointer",
//               }}
//             >
//               Galería
//             </Heading>
//             <Flex direction={"column"} gap={"0"}>
//               <Link href="#">
//                 <Text
//                   padding={"0.94rem 0 1.13rem 1.25rem"}
//                   color={"#58595B"}
//                   fontFamily={"var(--font-ToyotaType-Display)"}
//                   fontSize={"0.875rem"}
//                   fontWeight={"400"}
//                   lineHeight={"1.225rem"}
//                   style={{
//                     borderBottom: "0.0625rem solid #E0E0E0",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Exterior
//                 </Text>
//               </Link>
//               <Link href="#">
//                 <Text
//                   padding={"0.94rem 0 1.13rem 1.25rem"}
//                   color={"#58595B"}
//                   fontFamily={"var(--font-ToyotaType-Display)"}
//                   fontSize={"0.875rem"}
//                   fontWeight={"400"}
//                   lineHeight={"1.225rem"}
//                   style={{
//                     borderBottom: "0.0625rem solid #E0E0E0",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Interior
//                 </Text>
//               </Link>
//               <Link href="#">
//                 <Text
//                   padding={"0.94rem 0 1.13rem 1.25rem"}
//                   color={"#58595B"}
//                   fontFamily={"var(--font-ToyotaType-Display)"}
//                   fontSize={"0.875rem"}
//                   fontWeight={"400"}
//                   lineHeight={"1.225rem"}
//                   style={{
//                     borderBottom: "0.0625rem solid #E0E0E0",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Vistas 360
//                 </Text>
//               </Link>
//             </Flex>
//           </Flex>
//           <Flex direction={"column"} gap={"0"}>
//             <Heading
//               level={3}
//               padding={"0.94rem 0 1.13rem"}
//               fontFamily={"var(--font-ToyotaType-Display)"}
//               fontSize={"0.875rem"}
//               fontWeight={"500"}
//               lineHeight={"1.225rem"}
//               style={{
//                 borderBottom: "0.0625rem solid #E0E0E0",
//                 cursor: "pointer",
//               }}
//             >
//               Accesorios
//             </Heading>
//           </Flex>
//           <Flex direction={"column"} gap={"0"}>
//             <Heading
//               level={3}
//               padding={"0.94rem 0 1.13rem"}
//               fontFamily={"var(--font-ToyotaType-Display)"}
//               fontSize={"0.875rem"}
//               fontWeight={"500"}
//               lineHeight={"1.225rem"}
//               style={{
//                 borderBottom: "0.0625rem solid #E0E0E0",
//                 cursor: "pointer",
//               }}
//             >
//               Materiales Descargables
//             </Heading>
//             <Flex direction={"column"} gap={"0"}>
//               <Link href="#">
//                 <Text
//                   padding={"0.94rem 0 1.13rem 1.25rem"}
//                   color={"#58595B"}
//                   fontFamily={"var(--font-ToyotaType-Display)"}
//                   fontSize={"0.875rem"}
//                   fontWeight={"400"}
//                   lineHeight={"1.225rem"}
//                   style={{
//                     borderBottom: "0.0625rem solid #E0E0E0",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Ficha Técnica
//                 </Text>
//               </Link>
//               <Link href="#">
//                 <Text
//                   padding={"0.94rem 0 1.13rem 1.25rem"}
//                   color={"#58595B"}
//                   fontFamily={"var(--font-ToyotaType-Display)"}
//                   fontSize={"0.875rem"}
//                   fontWeight={"400"}
//                   lineHeight={"1.225rem"}
//                   style={{
//                     borderBottom: "0.0625rem solid #E0E0E0",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Manual del buen conductor
//                 </Text>
//               </Link>
//               <Link href="#">
//                 <Text
//                   padding={"0.94rem 0 1.13rem 1.25rem"}
//                   color={"#58595B"}
//                   fontFamily={"var(--font-ToyotaType-Display)"}
//                   fontSize={"0.875rem"}
//                   fontWeight={"400"}
//                   lineHeight={"1.225rem"}
//                   style={{
//                     borderBottom: "0.0625rem solid #E0E0E0",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Información sobre Airbags
//                 </Text>
//               </Link>
//             </Flex>
//           </Flex>
//           <Flex direction={"column"} gap={"0"}>
//             <Heading
//               level={3}
//               padding={"0.94rem 0 1.13rem"}
//               fontFamily={"var(--font-ToyotaType-Display)"}
//               fontSize={"0.875rem"}
//               fontWeight={"500"}
//               lineHeight={"1.225rem"}
//               style={{
//                 borderBottom: "0.0625rem solid #E0E0E0",
//                 cursor: "pointer",
//               }}
//             >
//               Garantía
//             </Heading>
//           </Flex>
//         </View>
//       )}
//     </Flex>
//   );
// }
