"use client";
import { CotizadorSelect } from "@/app/cotizador/[slug]/components/CotizadorSelect";
import { CotizadorInput } from "@/app/cotizador/[slug]/components/InputsSelect";
import {
  CheckboxField,
  Flex,
  Grid,
  Link,
  Text,
  View,
} from "@aws-amplify/ui-react";
import React, { useState } from "react";
import Button from "../Layout/Button/Button";
import { createCertificateRequest } from "./query";
import { useRouter } from "next/navigation";

export interface CityInterface {
  id: string;
  externalId?: string | number;
  name: string;
}

interface CotizadorFormData {
  nombre: string;
  apellido: string;
  email: string;
  tipoDocumento: string;
  numeroDocumento: string;
  terminos: boolean;
  tratamientoDatos: boolean;
  numeroDeFactura: string;
  certificado: string;
}

// Move the initial form state outside the component
const initialFormState: CotizadorFormData = {
  nombre: "",
  apellido: "",
  email: "",
  tipoDocumento: "",
  numeroDocumento: "",
  terminos: false,
  tratamientoDatos: false,
  numeroDeFactura: "",
  certificado: "",
};

export interface OfficeInterface {
  id: string;
  idVitrina?: string;
  label?: string;
  name: string;
  address: string;
  phone: string;
  appointmentPhone?: string;
  email?: string;
  website?: string;
  latitude?: string;
  longitude?: string;
  cityId?: string;
  concessionaireId?: string;
}

