/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Image,
  Button,
  ScrollView,
  View,
  Grid,
} from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import SubmenuDropdown from "@/components/Layout/Header/Components/SubmenuDropdown/SubmenuDropdown";
import VehiclesDropdown from "@/components/Layout/Header/Components/VehiclesDropdown/VehiclesDropdown";
import VehiclesDropdownCard from "@/components/Layout/Header/Components/VehiclesDropdown/VehiclesDropdownCard";
import { Vehicle } from "@/types/vehicle";
import Link from "next/link";

type VehicleCategory =
  | "Camionetas y SUV"
  | "Autos"
  | "Pick Ups"
  | "Híbridos"
  | "Deportivos TGR"
  | "Ver todos";

const vehiclesData: Record<VehicleCategory, Vehicle[]> = {
  Autos: [
    {
      id: 1,
      name: "Yaris",
      year: "2026",
      type: "Gasolina",
      price: "$87.900.000 COP",
      description: "Tu primer Toyota",
      img: "/images/seleccion-toyota-jun-Yaris.png",
      link: "/vehiculos/autos/yaris",
      cotizarLink: "/cotizador/yaris",
    },
    {
      id: 2,
      name: "Corolla",
      year: "2026",
      type: "Híbrido",
      price: "$109.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/seleccion-toyota-jun-Corolla.png",
      link: "/vehiculos/hibridos/corolla",
      cotizarLink: "/cotizador/corolla",
    },
    {
      id: 3,
      name: "Corolla GR-S",
      year: "2026",
      type: "Gasolina",
      price: "$130.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/seleccion-toyota-jun-CorollaGR.png",
      link: "/vehiculos/deportivos-tgr/corolla-gr-s",
      cotizarLink: "/cotizador/corolla-gr-s",
    },
  ],
  "Camionetas y SUV": [
    {
      id: 1,
      name: "Fortuner",
      year: "2026",
      type: "Gasolina / Diésel",
      price: "$239.900.000 COP",
      description: "Cada destino es mejor en compañía",
      img: "/images/seleccion-toyota-jun-Fortuner.png",
      link: "/vehiculos/camionetas/fortuner",
      cotizarLink: "/cotizador/fortuner",
    },
    {
      id: 2,
      name: "Land Cruiser 300",
      modelName: "LC300 GASOLINA ZX",
      year: "2025",
      type: "Gasolina",
      price: "$633.500.000 COP",
      description: "Una presencia robusta",
      img: "/images/seleccion-toyota-jun-LC300.png",
      link: "/vehiculos/camionetas/land-cruiser-300",
      cotizarLink: "/cotizador/land-cruiser-300",
    },
    {
      id: 3,
      name: "Land Cruiser Prado",
      year: "2025",
      type: "Gasolina / Diésel",
      price: "$303.500.000 COP",
      description: "El legado que abre nuevos caminos",
      img: "/images/seleccion-toyota-jun-LCPrado.png",
      link: "/vehiculos/camionetas/land-cruiser-prado",
      cotizarLink: "/cotizador/land-cruiser-prado",
    },
    {
      id: 4,
      name: "Yaris Cross",
      year: "2026",
      type: "Híbrido",
      price: "$132.900.000 COP",
      description: "Kilómetros de eficiencia en cada viaje",
      img: "/images/seleccion-toyota-jun-YarisCross.png",
      link: "/vehiculos/hibridos/yaris-cross",
      cotizarLink: "/cotizador/yaris-cross",
    },
    {
      id: 5,
      name: "Corolla Cross",
      year: "2026",
      type: "Híbrido",
      price: "$135.900.000 COP",
      description: "Muévete a tu mejor versión",
      img: "/images/seleccion-toyota-jun-CorollaCross.png",
      link: "/vehiculos/hibridos/corolla-cross",
      cotizarLink: "/cotizador/corolla-cross",
    },
    {
      id: 6,
      name: "Corolla Cross GR-S",
      year: "2026",
      type: "Gasolina",
      price: "$161.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/seleccion-toyota-jun-CorollaCrossGR.png",
      link: "/vehiculos/deportivos-tgr/corolla-cross-gr",
      cotizarLink: "/cotizador/corolla-cross",
    },
    {
      id: 7,
      name: "Fortuner GR-S",
      modelName: "FORTUNER GR-S 4X4 DIÉSEL 2.8",
      year: "2026",
      type: "Diésel",
      price: "$335.500.000 COP",
      description: "Cada destino es mejor en compañía",
      img: "/images/seleccion-toyota-jun-FortunerGR.png",
      link: "/vehiculos/deportivos-tgr/fortuner-gr-s",
      cotizarLink: "/cotizador/fortuner",
    },
    {
      id: 8,
      name: "Land Cruiser 300 GR-S",
      modelName: "LC300 GASOLINA GR-S",
      year: "2025",
      type: "Gasolina",
      price: "$662.900.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/seleccion-toyota-jun-LC300GR.png",
      link: "/vehiculos/deportivos-tgr/land-cruiser-300-gr-s",
      cotizarLink: "/cotizador/land-cruiser-300",
    },
  ],
  "Pick Ups": [
    {
      id: 1,
      name: "Hilux",
      year: "2026",
      type: "Gasolina / Diésel",
      price: "$175.900.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/seleccion-toyota-jun-Hilux.png",
      link: "/vehiculos/pick-ups/hilux",
      cotizarLink: "/cotizador/hilux",
    },
    {
      id: 2,
      name: "Hilux Overlander",
      modelName: "HILUX OVERLANDER D.C. 4X4 DIESEL 2.4 MT",
      year: "2026",
      type: "Diésel",
      price: "$234.900.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/hilux-overlander/preview.png",
      link: "/vehiculos/pick-ups/hilux-overlander",
      cotizarLink: "/cotizador/hilux",
    },
    // {
    //   id: 3,
    //   name: "Hilux Cargo Max",
    //   modelName: "HILUX CH. ESTACAS 4X4 DIÉSEL 2.4 MT",
    //   year: "2026",
    //   type: "Diésel",
    //   price: "$185.500.000 COP",
    //   description: "Potencia y rendimiento",
    //   img: "/images/seleccion-toyota-jun-HiluxCargoMax.png",
    //   link: "/vehiculos/pick-ups/hilux-cargomax",
    //   cotizarLink: "/cotizador/hilux",
    // },
    {
      id: 4,
      name: "Land Cruiser 79",
      modelName: "Land Cruiser 79",
      year: "2025",
      type: "Gasolina",
      price: "$255.900.000 COP",
      description: "Un ícono de resistencia y durabilidad",
      img: "/images/seleccion-toyota-jun-LC79.png",
      link: "/vehiculos/pick-ups/land-cruiser",
      cotizarLink: "/cotizador/land-cruiser",
    },
    // {
    //   id: 5,
    //   name: "Tundra",
    //   modelName: "TUNDRA D.C. 4X4 GASOLINA 3.4 AT",
    //   year: "2024",
    //   type: "Gasolina",
    //   price: "$432.000.000 COP",
    //   description: "Creada para despertar miradas",
    //   img: "/images/seleccion-toyota-jun-Tundra.png",
    //   link: "/vehiculos/pick-ups/tundra",
    //   cotizarLink: "/cotizador/tundra",
    // },
    {
      id: 6,
      name: "Hilux GR-S",
      modelName: "HILUX GR-S IV D.C. 4X4 DIÉSEL 2.8 AT",
      year: "2026",
      type: "Diésel",
      price: "$309.500.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/seleccion-toyota-jun-HiluxGR.png",
      link: "/vehiculos/deportivos-tgr/hilux-gr-s-iv",
      cotizarLink: "/cotizador/hilux",
    },
  ],
  Híbridos: [
    {
      id: 1,
      name: "Corolla",
      year: "2026",
      type: "Híbrido",
      price: "$109.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/seleccion-toyota-jun-Corolla.png",
      link: "/vehiculos/hibridos/corolla",
      cotizarLink: "/cotizador/corolla",
    },
    {
      id: 2,
      name: "Yaris Cross",
      year: "2026",
      type: "Híbrido",
      price: "$132.900.000 COP",
      description: "Kilómetros de eficiencia en cada viaje",
      img: "/images/seleccion-toyota-jun-YarisCross.png",
      link: "/vehiculos/hibridos/yaris-cross",
      cotizarLink: "/cotizador/yaris-cross",
    },
    {
      id: 3,
      name: "Corolla Cross",
      year: "2026",
      type: "Híbrido",
      price: "$135.900.000 COP",
      description: "Muévete a tu mejor versión",
      img: "/images/seleccion-toyota-jun-CorollaCross.png",
      link: "/vehiculos/hibridos/corolla-cross",
      cotizarLink: "/cotizador/corolla-cross",
    },
  ],
  "Deportivos TGR": [
    {
      id: 2,
      name: "Corolla GR-S",
      year: "2026",
      type: "Gasolina",
      price: "$130.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/seleccion-toyota-jun-CorollaGR.png",
      link: "/vehiculos/deportivos-tgr/corolla-gr-s",
      cotizarLink: "/cotizador/corolla",
    },
    {
      id: 3,
      name: "Corolla Cross GR-S",
      year: "2026",
      type: "Gasolina",
      price: "$161.900.000 COP",
      description: "En cada camino empieza una historia",
      img: "/images/seleccion-toyota-jun-CorollaCrossGR.png",
      link: "/vehiculos/deportivos-tgr/corolla-cross-gr",
      cotizarLink: "/cotizador/corolla-cross",
    },
    {
      id: 4,
      name: "Fortuner GR-S",
      modelName: "FORTUNER GR-S 4X4 DIÉSEL 2.8",
      year: "2026",
      type: "Diésel",
      price: "$335.500.000 COP",
      description: "Cada destino es mejor en compañía",
      img: "/images/seleccion-toyota-jun-FortunerGR.png",
      link: "/vehiculos/deportivos-tgr/fortuner-gr-s",
      cotizarLink: "/cotizador/fortuner",
    },
    {
      id: 5,
      name: "Hilux GR-S",
      modelName: "HILUX GR-S IV D.C. 4X4 DIÉSEL 2.8 AT",
      year: "2026",
      type: "Diésel",
      price: "$309.500.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/seleccion-toyota-jun-HiluxGR.png",
      link: "/vehiculos/deportivos-tgr/hilux-gr-s-iv",
      cotizarLink: "/cotizador/hilux",
    },
    {
      id: 6,
      name: "Land Cruiser 300 GR-S",
      modelName: "LC300 GASOLINA GR-S",
      year: "2025",
      type: "Gasolina",
      price: "$662.900.000 COP",
      description: "Fuerza y durabilidad",
      img: "/images/seleccion-toyota-jun-LC300GR.png",
      link: "/vehiculos/deportivos-tgr/land-cruiser-300-gr-s",
      cotizarLink: "/cotizador/land-cruiser-300",
    },
  ],
  "Ver todos": [],
};

