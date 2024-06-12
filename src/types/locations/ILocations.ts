export interface ILocations {
  status: number;
  message: string;
  data: ILocation[];
}

export interface ILocation {
  id: number;
  city: string;
  address: locationAddress[];
}

export interface locationAddress {
  id: number;
  address: string;
  complement: string;
  location_id: number;
  project_id: number;
}

export interface ICreateLocation {
  address: string;
  city: number;
  complement: string;
  project_id: number;
}
