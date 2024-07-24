export interface ILocations {
  status: number;
  message: string;
  data: ILocation[];
}

export interface ICities {
  id: number;
  city: string;
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

export interface IResponseAddAddressToLocation {
  data: IAddAddressToLocation;
  message: string;
  status: number;
  success: boolean;
}

export interface IAddAddressToLocation {
  data: IAddAddressData[];
  message: string;
  error: boolean;
}

export interface IAddAddressData {
  address: string;
  city: number;
  complement: string;
  id: number;
  project_id: number;
}
