import { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: ReactNode;
  hideHeader?: boolean;
  keyboardProps?: {
    focusedInput: string;
    keyboard: React.RefObject<any>;
    handleInputChange: (value: string) => void;
    inputPattern: RegExp;
  };
}

export interface StepperProps {
  steps: Array<{
    title: string;
    content: ReactNode;
  }>;
  onStepChange?: (stepIndex: number) => void;
  onStepSendData: () => void;
  onStepRedirect: () => void;
  isStepValid: boolean[];
}

export interface FormProps {
  data: Record<string, string>;
  onChange: (data: Record<string, string>) => void;
  onValidate: (isValid: boolean) => void;
  onFocus?: (field: string) => void;
}
