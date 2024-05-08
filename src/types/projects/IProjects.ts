export interface IProjects {
  status: number;
  message: string;
  data: IProject[];
  pagination: Pagination;
}

export interface IProject {
  ID: number;
  UUID: string;
  PROJECT_DESCRIPTION: string;
  RGB_CONFIG: string;
  LOGO: string;
  NIT: string;
  CONTACT: string;
  PHONE: string;
  ADDRESS: string;
  COUNTRY_ID: number;
  IS_DELETED: number;
  CURRENCY: Currency[];
  EMAIL: string;
  IS_ACTIVE: boolean;
  NUMBER_USERS: number;
  DSO_CURRENTLY_YEAR: number;
  DSO_DAYS: number;
  ACCEPT_DATE: number;
}

export interface Currency {
  id: number;
  CURRENCY_NAME?: string;
  currency_name?: string;
}

export interface Pagination {
  page: number;
  totalRows: number;
}
// -----Create--------
export interface ICreatePayload {
  general: General;
  logo: any;
  contact: Contact;
  personalization: Personalization;
}

export interface Contact {
  name: string;
  position: string;
  email: string;
  phone: string;
}

export interface General {
  name: string;
  nit: string;
  currencies: string[];
  country: string;
  address: string;
}

export interface Personalization {
  color: Color;
}

export interface Color {
  metaColor: MetaColor;
}

export interface MetaColor {
  originalInput: OriginalInput;
  r: number;
  g: number;
  b: number;
  a: number;
  roundA: number;
  format: string;
  isValid: boolean;
}

export interface OriginalInput {
  h: number;
  s: number;
  a: number;
  v: number;
}
