export interface IInvocies {
  error: boolean;
  data: InvoicesData[];
}

export interface InvoicesData {
  status: string;
  status_id: number;
  invoices: IInvoice[];
  total: number;
  count: number;
}

export interface IInvoice {
  id: number;
  shipto_id: number | null;
  line_id: number | null;
  sub_line_id: number | null;
  project_id: number;
  dependecy_sucursal: number;
  cufe: string;
  initial_value: number;
  current_value: number;
  expiration_date: string;
  comments: string;
  invoice_url: string;
  files: any | null; // Ver cómo llega esto cuando está lleno
  radication_type: string;
  create_at: string;
  updated_at: string;
  delete_at: string | null;
  currency_id: number;
  status_id: number;
  document_type_id: number;
  client_id: number;
  earlypay_date: string;
  financial_status: string;
  ajust_value: number;
  expiration_days: number;
}
