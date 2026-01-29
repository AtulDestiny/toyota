/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: "/cotizador/corolla-gr-s",
          destination: "/cotizador/corolla",
          permanent: true,
        },
        {
          source: "/cotizador/corolla-cross-gr-s",
          destination: "/cotizador/corolla-cross",
          permanent: true,
        },
        {
          source: "/cotizador/fortuner-gr-s",
          destination: "/cotizador/fortuner",
          permanent: true,
        },
        {
          source: "/cotizador/hilux-cargomax",
          destination: "/cotizador/hilux",
          permanent: true,
        },
        {
          source: "/cotizador/hilux-gr-s",
          destination: "/cotizador/hilux",
          permanent: true,
        },
        {
          source: "/cotizador/land-cruiser-300-gr-s",
          destination: "/cotizador/land-cruiser-300",
          permanent: true,
        },
        {
          source: "/vehiculos/pick-ups/tundra",
          destination: "/",
          permanent: true,
        },
         {
          source: "/vehiculos/pick-ups/tundra/version/platinum-3-4-gasolina-4-x-4-at",
          destination: "/",
          permanent: true,
        },
        {
          source: '/vehiculos/camionetas/land-cruiser-prado/version/land-cruiser-prado-wx-2-8-diesel-4-x-4-at',
          destination: '/vehiculos/camionetas/land-cruiser-prado',
          permanent: false,
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  