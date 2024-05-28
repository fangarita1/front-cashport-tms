export interface IUpdateFormProject {
  general: General;
  contact: Contact;
  logo: any;
  personalization: Personalization;
}

export interface Contact {
  name: string;
  position: string;
  email: string;
  phone: string;
  description: string;
}

export interface General {
  name: string;
  nit: string;
  currencies: string[];
  country: string;
  address: string;
  billing_period: Date | string;
  accept_date: string;
  DSO_currenly_year: string;
  DSO_days: number | undefined;
}

export interface Personalization {
  color: string | any;
}
