const STORAGE_KEY = "offline_forms";

export interface FormData {
  firstName: string;
  identificationType: string;
  identificationNumber: string;
  dealerCode: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  vehicleModel: string;
  vehicleVersion: string;
  city: string;
  dataAuthorization: boolean;
  termsAndConditions: boolean;
  timestamp?: number;
}

export const storeFormDataOffline = async (
  formData: FormData
): Promise<void> => {
  try {
    // Obtener datos existentes
    const existingData = localStorage.getItem(STORAGE_KEY);
    const forms = existingData ? JSON.parse(existingData) : [];

    // Agregar timestamp al nuevo formulario
    const formWithTimestamp = {
      ...formData,
      timestamp: Date.now(),
    };

    // Agregar el nuevo formulario
    forms.push(formWithTimestamp);

    // Guardar en localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
  } catch (error) {
    console.error("Error al guardar datos offline:", error);
  }
};

export const getStoredForms = (): FormData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error al obtener datos offline:", error);
    return [];
  }
};

export const clearStoredForms = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error al limpiar datos offline:", error);
  }
};
