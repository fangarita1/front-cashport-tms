// Define the type for a single historic DSO record
interface IHistoricDSORecord {
  dso: number;
  date: string;
}

// Define the type for the history DSO
interface IHistoryDSO {
  id: number;
  client_id: number;
  historic: IHistoricDSORecord[];
}

// Define the type for the application payments
interface IApplicationPayments {
  applied_payments_ammount: number;
  unapplied_payments_ammount: number;
}

// Define the type for invoice info
interface IInvoiceInfo {
  total_invoice_unreconciled: number;
  total_invoice_reconciled: number;
  total_balances: number;
}

// Define the type for the data wallet
interface IDataWallet {
  id: number;
  client_id: number;
  client_name: string;
  project_id: number;
  past_due_ammount: number;
  budget_ammount: number;
  applied_payments_ammount: number;
  unapplied_payments_ammount: number;
  holding_id: number | null;
  holding_name: string | null;
}

// Define the type for the full data section of the response
export interface IDataSection {
  data_wallet: IDataWallet;
  total_wallet: number;
  info_invioce: IInvoiceInfo;
  dso: number;
  quota: number;
  aplication_payments: IApplicationPayments;
  history_dso: IHistoryDSO;
}

// Define the type for the full API response
export interface IPortfolioResponse {
  status: number;
  data: IDataSection;
}