vehiclesData["Ver todos"] = [
  ...vehiclesData.Autos,
  ...vehiclesData["Camionetas y SUV"],
  ...vehiclesData["Pick Ups"],
  ...vehiclesData.Híbridos,
  ...vehiclesData["Deportivos TGR"],
]
  .filter(
    (vehicle, index, self) =>
      self.findIndex((v) => v.link === vehicle.link) === index
  )
  .sort((a, b) => {
    const parsePrice = (priceStr: string) => {
      if (!priceStr) return Infinity;
      return parseInt(priceStr.replace(/[^\d]/g, ""), 10);
    };
    return parsePrice(a.price) - parsePrice(b.price);
  });

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<any>({ name: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuItemMobile, setActiveMenuItemMobile] = useState<any>(null);
  const [currentCategory, setCurrentCategory] = useState<string | undefined>(
    undefined
  );
  const [isMobile, setIsMobile] = useState<undefined | boolean>(undefined);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Vehículos",
      hasDropdown: true,
      dropdownComponent: <VehiclesDropdown {...vehiclesData} />,
    },
    {
      name: "Cotiza tu Toyota",
      hasDropdown: true,
      dropdownComponent: (
        <SubmenuDropdown
          columns={[
            {
              title: "Cotiza tu Toyota",
              links: [
                {
                  label: "Vehículos nuevos",
                  href: "/cotiza-tu-toyota/vehiculos-nuevos",
                },
                {
                  label: "Vehículos usados",
                  href: "/cotiza-tu-toyota/vehiculos-usados",
                },
                {
                  label: "Test drive",
                  href: "/cotiza-tu-toyota/test-drive",
                },
                {
                  label: "Flotas y ventas corporativas",
                  href: "/cotiza-tu-toyota/flotas-y-ventas-corporativas",
                },
                {
                  label: "Seguro Toyota",
                  href: "/cotiza-tu-toyota/seguro-toyota",
                },
                {
                  label: "Financiación Toyota",
                  href: "/cotiza-tu-toyota/financiacion-toyota",
                },
              ],
              showViewAll: false,
            },
          ]}
          titleStyle={{
            fontWeight: 600,
            fontSize: "18px",
          }}
          linkStyle={{
            fontSize: "16px",
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      name: "Mi Toyota",
      hasDropdown: true,
      dropdownComponent: (
        <SubmenuDropdown
          onClose={() => {
            setActiveDropdown([]);
          }}
          columns={[
            {
              title: "Mi Toyota",
              links: [
                // { label: "Posventa", info: true },
                {
                  label: "Mantenimientos Toyota",
                  submenu: [
                    {
                      title: "Mantenimientos Toyota",
                      links: [
                        {
                          label: "Mantenimiento",
                          href: "/mi-toyota/mantenimiento",
                        },
                        {
                          label: "Mantenimiento Planeado",
                          href: "/mi-toyota/mantenimiento/planeado",
                        },
                        {
                          label: "Mantenimiento Express",
                          href: "/mi-toyota/mantenimiento/express",
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "Campañas de Seguridad",
                  submenu: [
                    {
                      title: "Campañas de Seguridad",
                      links: [
                        {
                          label: "Campañas de Seguridad y Servicio",
                          href: "/mi-toyota/campanas-de-seguridad-y-servicios",
                        },
                        {
                          label: "Campaña de Seguridad Tapetes",
                          href: "/mi-toyota/campanas-de-seguridad-tapetes",
                        },
                      ],
                    },
                  ],
                },

                {
                  label: "Cobertura Extendida T10",
                  href: "/mi-toyota/cobertura-extendida-t10",
                },

                {
                  label: "Boutique",
                  submenu: [
                    {
                      links: [
                        {
                          label: "Boutique",
                          href: "/mi-toyota/boutique",
                        },
                        {
                          label: "Boutique Toyota",
                          href: "/mi-toyota/boutique/marketplace?type=boutique-toyota",
                        },
                        {
                          label: "Boutique Ecofriendly",
                          href: "/mi-toyota/boutique/marketplace?type=boutique-ecofriendly",
                        },
                        {
                          label: "Boutique Gazoo Racing",
                          href: "/deportivos-tgr/marketplace?type=boutique-gazoo-racing",
                        },
                      ],
                    },
                  ],
                },

                {
                  label: "Accesorios",
                  href: "/mi-toyota/accesorios",
                },

                {
                  label: "Toyota conectado",
                  submenu: [
                    {
                      title: "Toyota conectado",
                      links: [
                        {
                          label: "Toyota App",
                          href: "/mi-toyota/servicios-conectados/toyota-app",
                        },
                        {
                          label: "Servicios Conectados",
                          href: "/mi-toyota/servicios-conectados",
                        },
                      ],
                    },
                  ],
                },

                {
                  label: "Euro 6",
                  href: "/mi-toyota/euro-6",
                },
              ],
              showViewAll: false,
            },
          ]}
          titleStyle={{
            fontWeight: 600,
            fontSize: "18px",
          }}
          linkStyle={{
            fontSize: "16px",
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      name: "Descubre Toyota",
      hasDropdown: true,
      dropdownComponent: (
        <SubmenuDropdown
          columns={[
            {
              title: "Descubre Toyota",
              links: [
                {
                  label: "Tecnologías",
                  submenu: [
                    {
                      links: [
                        {
                          label: "Híbridos",
                          href: "/descubre-toyota/tecnologias/hibridos",
                        },
                        {
                          label: "Flex Fuel Hev",
                          href: "/descubre-toyota/tecnologias/flex-fuel-hev",
                        },
                        /* {
                          label: "Híbridos enchufables",
                          href: "/descubre-toyota/tecnologias/hibridos-enchufable",
                        }, */
                      ],
                    },
                  ],
                },
                {
                  label: "Seguridad",
                  submenu: [
                    {
                      title: "Sistemas de seguridad",
                      links: [
                        {
                          label: "Toyota Safety Sense",
                          href: "/descubre-toyota/seguridad/toyota-safety-sense",
                        },
                        {
                          label: "Manual del buen conductor",
                          href: "/descubre-toyota/seguridad/manual-del-buen-conductor",
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "Toyota sostenible",
                  submenu: [
                    {
                      title: "Pilares de sostenibilidad",
                      links: [
                        {
                          label: "A-Ambiental",
                          submenu: [
                            {
                              title: "Medio ambiente",
                              links: [
                                {
                                  label: "Desafío medioambiental 2050",
                                  href: "/descubre-toyota/toyota-sostensible/a-ambiental/desafio-medioambiental-2025",
                                },
                              ],
                            },
                            {
                              subtitle: "Impacto positivo",
                              links: [
                                {
                                  label: "Gestión eficiente del agua",
                                  href: "/descubre-toyota/toyota-sostensible/a-ambiental/gestion-eficiente-del-agua",
                                },
                                {
                                  label: "Armonía con la naturaleza",
                                  href: "/descubre-toyota/toyota-sostensible/a-ambiental/armonia-con-la-naturaleza",
                                },
                                {
                                  label: "Reconecta",
                                  href: "/descubre-toyota/toyota-sostensible/a-ambiental/reconecta",
                                },
                              ],
                            },
                          ],
                        },
                        {
                          label: "S-Social",
                          submenu: [
                            {
                              title: "Diversidad, equidad e inclusión",
                              links: [
                                {
                                  label: "Cáncer de mama",
                                  href: "/descubre-toyota/toyota-sostensible/s-social/cancer-de-mama",
                                },
                                {
                                  label: "Cáncer de próstata",
                                  href: "/descubre-toyota/toyota-sostensible/s-social/cancer-de-prostata",
                                },
                                {
                                  label: "Comunidad Wayúu",
                                  href: "/descubre-toyota/toyota-sostensible/s-social/comunidad-wayuu",
                                },
                              ],
                            },
                            {
                              subtitle: "Dibuja tu Toyota",
                              links: [
                                {
                                  label: "El carro de tus sueños",
                                  href: "/descubre-toyota/toyota-sostensible/s-social/el-carro-de-tus-suenos",
                                },
                              ],
                            },
                          ],
                        },
                        {
                          label: "G-Gobernanza",
                          submenu: [
                            {
                              title: "Beyond Zero",
                              links: [
                                {
                                  label: "Movilidad sostenible",
                                  href: "/descubre-toyota/toyota-sostensible/g-gobernanza/movilidad-sostenible",
                                },
                                {
                                  label: "Ciudad del futuro Woven City",
                                  href: "/descubre-toyota/toyota-sostensible/g-gobernanza/ciudad-del-futuro-woven-city",
                                },
                              ],
                            },
                            {
                              subtitle: "Conciencia vial",
                              links: [
                                {
                                  label: "Parque de seguridad vial",
                                  href: "/descubre-toyota/toyota-sostensible/g-gobernanza/parque-de-seguridad-vial",
                                },
                              ],
                            },
                            {
                              subtitle: "Informes de sostenibilidad",
                              links: [
                                {
                                  label: "Informe del 2022",
                                  href: "/descubre-toyota/toyota-sostensible/g-gobernanza/informe-de-sostenibilidad",
                                },
                                {
                                  label: "Informe del 2023",
                                  href: "/descubre-toyota/toyota-sostensible/g-gobernanza/informe-de-sostenibilidad",
                                },
                                {
                                  label: "Informe del 2024",
                                  href: "/descubre-toyota/toyota-sostensible/g-gobernanza/informe-de-sostenibilidad",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "Cumplimiento",
                  href: "/descubre-toyota/cumplimiento",
                },
                {
                  label: "Historia Toyota Colombia",
                  href: "/descubre-toyota/historia-toyota",
                },
              ],
            },
          ]}
          titleStyle={{
            fontWeight: 600,
            fontSize: "18px",
          }}
        />
      ),
    },
    {
      name: "Alquila",
      hasDropdown: true,
      isshowrightUpArrow: true,
      dropdownComponent: (
        <SubmenuDropdown
          columns={[
            {
              title: "Movilidad",
              links: [
                {
                  label: "KINTO Share",
                  description: "Corto plazo",
                  href: "https://www.kinto-mobility.com.co/kinto-share#no-back",
                  isExternal: true,
                },
                {
                  label: "KINTO One Fleet",
                  description: "Gestión de flotas",
                  href: "https://www.kinto-mobility.com.co/kinto-one-fleet#no-back",
                  isExternal: true,
                },
              ],
              showViewAll: true,
              viewAllLink: "https://www.kinto-mobility.com.co/",
            },
          ]}
          titleStyle={{
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "100%",
            fontStyle: "normal",
          }}
          linkStyle={{
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: "100%",
            fontStyle: "normal",
          }}
        />
      ),
    },
    /*
    
    {
      name: "Favoritos",
      hasDropdown: true,
      dropdownComponent: (
        <SubmenuDropdown
          columns={[
            {
              title: "Favoritos",
              links: [
                {
                  label: "Usados favoritos",
                  href: "/favoritos?type=usados",
                  isExternal: false,
                },
                {
                  label: "Repuestos favoritos",
                  href: "/favoritos?type=repuestos",
                  isExternal: false,
                },
                {
                  label: "Accesorios favoritos",
                  href: "/favoritos?type=accesorios",
                  isExternal: false,
                },
                {
                  label: "Boutique favoritos",
                  href: "/favoritos?type=boutique",
                  isExternal: false,
                },
              ],
            },
          ]}
        />
      ),
    },
    */
    { name: "Noticias", href: "/noticias", hasDropdown: false },
    {
      name: "Deportivos TGR",
      href: "/deportivos-tgr/inicio",
      hasDropdown: false,
    },
  ];

  const rightMenuItems = [
    {
      name: "Cotizador",
      href: "/cotiza-tu-toyota/vehiculos-nuevos",
      hasDropdown: false,
      bold: true,
      isExternal: false,
    },
    {
      name: "Concesionarios Toyota",
      href: "/concesionarios",
      hasDropdown: false,
      bold: true,
    },
    {
      name: "WhatsApp",
      icon: "/svgs/whatsapp.svg",
      href: "https://api.whatsapp.com/send/?phone=573114810880&text=Hola.+Quiero+m%C3%A1s+informaci%C3%B3n+sobre...&type=phone_number&app_absent=0&utm_source=Whatsapp_Toyota",
      isExternal: true,
      isIconOnly: true,
    },
  ];

  // Custom hook to handle window resize and check if screen width is less than 1220px
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1220);
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setActiveMenuItemMobile(null);
    setCurrentCategory(undefined);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen || activeDropdown) {
      document.body.classList.add("scroll--disable");
    } else {
      document.body.classList.remove("scroll--disable");
    }
  }, [isMobileMenuOpen, activeDropdown]);

  const toggleDropdown = (item: any) => {
    setActiveDropdown(activeDropdown?.name === item?.name ? null : item);
  };

  const handleSetCategory = (category: string) => {
    setCurrentCategory(category);
  };

  // Only render after isMobile is determined to avoid hydration mismatch
  if (typeof isMobile === "undefined") {
    return null;
  }

  return (
    <>
      <Flex
        justifyContent="space-between"
        className="test-width-nanem"
        alignItems="center"
        padding={{ base: "15px 15px", xl: "24px 40px" }}
        backgroundColor={{ base: "#ffffff", xl: "#f3f3f3" }}
        position="sticky"
        top="0px"
        right="0px"
        left="0px"
        style={{ zIndex: 9999999 }}
        height={{ base: "55px", xl: "60px" }}
        border={"1px solid #E0E0E0"}
        width="100%"
      >
        {/* Logo a la izquierda */}
        {activeMenuItemMobile == null && (
          <View display={"flex"}>
            <Image
              src="/images/Logo.svg"
              alt="Toyota Logo"
              height={{ base: "22.98px", xl: "28.12px" }}
              onClick={() => router.push("/")}
              style={{ cursor: "pointer" }}
              width={{ base: "139px", xl: "170px" }}
            />
          </View>
        )}
        {activeMenuItemMobile !== null && (
          <Image
            src={"/images/icons/left_arrow.svg"}
            alt="Menú"
            height="20px"
            onClick={() => {
              if (currentCategory) return setCurrentCategory(undefined);
              setActiveMenuItemMobile(null);
            }}
          />
        )}
        {activeMenuItemMobile !== null && (
          <Text
            fontSize="22px"
            color="#000"
            fontWeight={700}
            fontFamily="var(--font-ToyotaType-Regular)"
          >
            {currentCategory || activeMenuItemMobile.name}
          </Text>
        )}
        {/* Botón de menú hamburguesa para móviles */}
        <Button
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            setActiveMenuItemMobile(null);
            setCurrentCategory(undefined);
          }}
          display={isMobile ? "block" : "none"}
          backgroundColor="transparent"
          border="none"
          style={{ cursor: "pointer" }}
        >
          <Image
            src={
              isMobileMenuOpen ? "/images/icons/close.svg" : "/images/menu.svg"
            }
            alt="Menú"
            height={{ base: "12.23372745513916px", xl: "20px" }}
            width={"19.22px"}
          />
        </Button>
        {/* Menú principal centrado */}
        <Flex
          gap="20px"
          alignItems="center"
          position="relative"
          display={isMobile ? "none" : "flex"}
        >
          {menuItems.map((item, index) => (
            <Flex
              key={index}
              alignItems="center"
              style={{ fontWeight: "normal", cursor: "pointer" }}
              gap={".625rem"}
              onClick={() => item.hasDropdown && toggleDropdown(item)}
            >
              {item.hasDropdown ? (
                <Text
                  fontSize={{ base: "11px", xxl: "14px" }}
                  color={activeDropdown === item ? "#D42224" : "#000"}
                  fontFamily="var(--font-toyotaDisplay)"
                  onClick={() => {
                    toggleDropdown(item);
                  }}
                >
                  {item.name}
                  <Image
                    src={
                      activeDropdown === item
                        ? "/images/arrow_menu_up.svg"
                        : "/images/arrow_menu_down.svg"
                    }
                    alt="arrow"
                    height="7px"
                    paddingLeft="10px"
                  />
                </Text>
              ) : (
                <Link href={item.href || ""}>
                  <Text
                    fontSize={{ base: "11px", xxl: "14px" }}
                    color={activeDropdown === item ? "#D42224" : "#000"}
                    fontFamily="var(--font-toyotaDisplay)"
                  >
                    {item.name}
                  </Text>
                </Link>
              )}
            </Flex>
          ))}
        </Flex>
        {/* Menú alineado a la derecha */}
        <Flex
          gap="20px"
          alignItems="center"
          display={isMobile ? "none" : "flex"}
        >
          {rightMenuItems.map((item, index) => (
            <Flex
              key={index}
              alignItems="center"
              style={{
                fontWeight: item.bold ? "700" : "normal",
                cursor: "pointer",
              }}
            >
              {item.isIconOnly ? (
                <Link href={item.href} target="_blank">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width="25.935007095336914px"
                    height="27px"
                    style={{ cursor: "pointer" }}
                  />
                </Link>
              ) : (
                <Link href={item.href}>
                  <Text
                    fontSize="14px"
                    color="#000"
                    fontWeight={700}
                    fontFamily="var(--font-ToyotaType-Regular)"
                  >
                    {item.name}
                  </Text>
                </Link>
              )}
            </Flex>
          ))}
        </Flex>
        {/* Menú desplegable móvil */}
        {isMobileMenuOpen && (
          <Flex
            position="absolute"
            direction={"column"}
            top="100%"
            left="0"
            gap={"0"}
            width="100%"
            height="100vh"
            backgroundColor="#fff"
            padding="20px"
            style={{
              zIndex: 9999,
              overflowY: "auto",
            }}
          >
            {currentCategory && (
              <>
                <ScrollView
                  style={{
                    height: "100%",
                    width: "100%",
                    paddingBottom: "140px",
                    margin: "0 auto",
                  }}
                >
                  {vehiclesData[currentCategory as VehicleCategory].map(
                    (vehicle) => (
                      <VehiclesDropdownCard
                        key={vehicle.id}
                        vehicle={vehicle}
                      />
                    )
                  )}
                </ScrollView>
              </>
            )}

            {activeMenuItemMobile !== null &&
              !currentCategory &&
              activeMenuItemMobile.name === "Vehículos" && (
                <>
                  {(Object.keys(vehiclesData) as VehicleCategory[]).map(
                    (category, index) => (
                      <Flex
                        key={index}
                        alignItems="center"
                        justifyContent="space-between"
                        padding="10px 0"
                        style={{
                          fontWeight: "normal",
                          cursor: "pointer",
                          paddingBottom: "18px",
                          paddingTop: "5px",
                          borderBottom: "1px solid #eaeaea",
                        }}
                        onClick={() => handleSetCategory(category)}
                      >
                        <Text
                          fontSize="16px"
                          color="#000"
                          fontFamily="var(--font-toyotaDisplay)"
                        >
                          {category}
                        </Text>
                        {category !== "Ver todos" && (
                          <Image
                            src="/images/icons/right_arrow.svg"
                            alt="arrow"
                            height="12px"
                          />
                        )}
                      </Flex>
                    )
                  )}
                </>
              )}

            {activeMenuItemMobile !== null &&
              activeMenuItemMobile.name !== "Vehículos" &&
              menuItems
                .filter((item) => item.name === activeMenuItemMobile.name)
                .map((item, index) => (
                  <React.Fragment key={index}>
                    {React.cloneElement(
                      item.dropdownComponent as unknown as React.ReactElement,
                      {
                        isMobile: true,
                        onClose: () => setIsMobileMenuOpen(false),
                        onBack: () => setActiveMenuItemMobile(null),
                      }
                    )}
                  </React.Fragment>
                ))}

            {activeMenuItemMobile == null &&
              menuItems.map((item, index) => (
                <Flex
                  key={index}
                  alignItems="center"
                  justifyContent="space-between"
                  padding="15px 0 18px 0"
                  style={{
                    fontWeight: "normal",
                    cursor: "pointer",
                    paddingBottom: "18px",
                    paddingTop: "5px",
                    borderBottom: "1px solid #eaeaea",
                  }}
                  onClick={() => {
                    if (item.hasDropdown) {
                      setActiveMenuItemMobile(item);
                    } else if (item.href) {
                      router.push(item.href);
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  <Text
                    fontSize="14px"
                    color="#000"
                    fontFamily="var(--font-toyotaDisplay)"
                  >
                    {item.name}
                  </Text>
                  {item.hasDropdown &&
                    Array.isArray(item.dropdownComponent?.props?.columns) &&
                    item.dropdownComponent.props.columns.some((col: any) =>
                      col.links?.some((link: any) => link.submenu)
                    ) && (
                      <Image
                        src="/images/icons/right_arrow.svg"
                        alt="arrow"
                        height="12px"
                      />
                    )}
                </Flex>
              ))}

            {activeMenuItemMobile == null &&
              rightMenuItems.map((item, index) => (
                <Flex
                  key={index}
                  alignItems="center"
                  style={{
                    fontWeight: item.bold ? "bold" : "normal",
                    cursor: "pointer",
                    marginTop: "4px",
                  }}
                  onClick={() => {
                    if (item.href) {
                      if (item.isExternal) {
                        window.open(item.href, "_blank");
                      } else {
                        router.push(item.href);
                      }
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  {item.isIconOnly ? (
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width="25.935007095336914px"
                      height="27px"
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <Text
                      fontSize="22px"
                      color="#000"
                      fontWeight={700}
                      fontFamily="var(--font-ToyotaType-Regular)"
                    >
                      {item.name}
                    </Text>
                  )}
                </Flex>
              ))}

            {currentCategory && (
              <Flex
                justifyContent={"center"}
                position={"fixed"}
                bottom={"0"}
                left={"0"}
                width={"100%"}
                backgroundColor={"#F6F6F6"}
                marginTop="auto"
                padding="19px 30.5px"
              >
                <Grid
                  width={"min(435px, 100%)"}
                  justifyContent="center"
                  templateColumns={"1fr auto"}
                  alignItems="center"
                  gap={{
                    base: "50px",
                  }}
                >
                  <Button
                    backgroundColor="#000000"
                    style={{
                      maxWidth: "290px",
                      maxHeight: "50px",
                    }}
                  >
                    <Link href="/cotiza-tu-toyota/vehiculos-nuevos">
                      <View
                        as="span"
                        fontSize={"0.875rem"}
                        fontWeight={"500"}
                        lineHeight={"1.0256rem"}
                        minWidth={{ xl: "290px", xxl: "290px" }}
                        minHeight={{ xl: "50px", xxl: "50px" }}
                      >
                        <Text
                          color="#ffffff"
                          textDecoration="none"
                          textAlign="right"
                          fontFamily="var(--font-roboto)"
                          fontSize="14px"
                          fontStyle="normal"
                          fontWeight="500"
                          lineHeight="125%"
                          letterSpacing="0.1px"
                        >
                          Vehículos nuevos
                        </Text>
                      </View>
                    </Link>
                  </Button>
                  <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={"0.44rem"}
                  >
                    <Link href="/cotiza-tu-toyota/vehiculos-nuevos">
                      <View
                        as="span"
                        fontSize={"0.875rem"}
                        fontWeight={"500"}
                        lineHeight={"1.0256rem"}
                        textDecoration={"underline"}
                        paddingBottom={"0.25rem"}
                        color={"#000000"}
                      >
                        <Text color="#000">Ver todos</Text>
                      </View>
                    </Link>
                    <Image
                      src="/svgs/arrow--black-short.svg"
                      alt="Arrow Black Short"
                      height={".4631rem"}
                    />
                  </Flex>
                </Grid>
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
      {/* Dropdown Component */}
      {activeDropdown && activeDropdown?.dropdownComponent}
    </>
  );
};

export default Header;
