export interface dataConcilation {
  status: number;
  message: string;
  data: InfoConcilation;
}

export interface InfoConcilation {
  reconciled_invoices: InvoicesConcilation;
  invoices_not_found: InvoicesConcilation;
  invoices_with_differences: InvoicesConcilation;
}

export interface InvoicesConcilation {
  invoices: IInvoiceConcilation[];
  quantity: number;
  amount: number;
}

export interface IInvoiceConcilation {
  id: number;
  create_at: Date;
  current_value: number;
  observation: null | string;
  difference_amount: number | null;
  accept_date: Date;
  motive_id?: number | null;
}

export interface IInvoiceIncident {
  invoice_id: number;
  motive_id: number | null;
  difference: number | null;
  status: string;
}

export interface CreateIncidentResponse {
  status: number;
  message: string;
}
