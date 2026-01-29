export const createCertificateRequest = async (formValues: any) => {
  const mutation = `
    mutation CreateCertificateRequest($input: CreateCertificateRequestInput!) {
      createCertificateRequest(input: $input) {
        id
      }
    }
  `;

  const input = {
    // 👇 name mapping
    firstName: formValues.nombre,
    lastName: formValues.apellido,

    email: formValues.email,

    // 👇 document mapping
    documentType: formValues.tipoDocumento,      // "1"
    documentNumber: formValues.numeroDocumento,

    invoiceNumber: formValues.numeroDeFactura,

    // 👇 yes/no → boolean
    wantsCertificate: formValues.certificado === "yes",

    status: "PENDING",
  };

  const response = await fetch(
    process.env.NEXT_PUBLIC_GRAPHQL_API_URL!,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_GRAPHQL_API_KEY!,
      },
      body: JSON.stringify({
        query: mutation,
        variables: { input },
      }),
    }
  );

  const result = await response.json();

  if (result.errors) {
    console.error("GraphQL errors:", result.errors);
    throw new Error("Failed to create certificate request");
  }

  return result.data.createCertificateRequest;
};
