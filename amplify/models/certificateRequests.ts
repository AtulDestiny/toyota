import { a } from "@aws-amplify/backend";

export const CertificateRequest = a.model({
  id: a.id().required(),
  firstName: a.string().required(), // Nombre
  lastName: a.string().required(),
  documentType: a.string().required(), // Apellidos
  documentNumber: a.string().required(), // Número de documento
  email: a.email().required(), // Correo electrónico
  invoiceNumber: a.string().required(), // Número de factura
  wantsCertificate: a.boolean().required(), // ¿Quiere certificado?
  status: a.enum(["PENDING", "APPROVED", "REJECTED"]),
});
