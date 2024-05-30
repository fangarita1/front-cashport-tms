export interface IProjectById {
  status: number;
  message: string;
  data: IProject[];
}

export interface IProject {
  ACCEPT_DATE: number;
  ADDRESS: string;
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
  CURRENCY_NAME: string;
}
