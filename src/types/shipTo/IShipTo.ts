export interface ICreateShipTo {
  client_id: string;
  accounting_code: string;
  project_id: number;
  depency_client: number;
  description: string;
  zone: number[];
  channel: number[];
  line: number[];
  subline: number[];
  id_address: number;
  condition_payment: number;
  radication_type: number;
}

export type ShipToFormType = {
  shipTo: {
    code: string;
    address: string;
    address_id: number;
    billing_period: string | undefined;
    radication_type: ISelectType | undefined;
    condition_payment: ISelectType | undefined;
    dependency_client: boolean;
  };
};

interface ISelectType {
  value: number;
  label: string;
}
