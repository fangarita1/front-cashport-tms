export interface IListCurrencies {
  status: number;
  message: string;
  data: Datum[];
}

export interface Datum {
  ID: number;
  CURRENCY_NAME: string;
}
