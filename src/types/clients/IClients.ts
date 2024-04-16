export interface IClient {
  nit: string;
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
  holding_id?: number;
  holding_name?: string;
  document_type: string;
  locations: ILocation[];
  is_deleted: number;
  documents?: any;
  ACTIVE: boolean;
}

interface ILocation {
  id: number;
  nit: string;
  city: string;
  address: string;
  position: {
    lat: string;
    lon: string;
  };
}
