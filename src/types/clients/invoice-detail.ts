export interface InvoiceDetail {
  data: {
    results: IData[];
    totals: {
      total_general: number;
      total_discount: number;
      total_creditNotes: number;
      total_debitNotes: number;
    };
  };
}

export interface IData {
  id: number;
  id_invoice: number;
  comments: string;
  files: string[];
  create_at: Date;
  event_date: Date;
  invoice_event_type_id: number;
  user_id: number;
  is_deleted: number;
  ammount: number | null;
  financial_discount_id: null;
  previous_status_id: null;
  incident_id: null;
  email_id: string | null;
  radication_type_id: null;
  user_name: string;
  event_type_name: string;
  status_name: string;
  project_id: number;
  client_id: number;
}
