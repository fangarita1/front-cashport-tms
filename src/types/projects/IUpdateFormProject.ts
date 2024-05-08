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
}

export interface General {
  name: string;
  nit: string;
  currencies: string[];
  country: string;
  address: string;
  billing_period: Date;
  accept_date: boolean;
  DSO_currently_year: boolean;
  DSO_days: number;
}

export interface Personalization {
  color: string | any;
}
