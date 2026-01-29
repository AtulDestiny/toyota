import Link from "next/link";

function Example() {
  const vehicleName = "Land Cruiser Prado TX Modelo 2023";
  const vehiclePrice = "$303.500.000";
  const consecionaireName = "Distoyota Calle 150";

  return (
    <div>
      <h1>Otra Página</h1>
      <Link
        href={{
          pathname: "/gracias",
          query: {
            vehicleName,
            vehiclePrice,
            consecionaireName,
          },
        }}
      >
        Ir a la página de gracias
      </Link>
    </div>
  );
}

export default Example;
