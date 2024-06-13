import { AxiosHeaders } from "axios";
import { Config } from "../users/IUser";

export interface IClientAxios {
  data: IClientFullResponse;
  status: number;
  statusText: string;
  headers: AxiosHeaders;
  config: Config;
  request: Request;
}

export interface IClientFullResponse {
  status: number;
  message: string;
  data: IClient;
}
interface IPosition {
  lat: string;
  lon: string;
}

export interface IClientLocation {
  id: number;
  nit: string;
  address: string;
  position: IPosition;
  city: number;
  complement: string;
  project_id: number;
}

interface IDocument {
  URL: string;
}

export interface IClient {
  nit: number;
  uuid: string;
  project_id: number;
  client_name: string;
  business_name: string;
  client_type: string;
  client_type_id: number;
  phone: string;
  status: string;
  risk: string;
  email: string;
  billing_period: string;
  radication_type: number;
  holding_id: number;
  holding_name: string;
  document_type: string;
  locations: IClientLocation[];
  is_deleted: number;
  documents: IDocument[];
  ACTIVE: boolean;
  payment_condition: number;
}

export interface Pagination {
  page: number;
  total: number;
}

export interface IClients {
  status: number;
  message: string;
  data: IClient[];
  pagination: Pagination;
}

export interface ICreateClient {
  [key: string]: any;
  nit: number;
  project_id: number;
  client_name: string;
  business_name: string;
  phone: number | string;
  condition_payment: number;
  email: string;
  radication_type: number;
  document_type: number;
  locations: string;
  documents: File[];
  client_type_id: number;
  holding_id?: number;
  day_flag?: boolean;
  day?: number;
  order?: string;
  day_of_week?: string;
}

export interface IUpdateClient {
  [key: string]: any;
  business_name?: string;
  condition_payment?: number;
  document_type?: number;
  email?: string;
  holding_id?: number;
  locations: string;
  day_flag?: boolean;
  day?: number;
  order?: string;
  day_of_week?: string;
  phone?: string;
  radication_type: number;
}

export type ClientFormType = {
  infoClient: {
    address: string;
    document_type: ISelectType;
    nit: string;
    client_name: string;
    business_name: string;
    client_type: string | number;
    holding_id: ISelectType;
    phone: string;
    email: string;
    locations: any[];
    city: ISelectType;
    risk: string;
    radication_type: ISelectType;
    condition_payment: ISelectType;
    billing_period: string;
  };
};

export interface ISelectType {
  value: number;
  label: string;
}
