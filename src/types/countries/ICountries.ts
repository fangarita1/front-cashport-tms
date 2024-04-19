export interface ICountries {
  status: number;
  message: string;
  data: ICountry[];
}

export interface ICountry {
  id: number;
  country_name: string;
  address_format: string;
}
