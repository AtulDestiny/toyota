"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './ContactForm.module.scss';
import { useEffect, useRef } from "react";

type ContactFormProps = {
  setIsOpen: (value: boolean) => void;
};

export default function ContactForm({ setIsOpen }: ContactFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const steps = [
    { label: "Placa" },
    { label: "Elegir" },
    { label: "Vehículo" },
    { label: "Propietario" },
    { label: "Información de contacto" },
  ];

  const [formData, setFormData] = useState({
    placa: "",
    marca: "",
    linea: "",
    modelo: "",
    tipoPlaca: "",
    valorAccesorios: "",
    precioVehiculo: "",
    tipoUso: "",
    ciudadCirculacion: "",
    tipoDocumento: "",
    numeroDocumento: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    genero: "",
    ocupacion: "",
    estadoCivil: "",
    telefono: "",
    correo: "",
    terminos: false,
    autorizacion: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.placa.trim()) newErrors.placa = "La placa es requerida";
        if (!formData.marca.trim()) newErrors.marca = "La marca es requerida";
        if (!formData.linea.trim()) newErrors.linea = "La línea es requerida";
        if (!formData.modelo.trim()) newErrors.modelo = "El modelo es requerido";
        break;
      case 3:
        if (!formData.tipoPlaca.trim()) newErrors.tipoPlaca = "El tipo de placa es requerido";
        if (!formData.valorAccesorios.trim()) newErrors.valorAccesorios = "El valor de accesorios es requerido";
        if (!formData.precioVehiculo.trim()) newErrors.precioVehiculo = "El precio del vehículo es requerido";
        if (!formData.tipoUso.trim()) newErrors.tipoUso = "El tipo de uso es requerido";
        if (!formData.ciudadCirculacion.trim()) newErrors.ciudadCirculacion = "La ciudad de circulación es requerida";
        break;
      case 4:
        if (!formData.tipoDocumento.trim()) newErrors.tipoDocumento = "El tipo de documento es requerido";
        if (!formData.numeroDocumento.trim()) newErrors.numeroDocumento = "El número de documento es requerido";
        if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
        if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido";
        if (!formData.fechaNacimiento.trim()) newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
        if (!formData.genero.trim()) newErrors.genero = "El género es requerido";
        if (!formData.ocupacion.trim()) newErrors.ocupacion = "La ocupación es requerida";
        if (!formData.estadoCivil.trim()) newErrors.estadoCivil = "El estado civil es requerido";
        break;
      case 5:
        if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es requerido";
        if (!formData.correo.trim()) {
          newErrors.correo = "El correo es requerido";
        } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
          newErrors.correo = "El correo debe tener un formato válido";
        }
        if (!formData.terminos) newErrors.terminos = "Debe aceptar los términos y condiciones";
        if (!formData.autorizacion) newErrors.autorizacion = "Debe autorizar el tratamiento de datos";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = async () => {
    if (currentStep === 2) {
      // Skip validation for vehicle selection step
      setCurrentStep(currentStep + 1);
      return;
    }

    if (validateStep(currentStep)) {
      if (currentStep === 5) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          router.push("/cotiza-tu-toyota/seguros-toyota-formulario");
        }, 1000);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevStep = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const closeModal = () => setIsOpen(false);

  const SCRIPT_URL = "https://clientes.agentemotor.com/public_apps/co/web-client-form/static/js/agm_bundle.js";

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (ref.current) {
        ref.current.setAttribute("tenant", "U2FsdGVkX18lZ9ubReU+fbyUmPjk5Xpjz0rCvZlln9HUQGieECy1sIoDjVA/GmZo");
        ref.current.setAttribute("asesor", "example@mail.com");
        ref.current.setAttribute("redirect_to", "https://dominio.com/comparativo");
  
        const script = document.createElement("script");
        script.src = SCRIPT_URL;
        script.async = true;
        document.body.appendChild(script);
      }
    }, 500); // give the DOM time to fully render
  
    return () => clearTimeout(timeout);
  }, []);
  

  return (
    <div className={styles.modalOverlay}>

      <div className={styles.modalContent}>
        {/* Close Button */}
        <button
          onClick={closeModal}
          className={styles.closeButton}
          type="button"
        >
          ×
        </button>

        {/* Header */}
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            Ingresa tus datos para
          </h3>
          <h2 className={styles.modalSubtitle}>
            Cotizar en línea
          </h2>
        </div>

        <div>
          <link rel="stylesheet"
            href="https://clientes.agentemotor.com/public_apps/co/web-client-form/static/css/agm_bundle.css" />

          <div
            id="AGMroot"
            ref={ref}
          >
          </div>
        </div>

        {/* <div
          id="AGMroot"
          tenant="U2FsdGVkX18Ec6rAl"
          redirect-to="https://dominio.com/comparativo"
          asesor="example@mail.com"
        >
        </div> */}

        {/* Stepper */}
        {/* <div className={styles.stepIndicators}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${styles.stepIndicator} ${currentStep >= index + 1 ? styles.active : ''
                } ${currentStep > index + 1 ? styles.completed : ''}`}
            >
              <div className={styles.stepNumber}>
                {index + 1}
              </div>
              <span className={styles.stepTitle}>
                {step.label}
              </span>
            </div>
          ))}
        </div> */}

        {/* Form Content */}
        <div className={styles.formContent}>
          {/* {currentStep === 1 && (
            <div className={styles.formGrid}>
              <div className={styles.formCard}>
                <div className={styles.formGroup}>
                  <label>Placa *</label>
                  <input
                    type="text"
                    placeholder="Ej. XXX999"
                    value={formData.placa}
                    onChange={(e) => handleInputChange('placa', e.target.value)}
                  />
                  {errors.placa && <p className={styles.errorMessage}>{errors.placa}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label>Marca *</label>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={formData.marca}
                    onChange={(e) => handleInputChange('marca', e.target.value)}
                  />
                  {errors.marca && <p className={styles.errorMessage}>{errors.marca}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label>Línea *</label>
                  <select
                    value={formData.linea}
                    onChange={(e) => handleInputChange('linea', e.target.value)}
                  >
                    <option value="">Seleccione una línea</option>
                    <option value="corolla">Corolla</option>
                    <option value="camry">Camry</option>
                    <option value="hilux">Hilux</option>
                  </select>
                  {errors.linea && <p className={styles.errorMessage}>{errors.linea}</p>}
                </div>
              </div>
              <div className={styles.formCard}>
                <div className={styles.formGroup}>
                  <label>Modelo *</label>
                  <input
                    type="text"
                    placeholder="Año del modelo"
                    value={formData.modelo}
                    onChange={(e) => handleInputChange('modelo', e.target.value)}
                  />
                  {errors.modelo && <p className={styles.errorMessage}>{errors.modelo}</p>}
                </div>
              </div>
            </div>
          )} */}

          {/* {currentStep === 2 && (
            <div className={styles.vehicleGrid}>
              <div className={styles.vehicleCard}>
                <h3 className={styles.vehicleTitle}>Automóvil</h3>
                <p className={styles.vehicleDetails}>Toyota Corolla [12] [FL] XE-I</p>
                <p className={styles.vehicleDetails}>Hybrid TP 1800CC 7 AB ABS</p>
                <p className={styles.vehicleInfo}>Cod.Fasecolda: 09001145</p>
                <p className={styles.vehicleInfo}>Modelo: 2024</p>
                <p className={styles.vehicleInfo}>Precio de referencia: 118,500,000</p>
                <button
                  onClick={handleNextStep}
                  className={styles.vehicleButton}
                  type="button"
                >
                  Es mi vehículo
                </button>
              </div>
              <div className={styles.vehicleCard}>
                <h3 className={styles.vehicleTitle}>Automóvil</h3>
                <p className={styles.vehicleDetails}>Toyota Corolla [12] [FL] XE-I</p>
                <p className={styles.vehicleDetails}>Hybrid TP 1800CC 7 AB ABS</p>
                <p className={styles.vehicleInfo}>Cod.Fasecolda: 09001145</p>
                <p className={styles.vehicleInfo}>Modelo: 2024</p>
                <p className={styles.vehicleInfo}>Precio de referencia: 118,500,000</p>
                <button
                  onClick={handleNextStep}
                  className={styles.vehicleButton}
                  type="button"
                >
                  Es mi vehículo
                </button>
              </div>
              <div className={styles.vehicleCard}>
                <h3 className={styles.vehicleTitle}>Automóvil</h3>
                <p className={styles.vehicleDetails}>Toyota Corolla [12] [FL] XE-I</p>
                <p className={styles.vehicleDetails}>Hybrid TP 1800CC 7 AB ABS</p>
                <p className={styles.vehicleInfo}>Cod.Fasecolda: 09001145</p>
                <p className={styles.vehicleInfo}>Modelo: 2024</p>
                <p className={styles.vehicleInfo}>Precio de referencia: 118,500,000</p>
                <button
                  onClick={handleNextStep}
                  className={styles.vehicleButton}
                  type="button"
                >
                  Es mi vehículo
                </button>
              </div>
            </div>
          )} */}

          {/* {currentStep === 3 && (
            <div className={styles.formGrid}>
              <div className={styles.formCard}>
                <div className={styles.formGroup}>
                  <label>Tipo de placa *</label>
                  <input
                    type="text"
                    placeholder="Particular"
                    value={formData.tipoPlaca}
                    onChange={(e) => handleInputChange('tipoPlaca', e.target.value)}
                  />
                  {errors.tipoPlaca && <p className={styles.errorMessage}>{errors.tipoPlaca}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label>Valor adicional en accesorios *</label>
                  <input
                    type="text"
                    placeholder="0"
                    value={formData.valorAccesorios}
                    onChange={(e) => handleInputChange('valorAccesorios', e.target.value)}
                  />
                  {errors.valorAccesorios && <p className={styles.errorMessage}>{errors.valorAccesorios}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label>Precio del vehículo *</label>
                  <input
                    type="text"
                    placeholder="118,500,000"
                    value={formData.precioVehiculo}
                    onChange={(e) => handleInputChange('precioVehiculo', e.target.value)}
                  />
                  {errors.precioVehiculo && <p className={styles.errorMessage}>{errors.precioVehiculo}</p>}
                </div>
              </div>
              <div className={styles.formCard}>
                <div className={styles.formGroup}>
                  <label>Tipo de uso *</label>
                  <select
                    value={formData.tipoUso}
                    onChange={(e) => handleInputChange('tipoUso', e.target.value)}
                  >
                    <option value="">Seleccione un tipo de uso</option>
                    <option value="particular">Particular</option>
                    <option value="comercial">Comercial</option>
                  </select>
                  {errors.tipoUso && <p className={styles.errorMessage}>{errors.tipoUso}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label>Ciudad de circulación *</label>
                  <input
                    type="text"
                    placeholder="Ciudad"
                    value={formData.ciudadCirculacion}
                    onChange={(e) => handleInputChange('ciudadCirculacion', e.target.value)}
                  />
                  {errors.ciudadCirculacion && <p className={styles.errorMessage}>{errors.ciudadCirculacion}</p>}
                </div>
              </div>
            </div>
          )} */}

          {/* {currentStep === 4 && (
            <div className={styles.formGrid}>
              <div className={styles.formCard}>
                <div className={styles.formGroup}>
                  <label>Tipo de documento *</label>
                  <select
                    value={formData.tipoDocumento}
                    onChange={(e) => handleInputChange('tipoDocumento', e.target.value)}
                  >
                    <option value="">Seleccione un documento</option>
                    <option value="cc">Cédula de Ciudadanía</option>
                    <option value="ce">Cédula de Extranjería</option>
                    <option value="passport">Pasaporte</option>
                  </select>
                  {errors.tipoDocumento && <p className={styles.errorMessage}>{errors.tipoDocumento}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label>Número de documento *</label>
                  <input
                    type="text"
                    placeholder="Número de documento"
                    value={formData.numeroDocumento}
                    onChange={(e) => handleInputChange('numeroDocumento', e.target.value)}
                  />
                  {errors.numeroDocumento && <p className={styles.errorMessage}>{errors.numeroDocumento}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label>Nombre *</label>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                  />
                  {errors.nombre && <p className={styles.errorMessage}>{errors.nombre}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label>Apellido *</label>
                  <input
                    type="text"
                    placeholder="Apellido"
                    value={formData.apellido}
                    onChange={(e) => handleInputChange('apellido', e.target.value)}
                  />
                  {errors.apellido && <p className={styles.errorMessage}>{errors.apellido}</p>}
                </div>
              </div>
              <div className={styles.formCard}>
                <div className={styles.formGroup}>
                  <label>Fecha de nacimiento *</label>
                  <input
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                  />
                  {errors.fechaNacimiento && <p className={styles.errorMessage}>{errors.fechaNacimiento}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label>Género *</label>
                  <select
                    value={formData.genero}
                    onChange={(e) => handleInputChange('genero', e.target.value)}
                  >
                    <option value="">Seleccione género</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.genero && <p className={styles.errorMessage}>{errors.genero}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label>Ocupación *</label>
                  <select
                    value={formData.ocupacion}
                    onChange={(e) => handleInputChange('ocupacion', e.target.value)}
                  >
                    <option value="">Seleccione ocupación</option>
                    <option value="empleado">Empleado</option>
                    <option value="independiente">Independiente</option>
                    <option value="pensionado">Pensionado</option>
                  </select>
                  {errors.ocupacion && <p className={styles.errorMessage}>{errors.ocupacion}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label>Estado civil *</label>
                  <select
                    value={formData.estadoCivil}
                    onChange={(e) => handleInputChange('estadoCivil', e.target.value)}
                  >
                    <option value="">Seleccione estado civil</option>
                    <option value="soltero">Soltero</option>
                    <option value="casado">Casado</option>
                    <option value="divorciado">Divorciado</option>
                    <option value="viudo">Viudo</option>
                  </select>
                  {errors.estadoCivil && <p className={styles.errorMessage}>{errors.estadoCivil}</p>}
                </div>
              </div>
            </div>
          )} */}

          {/* {currentStep === 5 && (
            <div className={styles.formGrid}>
              <div className={styles.formCard}>
                <div className={styles.formGroup}>
                  <label>Número telefónico *</label>
                  <input
                    type="tel"
                    placeholder="Ej. 3001234567"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                  />
                  {errors.telefono && <p className={styles.errorMessage}>{errors.telefono}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label>Correo *</label>
                  <input
                    type="email"
                    placeholder="Ej: ejemplocorreo@gmail.com"
                    value={formData.correo}
                    onChange={(e) => handleInputChange('correo', e.target.value)}
                  />
                  {errors.correo && <p className={styles.errorMessage}>{errors.correo}</p>}
                </div>
              </div>
              <div className={styles.formCard}>
                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="terminos"
                    checked={formData.terminos}
                    onChange={(e) => handleInputChange('terminos', e.target.checked)}
                  />
                  <label htmlFor="terminos">
                    Acepto los Términos y condiciones *
                  </label>
                </div>
                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="autorizacion"
                    checked={formData.autorizacion}
                    onChange={(e) => handleInputChange('autorizacion', e.target.checked)}
                  />
                  <label htmlFor="autorizacion">
                    Autorizo el Tratamiento de mis datos *
                  </label>
                </div>
              </div>
            </div>
          )} */}
        </div>

        {/* Navigation Buttons */}
        <div className={styles.navigationButtons}>
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className={`${styles.navButton} ${styles.prevButton}`}
            type="button"
          >
            Anterior
          </button>
          <button
            onClick={handleNextStep}
            className={`${styles.navButton} ${styles.nextButton}`}
            type="button"
          >
            {isLoading ? 'Cargando...' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
}
