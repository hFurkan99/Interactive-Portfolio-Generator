import type { BaseComponent } from "./baseComponent.interfaces";

export interface CertificationsData extends BaseComponent {
  type: "certifications";
  items: CertificationItem[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}
