export interface ICurrencies {
  status: number;
  message: string;
  data: ICurrency[];
}

export interface ICurrency {
  ID: number;
  CURRENCY_NAME: string;
}