const CertificateRequest: React.FC = () => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] =
    useState<CotizadorFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formKey, setFormKey] = useState<number>(0); // state for re-mount the form
  const router = useRouter();

  // Event handlers
  const handleFieldChange = (
    field: keyof CotizadorFormData,
    value: string | boolean
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    validateField(field, value);
  };

  // Validate Fields
  const validateField = (field: string, value: string | boolean) => {
    let error = "";

    switch (field) {
      case "nombre":
      case "apellido":
        if (
          typeof value === "string" &&
          !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)
        ) {
          error = `El ${field} solo debe contener letras`;
        }
        break;
      case "numeroDocumento":
        if (typeof value === "string" && !/^\d+$/.test(value)) {
          error = "El número de documento debe ser numérico";
        }
        break;
      case "email":
        if (
          typeof value === "string" &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
          error = "El correo debe tener un formato válido";
        }
        break;
      case "terminos":
        if (value !== true) {
          error = "Debes aceptar los términos y condiciones";
        }
        break;
      case "tratamientoDatos":
        if (value !== true) {
          error = "Debes autorizar el tratamiento de tus datos personales";
        }
        break;
      default:
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  // Validate Form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formValues.nombre)) {
      newErrors.nombre = "El nombre solo debe contener letras";
      isValid = false;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formValues.apellido)) {
      newErrors.apellido = "El apellido solo debe contener letras";
      isValid = false;
    }

    if (!/^\d+$/.test(formValues.numeroDocumento)) {
      newErrors.numeroDocumento = "El número de documento debe ser numérico";
      isValid = false;
    }

    if (!/^\d+$/.test(formValues.numeroDeFactura)) {
      newErrors.numeroDeFactura = "El número de factura debe ser numérico";
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "El correo debe tener un formato válido";
      isValid = false;
    }

    if (!formValues.tipoDocumento) {
      newErrors.tipoDocumento = "Debe seleccionar un tipo de documento";
      isValid = false;
    }

    if (!formValues.terminos) {
      newErrors.terminos = "Debes aceptar los términos y condiciones";
      isValid = false;
    }

    if (!formValues.tratamientoDatos) {
      newErrors.tratamientoDatos =
        "Debes autorizar el tratamiento de tus datos personales";
      isValid = false;
    }

    if (!formValues.certificado) {
      newErrors.certificado = "Por favor, selecciona una opción";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center", // centers horizontally
        width: "100%",
      }}
    >
      <View
        padding={{
          base: "25px 17px",
          medium: "2% 8%",
          xl: "2% 8%",
        }}
        width={{ base: "100%", xl: "70%" }}
        backgroundColor={"#F6F6F6"}
      >
        <Text
          marginBottom={{ base: "10px", xl: "48px" }}
          fontSize={{ base: "22px", xl: "26px" }}
          fontFamily="var(--font-toyotaType-Regular)"
          fontWeight={700}
          color="#58595B"
          textAlign="center"
          maxWidth={{ base: "272px", xl: "100%" }}
          marginLeft={{ base: "auto", xl: "auto" }}
          marginRight={{ base: "auto", xl: "auto" }}
        >
          Ingresa tus datos para obtener tu certificado
        </Text>
        <Grid
          key={formKey}
          templateColumns={{
            base: "repeat(1, 1fr)",
            medium: "repeat(2, 1fr)",
            xl: "repeat(2, 1fr)",
          }}
          gap={{ base: "30px", xl: "20px" }}
        >
          <CotizadorInput
            labelColor="#58595B"
            label="Nombre*"
            placeholder="Tu nombre"
            id="nombre"
            value={formValues.nombre}
            onChange={(e) => handleFieldChange("nombre", e.target.value)}
            errorMessage={formErrors.nombre}
            validatePattern={/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/}
          />
          <CotizadorInput
            labelColor="#58595B"
            label="Apellido*"
            placeholder="Tu apellido"
            id="apellido"
            value={formValues.apellido}
            onChange={(e) => handleFieldChange("apellido", e.target.value)}
            errorMessage={formErrors.apellido}
            validatePattern={/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/}
          />

          <CotizadorSelect
            selectWidth="100%"
            labelColor="#58595B"
            label="Tipo de documento*"
            placeholder="Tu tipo de documento"
            id="tipoDocumento"
            value={formValues.tipoDocumento}
            onChange={(e) => handleFieldChange("tipoDocumento", e.target.value)}
            options={[
              { value: "1", label: "Cédula de ciudadanía" },
              { value: "2", label: "NIT" },
              { value: "3", label: "Cédula de Extranjería" },
              { value: "4", label: "Pasaporte" },
            ]}
            errorMessage={formErrors.tipoDocumento}
          />
          <CotizadorInput
            labelColor="#58595B"
            label="Número de documento*"
            placeholder="Tu número de documento"
            id="numeroDocumento"
            value={formValues.numeroDocumento}
            onChange={(e) =>
              handleFieldChange("numeroDocumento", e.target.value)
            }
            errorMessage={formErrors.numeroDocumento}
            validatePattern={/^\d*$/}
          />

          <>
            <CotizadorInput
              labelColor="#58595B"
              label="Correo electrónico*"
              placeholder="Tu correo electrónico"
              id="email"
              value={formValues.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              errorMessage={formErrors.email}
            // validatePattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
            />
            <CotizadorInput
              labelColor="#58595B"
              label="Número de factura*"
              placeholder="Tu número de factura"
              id="NumeroDeFactura"
              value={formValues.numeroDeFactura}
              onChange={(e) =>
                handleFieldChange("numeroDeFactura", e.target.value)
              }
              errorMessage={formErrors.numeroDeFactura}
              validatePattern={/^\d*$/}
            />

            <CotizadorSelect
              labelColor="#58595B"
              selectWidth="100%"
              label="¿Quiere certificado?*"
              placeholder="Seleccione una opción"
              id="certificado"
              value={formValues.certificado || ""}
              onChange={(e) => handleFieldChange("certificado", e.target.value)}
              options={[
                { value: "yes", label: "Sí, lo quiero" },
                { value: "no", label: "No, gracias" },
              ]}
              errorMessage={formErrors.certificado}
            />
          </>
        </Grid>
        <Flex
          direction={{ base: "column", xl: "row" }}
          alignItems={{ base: "flex-start" }}
          justifyContent={{ base: "flex-start", xl: "center" }}
          gap={{ base: "36px", xl: "16px" }}
          margin={{ base: "0 auto", xl: "0 auto " }}
          marginTop={{ base: "36px", xl: "48px" }}
          marginBottom={{ base: "36px", xl: "32px" }}
        >
          <Flex direction={{ base: "column", xl: "column" }} gap={20}>
            <CheckboxField
              label={
                <>
                  <Text
                    fontSize={{ base: "sm", xl: "14px" }}
                    fontFamily="var(--font-toyotaDisplay)"
                    fontWeight={400}
                    color="#58595B"
                  >
                    Acepto los{" "}
                    <Link
                      color={"inherit"}
                      href="legales/terminos_y_condiciones"
                      target="_blank"
                      textDecoration="underline"
                    >
                      Términos y condiciones{" "}
                    </Link>
                  </Text>
                </>
              }
              name="terms"
              checked={formValues.terminos}
              onChange={(e) => handleFieldChange("terminos", e.target.checked)}
            />
            {formErrors.terminos && (
              <Text
                color="red"
                fontSize="12px"
                fontFamily="var(--font-ToyotaDisplay)"
                marginTop="-19px"
              >
                {formErrors.terminos}
              </Text>
            )}
          </Flex>
          <Flex direction={{ base: "column", xl: "column" }} gap={20}>
            <CheckboxField
              label={
                <Text
                  fontSize={{ base: "sm", xl: "14px" }}
                  fontFamily="var(--font-toyotaDisplay)"
                  fontWeight={400}
                  color="#58595B"
                >
                  Autorizo el{" "}
                  <Link
                    color={"inherit"}
                    href="/legales"
                    target="_blank"
                    textDecoration="underline"
                  >
                    Tratamiento de mis datos
                  </Link>
                </Text>
              }
              name="data"
              checked={formValues.tratamientoDatos}
              onChange={(e) =>
                handleFieldChange("tratamientoDatos", e.target.checked)
              }
            />
            {formErrors.tratamientoDatos && (
              <Text
                color="red"
                fontSize="12px"
                fontFamily="var(--font-ToyotaDisplay)"
                marginTop="-19px"
              >
                {formErrors.tratamientoDatos}
              </Text>
            )}
          </Flex>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          marginTop={{ base: "36px", xl: "44px" }}
        >
          <View width={{ base: "100%", medium: "min(290px, 100%)" }}>
            <Button
              isFullWidth
              color="red"
              onClick={async () => {
                const isValid = validateForm();
                if (!isValid) {
                  console.warn("Form has validation errors:", formErrors);
                  return;
                }
                try {
                  setIsSubmitting(true);
                  const result = await createCertificateRequest(formValues);
                  setFormValues(initialFormState); // set initial values
                  setFormErrors({}); // remove erros
                  setFormKey((k) => k + 1); // updating grid kry state to re-mount the grid
                  router.push(
                    "/descubre-toyota/toyota-sostensible/a-ambiental/reconecta/thank-you"
                  ); // redirect to thank-you page
                } catch (error) {
                  console.error("Mutation failed:", error);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </View>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          marginLeft={{ base: "auto" }}
          marginRight={{ base: "auto" }}
          marginTop={{ base: "36px", xl: "44px" }}
          maxWidth={{ base: "100%", xl: "640px" }}
        >
          <Text
            fontSize={{ base: "9px", xl: "12px" }}
            fontFamily="var(--font-toyotaType-Regular)"
            fontWeight={400}
            color="#58595B"
            textAlign="center"
            maxWidth={"70ch"}
          >
            {(() => {
              const stored = localStorage.getItem("toyota_dealer_selection");
              const selection = stored ? JSON.parse(stored) : {};

              return `*Tus datos serán enviados a Automotores Toyota Colombia. Al clickear el botón ENVIAR, estarás certificando que eres mayor de 18 años y que has leído y estás de acuerdo con los Términos de servicios y Política de privacidad.`;
            })()}
          </Text>
        </Flex>
      </View>
    </View>
  );
};

export default CertificateRequest;
