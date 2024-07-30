import { IBillingPeriodForm } from "../billingPeriod/IBillingPeriod";

export interface IProjects {
  status: number;
  message: string;
  data: IProject[];
  pagination: Pagination;
}

export interface IProject {
  ACCEPT_DATE: number;
  ADDRESS: string;
  BILLING_PERIOD_CONFIG: IBillingPeriodForm;
  ADDRESS_FORMAT: string;
  BILLING_PERIOD: string;
  CONTACT: string;
  COUNTRY_ID: number;
  COUNTRY_NAME: string;
  CURRENCY: Currency[];
  DSO_CURRENLY_YEAR: number;
  DSO_DAYS: number;
  EMAIL: string;
  ID: number;
  IS_ACTIVE: boolean;
  LOGO: string;
  NAME: string;
  NIT: string;
  NUMBER_USERS: number;
  PHONE: string;
  PROJECT_DESCRIPTION: string;
  POSITION_CONTACT: string;
  RGB_CONFIG: string;
  UUID: string;
  is_deleted: number;
}

export interface Currency {
  id: number;
  currency_name: string;
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
  accept_date: string;
  DSO_currenly_year: string;
  DSO_days: number | undefined;
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
