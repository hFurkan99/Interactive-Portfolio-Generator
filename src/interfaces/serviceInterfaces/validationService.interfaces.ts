import type { CVComponentData } from "../cVComponentData.interfaces";
import type { CVDocument } from "../cVDocument.interfaces";

export interface ValidationService {
  validateDocument: (document: CVDocument) => ValidationResult;
  validateComponent: (component: CVComponentData) => ValidationResult;
  validateEmail: (email: string) => boolean;
  validateURL: (url: string) => boolean;
  validatePhoneNumber: (phone: string) => boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  componentId?: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
  componentId?: string;
}
