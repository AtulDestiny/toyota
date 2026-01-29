/* eslint-disable @typescript-eslint/no-explicit-any */
// Definición del Schema para Amplify
export interface Schema {
  mutations: {
    sendToKumo: (args: {
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
    }) => Promise<{
      data: any;
      errors?: any[];
    }>;
  };
}

// Tipos para los formularios
export interface DataFormProps {
  data: {
    firstName: string;
    lastName: string;
    typeDocument: string;
    numberDocument: string;
    numberempresa: string;
  };
  onChange: (data: Record<string, string>) => void;
  onValidate: (isValid: boolean) => void;
  onFocus: (field: string) => void;
}

export interface ContactDetailsFormProps {
  data: {
    phone: string;
    email: string;
  };
  onChange: (data: Record<string, string>) => void;
  onValidate: (isValid: boolean) => void;
  onFocus: (field: string) => void;
}

export interface DealerFormProps {
  data: {
    dealer: string;
    city: string;
  };
  onChange: (data: Record<string, string>) => void;
  onValidate: (isValid: boolean) => void;
}

export interface VehicleFormProps {
  data: {
    vehicleType: string;
    quantity: string;
  };
  vehicleInfo?: any;
  onChange: (data: Record<string, string>) => void;
  onValidate: (isValid: boolean) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
  keyboardProps: {
    focusedInput: string;
    keyboard: React.RefObject<any>;
    handleInputChange: (value: string) => void;
    inputPattern: RegExp;
  };
}

export interface StepperProps {
  steps: {
    title: string;
    content: React.ReactNode;
  }[];
  isSubmitting?: boolean;
  onStepChange: (step: number) => void;
  onStepSendData: () => void;
  onStepRedirect: () => void;
  isStepValid: boolean[];
}
