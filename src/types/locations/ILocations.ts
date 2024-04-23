export interface ILocations {
  status: number;
  message: string;
  data: ILocation[];
}

export interface ILocation {
  id: number;
  address: string;
  city: string;
  nit: string;
  position: IPosition[];
}

interface IPosition {
  lat: string;
  lon: string;
}
