export interface InvoiceDetail {
  data: IData[];
}

export interface IData {
  id: number;
  id_invoice: number;
  comments: string;
  files: string;
  create_at: Date;
  event_date: Date;
  invoice_event_type_id: number;
  user_id: number;
  user_name: string;
  event_type_name: string;
  status_name: string;
  project_id: number;
  client_id: number;
}
