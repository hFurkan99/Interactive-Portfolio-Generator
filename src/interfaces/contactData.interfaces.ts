import type { BaseComponent } from "./baseComponent.interfaces";

export interface ContactData extends BaseComponent {
  type: "contact";
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}
