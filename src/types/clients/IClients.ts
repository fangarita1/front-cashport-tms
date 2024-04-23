import { Config } from "../users/IUser";

export interface IClientAxios {
  data: IClientFullResponse;
  status: number;
  statusText: string;
  headers: any;
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

interface ILocation {
  id: number;
  nit: string;
  city: string;
  address: string;
  position: IPosition;
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
  locations: ILocation[];
  is_deleted: number;
  documents: IDocument[];
  ACTIVE: boolean;
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
