// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  View,
  TextField,
  SelectField,
  TextAreaField,
  CheckboxField,
  Button,
  Text,
  Flex,
  useBreakpointValue,
} from "@aws-amplify/ui-react";

// Field type definitions
export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "select"
  | "textarea"
  | "checkbox";

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];
  value?: string;
  width?: string | { base?: string; medium?: string; large?: string };
  countryCode?: string;
  countryCodeOptions?: SelectOption[];
  rows?: number;
  isHidden?: boolean;
  link?: string;
  linkText?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
}

// Define type for form values
export type FormValues = {
  [fieldId: string]: string | boolean | number | undefined;
};

// Quote form props interface
export interface QuoteFormProps {
  title?: string;
  fields: FormField[];
  submitButtonText?: string;
  disclaimer?: string;
  onSubmit?: (formData: FormValues) => void;
  backgroundColor?: string;
  textColor?: string;
  successMessage?: string;
  errorMessage?: string;
  loading?: boolean;
  containerStyle?: React.CSSProperties;
  fieldStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  disclaimerStyle?: React.CSSProperties;
  layout?: "grid" | "stacked";
  gridColumns?: number | { base?: number; medium?: number; large?: number };
  gridGap?: string;
  initialValues?: FormValues;
  onFieldChange?: (fieldId: string, value: any) => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  title = "Ingresa tus datos para cotizar en línea",
  fields,
  submitButtonText = "Enviar",
  disclaimer = "",
  onSubmit,
  backgroundColor = "#f8f8f8",
  textColor = "#333333",
  successMessage = "Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto contigo pronto.",
  errorMessage = "Por favor, asegúrate de diligenciar todos los campos obligatorios para continuar",
  loading = false,
  containerStyle = {},
  fieldStyle = {},
  buttonStyle = {},
  titleStyle = {},
  disclaimerStyle = {},
  layout = "grid",
  gridColumns = { base: 1, medium: 2 },
  gridGap = "1rem",
  initialValues = {},
  onFieldChange,
}) => {
  // Form state
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  const isMobile = useBreakpointValue({ base: true, medium: false }) || false;

  // Handle input change
  const handleChange = React.useCallback(
    (id: string, value: string | boolean) => {
      setFormValues((prev) => ({ ...prev, [id]: value }));

      // Live email validation
      if (id === "correo") {
        if (!value || !(value as string).includes("@")) {
          setFormErrors((prev) => ({
            ...prev,
            [id]: "El correo debe contener el carácter '@'",
          }));
        } else {
          setFormErrors((prev) => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
          });
        }
      } else {
        // Clear error for other fields on change
        setFormErrors((prev) => {
          if (prev[id]) {
            const { [id]: _, ...rest } = prev;
            return rest;
          }
          return prev;
        });
      }

      // Notify parent if needed
      if (onFieldChange) {
        onFieldChange(id, value);
      }
    },
    [onFieldChange]
  );

  // Add a useEffect to handle city changes separately
  // React.useEffect(() => {
  //   if (formValues?.ciudad) {
  //     // Handle city change without affecting other form values
  //     const cityField = fields.find((f) => f.id === "ciudad");
  //     const cityOptions = cityField?.options || [];
  //     const matched = cityOptions.find((opt) => opt.value === formValues.ciudad);

  //     if (matched) {
  //       // Only update city-related state
  //       setFormValues((prev) => ({
  //         ...prev,
  //         ciudad: formValues.ciudad,
  //         // Reset concesionario only when city changes
  //         concesionario: "",
  //       }));
  //     }
  //   }
  // }, [formValues.ciudad, fields]);

  const getCityNameById = (id: string | undefined): string => {
    if (!id) return "";
    const cityField = fields.find((f) => f.id === "ciudad");
    const options = cityField?.options || [];
    const matched = options.find((opt) => opt.value === id);
    return matched?.label || "";
  };

  const ciudadLabel = React.useMemo(() => {
    if (!formValues?.ciudad || !fields?.length) return undefined;

    const cityField = fields.find((f) => f.id === "ciudad");
    const cityOptions = cityField?.options || [];

    const match = cityOptions.find((opt) => opt.value === formValues.ciudad);
    return match?.label || "ss";
  }, [formValues.ciudad, fields]);

  const getDealerNameById = (id: string | undefined) => {
    if (!id) return "";
    const dealerField = fields.find((f) => f.id === "concesionario");
    const options = dealerField?.options || [];
    return options.find((opt) => String(opt.value) === String(id))?.label || "";
  };


  React.useEffect(() => {
    const id = formValues.concesionario as string;
    const label = getDealerNameById(id);
  }, [formValues.concesionario, fields]);

  const cityOptionsReady =
    fields.find((f) => f.id === "ciudad")?.options?.length > 0;

  // Handle checkbox change
  const handleCheckboxChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValues({ ...formValues, [id]: e.target.checked });

    // Clear error when field is changed
    if (formErrors[id]) {
      const newErrors = { ...formErrors };
      delete newErrors[id];
      setFormErrors(newErrors);
    }
  };

  // Validate form
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    fields.forEach((field) => {
      if (
        field.required &&
        !formValues[field.id] &&
        field.type !== "checkbox"
      ) {
        errors[field.id] = "Este campo es obligatorio";
      }

      if (
        field.type === "checkbox" &&
        field.required &&
        !formValues[field.id]
      ) {
        errors[field.id] = "Debes aceptar para continuar";
      }

      if (
        field.type === "email" &&
        formValues[field.id] &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
          formValues[field.id] as string
        )
      ) {
        errors[field.id] = "Correo electrónico inválido";
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setSubmitSuccess(null); // Reset status

        if (onSubmit) {
          await onSubmit(formValues);
          setSubmitSuccess(true);
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setSubmitSuccess(false);
      }
    } else {
      setSubmitSuccess(false);
      // Scroll to first error
      const firstError = Object.keys(formErrors)[0];
      const errorElement = document.querySelector(`[name="${firstError}"]`);
      errorElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Get grid columns based on screen size
  const getGridColumns = (): number => {
    if (typeof gridColumns === "number") {
      return gridColumns;
    }

    if (isMobile && gridColumns.base) {
      return gridColumns.base;
    }

    if (!isMobile && gridColumns.medium) {
      return gridColumns.medium;
    }

    return 2; // Default value
  };

  // Render field based on type
  const renderField = (field: FormField) => {
    if (field.isHidden) return null;

    switch (field.type) {
      case "text":
      case "email":
      case "tel":
        return field.id === "celular" && field.countryCode ? (
          <Flex key={field.id} width="100%" direction="column">
            <Text
              fontSize="0.875rem"
              fontWeight="500"
              marginBottom="0.5rem"
              color={textColor}
            >
              {field.label}
              {field.required && <span style={{ color: "red" }}>*</span>}
            </Text>
            <Flex width="100%">
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRight: "none",
                  borderTopLeftRadius: "4px",
                  borderBottomLeftRadius: "4px",
                  padding: "0 0.5rem",
                  margin: "10px 0px 0px 0px",
                }}
                minWidth="66px"
                borderRadius="15px"
                maxHeight="40px"
              >
                <Image
                  src="/svgs/Col_flag.svg"
                  alt="Colombia Flag"
                  width={18}
                  height={12}
                  style={{ marginRight: "4px", borderRadius: "30px" }}
                />
                <Text fontSize="0.875rem">{field.countryCode}</Text>
              </View>
              <TextField
                name={field.id}
                placeholder={field.placeholder || ""}
                type={field.type}
                value={(formValues[field.id] as string) || ""}
                onChange={(e) => {
                  let inputValue = e.target.value.replace(/[^0-9]/g, ""); // Allow digits only
                  inputValue = inputValue.slice(0, 10); // Max 10 digits
                  handleChange(field.id, inputValue);
                }}
                width="100%"
                borderTopLeftRadius="0"
                borderBottomLeftRadius="0"
                hasError={!!formErrors[field.id]}
                errorMessage={formErrors[field.id]}
                style={{ ...fieldStyle }}
              />
            </Flex>
          </Flex>
        ) : (
          <Flex key={field.id} width="100%" direction="column">
            <Text
              fontSize="0.875rem"
              fontWeight="500"
              marginBottom="0.5rem"
              color={textColor}
            >
              {field.label}
              {field.required && <span style={{ color: "red" }}>*</span>}
            </Text>
            <TextField
              name={field.id}
              placeholder={field.placeholder || ""}
              type={field.type}
              value={(formValues[field.id] as string) || ""}
              onChange={(e) => {
                let input = e.target.value;
                if (["nombre", "apellido"].includes(field.id)) {
                  input = input.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
                }
                if (["numeroDocumento"].includes(field.id)) {
                  input = input.replace(/\D/g, "");
                }
                handleChange(field.id, input);
              }}
              width="100%"
              hasError={!!formErrors[field.id]}
              errorMessage={formErrors[field.id]}
              style={{ ...fieldStyle }}
            />
          </Flex>
        );

      case "select":
        return (
          <Flex key={field.id} width="100%" direction="column">
            <Text
              fontSize="0.875rem"
              fontWeight="500"
              marginBottom="0.5rem"
              color={textColor}
            >
              {field.label}
              {field.required && <span style={{ color: "red" }}>*</span>}
            </Text>
            <SelectField
              name={field.id}
              placeholder={field.placeholder || "Seleccionar"}
              value={(formValues[field.id] as string) || ""}
              onChange={(e: any) => {
                const newValue = e.target.value;
                if (field.id === "ciudad") {
                  setFormValues((prev) => ({
                    ...prev,
                    ciudad: newValue,
                    concesionario: "", // Solo limpia concesionario
                    // NO toques ningún otro campo aquí
                  }));
                } else {
                  setFormValues((prev) => ({
                    ...prev,
                    [field.id]: newValue,
                  }));
                }
                if (field.onChange) {
                  field.onChange(e);
                }
                // Notifica al padre si es necesario
                if (onFieldChange) {
                  onFieldChange(field.id, newValue);
                }
              }}
              width="100%"
              hasError={!!formErrors[field.id]}
              errorMessage={formErrors[field.id]}
              style={{ ...fieldStyle }}
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectField>
          </Flex>
        );

      case "textarea":
        return (
          <Flex key={field.id} width="100%" direction="column">
            <Text
              fontSize="0.875rem"
              fontWeight="500"
              marginBottom="0.5rem"
              color={textColor}
            >
              {field.label}
              {field.required && <span style={{ color: "red" }}>*</span>}
            </Text>
            <TextAreaField
              name={field.id}
              placeholder={field.placeholder || ""}
              value={(formValues[field.id] as string) || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              rows={field.rows || 5}
              width="100%"
              hasError={!!formErrors[field.id]}
              errorMessage={formErrors[field.id]}
              style={{ ...fieldStyle }}
            />
          </Flex>
        );

      case "checkbox":
        return (
          <Flex
            key={field.id}
            width="100%"
            alignItems="flex-start"
            marginTop="1rem"
          >
            <CheckboxField
              name={field.id}
              checked={(formValues[field.id] as boolean) || false}
              onChange={(e) => handleCheckboxChange(field.id, e)}
              hasError={!!formErrors[field.id]}
              errorMessage={formErrors[field.id]}
              label={
                <Text fontSize="0.875rem" color={textColor} display="inline">
                  {field.label}
                  {field.required && <span style={{ color: "red" }}>*</span>}
                  {field.link && (
                    <a
                      href={field.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#D42224", marginLeft: "4px" }}
                    >
                      {field.linkText || "Ver más"}
                    </a>
                  )}
                </Text>
              }
            />
          </Flex>
        );

      default:
        return null;
    }
  };

  React.useEffect(() => {
    setFormValues((prev) => {
      // Solo actualiza ciudad y concesionario si cambiaron, y NO toca nombre ni apellido
      let updated = { ...prev };
      if (initialValues.ciudad !== undefined && prev.ciudad !== initialValues.ciudad) {
        updated.ciudad = initialValues.ciudad;
      }
      if (initialValues.concesionario !== undefined && prev.concesionario !== initialValues.concesionario) {
        updated.concesionario = initialValues.concesionario;
      }
      return updated;
    });
    // eslint-disable-next-line
  }, [initialValues.ciudad, initialValues.concesionario]);

  return (
    <View
      as="form"
      onSubmit={handleSubmit}
      backgroundColor={backgroundColor}
      padding="2rem"
      borderRadius="8px"
      width="100%"
      maxWidth="1200px"
      margin="0 auto"
      style={{ ...containerStyle }}
    >
      {title && (
        <Text
          fontSize="1.5rem"
          fontWeight="600"
          marginBottom="2rem"
          textAlign="center"
          color={textColor}
          style={{ ...titleStyle }}
        >
          {title}
        </Text>
      )}

      <View
        style={{
          display: layout === "grid" ? "grid" : "flex",
          gridTemplateColumns:
            layout === "grid" ? `repeat(${getGridColumns()}, 1fr)` : undefined,
          gap: gridGap,
          flexDirection: layout === "stacked" ? "column" : undefined,
        }}
      >
        {/* {fields
          .filter((f) => !f.type || f.type !== "checkbox")
          .map(renderField)} */}

        {fields
          .filter((f) => f.type !== "checkbox" && f.type !== "textarea")
          .map(renderField)}
      </View>

      {/* Render textarea outside the grid layout */}
      <View marginTop="1.5rem">
        {fields.filter((f) => f.type === "textarea").map(renderField)}
      </View>
      <View
        marginTop="1.5rem"
        display={{ base: "", medium: "", xl: "flex", xxl: "flex" }}
      >
        {fields.filter((f) => f.type === "checkbox").map(renderField)}
      </View>

      <Flex direction="column" alignItems="center" marginTop="44px">
        <Button
          type="submit"
          backgroundColor="#D42224"
          color="#FFFFFF"
          width={isMobile ? "100%" : "auto"}
          minWidth="200px"
          padding="0.75rem 2rem"
          fontSize="1rem"
          fontWeight="600"
          borderRadius="999px"
          isDisabled={loading}
          isLoading={loading}
          onClick={(e) => handleSubmit(e)}
          style={{ ...buttonStyle }}
        >
          {submitButtonText}
        </Button>

        {submitSuccess === true && (
          <Text
            color="green"
            fontSize="0.875rem"
            marginTop="1rem"
            textAlign="center"
          >
            {successMessage}
          </Text>
        )}

        {submitSuccess === false && (
          <Text
            color="red"
            fontSize="0.875rem"
            marginTop="1rem"
            textAlign="center"
          >
            {errorMessage}
          </Text>
        )}
      </Flex>

      {/* <Text
        fontSize="0.75rem"
        color="#666666"
        marginTop="35px"
        textAlign="center"
        style={{ ...disclaimerStyle, whiteSpace: "pre-line" }}
      >
        {/* {`Tus datos serán enviados a concesionarios ${getDealerNameById(formValues.concesionario as string) ||
          "DISTOYOTA Calle 102"
          } ${getCityNameById(formValues.ciudad as string) || "Bogotá"}, Colombia.
Al clickear el botón ENVIAR, estarás certificando que eres mayor de 18 años y que has leído
y estás de acuerdo con los Términos de servicios y Política de privacidad.`}
      </Text> */}
    </View>
  );
};

export default QuoteForm;
